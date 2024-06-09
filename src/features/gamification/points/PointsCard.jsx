import { Card, Divider } from 'antd';
import React from 'react';

export default function PointsCard({ type, amount, name, rules, onEditClick }) {
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

            <div className='flex justify-center items-center mb-[-1.2em]'>
                <img
                    src={`/src/assets/points-rp.svg`}
                    className='w-[5.5em]'
                    alt='Points'
                ></img>
            </div>

            <div className='flex justify-between items-center space-x-8'>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex justify-center items-center font-semibold text-md'>Title</div>
                    <div className='flex justify-center items-center text-gray-600 text-md'>{name}</div>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='flex justify-center items-center font-semibold text-md'>points</div>
                    <div className='flex justify-center items-center text-gray-600 text-md'>{amount}</div>
                </div>
            </div>

            <Divider plain>Rules</Divider>
            <div className='text-pretty text-left text-gray-500'>
                {rules.map((rule, index) => (
                    <div key={index}>
                        {rule.conditions.map((condition, condIndex) => (
                            <>
                                <span key={condIndex}>
                                    {`${condIndex + 1}. ${condition.definedData.name} ${condition.operator.name} ${
                                        condition.value
                                    }`}
                                </span>
                                <br></br>
                            </>
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    );
}
