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

  const { data: { result: orgs } = { result: [] }, isLoading: isOrgsLoading } =
    useGetOrganizationsQuery();

  const columns = [
    {
      key: 'name',
      width: '60%',
      render: (org) => (
        <Row>
          <Col
            offset={1}
            span={2}
          >
            <Avatar
              src={
                org?.main_picture
                  ? `/${URL}+organization/mainPicture/${org.main_picture}`
                  : undefined
              }
            />
          </Col>
          <Col offset={1}>
            {org.name} <br />{' '}
            <span style={{ color: 'GrayText' }}>
              {' '}
              ({org?.employees?.length} member
              {org?.employees?.length > 1 ? 'S' : null})
            </span>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Registered',
      dataIndex: 'registration_date',
      key: 'registration_date',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
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
      <Row
        align={'middle'}
        justify={'space-between'}
        style={{ margin: '1em' }}
      >
        <Col>
          <Title level={3}>Organizations</Title>
        </Col>
        <Col>
          <Button
            type='primary'
            onClick={() => {
              navigate('/org/new');
            }}
          >
            new organization
          </Button>
        </Col>
      </Row>
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
    </>
  );
}
