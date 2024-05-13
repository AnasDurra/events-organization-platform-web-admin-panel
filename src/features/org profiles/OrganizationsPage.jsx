import { UploadOutlined } from '@ant-design/icons';
import {
    Avatar,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    List,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOrganizationsQuery } from './orgsSlice';
import { URL } from '../../api/constants';
import OrgMembersModal from './Modal-OrgMembers';

export default function OrganizationsPage() {
    const navigate = useNavigate();
    const [modalOrg, setModalOrg] = useState();
    const [isOrgMembersModalOpen, setIsOrgMembersModalOpen] = useState(false);

    const { data: { result: orgs } = { result: [] }, isLoading: isOrgsLoading } = useGetOrganizationsQuery();

    const columns = [
        {
            title: 'organization',
            key: 'name',
            width: '20%',
            render: (org) => (
                <div className='flex space-x-4  items-center'>
                    <div>
                        <Avatar
                            src={org?.main_picture ? `/${URL}+organization/mainPicture/${org.main_picture}` : undefined}
                        />
                    </div>

                    <div>{org.name}</div>
                </div>
            ),
            align: 'center',
        },
        {
            title: 'join date',
            dataIndex: 'registration_date',
            key: 'registration_date',
            width: '20%',
            align: 'center',
        },
        {
            title: 'events',
            dataIndex: 'eventCount',
            key: 'eventCount',
            width: '20%',
            align: 'center',
        },
        {
            title: 'members',
            dataIndex: 'memberCount',
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
                    {/* TODO link to profile */}
                    <a>view profile</a>
                    <a
                        onClick={() => {
                            setModalOrg(record);
                            setIsOrgMembersModalOpen(true);
                        }}
                    >
                        view members
                    </a>
                </Space>
            ),
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
                            onClick={() => {
                                navigate('/org/new');
                            }}
                        >
                            new organization
                        </Button>
                    </Space>
                    <Table
                        size='middle'
                        columns={columns}
                        dataSource={orgs.map((org) => ({ ...org, key: org.id }))}
                        loading={isOrgsLoading}
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
