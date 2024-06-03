import { ArrowLeftOutlined } from '@ant-design/icons';
import { CancelOutlined, OutlinedFlag, TextureOutlined } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Button, Card, ConfigProvider, Divider, Form, Input, Modal, Select, Space, Tooltip } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import { BsGift } from 'react-icons/bs';
import { MdEdit, MdOutlineAddRoad } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import AssignRewardModal from './AssignRewardModal';
import AddingNewStepTimeLineItem from './timeline/AddingNewStepTimeLineItem';
import BadgeRewardCard from './BadgeRewardCard';
import PointsRewardCard from './PointsRewardCard';
import { v4 as uuidv4 } from 'uuid';
import EditStepModal from './EditStepModal';
import StepTimeLineItem from './timeline/StepTimeLineItem';
import HeaderTimeLineItem from './timeline/HeaderTimeLineItem';
import { MdOutlineTitle } from 'react-icons/md';
import { useGetDefinedDataQuery } from '../gamificationSlice';

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

    const availableTriggers = fakeData.filter((data) => !steps.some((step) => step.trigger.name === data.name));

    return (
        <div className='grid grid-cols-12'>
            <Button
                icon={<ArrowLeftOutlined />}
                type='text'
                onClick={() => navigate(-1)}
            ></Button>
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
                            />
                        </Space.Compact>
                        <Tooltip
                            title={
                                steps.length == 0 || badges.length + points.length == 0
                                    ? 'A valid rule contains at least one checker and one reward'
                                    : ''
                            }
                        >
                            <div className='flex justify-center items-center'>
                                <Button
                                    type='primary'
                                    className='min-w-36'
                                    disabled={steps.length == 0 || badges.length + points.length == 0}
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

                {/* Edit Modal */}
                <EditStepModal
                    trigger={fakeData.filter((item, i) => i == editIndex)[0]}
                    fakeData={fakeData}
                    isOpen={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    onFinish={(fields) => {
                        console.log(fields);
                    }}
                />

                {/* Assign Reward Modal */}
                <AssignRewardModal
                    isOpen={isAssignRewardModalOpen}
                    onClose={() => setIsAssignRewardModalOpen(false)}
                    onFinish={(reward) => {
                        if (reward.type == 'badge') setBadges([...badges, { ...reward, type: undefined }]);
                        else if (reward.type == 'points') setPoints([reward.amount]);

                        setIsAssignRewardModalOpen(false);
                    }}
                />

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

                        {points.map((point, index) => {
                            return (
                                <PointsRewardCard
                                    key={uuidv4()}
                                    onDelete={() => {
                                        setPoints((points) => points.filter((point, i) => i != index));
                                    }}
                                    point={point}
                                />
                            );
                        })}
                    </div>
                </ConfigProvider>
            </div>
        </div>
    );
}
