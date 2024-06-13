import { CloseOutlined } from '@ant-design/icons';
import { CancelOutlined } from '@mui/icons-material';
import { Card, Divider } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PointsRewardCard({ value, name, type, onDelete }) {
    return (
        <Card
            key={uuidv4()}
            onClick={() => {}}
            bordered
            className='shadow-lg hover:shadow-none '
        >
            <div className='flex justify-end items-center mb-[-2em] '>
                <CloseOutlined
                    className='text-[1.5em] text-gray-500 hover:cursor-pointer'
                    onClick={onDelete}
                />
            </div>
            <div className='mt-[-2em] flex flex-col justify-center items-center'>
                <div
                    className={`text-lg font-bold bg-gradient-to-r  text-transparent bg-clip-text inline-block ${
                        type == 'pp'
                            ? 'from-green-500 via-green-600 to-green-900'
                            : type == 'rp'
                            ? 'from-yellow-500 via-yellow-600 to-yellow-900'
                            : null
                    }`}
                >
                    {name}
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <img
                        src={
                            type == 'pp'
                                ? `/static/images/game-point.svg`
                                : type == 'rp'
                                ? `/static/images/points-rp.svg`
                                : null
                        }
                        className='w-[7em]'
                    ></img>
                    <Divider
                        style={{ margin: 0 }}
                        className='font-mono'
                    >
                        {value}
                    </Divider>
                </div>
            </div>
        </Card>
    );
}
