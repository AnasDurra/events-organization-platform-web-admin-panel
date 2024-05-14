import { Button, DatePicker, Form, Input, Modal, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useGetOrganizationsQuery } from '../org profiles/orgsSlice';
import Title from 'antd/es/typography/Title';
import { useGetFutureUnfeaturedEventsQuery } from './featuredSlice';

export default function NewFeaturedEventModal({ isOpen, onFinish, onCancel }) {
    const [form]=Form.useForm();
    const { data: { result: orgs } = { result: [] }, isLoading: isOrgsLoading } = useGetOrganizationsQuery();
    const [selectedOrgId, setSelectedOrgId] = useState(null);

    const {data:featuredEvents}= useGetFutureUnfeaturedEventsQuery(selectedOrgId);
    const handleFormValuesChange = (changedValues) => {
        const formFieldName = Object.keys(changedValues)[0];

        if (formFieldName === 'organization') {
            setSelectedOrgId(changedValues[formFieldName]);
            form.setFieldsValue({ event: undefined }); //reset product selection
        }
    };

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
                name='new featured'
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete='off'
                labelAlign='left'
                onValuesChange={handleFormValuesChange}
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
                    <Select
                        options={orgs.map((org) => ({
                            value: org.id,
                            label: org.name,
                            bio: org.bio,
                        }))}
                        optionRender={(option) => (
                            <div className='flex flex-col items-start justify-center'>
                                <Typography.Text>{option.data.label}</Typography.Text>
                                <Typography.Text type='secondary'>{option.data.bio}</Typography.Text>
                            </div>
                        )}
                        loading={isOrgsLoading}
                    />
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
                    name='type_id'
                    rules={[
                        {
                            required: true,
                            message: 'Please select an event!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value={1}>Home page carousel</Select.Option>
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
