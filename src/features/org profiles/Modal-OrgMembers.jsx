import { Avatar, Button, Col, List, Modal, Row, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { URL } from '../../api/constants';

export default function OrgMembersModal({ org, isOpen, onClose }) {
  return (
    <Modal
      title={
        <Title
          level={4}
          style={{ margin: '0' }}
        >
          Team Members
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <List dataSource={data}>
        <Row>
          <Col span={16}>
            <List
              itemLayout='horizontal'
              dataSource={org?.employees}
              renderItem={(emp) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={'large'}
                        src={
                          URL + 'employee/profileImage/' + emp.profile_picture
                        }
                      />
                    }
                    title={emp.first_name + ' ' + emp.last_name}
                    description={emp.phone_number}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </List>
    </Modal>
  );
}

const data = [
  {
    gender: 'male',
    name: 'abo abdo',
    desc: 'abo_abdo',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/6.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
    },
  },
  {
    gender: 'male',
    name: 'abo abdo',
    desc: 'abo_abdo',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/6.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
    },
  },
  {
    gender: 'male',
    name: 'abo abdo',
    desc: 'abo_abdo',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/6.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/6.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/6.jpg',
    },
  },
];
