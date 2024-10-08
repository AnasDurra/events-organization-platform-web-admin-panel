import { Avatar, Button, Space, Table, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../api/constants';
import OrgMembersModal from './Modal-OrgMembers';
import { useGetOrganizationsQuery } from './orgsSlice';
import { useBanOrganizationMutation, useUnBanOrganizationMutation } from '../ban/banSlice';

export default function OrganizationsPage() {
    const navigate = useNavigate();

    const [modalOrg, setModalOrg] = useState();
    const [isOrgMembersModalOpen, setIsOrgMembersModalOpen] = useState(false);

    const { data: { result: orgs } = { result: [] }, isLoading: isOrgsLoading } = useGetOrganizationsQuery();
    const [banOrg, { isLoading: isBanOrgLoading }] = useBanOrganizationMutation();
    const [unBanOrg, { isLoading: isUnBanOrgLoading }] = useUnBanOrganizationMutation();

    const columns = [
        {
            title: 'organization',
            key: 'name',
            width: '20%',
            render: (org, record) => (
                <div className='flex space-x-4  items-center'>
                    <div>
                        <Avatar src={`${URL}/organization/mainPicture/${org?.main_picture}`} />
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
                        className={`${record.is_blocked ? 'text-gray-500' : 'text-red-400'}`}
                        onClick={() =>
                            record.is_blocked
                                ? unBanOrg(record?.id)
                                      .unwrap()
                                      .then((_) => {
                                          notification.success({
                                              message: `Organization @${record?.name} unblocked`,
                                              placement: 'bottomRight',
                                          });
                                      })
                                      .catch((e) => {
                                          notification.error({
                                              message: `Failed to unblocked organization @${record?.name}`,
                                              placement: 'bottomRight',
                                          });
                                      })
                                : banOrg(record.id)
                                      .unwrap()
                                      .then((_) => {
                                          notification.success({
                                              message: `Organization @${record?.name} blocked`,
                                              placement: 'bottomRight',
                                          });
                                      })
                                      .catch((e) => {
                                          notification.error({
                                              message: `Failed to block organization @${record?.name}`,
                                              placement: 'bottomRight',
                                          });
                                      })
                        }
                    >
                        {record.is_blocked ? 'Unblock' : 'Block'}
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
                        {console.log(orgs)}
                    </Space>
                    <Table
                        size='middle'
                        columns={columns}
                        dataSource={orgs.map((org) => ({ ...org, key: org.id }))}
                        loading={isOrgsLoading || isBanOrgLoading || isUnBanOrgLoading}
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
