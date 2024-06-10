import { Card, Divider } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { image } from './image';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { GiShield, GiShieldDisabled } from 'react-icons/gi';
import { AiOutlineEye } from 'react-icons/ai';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { GoShieldSlash } from 'react-icons/go';

export default function BadgeCard({ badgeObj }) {
    return (
        <Card
            className='shadow-lg hover:shadow-sm'
            title={<div className='text-center text-white'>{badgeObj?.reward?.name}</div>}
            extra={<BsThreeDots className='hover:cursor-pointer hover:scale-125 text-white' />}
            onClick={() => {}}
            bordered
        >
            <div className='flex justify-center items-center mt-[-2em]'>
                {badgeObj.shape && (
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(badgeObj.shape.svg)}`}
                        className='w-[9.5em]'
                    ></img>
                )}
            </div>
            <div className='flex justify-end items-end space-x-1 text-primary my-2 mt-[-1.2em] mr-[-0.5em]  '>
                {badgeObj?.anonymous != true && <AiOutlineEyeInvisible className='text-[1.4em] text-red-400' />}

                {badgeObj?.anonymous && <AiOutlineEyeInvisible className='text-[1.4em] text-green-400' />}

                {badgeObj?.visibility != true && <GoShieldSlash className='text-[1.4em] text-red-400' />}
                {badgeObj?.visibility == true && <IoShieldCheckmarkOutline className='text-[1.4em] text-green-400' />}
            </div>
            <Meta
                description={
                    <div className={`flex flex-col ${'mt-[-0.5em]'}`}>
                        <Divider plain>Rules</Divider>
                        <div className='text-pretty text-left text-gray-500'>
                            {badgeObj?.reward?.rule?.conditions ? (
                                <div>
                                    {badgeObj?.reward?.rule?.conditions.map((condition, condIndex) => (
                                        <>
                                            <span key={condIndex}>
                                                {`${condIndex + 1}. ${condition.definedData.name} ${
                                                    condition.operator.name
                                                } ${condition.value}`}
                                            </span>
                                            <br></br>
                                        </>
                                    ))}
                                </div>
                            ) : (
                                'No rules'
                            )}
                        </div>
                        {/* <Row justify={'center'}>
                        <Col span={8}>Price:</Col>
                        <Col
                            span={8}
                            className='text-black text-center'
                        >
                            {'price'}$
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Col span={8}>Tickets:</Col>
                        <Col
                            span={8}
                            className='text-black text-center'
                        >
                            {'tickets'}
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Col span={8}>Status:</Col>
                        <Col
                            span={8}
                            className='text-black text-center'
                        >
                            {'status'}
                        </Col>
                    </Row> */}
                    </div>
                }
            />
        </Card>
    );
}
