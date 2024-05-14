import { Avatar, Button, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';

const data = [
    {
        key: '1',
        name: 'John Brown',
        username: 'username1',
        email: 'test@email.com',
        balance: 100,
        bought: 132,
        created_at: '2022-12-1',
        lastAttend: '2022-12-1',
    },
    {
        key: '2',
        name: 'Jim Green',
        username: 'username1',
        email: 'test@email.com',
        balance: 100,
        bought: 142,
        created_at: '2022-12-1',
        lastAttend: '2022-12-1',
    },
    {
        key: '3',
        name: 'Joe Black',
        username: 'username1',
        email: 'test@email.com',
        balance: 100,
        bought: 132,
        created_at: '2022-12-1',
        lastAttend: '2022-12-1',
    },
    {
        key: '4',
        name: 'Jim Red',
        username: 'username1',
        email: 'test@email.com',
        balance: 100,
        bought: 132,
        created_at: '2022-12-1',
        lastAttend: '2022-12-1',
    },
];

export default function ViewAttendeesPbought() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            filterSearch: true,
            width: '25%',
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: '20%',
        },
        {
            title: 'Tickets balance',
            dataIndex: 'balance',
            key: 'balance',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            align: 'center',
            width: '15%',
        },
        {
            title: 'Tickets bought',
            dataIndex: 'bought',
            key: 'bought',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            align: 'center',
            width: '15%',
        },
        {
            title: 'Last Attend',
            dataIndex: 'lastAttend',
            key: 'lastAttend',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            align: 'center',
            width: '15%',
        },
        {
            title: 'join date',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            align: 'center',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='small'>
                    <a>Notify</a>
                    <a className='text-red-400'>Block</a>
                </Space>
            ),
            align: 'center',
            width: '10%',
        },
    ];

    return (
        <div className='grid grid-cols-12 w-full'>
            <div className='col-start-2 col-span-10'>
                <Space
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Button
                        type='dashed'
                        onClick={() => {}}
                    >
                        Show Blocked Attendees
                    </Button>
                    <Button onClick={() => {}}>Clear filters</Button>
                    <Button onClick={() => {}}>Clear filters and sorters</Button>
                </Space>
                <Table
                    rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                    columns={columns}
                    dataSource={data}
                    size='middle'
                    bordered
                    pagination={{ pageSize: 10, total: 100, hideOnSinglePage: true, showSizeChanger: true }}
                />
            </div>
        </div>
    );
}
