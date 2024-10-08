import { TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import React from 'react';

export default function HeaderTimeLineItem() {
    return (
        <TimelineItem
            className='bg-[#2B3467] rounded-t-3xl h-[3svh]'
            sx={{ minHeight: '7svh' }}
        >
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align='right'
            >
                <div className='text-lg text-center w-full h-full  text-white font-bold'>Triggers</div>
            </TimelineOppositeContent>
            <TimelineContent
                sx={{ m: 'auto 0' }}
                align='left'
            >
                <div className='text-lg text-center w-full h-full  text-white font-bold'>Conditions</div>
            </TimelineContent>
        </TimelineItem>
    );
}
