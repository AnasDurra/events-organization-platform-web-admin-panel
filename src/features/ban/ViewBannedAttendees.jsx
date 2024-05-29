import { Avatar, Button, List, Pagination, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetBannedAttendeesQuery, useLazyGetBannedAttendeesQuery } from './banSlice';

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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [
        getBannedAttendees,
        {
            data: { result: { data: bannedAttendees, count: totalPages } } = {
                result: { data: [], count: 0 },
            },
            isLoading: isAttendeesLoading,
        },
    ] = useLazyGetBannedAttendeesQuery({ pageSize, page });

    useEffect(() => {
        getBannedAttendees({ page, pageSize });
    }, [page]);

    return (
        <div className='grid grid-cols-12 w-full'>
            <div className='col-start-2 col-span-10'>
                <List
                    header={'Currently Blocked Attendees'}
                    pagination={{
                        onChange: (page) => {
                            setPage(page);
                        },
                        pageSize: pageSize,
                        current: page,
                        align: 'center',
                        hideOnSinglePage: true,
                    }}
                    dataSource={bannedAttendees}
                    loading={isAttendeesLoading}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={
                                <Button
                                    type='dashed'
                                    danger
                                    onClick={() => {
                                        // TODO unblock
                                    }}
                                >
                                    unblock
                                </Button>
                            }
                        >
                            {console.log(item)}
                            <List.Item.Meta
                                avatar={<Avatar src={`${item.attendee?.profile_img}`} />}
                                title={<a href='https://ant.design'>{item.attendee?.full_name}</a>}
                                description={`Blocked at: ${item.blocked_at}`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
