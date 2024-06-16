import React from 'react';
import { TiTicket } from 'react-icons/ti';

export default function GiftcardBack({ ref }) {
    return (
        <div
            ref={ref}
            className='flex justify-center items-center w-full h-full text-white'
            style={{ fontFamily: 'Bubblegum Sans' }}
        >
            <div className='w-[30svw] h-[30svh] bg-[#9f471c] rounded-md p-1  '>
                <div className='bg-[#FF7F3E]  w-full h-full  rounded-md '>
                    <div className='flex items-center justify-between  px-6 pt-1 space-y-4'>
                        <div className='flex flex-col space-y-0  '>
                            <div
                                className=' text-lg'
                                style={{ fontFamily: 'Bangers' }}
                            >
                                Eventure
                            </div>
                            <div>Gift Card</div>
                        </div>

                        <div className='flex flex-col justify-center items-center text-sm'>
                            <div>www.eventure.com</div>
                            <div>support@eventure.com</div>
                        </div>
                    </div>

                    <div className=''>
                        <ul>
                            <li>Scratch below to reveal your unique ticket code.</li>
                            <li>This gift card is redeemable for ONE time only on Eventure!</li>
                            <li>Don't share your code with others.</li>
                            <li>Find your next adventure!</li>
                        </ul>
                    </div>
                    <div className='bg-[#FFF6E9] w-[30svw] h-[5svh] flex justify-center items-center text-[#FF7F3E]'>
                        AL23B-HJK4D-F879Z-XCV12
                    </div>
                </div>
            </div>
        </div>
    );
}
