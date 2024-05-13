import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

export default function NewFeaturedEventModal({ isOpen, onFinish, onCancel }) {
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            footer={null}
            title='Adding New Featured Event'
            classNames={{ body: 'p-8 my-4' }}
            destroyOnClose
            closable
            maskClosable
        >
            <Form
                name='basic'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete='off'
                labelAlign='left'
            >
                <Form.Item
                    label='Select organization'
                    name='organization'
                    rules={[
                        {
                            required: true,
                            message: 'Please select organization!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='demo'>Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Select event'
                    name='event'
                    rules={[
                        {
                            required: true,
                            message: 'Please select an event!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='demo'>Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Select Type'
                    name='type'
                    rules={[
                        {
                            required: true,
                            message: 'Please select an event!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='demo'>Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Publish Date'
                    name={'dateRange'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input date range!',
                        },
                    ]}
                >
                    <DatePicker.RangePicker className='w-full' />
                </Form.Item>

                <Form.Item className='flex justify-end'>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
