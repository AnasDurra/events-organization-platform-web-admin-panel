import * as React from 'react';
import { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Button, Divider, Select, Modal, Form } from 'antd';
import { BsGift } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineAddRoad, MdEdit } from 'react-icons/md';

const fakeTriggers = [
    { trigger: 'Login Attempt', conditions: ['User is Admin', 'User is New'] },
    { trigger: 'Page View', conditions: ['User is Logged In', 'User is from US'] },
    { trigger: 'Button Click', conditions: ['User is Admin', 'User is from US'] },
    { trigger: 'Form Submission', conditions: ['User is Logged In', 'User is New'] },
];

export default function NewRulePage() {
    const [steps, setSteps] = useState([]);
    const [currentTrigger, setCurrentTrigger] = useState(null);
    const [currentCondition, setCurrentCondition] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [form] = Form.useForm();

    const handleAddTrigger = (trigger) => {
        setCurrentTrigger(trigger);
        setCurrentCondition(null);
    };

    const handleAddCondition = (condition) => {
        setCurrentCondition(condition);
        handleAddStep(currentTrigger, condition);
    };

    const handleAddStep = (trigger, condition) => {
        if (trigger && condition) {
            setSteps([...steps, { trigger, condition }]);
            setCurrentTrigger(null);
            setCurrentCondition(null);
        }
    };

    const handleEditStep = (index) => {
        const step = steps[index];
        form.setFieldsValue({ trigger: step.trigger, condition: step.condition });
        setEditIndex(index);
        setEditModalVisible(true);
    };

    const handleUpdateStep = () => {
        form.validateFields().then((values) => {
            const updatedSteps = [...steps];
            updatedSteps[editIndex] = values;
            setSteps(updatedSteps);
            setEditModalVisible(false);
            setEditIndex(null);
        });
    };

    const canAddCondition = currentTrigger !== null;

    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-2 col-span-10'>
                <Timeline>
                    {/* Triggers & Conditions */}
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align='right'
                            variant='body2'
                        >
                            <div className='text-lg text-center w-full h-full'>Triggers</div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{ m: 'auto 0' }}
                            align='left'
                            variant='body2'
                        >
                            <div className='text-lg text-center w-full h-full'>Conditions</div>
                        </TimelineContent>
                    </TimelineItem>
                    <Divider />

                    {steps.map((step, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align='left'
                            >
                                <div className='flex justify-center items-center w-full'>{step.trigger}</div>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot
                                    color='primary'
                                    className='hover:cursor-pointer hover:shadow-lg'
                                    onClick={() => handleEditStep(index)}
                                >
                                    <MdEdit className='text-xl' />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent
                                sx={{ m: 'auto 0' }}
                                align='right'
                            >
                                <div className='flex justify-center items-center w-full'>{step.condition}</div>
                            </TimelineContent>
                        </TimelineItem>
                    ))}

                    {/* Add Trigger or Condition */}
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align='right'
                        >
                            <div className='flex justify-center items-center w-full h-full'>
                                <Select
                                    placeholder={<div className='text-center'>Select Trigger</div>}
                                    onChange={handleAddTrigger}
                                    className='w-[50%]'
                                    value={currentTrigger}
                                >
                                    {fakeTriggers.map((item, index) => (
                                        <Select.Option
                                            key={index}
                                            value={item.trigger}
                                        >
                                            <div className='flex justify-center items-center'>{item.trigger}</div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector sx={{ height: '2em' }} />
                            <TimelineDot>
                                <AiOutlineLoading3Quarters
                                    className=' text-2xl'
                                    style={{ animation: 'spin 7s linear infinite' }}
                                />
                            </TimelineDot>
                            <TimelineConnector sx={{ height: '2em' }} />
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{ m: 'auto 0' }}
                            align='left'
                        >
                            {canAddCondition && (
                                <div className='flex justify-center items-center w-full'>
                                    <Select
                                        placeholder={<div className='text-center'>Select Condition</div>}
                                        onChange={handleAddCondition}
                                        className='w-[50%]'
                                        value={currentCondition}
                                    >
                                        {fakeTriggers
                                            .find((t) => t.trigger === currentTrigger)
                                            .conditions.map((condition, index) => (
                                                <Select.Option
                                                    key={index}
                                                    value={condition}
                                                >
                                                    <div className='flex justify-center items-center'>{condition}</div>
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </div>
                            )}
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
                <Divider>Reward</Divider>

                <div className='flex justify-center items-center'>
                    <Button
                        type='primary'
                        icon={<BsGift />}
                        onClick={() => console.log('Steps to be sent:', steps)}
                    >
                        Assign
                    </Button>
                </div>

                <Modal
                    title='Edit Step'
                    open={editModalVisible}
                    onOk={handleUpdateStep}
                    onCancel={() => setEditModalVisible(false)}
                >
                    <Form
                        form={form}
                        layout='vertical'
                    >
                        <Form.Item
                            name='trigger'
                            label='Trigger'
                            rules={[{ required: true, message: 'Please select a trigger!' }]}
                        >
                            <Select onChange={handleAddTrigger}>
                                {fakeTriggers.map((item, index) => (
                                    <Select.Option
                                        key={index}
                                        value={item.trigger}
                                    >
                                        {item.trigger}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='condition'
                            label='Condition'
                            rules={[{ required: true, message: 'Please select a condition!' }]}
                        >
                            <Select onChange={handleAddCondition}>
                                {currentTrigger &&
                                    fakeTriggers
                                        .find((t) => t.trigger === currentTrigger)
                                        .conditions.map((condition, index) => (
                                            <Select.Option
                                                key={index}
                                                value={condition}
                                            >
                                                {condition}
                                            </Select.Option>
                                        ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}
