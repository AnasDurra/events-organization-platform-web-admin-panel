import { ClockCircleOutlined } from '@ant-design/icons';
import { CancelOutlined, CheckOutlined } from '@mui/icons-material';
import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab';
import { Button, InputNumber, Select, Space } from 'antd';
import React, { useState } from 'react';

export default function AddingNewStepTimeLineItem({ availableTriggers, definedData, onCancel, onAdd }) {
    const [currentTrigger, setCurrentTrigger] = useState(null);
    const [currentCondition, setCurrentCondition] = useState(null);
    const [currentConditionValue, setCurrenConditionValue] = useState(0);
    const [isTimerClicked, setIsTimerClicked] = useState(false);

    const canAddCondition = currentTrigger !== null;

    const handleSelectCondition = (condition_id) => {
        setCurrentCondition(currentTrigger?.operators?.find((op) => op.id == condition_id));
    };

    const handleSelectTrigger = (triggerId) => {
        const newTrigger = definedData.find((t) => t.id == triggerId);
        setCurrentTrigger(newTrigger);
        setCurrentCondition(null);
    };

    const handleCancelAdding = () => {
        setIsTimerClicked(false);
        setCurrentCondition(null);
        setCurrentTrigger(null);
        setCurrenConditionValue(null);
        onCancel();
    };

    const handleFinish = () => {
        const data = { condition: currentCondition, trigger: currentTrigger, value: currentConditionValue };
        onAdd(data);
    };

    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align='right'
            >
                <div className='flex justify-center items-center w-full h-full'>
                    <Select
                        placeholder={<div className='text-center'>Select Trigger</div>}
                        onChange={handleSelectTrigger}
                        className='w-[50%]'
                        value={currentTrigger?.id}
                        options={availableTriggers.map((item, index) => ({
                            value: item.id,
                            label: <div className='flex justify-center items-center'>{item.name}</div>,
                        }))}
                    ></Select>
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ height: '2em' }} />
                <div className='flex space-x-2'>
                    <TimelineDot
                        color='error'
                        onClick={handleCancelAdding}
                    >
                        <CancelOutlined className='hover:cursor-pointer'></CancelOutlined>
                    </TimelineDot>
                    {currentCondition && (currentCondition?.operator?.id == 1 ? currentConditionValue > 0 : true) && (
                        <TimelineDot
                            color='success'
                            onClick={handleFinish}
                        >
                            <CheckOutlined className='hover:cursor-pointer'></CheckOutlined>
                        </TimelineDot>
                    )}
                </div>
                <TimelineConnector sx={{ height: '2em' }} />
            </TimelineSeparator>
            <TimelineContent
                sx={{ m: 'auto 0' }}
                align='left'
            >
                {canAddCondition && (
                    <div className='flex justify-center items-center w-full'>
                        <Space.Compact className='w-[100%] justify-center'>
                            <Select
                                placeholder={<div className='text-center'>Select Condition</div>}
                                onChange={handleSelectCondition}
                                value={currentCondition?.id}
                            >
                                {definedData
                                    .find((t) => t.id == currentTrigger?.id)
                                    ?.operators.map((operator, index) => (
                                        <Select.Option
                                            key={index}
                                            value={operator.id}
                                        >
                                            <div className='flex justify-center items-center'>
                                                {operator.operator?.name}
                                            </div>
                                        </Select.Option>
                                    ))}
                            </Select>

                            <InputNumber
                                min={currentCondition?.operator?.id == 1 ? 1 : undefined}
                                value={currentConditionValue}
                                onChange={setCurrenConditionValue}
                            ></InputNumber>

                            {!isTimerClicked && (
                                <Button
                                    icon={<ClockCircleOutlined></ClockCircleOutlined>}
                                    onClick={() => setIsTimerClicked(true)}
                                ></Button>
                            )}

                            {isTimerClicked && (
                                <InputNumber
                                    className='w-[40%]'
                                    min={1}
                                    addonBefore={'in'}
                                    addonAfter={'days'}
                                ></InputNumber>
                            )}
                        </Space.Compact>
                    </div>
                )}
            </TimelineContent>
        </TimelineItem>
    );
}
