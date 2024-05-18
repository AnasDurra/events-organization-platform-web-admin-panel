import { ArrowLeftOutlined, BackwardFilled, BackwardOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, Row, Select, Space, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewOrgMutation } from './orgsSlice';

export default function NewOrgPage() {
    const [addNewOrg, { isLoading, error, isSuccess }] = useAddNewOrgMutation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (isSuccess) {
            navigate(-1);
        }
    }, [isSuccess, navigate]);

    return (
        <>
            <div className='grid grid-cols-12 w-full'>
                <div className='col-start-3 col-span-8 flex flex-col space-y-4'>
                    {contextHolder}
                    <Form
                        className='w-full'
                        name='basic'
                        wrapperCol={{
                            span: 14,
                        }}
                        labelCol={{
                            span: 10,
                        }}
                        labelAlign='left'
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={async (fields) => {
                            console.log('fields', fields);
                            await addNewOrg({ ...fields, confirm_password: undefined })
                                .unwrap()
                                .then((payload) => {
                                    //TODO provide message api from context and add context holder globally
                                    messageApi.success('organization added');
                                    navigate('/org/all', { replace: true });
                                })
                                .catch((error) => {
                                    messageApi.error(error.data?.result?.response?.message[0]);
                                });
                        }}
                        onFinishFailed={() => {}}
                        autoComplete='off'
                    >
                        <div className='flex mb-4'>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                type='text'
                                onClick={() => navigate(-1)}
                            />

                            <Title
                                level={3}
                                style={{ margin: '0' }}
                            >
                                {' '}
                                New organization registration{' '}
                            </Title>
                        </div>

                        <Divider></Divider>
                        <div className='p-2'>
                            <Form.Item
                                label='name'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input style={{ width: '100%' }} />
                            </Form.Item>
                        </div>

                        <div className='bg-gray-100 p-2'>
                            <Title
                                level={5}
                                style={{ color: 'GrayText', margin: '1em 0' }}
                            >
                                Administrator
                            </Title>
                            <Form.Item
                                label='first name'
                                name='first_name'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='last name'
                                name='last_name'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='email'
                                name='email'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='phone number'
                                name='phone_number'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input defaultValue='26888888' />
                            </Form.Item>
                            <Form.Item
                                label='birth date'
                                name='birth_date'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    onChange={() => {}}
                                />
                            </Form.Item>
                        </div>

                        <div className='p-2'>
                            <Title
                                level={5}
                                style={{ color: 'GrayText', margin: '1em 0' }}
                            >
                                Administrator credentials
                            </Title>
                            <Form.Item
                                label='username'
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='password'
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password placeholder='input password' />
                            </Form.Item>
                            <Form.Item
                                label='confirm password'
                                name='confirm_password'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password placeholder='confirm password' />
                            </Form.Item>
                        </div>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='w-full'
                                loading={isLoading}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
