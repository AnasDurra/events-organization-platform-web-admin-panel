import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const GiftCardFront = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        className='grid grid-cols-2  p-4 '
        style={{ width: '8.5in', height: '11in' }}
    >
        {Array.from({ length: 8 }).map((_, index) => (
            <div
                key={index}
                className='w-[3.375in] h-[2.125in] bg-[#9f471c] rounded-md p-1 text-white'
            >
                <div className='bg-[#FF7F3E] w-full h-full flex justify-center items-center rounded-md relative'>
                    <div
                        className='absolute right-4 top-4 w-full font-semibold flex justify-end items-start space-x-[0.1em] text-[1.1em]'
                        style={{ fontFamily: 'Press Start 2P' }}
                    >
                        <div>1000 | Tickets</div>
                    </div>
                    <div
                        className='text-[4em]'
                        style={{ fontFamily: 'Bangers' }}
                    >
                        Eventure
                    </div>
                </div>
            </div>
        ))}
    </div>
));

const GiftCardBack = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        className='grid grid-cols-2 gap-2 p-4'
        style={{ width: '8.5in', height: '11in' }}
    >
        {Array.from({ length: 8 }).map((_, index) => (
            <div className='w-[3.375in] h-[2.125in] bg-[#9f471c] rounded-md p-1 text-white'>
                <div className='bg-[#FF7F3E]  w-full h-full  rounded-md '>
                    <div className='flex items-center justify-between  px-6 pt-1 space-y-2'>
                        <div className='flex flex-col justify-center items-center space-y-0  '>
                            <div
                                className=' text-lg'
                                style={{ fontFamily: 'Bangers' }}
                            >
                                Eventure
                            </div>
                            <div>Gift Card</div>
                        </div>

                        <div className='flex flex-col justify-start items-center text-[0.8em]'>
                            <div>www.eventure.com</div>
                            <div>support@eventure.com</div>
                        </div>
                    </div>

                    <div className='text-[0.85em]'>
                        <ul>
                            <li>Scratch below to reveal your unique ticket code.</li>
                            <li>This gift card is redeemable for ONE time only on Eventure!</li>
                            <li>Don't share your code with others.</li>
                            <li>Find your next adventure!</li>
                        </ul>
                    </div>
                    <div className='bg-[#FFF6E9] w-[3.375in] h-[0.3in] flex justify-center items-center text-[#FF7F3E]'>
                        AL23B-HJK4D-F879Z-XCV12
                    </div>
                </div>
            </div>
        ))}
    </div>
));

const GiftCardPrint = () => {
    const frontRef = useRef();
    const backRef = useRef();

    const handlePrintFront = useReactToPrint({
        content: () => frontRef.current,
        documentTitle: 'GiftCardFront',
    });

    const handlePrintBack = useReactToPrint({
        content: () => backRef.current,
        documentTitle: 'GiftCardFront',
    });

    return (
        <div className='flex flex-col items-center space-y-4'>
            <button
                onClick={handlePrintFront}
                className='btn btn-primary'
            >
                Print Front Gift Cards
            </button>
            <div ref={frontRef}>
                <GiftCardFront />
            </div>

            <button
                onClick={handlePrintBack}
                className='btn btn-primary'
            >
                Print back Gift Cards
            </button>
            <div ref={backRef}>
                <GiftCardBack />
            </div>
        </div>
    );
};

export default GiftCardPrint;
