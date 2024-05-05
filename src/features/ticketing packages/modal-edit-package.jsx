import { Form, Modal, Row, Col, Input, InputNumber, Spin, Select } from 'antd';
import React, { useEffect } from 'react';

export default function EditPackageModal({ isOpen, onFinish, onCancel, isLoading, pckg }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen)
            form.setFieldsValue({
                name: pckg.name,
                value: pckg.metadata.value,
                price: pckg.default_price?.unit_amount / 100,
                package_id: pckg.id,
                active: pckg.active,
            });
    }, [form, isOpen, pckg]);
    return (
        <Modal
            title='Editing Package'
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
            okText={'Edit'}
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
                                label='Status'
                                name='active'
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select>
                                    <Select.Option value={true}>Active</Select.Option>
                                    <Select.Option value={false}>Archive</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
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

                    <Form.Item
                        name='package_id'
                        noStyle
                        hidden
                    >
                        <Input value={pckg?.id} />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}
