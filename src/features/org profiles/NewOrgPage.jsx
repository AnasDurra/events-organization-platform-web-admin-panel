import {
  ArrowLeftOutlined,
  BackwardFilled,
  BackwardOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewOrgMutation } from './orgsSlice';

export default function NewOrgPage() {
  const [addNewOrg, { isLoading, error }] = useAddNewOrgMutation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        wrapperCol={{
          span: 14,
        }}
        labelCol={{
          span: 10,
        }}
        labelAlign='left'
        initialValues={{
          remember: true,
        }}
        onFinish={async (fields) => {
          console.log('fields', fields);
          await addNewOrg({ ...fields, confirm_password: undefined })
            .unwrap()
            .then((payload) => {
              //TODO provide message api from context and add context holder globally
              messageApi.success('organization added');
              navigate('/org/all', { replace: true });
            })
            .catch((error) => {
              messageApi.error(error.data?.result?.response?.message[0]);
            });
        }}
        onFinishFailed={() => {}}
        autoComplete='off'
      >
        <Row
          justify={'start'}
          align={'middle'}
          gutter={20}
        >
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              type='text'
              onClick={() => navigate(-1)}
            />
          </Col>
          <Col span={14}>
            <Title
              level={3}
              style={{ margin: '0' }}
            >
              {' '}
              New organization registration{' '}
            </Title>
          </Col>
        </Row>

        <Row
          justify={'start'}
          gutter={20}
          style={{ marginTop: '4em' }}
        >
          <Col span={14}>
            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={24}>
                <Form.Item
                  label='name'
                  name='name'
                  wrapperCol={{
                    span: 14,
                  }}
                  labelCol={{
                    span: 5,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col
            style={{ backgroundColor: '#f5f5f5' }}
            span={14}
          >
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText', margin: '1em 0' }}
                >
                  Administrator
                </Title>
              </Col>
            </Row>
            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={12}>
                <Form.Item
                  label='first name'
                  name='first_name'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='last name'
                  name='last_name'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={12}>
                <Form.Item
                  label='email'
                  name='email'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='phone number'
                  name='phone_number'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input defaultValue='26888888' />
                </Form.Item>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={12}>
                <Form.Item
                  label='birth date'
                  name='birth_date'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={() => {}}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={14}>
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText', margin: '1em 0' }}
                >
                  Administrator credentials
                </Title>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={24}>
                <Form.Item
                  label='username'
                  name='username'
                  wrapperCol={{
                    span: 14,
                  }}
                  labelCol={{
                    span: 5,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='password'
                  name='password'
                  wrapperCol={{
                    span: 14,
                  }}
                  labelCol={{
                    span: 5,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password placeholder='input password' />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label='confirm password'
                  name='confirm_password'
                  wrapperCol={{
                    span: 14,
                  }}
                  labelCol={{
                    span: 5,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password placeholder='confirm password' />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row
          justify={'start'}
          gutter={20}
        >
          <Col span={24}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
