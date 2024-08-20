import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Divider } from 'antd';

export default function PointsRewardCard({ value, name, type, onDelete }) {
    return (
        <Card
            key={uuidv4()}
            bordered
            className='relative  bg-white rounded-lg shadow-lg  hover:shadow-xl transition-transform duration-300 ease-out bg-gradient-to-br   '
            style={{ borderColor: type === 'pp' ? '#34D399' : '#FBBF24', borderWidth: '15px 0 15px 0', height: 'auto' }}
            styles={{ body: { padding: '0.2rem' } }}
        >
            <div className='absolute top-2 right-2'>
                <CloseOutlined
                    className='text-[1.5em] text-gray-500 hover:text-red-600 hover:cursor-pointer'
                    onClick={onDelete}
                />
            </div>

            <div className='flex flex-col justify-center items-center mt-0'>
                <div
                    className={`text-lg font-extrabold uppercase tracking-wider bg-gradient-to-r text-transparent bg-clip-text ${
                        type === 'pp'
                            ? 'from-green-400 via-green-500 to-green-600'
                            : type === 'rp'
                            ? 'from-yellow-400 via-yellow-500 to-yellow-600'
                            : ''
                    }`}
                >
                    {name}
                </div>

                <div className='flex justify-center items-center flex-col mt-3'>
                    <img
                        src={
                            type === 'pp'
                                ? `/static/images/game-point.svg`
                                : type === 'rp'
                                ? `/static/images/points-rp.svg`
                                : null
                        }
                        className='w-[6rem] mb-0'
                        alt='reward-icon'
                    />
                    <div
                        className={`text-xl font-extrabold uppercase tracking-wider bg-gradient-to-r text-transparent bg-clip-text ${
                            type === 'pp'
                                ? 'from-green-400 via-green-500 to-green-600'
                                : type === 'rp'
                                ? 'from-yellow-400 via-yellow-500 to-yellow-600'
                                : ''
                        }`}
                    >
                        {value}
                    </div>
                </div>
            </div>

            {/*  <div className='absolute bottom-2 left-2 text-xs text-gray-500 font-semibold'>
                {type === 'pp' ? 'Platform Points' : type === 'rp' ? 'Redeemable Points' : ''}
            </div> */}
        </Card>
    );
}
