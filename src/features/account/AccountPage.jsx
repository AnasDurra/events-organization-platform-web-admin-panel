import { Button, Form, Input, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';

const { useToken } = theme;

export default function AccountPage() {
    const { token } = useToken();

    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const onValuesChange = (changedValues, allValues) => {
        if (
            allValues.username != undefined &&
            allValues.password != undefined &&
            allValues.username != '' &&
            allValues.username != 'old username' &&
            allValues.password != '' &&
            allValues.confirm == allValues.password
        ) {
            setIsBtnDisabled(false);
        } else {
            setIsBtnDisabled(true);
        }
        console.log(allValues)
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

                <Form
                    name='update-account'
                    onFinish={(fields) => {
                        console.log(fields);
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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
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
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
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
            </div>
        </div>
    );
}
