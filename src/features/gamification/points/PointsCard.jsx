import { Card, Divider } from 'antd';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PointsCard({ type, amount, name, rules, onEditClick }) {
    return (
        <Card
            className='hover:shadow-lg shadow-sm rounded-3xl p-0'
            onClick={() => {}}
            bordered
        >
            <div
                className='flex justify-end items-center text-sm text-gray-400 hover:text-blue-500 hover:cursor-pointer mb-[-2em]'
                onClick={onEditClick}
            >
                <div>edit</div>
            </div>

            <div className='flex justify-center items-center mb-[-1.2em]'>
                <img
                    src={`/static/images/${type == 'rp' ? 'points-rp.svg' : 'game-point.svg'}`}
                    className='w-[5.5em]'
                    alt='Points'
                ></img>
            </div>

            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div className='flex justify-center items-center w-full text-center '>
                    <div className='w-[50%] font-semibold text-md'>Title</div>
                    <div className='w-[50%] font-semibold text-md'>points</div>
                </div>
                <div className='flex justify-center items-center w-full text-center '>
                    <div className='w-[50%] text-gray-600 text-md'>{name}</div>
                    <div className='w-[50%] text-gray-600 text-md'>{amount}</div>
                </div>
            </div>

            <Divider plain>Rules</Divider>
            <div className='text-pretty text-left text-gray-500'>
                {rules.map((rule, index) => (
                    <div key={uuidv4()}>
                        {rule?.conditions.map((condition, condIndex) => (
                            <div key={uuidv4() + 'span'}>
                                <span>
                                    {`${condIndex + 1}. ${condition?.definedData?.name} ${condition?.operator?.name} ${
                                        condition?.value
                                    }`}
                                </span>
                                <br></br>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    );
}
