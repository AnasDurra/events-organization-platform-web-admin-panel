import React from 'react';
import { TiTicket } from 'react-icons/ti';

export default function GiftCardFront() {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <div className='w-[600px] h-[400px] bg-[#9f471c]  rounded-md p-1  text-white'>
                <div className='bg-[#FF7F3E]  w-full h-full flex justify-center items-center rounded-md relative'>
                    <div
                        className='absolute right-4 top-4 w-full font-semibold flex justify-end items-start space-x-[0.1em]   text-[1.1em]'
                        style={{ fontFamily: 'Press Start 2P' }}
                    >
                        <div>1000 | Tickets</div>
                    </div>
                    <div
                        className=' text-[4em]'
                        style={{ fontFamily: 'Bangers' }}
                    >
                        Eventure
                    </div>
                </div>
            </div>
        </div>
    );
}
