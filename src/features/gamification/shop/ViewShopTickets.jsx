import { Button, Space, Table, message } from 'antd';
import React, { useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import { useAddTicketPrizeMutation, useEditTicketPrizeMutation, useGetPrizesQuery } from '../gamificationSlice';
import AddShopTicketsPrizeModal from './AddShopTicketsPrizeModal';
import EditShopTicketsPrizeModal from './EditShopTicketsPrizeModal';

export default function ViewShopTickets() {
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { data: { result: prizes } = { result: [] } } = useGetPrizesQuery();
    const [addTicketsPrize, { isLoading: isAddLoading }] = useAddTicketPrizeMutation();
    const [editTicketPrize, { isLoading: isEditLoading }] = useEditTicketPrizeMutation();

    const ticketPrizes = prizes.filter((pz) => pz.type_id == 1).sort((a, b) => a.rank - b.rank);

    const defaultColumns = [
        {
            title: 'ID',
            dataIndex: ['prize_details', 'prize_id'],
            key: 'id',
            rowScope: 'row',
            align: 'center',
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            align: 'center',
            width: '10%',
            render: (text) => `#${text}`,
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
            render: (record) => {
                return (
                    <div className='flex justify-evenly items-center'>
                        <div className='flex justify-center items-center gap-x-1 w-[40%]'>
                            {record?.rp_value}
                            <img
                                src={`/static/images/points-rp.svg `}
                                className='w-[2em]'
                                alt='Points'
                            ></img>
                        </div>
                        <div className='w-[10%]'>➡️</div>
                        <div className='flex justify-center items-center space-x-2 gap-x-1 w-[40%]'>
                            {record?.prize_details?.tickets_value}{' '}
                            <TiTicket className='text-[2em] text-primary'></TiTicket>
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
            width: '5%',
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
                    <a
                        onClick={() => {
                            setSelectedRecord(record);
                            setIsEditModalOpen(true);
                        }}
                    >
                        Edit
                    </a>
                    <a
                        onClick={() => {
                            editTicketPrize({ enabled: !record.enabled, tickets_prize_id: record?.prize_details?.id });
                        }}
                    >
                        {record.enabled ? 'Deactivate' : 'Activate'}
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <div className='flex justify-center'>
            <Table
                title={() => (
                    <div className='flex space-x-2 items-center'>
                        <Button
                            type='primary'
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add
                        </Button>
                        <Button
                            disabled
                            type='dashed'
                        >
                            show active
                        </Button>
                    </div>
                )}
                className='w-[90%]'
                loading={isAddLoading || isEditLoading}
                columns={defaultColumns}
                dataSource={ticketPrizes}
                pagination={{ pageSize: 7 }}
                rowClassName={(record, index) => (index % 2 === 0 ? '' : 'bg-gray-50')}
            />

            <AddShopTicketsPrizeModal
                isOpen={isAddModalOpen}
                handleOk={(fields) => {
                    console.log(fields);
                    addTicketsPrize(fields).then((res) => {
                        setIsAddModalOpen(false);
                        message.success(`Prize ${fields.name} was added successfully`);
                    });
                }}
                handleCancel={() => {
                    setIsAddModalOpen(false);
                }}
                isLoading={isAddLoading}
            />

            <EditShopTicketsPrizeModal
                isOpen={isEditModalOpen}
                handleOk={(fields) => {
                    console.log(fields);
                    editTicketPrize({ ...fields, tickets_prize_id: selectedRecord?.prize_details?.id }).then((res) => {
                        setIsEditModalOpen(false);
                        message.success(`Prize ${fields.name} Edited successfully`);
                    });
                }}
                handleCancel={() => {
                    setIsEditModalOpen(false);
                }}
                isLoading={isEditLoading}
                record={selectedRecord}
            />
        </div>
    );
}
