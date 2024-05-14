import { Button, Form, Input, Spin, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { getLoggedInUserV2 } from '../../services/authSlice';

const { useToken } = theme;

export default function AccountPage() {
    const { token } = useToken();

    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const onValuesChange = (changedValues, allValues) => {
        if (
            (allValues.username && allValues.username != getLoggedInUserV2().username) ||
            (allValues.password && allValues.username && allValues.confirm == allValues.password)
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

                <Spin  spinning={false} >
                    <Form
                        name='update-account'
                        onFinish={(fields) => {
                            console.log({
                                ...fields,
                                username: fields.username == getLoggedInUserV2().username ? undefined : fields.username,
                                password: fields.password ? fields.password : undefined,
                                confirm: undefined,
                            });
                        }}
                        initialValues={{
                            username: 'initial-username',
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
                            name='password'
                            label='New Password'
                            rules={[{ min: 5, message: 'Password must be minimum 5 characters.' }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name='confirm'
                            label='Confirm Password'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') == value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
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
