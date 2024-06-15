import { Avatar, Button, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useGetAttendeesQuery } from './attendeesSlice';
import dayjs from 'dayjs';
import { URL } from '../../api/constants';
import { useBanAttendeeMutation } from '../ban/banSlice';
import { useNotification } from '../../utils/useAntNotification';
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

    const { openNotification } = useNotification();

    const { data: { result: attendees } = { result: [] }, isLoading: isAttendeesLoading } = useGetAttendeesQuery();

    const [banAttendee, { isLoading: isBanAttendeeLoading }] = useBanAttendeeMutation();

    const columns = [
        {
            title: 'Profile',
            key: 'profile',
            align: 'center',
            filterSearch: true,
            width: '25%',
            render: (text, record, index) => {
                return (
                    <div className='flex w-full justify-start items-center'>
                        <Avatar
                            className='ml-4 mx-6'
                            src={
                                record.attendee_profile_picture_url
                                    ? URL + record.attendee_profile_picture_url
                                    : undefined
                            }
                        />
                        <div className='flex flex-col text-left'>
                            <Typography.Text>
                                {record.attendee_first_name + ' ' + record.attendee_last_name}
                            </Typography.Text>
                            <Typography.Text type='secondary'>@{record.user_username}</Typography.Text>
                        </div>
                    </div>
                );
            },
        },

        {
            title: 'Email',
            dataIndex: 'user_email',
            key: 'email',
            align: 'center',
            width: '20%',
        },
        {
            key: 'balance',
            title: 'Tickets balance',
            dataIndex: 'total_tickets_value',
            render: (text) => (text ? text : 0),
            align: 'center',
            width: '15%',
        },
        {
            title: 'Tickets bought',
            dataIndex: 'tickets_purchased',
            key: 'bought',
            render: (text) => (text ? text : 0),
            align: 'center',
            width: '15%',
        },
        {
            title: 'Last Attend',
            dataIndex: 'last_attended_event_date',
            render: (date) => (date ? dayjs(date).format('YYYY-MM-DD') : 'No Attendance'),

            key: 'lastAttend',
            align: 'center',
            width: '15%',
        },
        {
            title: 'join date',
            dataIndex: 'attendee_created_at',
            key: 'created_at',
            render: (date, index, record) => dayjs(date).format('YYYY-MM-DD'),
            align: 'center',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='small'>
                   {/*  <a>Notify</a> */}
                    <a
                        className='text-red-400'
                        onClick={() =>
                            banAttendee(record.user_id)
                                .unwrap()
                                .then((_) => {
                                    openNotification({
                                        type: 'success',
                                        message: `user @${record.user_username} Blocked`,
                                        placement: 'bottomRight',
                                    });
                                })
                                .catch((e) => {
                                    openNotification({
                                        type: 'error',
                                        message: `Failed to block user @${record.user_username}`,
                                        placement: 'bottomRight',
                                    });
                                })
                        }
                    >
                        {record.isBlocked ? 'Unblock' : 'Block'}
                    </a>
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
                {/*     <Button
                        type='dashed'
                        onClick={() => {}}
                    >
                        Show Blocked Attendees
                    </Button>
                    <Button onClick={() => {}}>Clear filters</Button>
                    <Button onClick={() => {}}>Clear filters and sorters</Button> */}
                </Space>
                <Table
                    rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
                    columns={columns}
                    dataSource={attendees}
                    loading={isAttendeesLoading || isBanAttendeeLoading}
                    size='middle'
                    pagination={{
                        pageSize: 10,
                        total: attendees.length,
                        hideOnSinglePage: true,
                        showSizeChanger: true,
                    }}
                />
            </div>
        </div>
    );
}
