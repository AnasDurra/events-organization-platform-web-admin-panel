import { Avatar, Button, List, Pagination, Radio, Space } from 'antd';
import React from 'react';

const data = [
    {
        title: 'user number 1',
    },
    {
        title: 'user number 2',
    },
    {
        title: 'user number 3',
    },
    {
        title: 'user number 4',
    },
];

export default function ViewBannedAttendees() {
    return (
        <div className='grid grid-cols-12 w-full'>
            <div className='col-start-2 col-span-10'>
                <List
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                        align:'center'
                    }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={
                                <Button
                                    type='dashed'
                                    danger
                                >
                                    unblock
                                </Button>
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={<a href='https://ant.design'>{item.title}</a>}
                                description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
