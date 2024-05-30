import { Button, Card, Col, ConfigProvider, Divider, Drawer, Image, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { TiTicket } from 'react-icons/ti';
import DesignBadgeDrawer from './DesignBadgeDrawer';
import { image } from './image';
export default function ViewAllBadges() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        headerBg: '#2B3467',
                    },
                },
            }}
        >
            <div className='relative'>
                <DesignBadgeDrawer
                    isDrawerOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                />
                <div className='grid grid-cols-12'>
                    <div className='col-start-2  col-span-10 flex flex-col w-full space-y-10'>
                        <div className='flex space-x-4'>
                            <Button
                                type='primary'
                                onClick={() => {
                                    setIsDrawerOpen(true);
                                }}
                            >
                                Design New Badge
                            </Button>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            <Card
                                className='shadow-lg hover:shadow-sm'
                                title={<div className='text-center  text-white'>{'name'}</div>}
                                extra={<BsThreeDots className='hover:cursor-pointer hover:scale-125 text-white' />}
                                onClick={() => {}}
                                bordered
                            >
                                <div className='flex justify-center items-center'>
                                    <img
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
                                        className='w-[9.5em]'
                                    ></img>
                                </div>
                                <Meta
                                    description={
                                        <div className='flex flex-col'>
                                            <Divider />
                                            <div className='flex justify-center items-center text-black'>Rules</div>
                                            {/* <Row justify={'center'}>
                                                  <Col span={8}>Price:</Col>
                                                  <Col
                                                      span={8}
                                                      className='text-black text-center'
                                                  >
                                                      {'price'}$
                                                  </Col>
                                              </Row>
                                              <Row justify={'center'}>
                                                  <Col span={8}>Tickets:</Col>
                                                  <Col
                                                      span={8}
                                                      className='text-black text-center'
                                                  >
                                                      {'tickets'}
                                                  </Col>
                                              </Row>
                                              <Row justify={'center'}>
                                                  <Col span={8}>Status:</Col>
                                                  <Col
                                                      span={8}
                                                      className='text-black text-center'
                                                  >
                                                      {'status'}
                                                  </Col>
                                              </Row> */}
                                        </div>
                                    }
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
