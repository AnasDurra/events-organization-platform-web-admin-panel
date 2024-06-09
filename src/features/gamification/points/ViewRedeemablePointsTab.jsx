import React from 'react';
import PointsCard from './PointsCard';
import { useGetPointsQuery, useGetRedeemablePointsQuery } from '../gamificationSlice';

export default function ViewRedeemablePointsTab() {
    const { data: { result: points } = { result: [] } } = useGetRedeemablePointsQuery();

  //  const pointsWithRules = points.filter((point) => point.reward?.rule);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {points.map((point) => (
                <PointsCard
                    key={'gmfc-pp' + point.id}
                    name={point.reward?.name}
                    type={'rp'}
                    amount={point.value}
                    rules={[point.reward.rule]}
                    // onEditClick={() => setIsEditModalOpen(true)}
                />
            ))}
        </div>
    );
}
