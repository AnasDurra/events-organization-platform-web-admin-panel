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
        {console.log("orgrgr: ",org)}
            <List
                itemLayout='horizontal'
                dataSource={org?.employees}
                renderItem={(emp) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size={'large'}
                                    src={URL + '/employee/profileImage/' + emp.profile_picture}
                                />
                            }
                            title={emp.first_name + ' ' + emp.last_name}
                            description={emp.phone_number}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
}


