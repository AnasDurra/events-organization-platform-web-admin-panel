import { Modal, Form, InputNumber, Input } from 'antd';
import React, { useEffect } from 'react';

export default function EditPointModal({ isOpen, onClose, onFinish, pointObj, type = 'pp', loading }) {
    const [form] = Form.useForm();

    const handleFormFinish = (fields) => {
        const rewardPointsId = type === 'pp' ? pointObj?.id : undefined;
        const redeemablePointsId = type === 'rp' ? pointObj?.id : undefined;
        onFinish({ ...fields, reward_points_id: rewardPointsId, reward_redeemable_points_id: redeemablePointsId });
    };

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({
                name: pointObj?.reward?.name,
                value: pointObj?.value,
            });
        }
    }, [form, pointObj, isOpen]);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            onOk={() => form.submit()}
            title='Editing platform point reward'
            destroyOnClose
            okText='Edit'
            okButtonProps={{ loading: loading }}
        >
            <Form
                form={form}
                layout='vertical'
                wrapperCol={{ span: 12 }}
                variant='filled'
                onFinish={handleFormFinish}
            >
                <div className='flex justify-start items-center'>
                    <img
                        src={`/static/images/${type == 'rp' ? 'points-rp.svg' : type == 'pp' ? 'game-point.svg' : null}`}
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
