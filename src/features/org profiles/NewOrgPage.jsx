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
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewOrgPage() {
  const navigate = useNavigate();
  return (
    <>
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
        onFinish={() => {}}
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
        >
          <Col span={14}>
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  Organization details
                </Title>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={24}>
                <Form.Item
                  wrapperCol={{
                    span: 14,
                  }}
                  labelCol={{
                    span: 5,
                  }}
                  label='name'
                  name='name'
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
          </Col>

          <Col
            style={{ backgroundColor: '#f5f5f5' }}
            span={14}
          >
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
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
                  name='first name'
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
                  name='last name'
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
                  name='phone number'
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
                  label='country'
                  name='country'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue='lucy'
                    options={[
                      {
                        value: 'lucy',
                        label: 'Lucy',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label='birth date'
                  name='birth date'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker onChange={() => {}} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={14}>
            <Row>
              <Col>
                <Title
                  level={5}
                  style={{ color: 'GrayText' }}
                >
                  security
                </Title>
              </Col>
            </Row>

            <Row
              justify={'start'}
              gutter={20}
            >
              <Col span={14}>
                <Form.Item
                  label='password'
                  name='password'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password placeholder='input password' />
                </Form.Item>
              </Col>

              <Col span={14}>
                <Form.Item
                  label='confirm password'
                  name='confirm password'
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
