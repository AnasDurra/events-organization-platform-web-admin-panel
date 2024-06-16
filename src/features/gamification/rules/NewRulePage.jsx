import { ArrowLeftOutlined } from '@ant-design/icons';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Button, ConfigProvider, Divider, Input, Space, Tooltip, message } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import { BsGift } from 'react-icons/bs';
import { MdOutlineAddRoad, MdOutlineTitle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAddRuleMutation, useGetDefinedDataQuery } from '../gamificationSlice';
import AssignRewardModal from './AssignRewardModal';
import BadgeRewardCard from './BadgeRewardCard';
import EditStepModal from './EditStepModal';
import PointsRewardCard from './PointsRewardCard';
import AddingNewStepTimeLineItem from './timeline/AddingNewStepTimeLineItem';
import HeaderTimeLineItem from './timeline/HeaderTimeLineItem';
import StepTimeLineItem from './timeline/StepTimeLineItem';

const fakeData = [
    {
        id: '1',
        name: 'Fill Form',
        operators: [
            { id: '1', name: 'Equal' },
            { id: '2', name: 'Greater' },
        ],
    },
    {
        id: '2',
        name: 'Send Message',
        operators: [
            { id: '1', name: 'Equal' },
            { id: '2', name: 'Greater' },
        ],
    },
    {
        id: '3',
        name: 'Buy Package',
        operators: [
            { id: '1', name: 'Equal' },
            { id: '2', name: 'Greater' },
        ],
    },
    {
        id: '4',
        name: 'Consumed Tickets',
        operators: [
            { id: '1', name: 'Equal' },
            { id: '2', name: 'Greater' },
        ],
    },
];

