import { Button, ConfigProvider, Tabs } from 'antd';
import React, { useState } from 'react';
import EditPointModal from './EditPointModal';
import PointsCard from './PointsCard';
import ViewPlatformPointsTab from './ViewPlatformPointsTab';
import ViewRedeemablePointsTab from './ViewRedeemablePointsTab';

export default function ViewAllPoints() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const items = [
        /*  {
            key: '11',
            label: <Button type='primary'> Create</Button>,

            disabled: true,
        }, */
        {
            key: '1',
            label: (
                <div className='flex justify-center items-center gap-x-1'>
                    <img
                        src={'/static/images/game-point.svg'}
                        className='w-[2.5em] mt-[0.3em]'
                    ></img>{' '}
                    Platform points
                </div>
            ),
            children: <ViewPlatformPointsTab></ViewPlatformPointsTab>,
        },
        {
            key: '2',
            label: (
                <div className='flex justify-center items-center gap-x-2'>
                    <img
                        src={'/static/images/points-xp.svg'}
                        className='w-[2.2em] mb-[0.1em]'
                    ></img>{' '}
                    Experience points
                </div>
            ),
            children: 'Experience points',
        },
        {
            key: '3',
            label: (
                <div className='flex justify-center items-center gap-x-2'>
                    <img
                        src={'/static/images/points-rp.svg'}
                        className='w-[2.6em] mt-[0.1em]'
                    ></img>{' '}
                    Redeemable points
                </div>
            ),
            children: <ViewRedeemablePointsTab></ViewRedeemablePointsTab>,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        headerBg: '#2B3467',
                    },
                },
            }}
        >
            <div className='grid grid-cols-12'>
                <div className='col-start-2  col-span-10 flex flex-col w-full space-y-10'>
                    <Tabs
                        defaultActiveKey='1'
                        items={items}
                        onChange={() => {}}
                    />
                </div>
            </div>
            <EditPointModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onFinish={(fields) => {
                    console.log(fields);
                    setIsEditModalOpen(false);
                }}
                pointObj={{ value: 150, name: 'abdo' }}
            />
        </ConfigProvider>
    );
}
