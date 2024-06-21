import { Button } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { TbGiftCard } from 'react-icons/tb';

export default function CollectionCard({ title, date, numOfCards, onClick }) {
    return (
        <div className='min-h-48 rounded-lg border-y-0 border-x-0 border-t-8  border-primary/25 border-solid border-spacing-2  bg-primary/5 p-4'>
            <div className='flex flex-col justify-between items-center w-full h-full'>
                <div className='flex justify-between items-center w-full'>
                    <div className='text-2xl text-primary '>{title}</div>
                    <div className='text-[0.7rem] text-gray-500'> {dayjs(date).format('YYYY/MM/DD')}</div>
                </div>

                <div className='flex justify-between items-center w-full'>
                    <div className='text-lg text-gray-500  flex justify-center items-center gap-x-1'>
                        <TbGiftCard className='text-2xl' />
                        {numOfCards}
                    </div>
                    <div className='text-[0.7rem] text-gray-500'>
                        {' '}
                        <Button
                            type='primary'
                            onClick={onClick}
                        >
                            {' '}
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
