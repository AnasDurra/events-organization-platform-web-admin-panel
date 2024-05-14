import { DownSquareTwoTone } from '@ant-design/icons';
import { Card, Col, Descriptions, Divider, Row, theme } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { TiTicket } from 'react-icons/ti';
import { BsThreeDots } from 'react-icons/bs';

const { useToken } = theme;


const items = [
    {
        key: '1',
        label: 'Price',
        children: '100$',
    },
    {
        key: '2',
        label: 'Tickets',
        children: '1500',
    },
    {
        key: '3',
        label: 'Status',
        children: 'Active',
    },
];

export default function PackageCard({ name, price, status, tickets, onClick }) {
    const { token } = useToken();

    return (
        <Card
            className='shadow-lg hover:shadow-sm'
            title={<div className='text-center' style={{backgroundColor:token.colorPrimary}}>{name}</div>}
            extra={<BsThreeDots className='hover:cursor-pointer hover:text-lg' />}
            onClick={onClick}

        >
            <div className='flex justify-center items-center'>
                <TiTicket className='text-[5em] text-yellow-300 ' />
            </div>
            <Meta
                description={
                    <div className='flex flex-col mt-4'>
                        <Divider />
                        <Row justify={'center'}>
                            <Col span={8}>Price:</Col>
                            <Col
                                span={8}
                                className='text-black text-center'
                            >
                                {price}$
                            </Col>
                        </Row>
                        <Row justify={'center'}>
                            <Col span={8}>Tickets:</Col>
                            <Col
                                span={8}
                                className='text-black text-center'
                            >
                                {tickets}
                            </Col>
                        </Row>
                        <Row justify={'center'}>
                            <Col span={8}>Status:</Col>
                            <Col
                                span={8}
                                className='text-black text-center'
                            >
                                {status}
                            </Col>
                        </Row>
                    </div>
                }
            />
        </Card>
    );
}
