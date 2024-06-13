import React, { useState } from 'react';
import PointsCard from './PointsCard';
import {
    useGetPointsQuery,
    useGetRedeemablePointsQuery,
    useUpdateRedeemablePointsMutation,
} from '../gamificationSlice';
import EditPointModal from './EditPointModal';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';

export default function ViewRedeemablePointsTab() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);

    const { data: { result: points } = { result: [] } } = useGetRedeemablePointsQuery();
    const [editPoint, { isLoading: isEditLoading }] = useUpdateRedeemablePointsMutation();

    //  const pointsWithRules = points.filter((point) => point.reward?.rule);

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
                {points.map((point) => (
                    <PointsCard
                        key={uuidv4()}
                        name={point.reward?.name}
                        type={'rp'}
                        amount={point.value}
                        rules={[point.reward.rule]}
                        onEditClick={() => {
                            console.log('gihidsfid');
                            setSelectedPoint(point);
                            setIsEditModalOpen(true);
                        }}
                    />
                ))}
            </div>

            <EditPointModal
                pointObj={selectedPoint}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPoint(null);
                }}
                type='rp'
            ></EditPointModal>
        </>
    );
}
