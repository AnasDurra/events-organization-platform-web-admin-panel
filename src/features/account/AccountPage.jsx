import { Button, Form, Input, Spin, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import {
    getLoggedInUserV2,
    useUpdatePasswordMutation,
    useUpdateUsernameOrEmailMutation,
} from '../../services/authSlice';
import { useNotification } from '../../utils/useAntNotification';
import Cookies from 'js-cookie';

const { useToken } = theme;

export default function AccountPage() {
    const { token } = useToken();
    const [form] = Form.useForm();
    const { openNotification } = useNotification();

    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const [updateUsername, { isLoading: isUpdateUsernameLoading }] = useUpdateUsernameOrEmailMutation();
    const [updatePassword, { isLoading: isUpdatePasswordLoading }] = useUpdatePasswordMutation();

    const onValuesChange = (changedValues, allValues) => {
        console.log('allvalues: ', allValues);
        console.log('udner: ', getLoggedInUserV2());
        if (
            (allValues.username && allValues.username != getLoggedInUserV2()?.username && allValues.old_password) ||
            (allValues.password &&
                allValues.username &&
                allValues.confirm_password == allValues.password &&
                allValues.old_password)
        ) {
            setIsBtnDisabled(false);
        } else {
            setIsBtnDisabled(true);
        }
    };
    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-3  col-span-8 flex flex-col w-full space-y-10'>
                <div className='w-full text-center flex items-center justify-center'>
                    <MdAdminPanelSettings
                        className='text-[10em]'
                        style={{ color: token.colorPrimary }}
                    />
                    <Title> Admin</Title>
                </div>

                <Spin spinning={false}>
                    <Form
                        form={form}
                        name='update-account'
                        onFinish={async (fields) => {
                            console.log({
                                ...fields,
                                username: fields.username == getLoggedInUserV2()?.username ? undefined : fields.username,
                                password: fields.password ? fields.password : undefined,
                                confirm: undefined,
                            });

                            if (fields.username != getLoggedInUserV2()?.username) {
                                await updateUsername({
                                    new_username: fields.username,
                                    password: fields.old_password,
                                    role_id: getLoggedInUserV2()?.user_role,
                                })
                                    .unwrap()
                                    .then((res) => {
                                        Cookies.set('user', JSON.stringify(res?.result), {
                                            expires: 12,
                                            path: '/',
                                        });

                                        console.log('user', JSON.parse(Cookies.get('user')));
                                        openNotification({
                                            type: 'success',
                                            message: 'username updated successfully',
                                            placement: 'bottomRight',
                                        });
                                    })
                                    .catch((e) => {
                                        console.log(e);
                                        openNotification({
                                            type: 'error',
                                            message: 'failed to update credentials',
                                            description: e?.data?.result?.response?.message,
                                            placement: 'bottomRight',
                                        });
                                    });
                            }

                            if (fields.password) {
                                await updatePassword({
                                    new_password: fields.confirm_password,
                                    old_password: fields.old_password,
                                    role_id: getLoggedInUserV2()?.user_role,
                                })
                                    .unwrap()
                                    .then((res) => {
                                        Cookies.set('user', JSON.stringify(res?.result), {
                                            expires: 12,
                                            path: '/',
                                        });

                                        openNotification({
                                            type: 'success',
                                            message: 'password updated successfully',
                                            placement: 'bottomRight',
                                        });
                                    })
                                    .catch((e) => {
                                        openNotification({
                                            type: 'error',
                                            message: 'failed to update credentials',
                                            description: e?.data?.result?.response?.message,
                                            placement: 'bottomRight',
                                        });
                                    });
                            }

                            form.resetFields();
                            console.log('last: ', getLoggedInUserV2());
                            form.setFieldValue('username', getLoggedInUserV2()?.username);
                        }}
                        initialValues={{
                            username: getLoggedInUserV2()?.username,
                        }}
                        scrollToFirstError
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        labelAlign='left'
                        onValuesChange={onValuesChange}
                    >
                        <Form.Item
                            name='username'
                            label='username'
                            rules={[
                                { min: 5, message: 'Username must be minimum 5 characters.' },
                                {
                                    required: true,
                                    message: 'Please input username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='old_password'
                            label='Current Password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input username!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='New Password'
                            rules={[{ min: 5, message: 'Password must be minimum 5 characters.' }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name='confirm_password'
                            label='Confirm Password'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') == value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The new password that you entered do not match!')
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                            <Button
                                disabled={isBtnDisabled}
                                type='primary'
                                htmlType='submit'
                                className='w-full'
                                loading={isUpdatePasswordLoading || isUpdateUsernameLoading}
                            >
                                update
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    );
}
