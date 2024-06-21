import { Avatar, Button, List, Pagination, Radio, Space, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {
    useGetBannedAttendeesQuery,
    useLazyGetBannedAttendeesQuery,
    useLazyGetBannedOrgsQuery,
    useUnBanOrganizationMutation,
} from './banSlice';

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

    const [unBanOrg, { isLoading: isUnBanOrgLoading }] = useUnBanOrganizationMutation();

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
                    loading={isAttendeesLoading || isUnBanOrgLoading}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={
                                <Button
                                    type='dashed'
                                    danger
                                    onClick={() => {
                                        unBanOrg(item?.organization?.id)
                                            .unwrap()
                                            .then((_) => {
                                                notification.success({
                                                    message: `Organization @${item?.organization?.name} unblocked`,
                                                    placement: 'bottomRight',
                                                });
                                            })
                                            .catch((e) => {
                                                notification.error({
                                                    message: `Failed to unblocked organization @${item?.organization?.name}`,
                                                    placement: 'bottomRight',
                                                });
                                            });
                                    }}
                                >
                                    unblock
                                </Button>
                            }
                        >
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
