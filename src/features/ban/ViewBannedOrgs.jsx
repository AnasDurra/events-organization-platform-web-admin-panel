import { Avatar, Button, List, Pagination, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetBannedAttendeesQuery, useLazyGetBannedAttendeesQuery, useLazyGetBannedOrgsQuery } from './banSlice';

export default function ViewBannedOrgs() {
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
    ] = useLazyGetBannedOrgsQuery({ pageSize, page });

    useEffect(() => {
        getBannedAttendees({ page, pageSize });
    }, [page]);

    return (
        <div className='grid grid-cols-12 w-full'>
            <div className='col-start-2 col-span-10'>
                <List
                    header={'Currently Blocked Orgs'}
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
                                avatar={<Avatar src={`${item.organization?.main_picture}`} />}
                                title={<a href='https://ant.design'>{item.organization?.name}</a>}
                                description={`Blocked at: ${item.blocked_at}`}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
