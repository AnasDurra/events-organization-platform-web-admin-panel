import { Modal, Segmented, message } from 'antd';
import React, { useState } from 'react';
import { SlBadge } from 'react-icons/sl';
import { TbStars } from 'react-icons/tb';
import DesignBadge from '../badges/design/DesignBadge';
import { useAddBadgeMutation, useAddPointsMutation, useAddRedeemablePointsMutation } from '../gamificationSlice';
import PointsTab from './AssignRewardModalPointsTab';

export default function AssignRewardModal({ isOpen, onClose, onFinish }) {
    const [tabValue, setTabValue] = useState('badge');

    const [addBadge, { isLoading: isAddBadgeLoading }] = useAddBadgeMutation({ fixedCacheKey: 'ViewAllBadges' });
    const [addPoints, { isLoading: isAddPointsLoading }] = useAddPointsMutation();
    const [addRedeemablePoints, { isLoading: isRPloading }] = useAddRedeemablePointsMutation();

    const handleOnBadgeFinish = (fields) => {
        addBadge({
            name: fields?.title,
            shape: JSON.stringify({
                svg: fields?.svg,
            }),
            anonymous: fields?.isAnonymous,
            visibility: fields?.isActive,
        })
            .unwrap()
            .then((res) => {
                onFinish({ type: 'badge', ...res?.result, title: fields.title });
            })
            .catch((e) => {
                message.error('Creating new badge failed');
                console.error(e);
            });
    };
    const handleOnPointsFinish = (fields) => {
        console.log('roo: ', fields);
        if (fields.type == 'pp') {
            addPoints({
                name: fields?.name,
                value: fields?.value,
            })
                .unwrap()
                .then((res) => {
                    onFinish({ ...res?.result, type: 'pp', name: fields?.name, value: fields?.value });
                })
                .catch((e) => {
                    message.error('Creating new reward failed');
                    console.error(e);
                });
        } else if (fields?.type == 'rp') {
            addRedeemablePoints({
                name: fields?.name,
                value: fields?.value,
            })
                .unwrap()
                .then((res) => {
                    onFinish({ ...res?.result, type: 'rp', name: fields?.name, value: fields?.value });
                })
                .catch((e) => {
                    message.error('Creating new reward failed');
                    console.error(e);
                });
        }
    };

    return (
        <Modal
            title={
                <div className='flex justify-center items-center'>
                    <Segmented
                        size='small'
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
                    <div className='p-8'>
                        <DesignBadge onFinish={handleOnBadgeFinish}></DesignBadge>
                    </div>
                )}

                {tabValue == 'points' && <PointsTab onFinish={handleOnPointsFinish} />}
            </div>
        </Modal>
    );
}