export default function NewRulePage() {
    const navigate = useNavigate();

    const [steps, setSteps] = useState([]);
    const [badges, setBadges] = useState([]);
    const [points, setPoints] = useState([]);
    const [title, setTitle] = useState(null);
    const [CurrentModalTrigger, setCurrentModalTrigger] = useState(null);

    const [isAddingStep, setIsAddingStep] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [isAssignRewardModalOpen, setIsAssignRewardModalOpen] = useState(false);

    const { data: { result: definedData } = { result: [] } } = useGetDefinedDataQuery();
    const [addRule, { isLoading: isAddingRuleLoading }] = useAddRuleMutation();

    const handleEditStep = (index) => {
        setEditIndex(index);
        setEditModalVisible(true);
    };

    const handleUpdateStep = () => {
        /*  form.validateFields().then((values) => {
            const updatedSteps = [...steps];
            updatedSteps[editIndex] = {
                trigger: values.trigger,
                condition: values.condition,
            };
            setSteps(updatedSteps);
            setEditModalVisible(false);
            setEditIndex(null);
        }); */
    };

    const handleDeleteStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleFinish = () => {
        const rule = {
            name: title,
            conditions: steps.map((step) => ({
                defined_data_id: parseInt(step.condition.defined_data_id),
                operator_id: parseInt(step.condition.operator_id),
                value: step.value,
                //time: step.condition.time || null,
            })),
            rewards: [...badges, ...points].map((reward) => ({
                reward_id: reward.reward_id,
            })),
        };

        addRule(rule)
            .unwrap()
            .then((res) => {
                navigate(-1);
            })
            .catch((e) => {
                message.error('Failed to add rule');
            });

        // Rest of your code for handling the rule object
    };
    const availableTriggers = definedData.filter((data) => !steps.some((step) => step.trigger.name == data.name));

    const isFinishDisabled =
        steps.length == 0 ||
        badges.length + points.length == 0 ||
        !steps.some((step) => step.condition.operator_id == '1');

    return (
        <div className='grid grid-cols-12'>
            <Button
                icon={<ArrowLeftOutlined />}
                type='text'
                className='ml-[2.5svw]'
                onClick={() => navigate(-1)}
            />
            {console.log("poo: ",points)}
            <div className='col-start-2 col-span-10'>
                <Timeline>
                    {/* Triggers & Conditions */}
                    <div className='flex justify-between items-center mb-2 space-x-2'>
                        <Space.Compact>
                            <Input
                                variant='outlined'
                                className='min-w-40'
                                placeholder='Rule Title'
                                rootClassName='text-center'
                                prefix={<MdOutlineTitle className='text-gray-500' />}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </Space.Compact>
                        <Tooltip
                            title={
                                isFinishDisabled
                                    ? 'A valid rule has a title and contains at least one equal checker and one reward'
                                    : ''
                            }
                        >
                            <div className='flex justify-center items-center'>
                                <Button
                                    type='primary'
                                    className='min-w-36'
                                    disabled={isFinishDisabled}
                                    onClick={handleFinish}
                                    loading={isAddingRuleLoading}
                                >
                                    Add Rule
                                </Button>{' '}
                            </div>
                        </Tooltip>
                    </div>

                    <HeaderTimeLineItem />

                    <Divider className='mt-0' />

                    {steps.map((step, index) => (
                        <StepTimeLineItem
                            key={uuidv4()}
                            step={step}
                            onDelete={() => handleDeleteStep(index)}
                            onEdit={() => handleEditStep(index)}
                        />
                    ))}

                    {/* Add Trigger or Condition */}
                    {isAddingStep ? (
                        <AddingNewStepTimeLineItem
                            availableTriggers={availableTriggers}
                            definedData={definedData}
                            onAdd={(fields) => {
                                setSteps([...steps, fields]);
                                setIsAddingStep(false);
                            }}
                            onCancel={() => setIsAddingStep(false)}
                        />
                    ) : availableTriggers.length > 0 ? (
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align='right'
                            >
                                <div className='flex justify-center items-center w-full h-full'>
                                    <Button
                                        type='dashed'
                                        icon={<MdOutlineAddRoad />}
                                        onClick={() => setIsAddingStep(true)}
                                    >
                                        Add Step
                                    </Button>
                                </div>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ height: '2em' }} />
                                <TimelineDot>
                                    <MdOutlineAddRoad className=' text-2xl' />
                                </TimelineDot>
                                <TimelineConnector sx={{ height: '2em' }} />
                            </TimelineSeparator>
                            <TimelineContent
                                sx={{ m: 'auto 0' }}
                                align='left'
                            >
                                <div
                                    className='flex justify-center
                                items-center w-full h-full'
                                >
                                    Click "Add step" to add a new checker
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    ) : (
                        <></>
                    )}

                    {/* Assign Reward */}
                    <Divider> Rewards</Divider>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align='right'
                        ></TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector sx={{ height: '2em' }} />
                            <div className='flex justify-center items-center w-full h-full'>
                                <Button
                                    type='primary'
                                    onClick={() => setIsAssignRewardModalOpen(true)}
                                    icon={<BsGift />}
                                >
                                    Assign
                                </Button>
                            </div>{' '}
                        </TimelineSeparator>
                        <TimelineContent
                            sx={{ m: 'auto 0' }}
                            align='left'
                        ></TimelineContent>
                    </TimelineItem>
                </Timeline>

                <ConfigProvider
                    theme={{
                        components: {
                            Card: {
                                headerBg: '#2B3467',
                            },
                        },
                    }}
                >
                    <div className='grid grid-cols-4 gap-8 my-2'>
                        {badges.map((badge, index) => {
                            return (
                                <BadgeRewardCard
                                    key={badge.title + index}
                                    badge={badge}
                                    onDelete={() => {
                                        setBadges((badges) => badges.filter((badge, i) => i != index));
                                    }}
                                />
                            );
                        })}

                        {console.log(points)}

                        {points.map((point, index) => {
                            return (
                                <PointsRewardCard
                                    key={uuidv4()}
                                    onDelete={() => {
                                        setPoints((points) => points.filter((point, i) => i != index));
                                    }}
                                    name={point.name}
                                    type={point.type}
                                    value={point?.value}
                                />
                            );
                        })}
                    </div>
                </ConfigProvider>

                {/* Edit Modal */}
                <EditStepModal
                    step={steps[editIndex]}
                    trigger={definedData.filter((item, i) => i == editIndex)[0]}
                    isOpen={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    onFinish={(fields) => {
                        steps[editIndex].trigger = definedData?.find((trig) => trig.id == fields.trigger);
                        steps[editIndex].condition = definedData
                            ?.find((trig) => trig.id == fields.trigger)
                            .operators?.find((op) => op.id == fields.condition);

                        steps[editIndex].value = fields?.value;

                        setEditModalVisible(false);

                        console.log('def', definedData);
                        console.log('steps', steps);
                        console.log(fields);
                    }}
                />

                {/* Assign Reward Modal */}
                <AssignRewardModal
                    isOpen={isAssignRewardModalOpen}
                    onClose={() => setIsAssignRewardModalOpen(false)}
                    onFinish={(reward) => {
                        if (reward.type == 'badge') setBadges([...badges, { ...reward, type: undefined }]);
                        else if (reward.type == 'pp' || reward.type == 'rp') setPoints((p) => [...p, reward]);

                        setIsAssignRewardModalOpen(false);
                    }}
                />
            </div>
        </div>
    );
}
