import { Button, Space, Table, Tag } from 'antd';
import React from 'react';
import { TiTicket } from 'react-icons/ti';

const fakeRecord = {
    rp: 100,
    tickets: 200,
};

export default function ViewShopTickets() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            rowScope: 'row',
            align: 'center',
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'RPs to Tickets',
            key: 'rp',
            align: 'center',

            render: () => {
                return (
                    <div className='flex justify-evenly items-center'>
                        <div className='flex justify-center items-center gap-x-1'>
                            {fakeRecord.rp}
                            <img
                                src={`/src/assets/points-rp.svg `}
                                className='w-[2em]'
                                alt='Points'
                            ></img>
                        </div>
                        <div>➡️</div>
                        <div className='flex justify-center items-center space-x-2 gap-x-1'>
                            {fakeRecord.tickets} <TiTicket className='text-[2em] text-primary'></TiTicket>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Active',
            dataIndex: 'enabled',
            key: 'activation',
            align: 'center',
            render: (val) => <span className='flex justify-center items-center'>{val ? '✅ ' : '❌ '}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space
                    size='middle'
                    align='center'
                >
                    <a>Edit</a>
                    <a>Deactivate</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className='flex justify-center'>
            <Table
                title={() => (
                    <div className='flex space-x-2 items-center'>
                        <Button type='primary'>Add</Button>
                        <Button type='dashed'>show active</Button>
                    </div>
                )}
                className='w-[90%]'
                columns={columns}
                dataSource={data}
                rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
            />
        </div>
    );
}
