import { UserOutlined } from '@ant-design/icons';
import { BadgeOutlined, CloseOutlined } from '@mui/icons-material';
import { Avatar, Button, InputNumber, List, Modal, Segmented, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { SlBadge } from 'react-icons/sl';
import DesignBadge from '../badges/design/DesignBadge';
import { TbStars } from 'react-icons/tb';

const items = [
    {
        key: '1',
        label: 'Tab 1',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Tab 2',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

export default function AssignRewardModal({ isOpen, onClose }) {
    const [tabValue, setTabValue] = useState('badge');
    const [selectedPointType, setSelectedPointType] = useState('pp');

    return (
        <Modal
            title={
                <div className='flex justify-center items-center'>
                    <Segmented
                        defaultValue='badge'
                        value={tabValue}
                        onChange={setTabValue}
                        options={[
                            {
                                label: (
                                    <div className='py-2 mx-8'>
                                        <SlBadge className='text-2xl'></SlBadge>
                                        <div>Badge</div>
                                    </div>
                                ),
                                value: 'badge',
                            },
                            {
                                label: (
                                    <div className='py-2 mx-8'>
                                        <TbStars className='text-2xl'></TbStars>
                                        <div>Points</div>
                                    </div>
                                ),
                                value: 'points',
                            },
                        ]}
                    />
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            width={'70svw'}
        >
            <div className='min-h-[60svh]'>
                {tabValue == 'badge' && (
                    <div className='p-4'>
                        <DesignBadge></DesignBadge>
                    </div>
                )}

                {tabValue == 'points' && (
                    <div className='p-4'>
                        <div className='flex justify-center items-center space-y-8 flex-col w-full mt-[8svh]'>
                            <div className=' w-full grid grid-cols-3 gap-4 '>
                                <div
                                    onClick={() => setSelectedPointType('pp')}
                                    className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                  ${
                                      selectedPointType == 'pp'
                                          ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80% border-2  bg-animate-pulse'
                                          : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                  }`}
                                >
                                    <div className='text-2xl text-white '> Platform Points</div>
                                    <Space.Compact
                                        align='center'
                                        split
                                        className='shadow-2xl'
                                    >
                                        <InputNumber
                                            min={1}
                                            placeholder='Amount'
                                            className=' w-[80%]'
                                            size='large'
                                        ></InputNumber>
                                        <Button
                                            type='primary'
                                            size='large'
                                        >
                                            {' '}
                                            Confirm
                                        </Button>
                                    </Space.Compact>
                                </div>
                                <div
                                    onClick={() => setSelectedPointType('rp')}
                                    className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                  ${
                                      selectedPointType == 'rp'
                                          ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80%  animate-pulse '
                                          : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                  }`}
                                >
                                    <div className='text-2xl text-white '> Redeemable Points</div>
                                </div>
                                <div
                                    onClick={() => setSelectedPointType('tk')}
                                    className={`min-h-[30svh] bg-gray-400 rounded-3xl flex flex-col items-center justify-evenly hover:cursor-pointer
                                  ${
                                      selectedPointType == 'tk'
                                          ? 'bg-gradient-to-br from-[#fbaf51] from-20% via-[#ce355f] via-40% to-[#474f7f] to-80%  animate-pulse '
                                          : 'bg-gradient-to-br from-gray-200 from-20% via-gray-400 via-40% to-gray-500 to-80%'
                                  }`}
                                >
                                    <div className='text-2xl text-white '> Tickets</div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center  w-full'></div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
