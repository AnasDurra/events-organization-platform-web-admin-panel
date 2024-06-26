import { CloseOutlined } from '@ant-design/icons';
import { CircleOutlined } from '@mui/icons-material';
import { Button, Modal, Form, Input, Select, InputNumber } from 'antd';
import React, { useState } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import {
    useCreateVariantMutation,
    useGenerateGiftCardsMutation,
    useGetGiftCardsQuery,
    useGetVariantsQuery,
} from './giftcardsSlice';

export default function NewGiftCardsModal({ isOpen, onClose, onFinish, loading, defaultIsExistingCollection = true }) {
    const [isExistingCollection, setIsExistingCollection] = useState(defaultIsExistingCollection);

    const { data: { result: variants } = { result: [] }, isLoading: isVariantsLoading } = useGetVariantsQuery();

    const fakeLabels = [
        { label: 'Birthday', value: 'birthday' },
        { label: 'Anniversary', value: 'anniversary' },
        { label: 'Congratulations', value: 'congratulations' },
    ];

    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onFinish({ values, isNewCollection: !isExistingCollection });
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            closable
            title={'Generating Cards'}
            footer={
                <div className='flex justify-between items-center'>
                    <Button
                        type='dashed'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => form.submit()}
                        loading={loading}
                    >
                        Confirm
                    </Button>
                </div>
            }
            afterClose={() => {
                setIsExistingCollection(defaultIsExistingCollection);
                form.resetFields();
            }}
        >
            <div className='min-h-[40svh]'>
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    <div
                        onClick={() => setIsExistingCollection(true)}
                        className={`border border-red-500 rounded-xl flex flex-col p-4 ${
                            isExistingCollection ? 'bg-primary/70' : 'bg-primary/50'
                        } text-white relative hover:cursor-pointer`}
                    >
                        {isExistingCollection ? (
                            <FaRegCircleCheck className='absolute top-2 right-3 text-[1.3rem]'></FaRegCircleCheck>
                        ) : (
                            <CircleOutlined className='absolute top-2 right-3 text-[1.3rem]'></CircleOutlined>
                        )}
                        <div>Existing collection</div>
                        <div className='text-gray-200 text-[0.7rem] text-pretty'>
                            Adding more cards to existing collection
                        </div>
                    </div>

                    <div
                        onClick={() => setIsExistingCollection(false)}
                        className={`border border-red-500 rounded-xl flex flex-col p-4 ${
                            isExistingCollection ? 'bg-primary/50' : 'bg-primary/70'
                        } text-white relative hover:cursor-pointer`}
                    >
                        {isExistingCollection ? (
                            <CircleOutlined className='absolute top-2 right-3'></CircleOutlined>
                        ) : (
                            <FaRegCircleCheck className='absolute top-2 right-3 text-[1.3rem]'></FaRegCircleCheck>
                        )}
                        <div>New collection</div>
                        <div className='text-gray-200 text-[0.7rem] text-pretty'>Adding cards to a new collection</div>
                    </div>
                </div>

                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleFinish}
                    className='mt-4'
                >
                    <Form.Item
                        name='amount'
                        label='number of generated giftcards'
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            className='w-full'
                            placeholder='Enter amount'
                            min={0}
                        />
                    </Form.Item>
                    {isExistingCollection ? (
                        <Form.Item
                            name='variant_id'
                            label='Collection'
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder='Select a collection'
                                loading={isVariantsLoading}
                            >
                                {variants.map((variant) => (
                                    <Select.Option
                                        key={variant.id}
                                        value={variant.id}
                                    >
                                        {variant.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : (
                        <>
                            <Form.Item
                                label='Collection name'
                                rules={[{ required: true }]}
                                required
                            >
                                <Form.Item
                                    noStyle
                                    name='label'
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder='Enter new collection name' />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                name='price'
                                label='Card price'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    className='w-full'
                                    placeholder='Enter card price'
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item
                                name='tickets'
                                label='Card tickets'
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    className='w-full'
                                    placeholder='Enter tickets received per card'
                                    min={0}
                                />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </div>
        </Modal>
    );
}
