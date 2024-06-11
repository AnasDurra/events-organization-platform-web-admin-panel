import React from 'react';
import { Table, Button, Tag, Typography, Menu, Dropdown, Popover, Card, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment/moment';

const { Text, Title } = Typography;

const ReportsPage = () => {
    const reports = [
        {
            id: '1',
            typeId: 1,
            event: {
                event_id: 1,
                event_name: 'abdo',
                org: {
                    bio: null,
                    cover_picture:
                        'http://localhost:3000/ââÙÙØ·Ø©Ø§ÙØ´Ø§Ø´Ø©(4)0a81c104-49e4-4183-be8a-9c00558ed8ce.png',
                    description: null,
                    id: '1',
                    main_picture: null,
                    name: 'abdo',
                },
            },
            description: 'Unscheduled event detected during conference.',
            reportedBy: {
                userId: 2,
                username: 'JohnDoe',
            },
            reporterDetails: 'John Doe',
            date: '2024-06-01T15:45:00Z',
        },
        {
            id: '2',
            typeId: 2,
            event: {
                event_id: 2,
                event_name: 'abo abdo',
                org: {
                    bio: null,
                    cover_picture:
                        'http://localhost:3000/ââÙÙØ·Ø©Ø§ÙØ´Ø§Ø´Ø©(4)0a81c104-49e4-4183-be8a-9c00558ed8ce.png',
                    description: null,
                    id: '1',
                    main_picture: null,
                    name: 'abdo',
                },
            },
            description: 'Inappropriate message content in public chat.',
            reportedBy: {
                userId: 3,
                username: 'JaneSmith',
            },
            reporterDetails: 'Jane Smith',
            date: '2024-06-02T11:30:00Z',
            message: {
                content: 'Explicit content found in chat.',
                timestamp: '2024-06-02T11:25:00Z',
            },
        },
        {
            id: '3',
            typeId: 3,
            event: {
                event_id: 3,
                event_name: 'um abdo',
                org: {
                    bio: null,
                    cover_picture:
                        'http://localhost:3000/ââÙÙØ·Ø©Ø§ÙØ´Ø§Ø´Ø©(4)0a81c104-49e4-4183-be8a-9c00558ed8ce.png',
                    description: null,
                    id: '1',
                    main_picture: null,
                    name: 'abdo',
                },
            },
            description: 'Network outage affecting multiple sessions.',
            reportedBy: {
                userId: 2,
                username: 'AliceJohnson',
            },
            reporterDetails: 'Alice Johnson',
            date: '2024-06-03T09:00:00Z',
        },
    ];

    const getTypeById = (typeId) => {
        const types = { 1: 'Event', 2: 'Message', 3: 'Global' };
        return types[typeId];
    };
    const getRoleById = (userId) => {
        const roles = { 2: 'Organizer', 3: 'Attendee' };
        return roles[userId] || 'Unknown';
    };

    const getActionsByType = (typeId, record) => {
        switch (typeId) {
            case 1:
                return [
                    { key: 'investigate', text: 'Investigate Event' },
                    { key: 'delete_event', text: 'Delete Event' },
                    { key: 'resolve', text: 'Resolve' },
                ];
            case 2:
                return [
                    { key: 'show', text: 'Show Message' },
                    { key: 'delete_message', text: 'Delete Message' },
                    { key: 'resolve', text: 'Resolve' },
                ];
            case 3:
                return [{ key: 'resolve', text: 'Resolve' }];
            default:
                return [];
        }
    };

    const menu = (typeId, record) => (
        <Menu onClick={(e) => handleAction(e, record)}>
            {getActionsByType(typeId, record).map((action) => (
                <Menu.Item key={action.key}>{action.text}</Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'typeId',
            key: 'typeId',
            render: (typeId) => (
                <Tag style={{ margin: '0px' }} color='geekblue'>
                    {getTypeById(typeId)}
                </Tag>
            ),
        },
        {
            title: 'Event Name',
            dataIndex: ['event', 'event_name'],
            key: 'eventName',
            render: (name, row) => (
                <Popover
                    content={
                        <Card bordered={false} style={{}}>
                            <Card.Meta
                                avatar={
                                    <Image
                                        preview={false}
                                        width={50}
                                        height={50}
                                        src='https://randomuser.me/api/portraits/men/4.jpg'
                                        alt={row?.event?.org?.name}
                                        style={{ borderRadius: '50%' }}
                                    />
                                }
                                title={row?.event?.org?.name}
                                description={row?.event?.org?.description || 'No description available'}
                            />
                        </Card>
                    }
                    title='Organizer Info'
                >
                    {' '}
                    <Text strong>{name}</Text>
                </Popover>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Reported By',
            dataIndex: 'reportedBy',
            key: 'reportedBy',
            render: (reportedBy) => (
                <Tag color={getRoleById(reportedBy.userId) === 'Organizer' ? 'volcano' : 'green'}>
                    {getRoleById(reportedBy.userId)}
                </Tag>
            ),
        },
        {
            title: 'Reporter Details',
            dataIndex: 'reporterDetails',
            key: 'reporterDetails',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Dropdown overlay={menu(record.typeId, record)} trigger={['click']}>
                    <Button style={{ backgroundColor: '#ff4d4f', color: '#fff', borderColor: '#ff4d4f' }}>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    const handleAction = (e, record) => {
        console.log(
            `Action "${e.key}" selected for report ${record.eventId} submitted by ${record.reportedBy.username}`
        );
        // Implement the action logic based on e.key here
    };

    return (
        <div>
            <Title level={2} style={{ marginLeft: '1.5em' }}>
                Incident Reports Dashboard
            </Title>

            <Table
                dataSource={reports}
                rowKey='id'
                columns={columns}
                bordered
                style={{ background: '#fff', margin: '24px', padding: '24px' }}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default ReportsPage;
