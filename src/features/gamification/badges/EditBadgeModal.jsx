import { EditOutlined } from '@ant-design/icons';
import { DrawOutlined } from '@mui/icons-material';
import { Checkbox, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import DesignBadge from './design/DesignBadge';
import DesignBadgeDrawer from './DesignBadgeDrawer';

export default function EditBadgeModal({ isOpen, onFinish, onCancel, badge, isLoading }) {
    const [form] = Form.useForm();
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isDesignDrawerOpen, setIsDesignDrawerOpen] = useState(false);
    const [newSvg, setNewSvg] = useState(null);

    const handleFormChange = () => {
        if (!isFormDirty) {
            setIsFormDirty(true);
        }
    };
    const handleFormFinish = (fields) => {
        onFinish({
            ...fields,
            badge_id: badge?.id,
            shape: newSvg ? JSON.stringify({ svg: newSvg }) : undefined,
        });
    };

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({
                anonymous: badge?.anonymous,
                visibility: badge?.visibility,
                name: badge?.reward?.name,
            });
            setIsFormDirty(false);
            setNewSvg(null);
        }
    }, [badge, form, isOpen]);
    return (
        <>
            <Modal
                title={'Editing Badge'}
                open={isOpen}
                onOk={() => {
                    form.submit();
                }}
                onCancel={onCancel}
                classNames={{ body: 'p-4 mt-12', wrapper: '' }}
                okButtonProps={{ loading: isLoading, disabled: !isFormDirty && !newSvg }}
                okText='save'
                closable
            >
                {console.log(badge)}
                <div className=' p-2 m-4'>
                    <div className='flex justify-between items-center '>
                        <div className='w-[40%] mt-[-4em] relative'>
                            <DrawOutlined
                                onClick={() => setIsDesignDrawerOpen(true)}
                                className='absolute  bottom-1  text-black hover:cursor-pointer hover:text-primary'
                            >
                                {' '}
                            </DrawOutlined>
                            {newSvg ? (
                                <img
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(newSvg)}`}
                                    className='w-[100%]'
                                ></img>
                            ) : (
                                <img
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(badge?.shape?.svg)}`}
                                    className='w-[100%]'
                                />
                            )}
                        </div>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={handleFormFinish}
                            className='w-[50%]'
                            onValuesChange={handleFormChange}
                        >
                            <Form.Item
                                name={'name'}
                                label={'Badge Title'}
                            >
                                <Input></Input>
                            </Form.Item>
                            <div className='flex items-center'>
                                <Form.Item
                                    name={'anonymous'}
                                    label={'Anonymous'}
                                    className='w-[50%]'
                                    valuePropName='checked'
                                >
                                    <Checkbox />
                                </Form.Item>
                                <Form.Item
                                    name={'visibility'}
                                    label={'Active'}
                                    className='w-[50%]'
                                    valuePropName='checked'
                                >
                                    <Checkbox />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='max-w-[60svw] z-50'></div>
            </Modal>
            <DesignBadgeDrawer
                onClose={() => setIsDesignDrawerOpen(false)}
                isDrawerOpen={isDesignDrawerOpen}
                showSettings={false}
                onFinish={(fields) => {
                    setNewSvg(fields.svg);
                    setIsDesignDrawerOpen(false);
                }}
            ></DesignBadgeDrawer>
        </>
    );
}
