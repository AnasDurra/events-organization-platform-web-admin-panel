import { Form, Modal, Row, Col, Input, InputNumber, Spin } from 'antd';
import React from 'react';

export default function NewPackageModal({ isOpen, onFinish, onCancel, isLoading }) {
    const [form] = Form.useForm();
    return (
        <Modal
            title='New Package'
            open={isOpen}
            destroyOnClose={true}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                form.submit();
            }}
            closable={!isLoading}
            footer={isLoading ? null : undefined}
        >
            <Spin spinning={isLoading}>
                <Form
                    name='new package'
                    form={form}
                    labelAlign='left'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='package name'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label='Tickets'
                                name='value'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                        </Col>{' '}
                        <Col span={24}>
                            <Form.Item
                                label='Price'
                                name='price'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    );
}
