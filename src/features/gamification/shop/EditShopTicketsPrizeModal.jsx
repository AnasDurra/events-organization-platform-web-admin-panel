import { Form, Input, InputNumber, Modal, Tooltip } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { TiTicket } from 'react-icons/ti';

export default function EditShopTicketsPrizeModal({ isOpen, handleOk, handleCancel, isLoading, record }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({ ...record, tickets_value: record?.prize_details?.tickets_value });
        }
    }, [isOpen]);
    return (
        <Modal
            title='Editing tickets prize'
            okText={'Edit'}
            open={isOpen}
            onOk={() => form.submit()}
            confirmLoading={isLoading}
            onCancel={handleCancel}
            style={{ top: 20 }}
        >
            <div className='flex justify-between items-center p-4 space-x-8'>
                <div className='w-full'>
                    <Form
                        form={form}
                        layout='vertical'
                        wrapperCol={{ span: 24 }}
                        labelCol={{ span: 24 }}
                        labelAlign='left'
                        onFinish={(fields) => {
                            handleOk(fields);
                        }}
                        name='edit-ticket-prize'
                        variant='filled'
                    >
                        <TiTicket
                            className='animate-bounce text-[10em] w-full text-primary '
                            style={{ animation: 'bounce 0s infinite' }}
                        ></TiTicket>
                        <Form.Item
                            name={'name'}
                            label={'name'}
                            rules={[{ required: true }]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            name={'rank'}
                            label={
                                <div className='flex justify-start items-center space-x-2'>
                                    <div>Rank in shop</div>
                                    <Tooltip title='products with lower rank will show at shop first page.'>
                                        <AiOutlineQuestionCircle></AiOutlineQuestionCircle>
                                    </Tooltip>
                                </div>
                            }
                            rules={[{ required: true }]}
                        >
                            <InputNumber
                                min={1}
                                className='w-full'
                            ></InputNumber>
                        </Form.Item>
                        <Form.Item
                            name={'rp_value'}
                            label={'RP price'}
                            rules={[{ required: true }]}
                        >
                            <InputNumber
                                min={1}
                                className='w-full'
                            ></InputNumber>
                        </Form.Item>
                        <Form.Item
                            name={'tickets_value'}
                            label={'Tickets Redeemed'}
                            rules={[{ required: true }]}
                        >
                            <InputNumber
                                min={1}
                                className='w-full'
                            ></InputNumber>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
