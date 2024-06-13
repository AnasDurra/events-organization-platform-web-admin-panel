import React, { useState } from 'react';
import PointsCard from './PointsCard';
import { useGetPointsQuery, useUpdatePointsMutation } from '../gamificationSlice';
import EditPointModal from './EditPointModal';
import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Empty, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

export default function ViewPlatformPointsTab() {
    const navigate = useNavigate();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);

    const { data: { result: points } = { result: [] }, isLoading: isPointsLoading } = useGetPointsQuery();
    const [editPoint, { isLoading: isEditLoading }] = useUpdatePointsMutation();

    const pointsWithRules = points.filter((point) => point.reward?.rule);

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
                {pointsWithRules
                    .sort((a, b) => a.id - b.id)
                    .map((point) => (
                        <PointsCard
                            key={uuidv4()}
                            name={point.reward?.name}
                            type={'pp'}
                            amount={point.value}
                            rules={[point.reward.rule]}
                            onEditClick={() => {
                                setIsEditModalOpen(true);
                                setSelectedPoint(point);
                            }}
                        />
                    ))}
            </div>

            {Array.isArray(pointsWithRules) && pointsWithRules.length == 0 && !isPointsLoading && (
                <div className='flex justify-center items-center text-center w-full'>
                    <Empty
                        image={null}
                        description={'No Platform Points Rewards Yet..'}
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
            {isPointsLoading && (
                <div className=' min-h-[50svh] flex justify-center items-start mt-[4em]'>
                    <LoadingOutlined className='text-[10svh] text-gray-500 '></LoadingOutlined>
                </div>
            )}

            <EditPointModal
                type='pp'
                pointObj={selectedPoint}
                isOpen={isEditModalOpen}
                loading={isEditLoading}
                onFinish={handleEditFinish}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPoint(null);
                }}
            ></EditPointModal>
        </>
    );
}
