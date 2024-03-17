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
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrganizationsPage() {
  const navigate = useNavigate();
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
        dataSource={data}
      />
    </>
  );
}

const columns = [
  {
    width: '40%',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <Row>
        <Col
          offset={1}
          span={2}
        >
          <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${1}`} />
        </Col>
        <Col offset={1}>
          {text} <br /> <span style={{ color: 'GrayText' }}> (10 members)</span>
        </Col>
      </Row>
    ),
  },
  {
    title: 'Activation',
    dataIndex: 'activation',
    key: 'activation',
  },
  {
    title: 'Registered',
    dataIndex: 'registeration_date',
    key: 'registeration_date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>view profile</a>
        <a>view members</a>
        <a>deactivate</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    registeration_date: 'jan 17,2023',
    activation: true,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    registeration_date: 'jan 17,2023',
    activation: true,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    registeration_date: 'jan 17,2023',
    activation: true,
  },
];
