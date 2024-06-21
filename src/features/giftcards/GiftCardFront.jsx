import React from 'react';
import { TiTicket } from 'react-icons/ti';

export default function GiftCardFront() {
    return (
        <div className='flex  flex-col justify-center items-center h-full  space-y-[0.1in] '>
            <div className='w-[3.375in] h-[2.125in] bg-[#F4A261]  p-[0.05in]  text-[#F4A261] '>
                <div className='bg-[#264653]  w-[3.375in] h-[2.125in] flex justify-center items-center relative'>
                    <div
                        className='absolute right-[0.1in] top-[0.12in] w-full font-semibold flex justify-end items-start    text-[0.19in]'
                        style={{  fontSize: '0.19in' }}
                    >
                        <div>1000 | Tickets</div>
                    </div>
                    <div
                        className=' text-[0.65in]'
                        style={{ fontFamily: 'Bangers' }}
                    >
                        Eventure
                    </div>
                </div>
            </div>
          
            <div
                className='w-[3.375in] h-[2.125in] bg-[#F4A261] p-[0.05in] text-[#F4A261]  '
                style={{ fontFamily: 'Bubblegum Sans' }}
            >
                <div className='bg-[#264653]  w-[3.375in] h-[2.125in]  '>
                    <div className='flex items-center justify-between  px-[0.2in] pt-[0.1in] space-y-[0.1in] '>
                        <div className='flex flex-col space-y-0  '>
                            <div
                                className=' text-[0.23in]'
                                style={{ fontFamily: 'Bangers' }}
                            >
                                Eventure
                            </div>
                            <div>Gift Card</div>
                        </div>

                        <div
                            className='flex flex-col justify-center items-center   '
                            style={{ margin: 0 }}
                        >
                            <div>www.eventure.com</div>
                            <div>support@eventure.com</div>
                        </div>
                    </div>

                    <div className='text-[0.14in] '>
                        <ul>
                            <li>Scratch below to reveal your unique ticket code.</li>
                            <li>This gift card is redeemable for ONE time only on Eventure!</li>
                            <li>Don't share your code with others.</li>
                            <li>Find your next adventure!</li>
                        </ul>
                    </div>
                    <div className='bg-[#E9C46A] text-[0.175in] w-[3.375in] h-[0.3in] flex justify-center items-center text-[#264653]'>
                        AL23B-HJK4D-F879Z-XCV12
                    </div>
                </div>
            </div>
        </div>
    );
}
