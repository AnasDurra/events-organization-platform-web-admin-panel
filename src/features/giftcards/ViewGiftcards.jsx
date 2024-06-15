import { Button, Table } from 'antd';
import React from 'react';
import { Spoiler } from 'spoiled';
import { BiExport } from 'react-icons/bi';
import { LuGrid } from 'react-icons/lu';
import { TbGiftCard } from 'react-icons/tb';

export default function ViewGiftcards() {
    const generateFakeData = (num) => {
        const statuses = ['Active', 'Redeemed', 'Expired', 'Pending'];
        const fakeData = [];

        for (let i = 1; i <= num; i++) {
            const id = i;
            const date = new Date(
                2023,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            ).toLocaleDateString();
            const code = Math.random().toString(36).substring(2, 10).toUpperCase();
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            fakeData.push({ id, date, code, status });
        }

        return fakeData;
    };

    const fakeData = generateFakeData(20);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            rowScope: 'row',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (code) => (
                <Spoiler
                    revealOn={'click'}
                    accentColor={'black'}
                >
                    {code}
                </Spoiler>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: () => (
                <div className='flex items-center space-x-2'>
                    <Button type='link'>print</Button>
                    <Button type='link'>export</Button>
                    <Button type='link'>deactivate</Button>
                </div>
            ),
        },
    ];

    return (
        <div className='grid grid-cols-12'>
            <div className='col-start-2 col-span-10 flex flex-col w-full space-y-4'>
                <div className='flex items-center justify-end space-x-4'>
                    <Button
                        type='dashed'
                        icon={<TbGiftCard></TbGiftCard>}
                    >
                        Print one
                    </Button>
                    <Button
                        type='dashed'
                        icon={<LuGrid></LuGrid>}
                    >
                        Print Grid
                    </Button>
                    <Button
                        type='dashed'
                        icon={<BiExport></BiExport>}
                    >
                        Export as CSV
                    </Button>
                </div>{' '}
                <Table
                    dataSource={fakeData}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    size='small'
                />
            </div>
        </div>
    );
}
