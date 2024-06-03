import { Button, Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { image } from '../badges/image';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
        align: 'center',
    },
    {
        title: 'Conditions',
        dataIndex: 'age',
        key: 'age',
        width: '40%',
        align: 'center',
        render: () => {
            return (
                <div className='text-pretty text-center text-sm'>
                    <span>1. fill form 10 times</span> <br></br>
                    <span>2. send message more than 40 times in 30 days</span>
                </div>
            );
        },
    },
    {
        title: 'Rewards',
        dataIndex: 'address',
        key: 'address',
        width: '40%',
        align: 'center',
        render: () => {
            return (
                <div className='flex justify-center items-center space-x-4'>
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
                        className='w-[3.5em]'
                    ></img>
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
                        className='w-[3.5em]'
                    ></img>
                    <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
                        className='w-[3.5em]'
                    ></img>
                </div>
            );
        },
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

export default function ViewAllRules() {
    const [isAddingRule, setIsAddingRule] = useState(false);
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-2  col-span-10 flex flex-col w-full space-y-10'>
                <div className='flex space-x-4'>
                    <Button
                        type='primary'
                        onClick={() => {
                            navigate('new');
                        }}
                    >
                        Design new rule
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    );
}
