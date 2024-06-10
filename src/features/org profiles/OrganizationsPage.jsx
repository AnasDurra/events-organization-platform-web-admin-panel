import { Avatar, Button, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../api/constants';
import OrgMembersModal from './Modal-OrgMembers';
import { useGetOrganizationsQuery } from './orgsSlice';
import { useBanOrganizationMutation } from '../ban/banSlice';
import { useNotification } from '../../utils/useAntNotification';

export default function OrganizationsPage() {
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const [modalOrg, setModalOrg] = useState();
    const [isOrgMembersModalOpen, setIsOrgMembersModalOpen] = useState(false);

    const { data: { result: orgs } = { result: [] }, isLoading: isOrgsLoading } = useGetOrganizationsQuery();
    const [banOrg, { isLoading: isBanOrgLoading }] = useBanOrganizationMutation();

    const columns = [
        {
            title: 'organization',
            key: 'name',
            width: '20%',
            render: (org, record) => (
                <div className='flex space-x-4  items-center'>
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
            align: 'center',
        },
        {
            title: 'join date',
            dataIndex: 'createdAt',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
            key: 'registration_date',
            width: '20%',
            align: 'center',
        },
        {
            title: 'events',
            dataIndex: 'events',
            render: (events) => Array.isArray(events) && events.length,
            key: 'eventCount',
            width: '20%',
            align: 'center',
        },
        {
            title: 'members',
            dataIndex: 'employees',
            render: (employees) => Array.isArray(employees) && employees.length,

            key: 'memberCount',
            width: '20%',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            align: 'center',

            render: (_, record) => (
                <Space size='middle'>
                    <a
                        onClick={() => {
                            setModalOrg(record);
                            setIsOrgMembersModalOpen(true);
                        }}
                    >
                        view members
                    </a>
                    {console.log(record)}
                    <a
                        className='text-red-400'
                        onClick={() =>
                            banOrg(record.id)
                                .unwrap()
                                .then((_) => {
                                    openNotification({
                                        type: 'success',
                                        message: `Organization ${record.name} Blocked`,
                                        placement: 'bottomRight',
                                    });
                                })
                                .catch((e) => {
                                    openNotification({
                                        type: 'error',
                                        message: `Failed to block organization @${record.name}`,
                                        placement: 'bottomRight',
                                    });
                                })
                        }
                    >
                        {record.idBlocked ? 'Unblock' : 'Block'}
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='grid grid-cols-12 w-full'>
                {console.log(orgs)}
                <div className='col-start-2 col-span-10'>
                    <Space
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button
                            type='primary'
                            onClick={() => {
                                navigate('/org/new');
                            }}
                        >
                            new
                        </Button>
                    </Space>
                    <Table
                        size='middle'
                        columns={columns}
                        dataSource={orgs.map((org) => ({ ...org, key: org.id }))}
                        loading={isOrgsLoading || isBanOrgLoading}
                        pagination={{ pageSize: '5' }}
                    />

                    <OrgMembersModal
                        isOpen={isOrgMembersModalOpen}
                        org={modalOrg}
                        onClose={() => setIsOrgMembersModalOpen(false)}
                    />
                </div>
            </div>
        </>
    );
}
