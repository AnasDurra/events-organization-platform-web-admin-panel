import { Drawer } from 'antd';
import React from 'react';
import DesignBadge from './design/DesignBadge';
export default function DesignBadgeDrawer({ isDrawerOpen, onClose, onFinish }) {
    return (
        <Drawer
            title='Design Badge'
            placement='top'
            closable={true}
            onClose={onClose}
            open={isDrawerOpen}
            getContainer={false}
            height={'90svh'}
            zIndex={1}
        >
            <div style={{ zIndex: 10001 }}>
                <DesignBadge onFinish={onFinish}></DesignBadge>
            </div>
        </Drawer>
    );
}
