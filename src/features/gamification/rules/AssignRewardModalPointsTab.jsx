import { Button, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';

export default function PointsTab({ onFinish, loading }) {
    const [form] = Form.useForm();
    const [selectedPointType, setSelectedPointType] = useState('pp');

    const handleFormSubmit = (values) => {
        onFinish({ type: selectedPointType, ...values });
    };

    return (
        <div className='p-4 h-full'>
            <div className='flex justify-center items-center space-y-8 flex-col w-full mt-[8svh] h-full'>
                <Form
                    className='w-full h-full'
                    form={form}
                    onFinish={handleFormSubmit}
                >
                    <div className='flex flex-col w-full h-full justify-between items-center'>
                        <div className='w-full grid grid-cols-3 gap-4'>
                            <div
                                onClick={() => setSelectedPointType('pp')}
                                className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                              ${
                                                  selectedPointType === 'pp'
                                                      ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80% border-2 bg-animate-pulse'
                                                      : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                              }`}
                            >
                                <div className='text-2xl text-white'>Platform Points</div>
                                {selectedPointType === 'pp' && (
                                    <div className='shadow-2xl flex flex-col space-y-2'>
                                        <Form.Item
                                            name='name'
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Title'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name='value'
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber
                                                min={1}
                                                placeholder='Amount'
                                                className='w-[100%]'
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <div
                                onClick={() => setSelectedPointType('rp')}
                                className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                              ${
                                                  selectedPointType === 'rp'
                                                      ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80% '
                                                      : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                              }`}
                            >
                                <div className='text-2xl text-white'>Redeemable Points</div>
                                {selectedPointType === 'rp' && (
                                    <div className='shadow-2xl flex flex-col space-y-2'>
                                        <Form.Item
                                            name='name'
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Title'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name='value'
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber
                                                min={1}
                                                placeholder='Amount'
                                                className='w-[100%]'
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                            <div
                                onClick={() => setSelectedPointType('tk')}
                                className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                              ${
                                                  selectedPointType === 'tk'
                                                      ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80% '
                                                      : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                              }`}
                            >
                                <div className='text-2xl text-white'>Tickets</div>
                                {selectedPointType === 'tk' && (
                                    <div className='shadow-2xl flex flex-col space-y-2'>
                                        <Form.Item
                                            name='name'
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                size='large'
                                                placeholder='Title'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name='value'
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber
                                                min={1}
                                                placeholder='Amount'
                                                className='w-[100%]'
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex justify-center items-center w-full mt-8'>
                            <Form.Item noStyle>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    size='large'
                                    loading={loading}
                                >
                                    Assign
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
