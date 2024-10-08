import { Form, Modal, Select, InputNumber } from 'antd';
import React, { useEffect } from 'react';

export default function EditStepModal({ step, isOpen, onCancel, onFinish, trigger }) {
    const [form] = Form.useForm();

    const validateValue = (rule, value) => {
        const operatorId = form.getFieldValue('condition');
        if (operatorId == '1' && value <= 0) {
            return Promise.reject('Please enter a number greater than 0');
        }
        return Promise.resolve();
    };

    useEffect(() => {
        form.resetFields();
    }, [step]);

    return (
        <Modal
            title='Edit Step'
            open={isOpen}
            onCancel={onCancel}
            onOk={() => {
                form.submit();
            }}
            destroyOnClose={true}
        >
            {console.log('trigger: ', trigger)}
            <Form
                form={form}
                layout='vertical'
                wrapperCol={{ span: 12 }}
                onFinish={onFinish}
                onChange={() => form.validateFields()}
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
                        defaultValue={step?.trigger?.id}
                        options={[
                            {
                                label: trigger?.name,
                                value: trigger?.id,
                            },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item
                    name='condition'
                    label='Condition'
                    rules={[{ required: true, message: 'Please select a condition' }]}
                    initialValue={step?.condition?.id}
                >
                    <Select
                        placeholder='Select Condition'
                        options={trigger?.operators?.map((condition, index) => ({
                            label: condition.operator?.name,
                            value: condition?.id,
                            key: condition.id + '$condition',
                        }))}
                    >
                        {/*   {trigger?.operators?.map((condition, index) => (
                            <Select.Option
                                key={condition.id + '$condition'}
                                value={condition?.id}
                            >
                                {condition?.operator?.name}
                            </Select.Option>
                        ))} */}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='value'
                    label='Value'
                    dependencies={['condition']}
                    initialValue={step?.value}
                    rules={[{ required: true, message: 'Please enter a value' }, { validator: validateValue }]}
                >
                    <InputNumber
                        className='w-full'
                        min={form.getFieldValue('condition') == 1 ? 1 : undefined}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
