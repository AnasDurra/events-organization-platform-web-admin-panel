import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
import NewFeaturedEventModal from './modal-NewFeaturedEvent';

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
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [isNewFeaturedEventModalOpen, setIsNewFeaturedEventModalOpen] = useState(false);

    const columns = [
        {
            title: 'Organization',
            dataIndex: 'org',
            key: 'org',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
            ],
            onFilter: (value, record) => {
                console.log(value);
                console.log(record);
                console.log(record.org.includes(value));
                return record.org.includes(value);
            },
            ellipsis: true,
            align: 'center',
            filterSearch: true,
            width: '20%',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            ellipsis: true,
            align: 'center',
            width: '20%',
        },
        {
            title: 'Type',
            dataIndex: ['type', 'name'],
            key: 'type',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.includes(value),
            ellipsis: true,
            align: 'center',
            width: '20%',
        },
        {
            title: 'Start',
            dataIndex: ['timeline', 'start_date'],
            key: 'start',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center',
            width: '10%',
        },
        {
            title: 'End',
            dataIndex: ['timeline', 'end_date'],
            key: 'end',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center',
            width: '10%',
        },
        {
            title: 'Created',
            dataIndex: ['timeline', 'creation_date'],
            key: 'created',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
            align: 'center',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='small'>
                    <a>Deactivate</a>
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
                            New Featured Post
                        </Button>
                        <Button
                            type='dashed'
                            onClick={() => {}}
                        >
                            Show Active Features
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

            <NewFeaturedEventModal
                isOpen={isNewFeaturedEventModalOpen}
                onFinish={(fields) => {}}
                onCancel={() => setIsNewFeaturedEventModalOpen(false)}
            />
        </>
    );
}
