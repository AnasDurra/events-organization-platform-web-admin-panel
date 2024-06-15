import { Button, Dropdown, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetOrganizationsQuery } from '../org profiles/orgsSlice';
const initialFilterData = [
    {
        title: 'Status',
        key: '0-0',
        checkable: false,
        children: [
            {
                title: 'Accepted',
                key: '0-0-0',
                selectable: false,
                isLeaf: true,
                isStatus: true,
            },
            {
                title: 'Waiting',
                key: '0-0-1',
                selectable: false,
                isLeaf: true,
                isStatus: true,
            },
            {
                title: 'Rejected',
                key: '0-0-2',
                selectable: false,
                isLeaf: true,
                isStatus: true,
            },
        ],
    },
    {
        title: 'Organizations',
        key: '0-1',
        checkable: false,
    },
];
const updateFilterData = (list, key, children) =>
    list.map((node) => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateFilterData(node.children, key, children),
            };
        }
        return node;
    });

export default function ViewWithdrawsFilterButton({ onCheck }) {
    const [filterData, setFilterData] = useState(initialFilterData);

    const { data: { result: orgs } = { result: [] }, isSuccess: isOrgsSuccess } = useGetOrganizationsQuery();

    useEffect(() => {
        if (isOrgsSuccess) {
            setFilterData((origin) =>
                updateFilterData(
                    origin,
                    '0-1',
                    orgs.map((org) => ({
                        key: `0-1-${org.id}`,
                        title: org.name,
                        isStatus: false,
                        organization_id: org.id,
                    }))
                )
            );
        }
    }, [isOrgsSuccess]);
    return (
        <Dropdown
            dropdownRender={() => {
                const onSelect = (selectedKeys, info) => {
                    console.log('selected', selectedKeys, info);
                };

                return (
                    <Tree
                        defaultExpandedKeys={['0-0']}
                        rootClassName='bg-gray-50 py-2 px-8 border-2 border-primary min-w-[20svw]'
                        onSelect={onSelect}
                        onCheck={onCheck}
                        checkable
                        treeData={filterData}
                    />
                );
            }}
            trigger={['click']}
        >
            <Button type='dashed'>Filter</Button>
        </Dropdown>
    );
}
