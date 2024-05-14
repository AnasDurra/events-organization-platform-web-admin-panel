import { Avatar, Space, Table, Tabs, Typography } from 'antd';
import React from 'react';

const fakeData = [
    {
        key: 1,
        date: '2024-04-01',
        buyer: 'John Doe',
        payment: '100$',
        package: 'Premium',
        tickets: 3,
    },
    {
        key: 2,
        date: '2024-04-02',
        buyer: 'Alice Smith',
        payment: '100$',
        package: 'Standard',
        tickets: 2,
    },
    {
        key: 3,
        date: '2024-04-03',
        buyer: 'Bob Johnson',
        payment: '100$',
        package: 'Basic',
        tickets: 1,
    },
    // Add more data as needed
];

const fakeData2 = [
    {
        key: 1,
        date: '2024-04-01 14:55',
        buyer: 'John Doe',
        payment: '100$',
        package: 'Premium',
        tickets: 3,
    },
    {
        key: 2,
        date: '2024-04-02 14:55',
        buyer: 'Alice Smith',
        payment: '100$',
        package: 'Standard',
        tickets: 2,
    },
    {
        key: 3,
        date: '2024-04-03 14:55',
        buyer: 'Bob Johnson',
        payment: '100$',
        package: 'Basic',
        tickets: '+40',
    },
    // Add more data as needed
];

export default function ViewTransactionsPage() {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            width: '5%',
        },
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            key: 'buyer',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Package',
            dataIndex: 'package',
            key: 'start',

            align: 'center',
            width: '10%',
        },
        {
            title: 'Price',
            dataIndex: 'payment',
            key: 'type',
            align: 'center',
            width: '5%',
        },

        {
            title: 'Tickets',
            dataIndex: 'tickets',
            key: 'end',

            align: 'center',
            width: '5%',
        },
    ];

    const columns2 = [
        {
            title: 'Date',
            dataIndex: 'date',
            rowScope: 'row',
            width: '5%',
            align: 'center',
        },
        {
            title: 'Attendee',
            dataIndex: 'buyer',
            key: 'buyer',
            align: 'center',
            width: '10%',
            render: (text, record, index) => {
                console.log(text, record, index);
                const tags = [];
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar className='ml-4 mx-6' />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>{text}</Typography.Text>
                            <Typography.Text type='secondary'>@username</Typography.Text>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Tickets',
            dataIndex: 'tickets',
            key: 'start',
            align: 'center',
            width: '5%',
        },

        {
            title: 'Organization',
            dataIndex: 'buyer',
            key: 'type',
            align: 'center',
            width: '15%',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'end',
            align: 'center',
            width: '15%',
            render: (text, record, index) => {
                console.log(text, record, index);
                const tags = [];
                return (
                    <div className='flex flex-col w-full '>
                        <div className='flex w-full items-center'>
                            <div className='w-[95%] text-left text-wrap '>
                                <Typography.Text className='line-clamp-2 text-sm'>event title</Typography.Text>
                                <Typography.Text
                                    type='secondary'
                                    className='line-clamp-2 text-xs'
                                >
                                    event description is here event description is here event description is here
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
                    dataSource={fakeData}
                    size='middle'
                    bordered
                    pagination={{ pageSize: 10, total: 100, hideOnSinglePage: true, showSizeChanger: true }}
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
                    dataSource={fakeData2}
                    size='small'
                    showHeader={true}
                    pagination={{
                        pageSize: 10,
                        total: fakeData2.length,
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
