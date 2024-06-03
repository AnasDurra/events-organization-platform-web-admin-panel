import { Modal, Form, InputNumber, Input } from 'antd';
import React, { useEffect } from 'react';

export default function EditPointModal({ isOpen, onClose, onFinish, pointObj }) {
    const [form] = Form.useForm();

    const handleFinish = () => {
        form.validateFields()
            .then((values) => {
                onFinish(values);
                form.resetFields();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        form.setFieldsValue(pointObj);
    }, [form, pointObj]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            onOk={handleFinish}
            title='Adding new platform point reward'
            destroyOnClose
        >
            <Form
                form={form}
                layout='vertical'
                wrapperCol={{ span: 12 }}
            >
                <div className='flex justify-start items-center'>
                    <img
                        src={`/src/assets/game-point.svg`}
                        className='w-[5.5em]'
                        alt='Game Point'
                    ></img>
                </div>

                <Form.Item
                    name='name'
                    label='Name'
                    rules={[{ required: true, message: 'Please enter the name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='value'
                    label='Total Points'
                    rules={[{ required: true, message: 'Please enter the total points' }]}
                >
                    <InputNumber
                        min={1}
                        className='w-full'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
