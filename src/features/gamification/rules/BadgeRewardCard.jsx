import { CancelOutlined, CloseOutlined } from '@mui/icons-material';
import { Card, Divider } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { GoShieldSlash } from 'react-icons/go';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
const niceColors = ['#fbaf51', '#ce355f', '#474f7f', '#e7a99d', '#a986af'];

export default function BadgeRewardCard({ onDelete, badge }) {
    return (
        <Card
            className='shadow-lg hover:shadow-sm relative '
            styles={{ body: { padding: '0.2rem' } }}
            //title={<div className='text-center text-white'>{badge?.reward?.name}</div>}
            style={{ borderColor: '#ce355f', borderWidth: '15px 0 15px 0', height: 'auto' }}
            onClick={() => {}}
            bordered
        >
            <div className='absolute top-2 right-2'>
                <CloseOutlined
                    className='text-[1.5em] text-gray-500 hover:text-red-600 hover:cursor-pointer'
                    onClick={onDelete}
                />
            </div>
            <div className='flex justify-center items-center'>
                <div className='text-lg font-extrabold uppercase tracking-wider  bg-gradient-to-r from-[#fbaf51] via-[#ce355f] to-[#a986af] inline-block text-transparent bg-clip-text'>
                    {badge?.title}
                </div>
            </div>
            <div className='flex justify-center items-center '>
                {console.log(badge)}
                {badge?.shape?.svg && (
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(badge.shape.svg)}`}
                        className='w-[10.5em]'
                    ></img>
                )}
            </div>
            <div className='flex justify-end items-end space-x-1 relative right-0 bottom-0  '>
                {badge?.anonymous && <AiOutlineEyeInvisible className='text-[1.8rem] text-red-400' />}

                {badge?.anonymous != true && <AiOutlineEye className='text-[1.8rem] text-green-400' />}

                {badge?.visibility != true && <GoShieldSlash className='text-[1.8rem] text-red-400' />}
                {badge?.visibility == true && <IoShieldCheckmarkOutline className='text-[1.8rem] text-green-400' />}
            </div>
        </Card>
    );
}
