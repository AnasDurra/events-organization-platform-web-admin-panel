import { Form, Modal, Select } from 'antd';
import React from 'react';

export default function EditStepModal({ isOpen, onCancel, onFinish, fakeData, trigger }) {
    const [form] = Form.useForm();

    return (
        <Modal
            title='Edit Step'
            open={isOpen}
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
        >
            {console.log('trigger: ', trigger)}
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    name='trigger'
                    label='Trigger'
                    rules={[{ required: true, message: 'Please select a trigger' }]}
                    initialValue={trigger?.id}
                >
                    <Select
                        placeholder='Select Trigger'
                        disabled
                        defaultValue={trigger?.id}

                        // onChange={(value) => setCurrentModalTrigger(value)}
                    >
                        <Select.Option
                            key={trigger?.name}
                            value={trigger?.name}
                        >
                            {trigger?.name}
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name='condition'
                    label='Condition'
                    rules={[{ required: true, message: 'Please select a condition' }]}
                >
                    <Select placeholder='Select Condition'>
                        {trigger?.operators?.map((condition, index) => (
                            <Select.Option
                                key={condition.id + '$condition'}
                                value={condition?.id}
                            >
                                {condition?.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
