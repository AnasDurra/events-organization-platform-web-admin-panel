import { Avatar, Space, Table, Tabs, Typography } from 'antd';
import React from 'react';
import { useGetPackagesHistoryQuery, useGetTicketsUsageQuery } from './TicketingPackagesSlice';
import { render } from 'react-dom';
import dayjs from 'dayjs';

const fakeData = [
    {
        tickets_created_at: '2024-05-17T10:20:00.000Z', // Replace with desired date format
        buyer: {
            firstName: 'John',
            lastName: 'Doe',
            user: {
                username: 'johndoe123',
            },
        },
        tickets_value: 2,
        organization_name: 'Acme Inc.',
        event_title: 'Awesome Conference 2024',
        event_description: 'A conference about all things awesome!',
    },
    {
        tickets_created_at: '2024-05-20T15:30:00.000Z', // Replace with desired date format
        buyer: {
            firstName: 'Jane',
            lastName: 'Smith',
            user: {
                username: 'janesmith987',
            },
        },
        tickets_value: 1,
        organization_name: 'Startups R Us',
        event_title: 'Workshop on Building Scalable Web Applications',
        event_description: 'Learn how to build applications that can handle high traffic.',
    },
    {
        tickets_created_at: '2024-05-15T08:00:00.000Z', // Replace with desired date format
        buyer: {
            firstName: 'Michael',
            lastName: 'Jones',
            user: {
                username: 'mike_jones',
            },
        },
        tickets_value: 3,
        organization_name: 'Freelancers Guild',
        event_title: 'Masterclass on Effective Freelancing',
        event_description: 'Get tips and tricks to become a successful freelancer.',
    },
    // Add more data objects as needed
];

export default function ViewTransactionsPage() {
    const { data: { result: ticketsUsage } = { result: [] }, isLoading: isTicketsUsageLoading } =
        useGetTicketsUsageQuery();
    const { data: { result: packagesHistory } = { result: [] }, isLoading: isPackagesHistoryLoading } =
        useGetPackagesHistoryQuery();

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (date) => dayjs(date).format('YYYY-MM-DD  HH:mm:ss'),
            rowScope: 'row',
            width: '20%',
            align: 'center',
        },
        {
            title: 'Buyer',
            dataIndex: 'attendee',
            key: 'buyer',
            align: 'center',
            width: '25%',
            render: (attendee, record, index) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>{attendee?.firstName + ' ' + attendee?.lastName}</Typography.Text>
                            <Typography.Text type='secondary'>@{attendee?.user?.username}</Typography.Text>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Package',
            dataIndex: ['data', 'package_name'],
            key: 'start',

            align: 'center',
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: ['data', 'payed'],
            render: (unit_anmount) => `${parseFloat(unit_anmount / 100)}$`,
            key: 'type',
            align: 'center',
            width: '20%',
        },

        {
            title: 'Tickets',
            dataIndex: ['value'],
            key: 'end',
            align: 'center',
            width: '20%',
        },
    ];

    const columns2 = [
        {
            title: 'Date',
            dataIndex: 'tickets_created_at',
            render: (date) => dayjs(date).format('YYYY MMMM DD HH:mm:ss'),
            rowScope: 'row',
            width: '20%',
            align: 'center',
        },
        {
            title: 'Attendee',
            key: 'buyer',
            align: 'center',
            width: '20%',
            render: (_, record, index) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>
                                {record?.attendee_first_name + ' ' + record?.attendee_last_name}
                            </Typography.Text>
                            <Typography.Text type='secondary'>@{record?.user_username}</Typography.Text>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Tickets',
            dataIndex: 'tickets_value',
            key: 'start',
            align: 'center',
            className: 'text-red-500',
            width: '20%',
        },

        {
            title: 'Organization',
            dataIndex: 'organization_name',
            key: 'type',
            align: 'center',
            width: '20%',
        },
        {
            title: 'Event',
            key: 'end',
            width: '20%',
            render: (_, record, index) => {
                return (
                    <div className='flex flex-col w-full '>
                        <div className='flex w-full items-center'>
                            <div className='w-[95%] text-left text-wrap '>
                                <Typography.Text className='line-clamp-2 text-sm'>{record.event_title}</Typography.Text>
                                <Typography.Text
                                    type='secondary'
                                    className='line-clamp-2 text-xs'
                                >
                                    {record.event_description}
                                </Typography.Text>
                            </div>
                        </div>
                    </div>
                );
            },
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Packages',
            children: (
                <Table
                    rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                    columns={columns}
                    dataSource={packagesHistory}
                    size='small'
                    loading={isPackagesHistoryLoading}
                    pagination={{
                        pageSize: 7,
                        total: packagesHistory.length,
                        hideOnSinglePage: true,
                        showSizeChanger: true,
                    }}
                />
            ),
        },
        {
            key: '2',
            label: 'Tickets',
            children: (
                <Table
                    rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                    columns={columns2}
                    //TODO check if it's working fine
                    dataSource={[...ticketsUsage]}
                    size='small'
                    showHeader={true}
                    loading={isTicketsUsageLoading}
                    pagination={{
                        pageSize: 7,
                        total: ticketsUsage.length,
                        hideOnSinglePage: true,
                        showSizeChanger: true,
                    }}
                />
            ),
        },
    ];

    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-2  col-span-10 flex flex-col w-full space-y-10'>
                <Tabs
                    defaultActiveKey='1'
                    items={items}
                />
            </div>
        </div>
    );
}
