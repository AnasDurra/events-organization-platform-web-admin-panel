import React from 'react';
import PointsCard from './PointsCard';
import { useGetPointsQuery } from '../gamificationSlice';

export default function ViewPlatformPointsTab() {
    const { data: { result: points } = { result: [] } } = useGetPointsQuery();

    const pointsWithRules = points.filter(point => point.reward?.rule);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {pointsWithRules.map((point) => (
                <PointsCard
                    key={'gmfc-pp' + point.id}
                    name={point.reward?.name}
                    type={'pp'}
                    amount={point.value}
                    rules={[point.reward.rule]}
                    // onEditClick={() => setIsEditModalOpen(true)}
                />
            ))}
        </div>
    );
}
