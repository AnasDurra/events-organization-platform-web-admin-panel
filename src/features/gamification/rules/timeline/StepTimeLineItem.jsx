import { CancelOutlined } from '@mui/icons-material';
import { TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { Button, Space } from 'antd';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

function createConditionSentence(step) {
      const { value, trigger, condition } = step;
      return `${value} ${value === 1 ? 'time' : 'times'}`;
  }

export default function StepTimeLineItem({ step, onDelete, onEdit }) {
    return (
        <TimelineItem key={uuidv4()}>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align='left'
            >
                <div className='flex justify-center items-center w-full'>{step.trigger?.name}</div>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ height: '2em' }} />
                <Space.Compact size='medium'>
                    <Button
                        type='primary'
                        icon={<CancelOutlined className='hover:cursor-pointer' />}
                        onClick={onDelete}
                    />
                    <Button
                        type='primary'
                        icon={<MdEdit className='text-xl' />}
                        onClick={onEdit}
                    />
                </Space.Compact>
                <TimelineConnector sx={{ height: '2em' }} />
            </TimelineSeparator>
            <TimelineContent
                sx={{ m: 'auto 0' }}
                align='right'
            >
                <div className='flex justify-center items-center w-full'>{createConditionSentence(step)}</div>
            </TimelineContent>
        </TimelineItem>
    );
}
