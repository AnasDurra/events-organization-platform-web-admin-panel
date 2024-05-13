import { Button, Form, Input, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useLoginMutation } from '../services/authSlice';
import { useNotification } from '../utils/useAntNotification';

const { useToken } = theme;

export default function LoginPage() {
    const { token } = useToken();

    const [login, { isLoading }] = useLoginMutation();
    const { openNotification } = useNotification();

    return (
        <div className='grid grid-cols-12 h-full w-full bg-gray-100/50'>
            <Form
                className='col-span-6 col-start-4 flex flex-col space-y-8 h-full w-full justify-center items-center w-full'
                name='basic'
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                labelAlign='left'
                onFinish={(fields) => {
                    console.log(fields);
                    login(fields).then((res) => {
                        if (res.error) {
                            console.log(res);
                            openNotification({
                                type: 'error',
                                message: 'Failed to login',
                                description: 'try again later',
                                placement: 'bottomRight',
                            });
                        } else {
                        }
                    });
                }}
                autoComplete='off'
            >
                <div className='w-full text-center flex items-center justify-center'>
                    <MdAdminPanelSettings
                        className='text-[10em]'
                        style={{ color: token.colorPrimary }}
                    />
                    <Title> Admin</Title>
                </div>

                <div className='w-full'>
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='w-full'
                        >
                            Login
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}
