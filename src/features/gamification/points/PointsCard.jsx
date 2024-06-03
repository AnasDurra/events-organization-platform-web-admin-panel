import { Card, Divider } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { image } from '../badges/image';
import { BsThreeDots } from 'react-icons/bs';
import { POINT_TYPES } from './types';

export default function PointsCard({ typeId, amount, name, onEditClick }) {
    const getTitle = () => {
        return POINT_TYPES[typeId] || '';
    };

    return (
        <Card
            className='shadow-lg hover:shadow-sm rounded-3xl p-0'
            onClick={() => {}}
            bordered
        >
            <div
                className='flex justify-end items-center text-sm text-gray-400 hover:text-blue-500 hover:cursor-pointer mb-[-2em]'
                onClick={onEditClick}
            >
                <div>edit</div>
            </div>

            <div className='flex justify-center items-center mb-[-2em]'>
                <img
                    src={`/src/assets/game-point.svg`}
                    className='w-[5.5em]'
                ></img>
            </div>

            <div className='flex  justify-between items-center space-x-8'>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex justify-center items-center font-semibold text-md'>Title</div>
                    <div className='flex justify-center items-center text-gray-600 text-md'>{name}</div>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex justify-center items-center font-semibold text-md'> points</div>
                    <div className='flex justify-center items-center text-gray-600 text-md'>{amount}</div>
                </div>
            </div>
            <Divider plain>Rules</Divider>
            <div className='text-pretty text-center text-gray-500'>fake rules </div>

            {/*   <Meta
                description={
                    <div className='flex flex-col'>
                        <Divider />
                        <div className='flex justify-center items-center text-black'>Rules</div>
                    </div>
                }
            /> */}
        </Card>
    );
}
