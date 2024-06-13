import { ConfigProvider, message } from 'antd';
import React, { useState } from 'react';
import BadgeCard from './BadgeCard';
import DesignBadgeDrawer from './DesignBadgeDrawer';

import { useAddBadgeMutation, useGetBadgesQuery, useUpdateBadgeMutation } from '../gamificationSlice';
import EditBadgeModal from './EditBadgeModal';
export default function ViewAllBadges() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditBadgeModalOpen, setIsEditBadgeModalOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState(null);

    const { data: { result: badges } = { result: [] }, isLoading: isBadgesLoading } = useGetBadgesQuery();
    const [addBadge, { isLoading: isAddBadgeLoading }] = useAddBadgeMutation({ fixedCacheKey: 'ViewAllBadges' });
    const [updateBadge, { isLoading: isUpdateBadgeLoading }] = useUpdateBadgeMutation();

    const handleUpdateBadge = (fields) => {
        console.log("upd:",fields)
        updateBadge(fields)
            .unwrap()
            .then((res) => {
                message.success('Badge updated');
                setIsEditBadgeModalOpen(false);
                setSelectedBadge(null);
            })
            .catch((e) => {
                message.error('failed to update badge');
            });
    };
    const handleFinishAddingBadge = (fields) => {
        console.log(fields);

        addBadge({
            name: fields.title,
            shape: JSON.stringify({
                svg: fields.svg,
            }),
            anonymous: false,
            visibility: true,
        })
            .unwrap()
            .then((res) => {
                setIsDrawerOpen(false);
            })
            .catch((e) => {
                console.error(e);
            });
    };

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
            {console.log(badges)}
            <div className='relative'>
                <DesignBadgeDrawer
                    isDrawerOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onFinish={handleFinishAddingBadge}
                />
                <div className='grid grid-cols-12'>
                    <div className='col-start-2  col-span-10 flex flex-col w-full space-y-10'>
                        {/*   <div className='flex space-x-4'>
                            <Button
                                type='primary'
                                onClick={() => {
                                    setIsDrawerOpen(true);
                                }}
                            >
                                Design New Badge
                            </Button>

                            {isBadgesLoading && (
                                <div className=' w-full flex justify-center items-center space-x-2 text-gray-600'>
                                    <AiOutlineLoading3Quarters className='animate-spin' />
                                    <div>loading</div>
                                </div>
                            )}
                        </div> */}
                        <div className='grid grid-cols-4 gap-4'>
                            {badges.map((badge) => (
                                <BadgeCard
                                    key={badge.id}
                                    badgeObj={badge}
                                    onEdit={() => {
                                        setSelectedBadge(badge);
                                        setIsEditBadgeModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <EditBadgeModal
                badge={selectedBadge}
                isOpen={isEditBadgeModalOpen}
                isLoading={isUpdateBadgeLoading}
                onCancel={() => {
                    setIsEditBadgeModalOpen(false);
                    setSelectedBadge(null);
                }}
                onFinish={handleUpdateBadge}
            ></EditBadgeModal>
        </ConfigProvider>
    );
}
