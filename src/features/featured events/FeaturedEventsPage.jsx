import { Avatar, Button, Space, Table, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import NewFeaturedEventModal from './modal-NewFeaturedEvent';
import {
    useAddFeaturedEventMutation,
    useDeleteFeaturedEventMutation,
    useGetFeaturedEventsQuery,
    useGetFutureUnfeaturedEventsQuery,
} from './featuredSlice';

import dayjs from 'dayjs';
import { useNotification } from '../../utils/useAntNotification';

const data = [
    {
        key: '1',
        org: 'John Brown',
        event: 'event1',
        type: {
            id: 1,
            name: 'Home Page Carousel',
        },
        timeline: {
            creation_date: '2022-1-1',
            start_date: '2022-1-5',
            end_date: '2022-2-5',
        },
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        org: 'Jim Green',
        event: 'event1',
        type: {
            id: 1,
            name: 'Home Page Carousel',
        },
        timeline: {
            creation_date: '2022-1-1',
            start_date: '2022-1-5',
            end_date: '2022-2-5',
        },
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        org: 'Joe Black',
        event: 'event1',
        type: {
            id: 1,
            name: 'Home Page Carousel',
        },
        timeline: {
            creation_date: '2022-1-1',
            start_date: '2022-1-5',
            end_date: '2022-2-5',
        },
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        org: 'Jim Red',
        event: 'event1',
        type: {
            id: 1,
            name: 'Home Page Carousel',
        },
        timeline: {
            creation_date: '2022-1-1',
            start_date: '2022-1-5',
            end_date: '2022-2-5',
        },
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

export default function FeaturedEventsPage() {
    const { openNotification } = useNotification();

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [isNewFeaturedEventModalOpen, setIsNewFeaturedEventModalOpen] = useState(false);

    const { data: { result: events } = { result: [] }, isLoading: isEventsLoading } = useGetFeaturedEventsQuery();
    const [addFeaturedEvent, { isLoading: isAddFeaturedEventLoading }] = useAddFeaturedEventMutation();
    const [deleteFeaturedEvent, { isLoading: isDeleteFeaturedEventLoading }] = useDeleteFeaturedEventMutation();
    const columns = [
        {
            key: 'col-org',
            title: 'Organization',
            dataIndex: ['event', 'organization'],
            align: 'center',
            width: '20%',
            render: (org, record, index) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        {org.name}
                    </div>
                );
            },
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            ellipsis: true,
            align: 'center',
            width: '25%',
            render: (event, record, index) => {
                return (
                    <div className='flex flex-col w-full '>
                        <div className='flex w-full items-center'>
                            <div className='w-[95%] text-left text-wrap '>
                                <Typography.Text className='line-clamp-2 text-sm'>{event.title}</Typography.Text>
                                <Typography.Text
                                    type='secondary'
                                    className='line-clamp-2 text-xs'
                                >
                                    {event.description}
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Type',
            dataIndex: ['type', 'name'],
            key: 'type',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Start',
            dataIndex: 'startDate',
            key: 'start',
            render: (date, index, record) => dayjs(date).format('YYYY-MM-DD'),
            align: 'center',
            width: '15%',
        },
        {
            title: 'End',
            dataIndex: 'endDate',
            key: 'end',
            render: (date, index, record) => dayjs(date).format('YYYY-MM-DD'),
            align: 'center',
            width: '15%',
        },
        {
            key: 'isActive',
            title: 'Active',
            render: (record) => {
                const startDate = dayjs(record?.startDate);
                const endDate = dayjs(record?.endDate);
                const currentDate = dayjs();

                // Calculate difference in days between current date and both start/end dates
                const daysSinceStart = currentDate.diff(startDate, 'day');
                const daysBeforeEnd = endDate.diff(currentDate, 'day');

                // Event is active if current date is between (inclusive) start and end date
                const isActive = daysSinceStart >= 0 && daysBeforeEnd >= 0;

                return <span className='flex justify-center items-center'>{isActive ? '✅ ' : '❌ '}</span>;
            },
            align: 'center',
            width: '15%',
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created',
            render: (date, index, record) => dayjs(date).format('YYYY-MM-DD'),
            align: 'center',
            width: '15%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='small'>
                    <a
                        className='text-red-500 hover:text-red-700'
                        onClick={() => {
                            deleteFeaturedEvent(record?.id)
                                .unwrap()
                                .then((_) => {
                                    openNotification({
                                        type: 'success',
                                        message: 'Featured event deleted successfully',
                                        placement: 'bottomRight',
                                    });
                                })
                                .catch((e) => {
                                    console.log(e);
                                    openNotification({
                                        type: 'error',
                                        message: 'Failed to delete featured event',
                                        description: e?.data?.result?.response?.message,
                                        placement: 'bottomRight',
                                    });
                                });
                            F;
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
            align: 'center',
            ellipsis: true,
            width: '10%',
        },
    ];

    return (
        <>
            <div className='grid grid-cols-12 w-full'>
                <div className='col-start-2 col-span-10'>
                    <Space
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button
                            type='primary'
                            onClick={() => setIsNewFeaturedEventModalOpen(true)}
                        >
                            New
                        </Button>
                      {/*   <Button
                            type='dashed'
                            onClick={() => {}}
                        >
                            Show Active Features
                        </Button> */}
                        {/*   <Button onClick={() => {}}>Clear filters</Button>
                        <Button onClick={() => {}}>Clear filters and sorters</Button> */}
                    </Space>
                    <Table
                        rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                        columns={columns}
                        dataSource={events}
                        size='large'
                        loading={isEventsLoading || isDeleteFeaturedEventLoading}
                        pagination={{ pageSize: 10, total: data.length, hideOnSinglePage: true, showSizeChanger: true }}
                    />
                </div>
            </div>

            <NewFeaturedEventModal
                isOpen={isNewFeaturedEventModalOpen}
                onFinish={(fields) => {
                    console.log('formfields: ', fields);
                    addFeaturedEvent({
                        event_id: fields.event_id,
                        type_id: fields.type_id,
                        start_date: dayjs(fields.dateRange[0]).format('YYYY-MM-DD'),
                        end_date: dayjs(fields.dateRange[1]).format('YYYY-MM-DD'),
                    })
                        .unwrap()
                        .then((_) => {
                            setIsNewFeaturedEventModalOpen(false);
                            openNotification({
                                type: 'success',
                                message: 'Featured event added successfully',
                                placement: 'bottomRight',
                            });
                        })
                        .catch((e) => {
                            console.log(e);
                            openNotification({
                                type: 'error',
                                message: 'Failed to add featured event',
                                description: e?.data?.result?.response?.message,
                                placement: 'bottomRight',
                            });
                        });
                }}
                isAddLoading={isAddFeaturedEventLoading}
                onCancel={() => setIsNewFeaturedEventModalOpen(false)}
            />
        </>
    );
}
