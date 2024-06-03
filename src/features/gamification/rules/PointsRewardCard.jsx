import { CancelOutlined } from '@mui/icons-material';
import { Card } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PointsRewardCard({ point ,onDelete}) {
    return (
        <Card
            key={uuidv4()}
            title={<div className='text-center text-white '>{'Platform points'}</div>}
            onClick={() => {}}
            bordered
            className='shadow-lg hover:shadow-none '
            extra={
                <div
                    className='flex justify-center items-center  hover:cursor-pointer '
                    onClick={onDelete}
                >
                    <CancelOutlined className='text-white ' />
                </div>
            }
        >
            <div className='flex justify-center items-center flex-col'>
                <img
                    src={`/src/assets/game-point.svg`}
                    className='w-[10em]'
                ></img>
                <div className='text-lg text-blue-400'>{point}</div>
            </div>
        </Card>
    );
}
