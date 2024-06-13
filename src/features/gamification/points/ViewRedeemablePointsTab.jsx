import React, { useState } from 'react';
import PointsCard from './PointsCard';
import {
    useGetPointsQuery,
    useGetRedeemablePointsQuery,
    useUpdateRedeemablePointsMutation,
} from '../gamificationSlice';
import EditPointModal from './EditPointModal';
import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Empty, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

export default function ViewRedeemablePointsTab() {
    const navigate = useNavigate();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);

    const { data: { result: points } = { result: [] }, isLoading: isRpsLoading } = useGetRedeemablePointsQuery();
    const [editPoint, { isLoading: isEditLoading }] = useUpdateRedeemablePointsMutation();

    //  const pointsWithRules = points.filter((point) => point?.reward?.rule);

    const handleEditFinish = (fields) => {
        editPoint(fields)
            .unwrap()
            .then((res) => {
                message.success('Platform Point updated');
                setIsEditModalOpen(false);
                setSelectedPoint(null);
            })
            .catch((e) => {
                message.error('Failed to edit platform point');
            });
    };

    return (
        <>
            <div className='grid grid-cols-4 gap-4'>
                {[...points]
                    .sort((a, b) => a.id - b.id)
                    .map((point) => (
                        <PointsCard
                            key={uuidv4()}
                            name={point?.reward?.name}
                            type={'rp'}
                            amount={point?.value}
                            rules={[point?.reward.rule]}
                            onEditClick={() => {
                                console.log('gihidsfid');
                                setSelectedPoint(point);
                                setIsEditModalOpen(true);
                            }}
                        />
                    ))}
            </div>

            {Array.isArray(points) && points.length == 0 && !isRpsLoading && (
                <div className='flex justify-center items-center text-center w-full'>
                    <Empty
                        image={null}
                        description={'No Redeemable Points Rewards Yet..'}
                    >
                        <Divider>
                            <Button
                                onClick={() => navigate('/gamification/rules/new')}
                                type='primary'
                            >
                                Design new rule
                            </Button>
                        </Divider>
                    </Empty>
                </div>
            )}

            {isRpsLoading && (
                <div className=' min-h-[50svh] flex justify-center items-start mt-[4em]'>
                    <LoadingOutlined className='text-[10svh] text-gray-500'></LoadingOutlined>
                </div>
            )}
            <EditPointModal
                pointObj={selectedPoint}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPoint(null);
                }}
                type='rp'
                loading={isEditLoading}
                onFinish={handleEditFinish}
            ></EditPointModal>
        </>
    );
}
