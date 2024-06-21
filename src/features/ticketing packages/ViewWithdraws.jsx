import { Avatar, Button, ConfigProvider, Table, Tag, Typography, message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { TiTicket } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { useGetWithdrawsQuery, useManageWithdrawsMutation } from './TicketingPackagesSlice';
import ViewWithdrawsFilterButton from './ViewWithdrawsFilterButton';

export default function ViewWithdraws() {
    const [statusFilters, setStatusFilters] = useState([]);
    const [orgsFilters, setOrgsFilters] = useState([]);

    const { data: { result: withdraws } = { result: [] }, isLoading: isWithdrawsLoading } = useGetWithdrawsQuery();

    const [manageWithdraws, { isLoading: isManageWithdrawsLoading }] = useManageWithdrawsMutation();

    const handleAcceptWithdraw = (fields) => {
        manageWithdraws(fields)
            .unwrap()
            .then((res) => {
                message.success(`withdraw ${fields.status}`);
            })
            .catch((e) => {
                message.error(`failed to ${fields.status} withdraw`);
            });
    };
    const onFilter = (selectedKeys, info) => {
        console.log(info);
        if (info?.node?.isStatus) {
            if (info?.checked) {
                setStatusFilters((origin) => [...origin, info?.node?.title]);
            } else {
                setStatusFilters((origin) => origin.filter((status) => status != info?.node?.title));
            }
        } else {
            if (info?.checked) {
                setOrgsFilters((origin) => [...origin, { id: info?.node?.organization_id, title: info?.node?.title }]);
            } else {
                console.log('hi');
                console.log(orgsFilters);
                setOrgsFilters((origin) => origin.filter((org) => org.id != info?.node?.organization_id));
            }
        }
    };

    const filteredWithdraws = withdraws.filter((entry) => {
        let include = true;

        if (statusFilters.length > 0) {
            include =
                include &&
                statusFilters.some((filterStatus) => entry.status.toLowerCase() == filterStatus.toLowerCase());
        }

        if (orgsFilters.length > 0) {
            include = include && orgsFilters.some((org) => org.id == entry.organization_id);
        }

        return include;
    });

    const sortedWithdraws = [...withdraws].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const columns = [
        {
            key: uuidv4(),
            title: 'Date',
            dataIndex: 'createdAt',
            align: 'center',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: 'organization',
            key: uuidv4(),
            align: 'center',
            dataIndex: 'organization',

            render: (org, record) => (
                <div className='flex space-x-4 justify-center  items-center'>
                    <div>
                        <Avatar
                            src={org?.main_picture ? `/${URL}+organization/mainPicture/${org.main_picture}` : undefined}
                        />
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <Typography.Text>{org.name}</Typography.Text>
                        <Typography.Text
                            type='secondary'
                            className='line-clamp-2'
                        >
                            {record?.description ? record.description : 'No Description'}
                        </Typography.Text>
                    </div>
                </div>
            ),
        },
        {
            key: uuidv4(),
            title: 'Amount',
            dataIndex: 'amount',
            width: '5%',
            align: 'center',
            render: (amount) => (
                <div className='flex items-center justify-between space-x-2'>
                    {' '}
                    <div>{amount}</div>
                    <TiTicket className='text-primary text-[2em]'></TiTicket>
                </div>
            ),
        },
        {
            key: uuidv4(),
            title: 'Status',
            dataIndex: 'status',
            width: '15%',
            align: 'center',

            render: (status) => (
                <Tag
                    color={`${
                        status == 'accepted' ? 'green-inverse' : status != 'rejected' ? 'gold-inverse' : 'red-inverse'
                    }`}
                    className='text-[1.1em] py-2   px-2 flex justify-center items-center space-x-2 p-1 rounded-lg'
                >
                    {' '}
                    {status}
                </Tag>
            ),
        },
        {
            key: uuidv4(),
            title: 'Actions',
            align: 'center',

            render: (record) =>
                record.status == 'waiting' ? (
                    <div className='flex items-center space-x-2 justify-center'>
                        <Button
                            onClick={() => handleAcceptWithdraw({ withdraw_id: record.id, status: 'accepted' })}
                            type='link'
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={() => handleAcceptWithdraw({ withdraw_id: record.id, status: 'rejected' })}
                            type='link'
                            danger
                        >
                            Reject
                        </Button>
                    </div>
                ) : (
                    <></>
                ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tree: {
                        nodeSelectedBg: 'transparent',
                        nodeHoverBg: 'transparent',
                    },
                },
            }}
        >
            <div className='grid grid-cols-12'>
                <div className='col-start-2  col-span-10 flex flex-col w-full space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <ViewWithdrawsFilterButton onCheck={onFilter}></ViewWithdrawsFilterButton>
                        {/*  {statusFilters.map((st) => (
                            <div key={st}>{st}</div>
                        ))}
                        {orgsFilters.map((st) => (
                            <div key={st.id}>{st.title}</div>
                        ))} */}
                        {statusFilters.map((st) => (
                            <Tag
                                color={`${
                                    st == 'Accepted'
                                        ? 'green-inverse'
                                        : st == 'Waiting'
                                        ? 'gold-inverse'
                                        : 'red-inverse'
                                }`}
                                className='text-md flex justify-center items-center space-x-2 p-1 rounded-lg'
                                key={uuidv4()}
                            >
                                <div>{st}</div>
                            </Tag>
                        ))}

                        {orgsFilters.map((org) => (
                            <Tag
                                color={`geekblue-inverse`}
                                className='text-md flex justify-center items-center space-x-2 p-1 rounded-lg'
                                key={uuidv4()}
                            >
                                <div>{org.title}</div>
                            </Tag>
                        ))}
                    </div>
                    <div className='flex items-center  w-full justify-center'>
                        <Table
                            className='w-[100%]'
                            dataSource={sortedWithdraws}
                            columns={columns}
                            loading={isWithdrawsLoading || isManageWithdrawsLoading}
                            bordered
                            size='small'
                            pagination={{pageSize:'7'}}
                            
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
