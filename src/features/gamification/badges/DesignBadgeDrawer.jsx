import { Drawer } from 'antd';
import React from 'react';
import DesignBadge from './design/DesignBadge';
export default function DesignBadgeDrawer({ isDrawerOpen, onClose, onOk }) {
    return (
        <Drawer
            title='Design Badge'
            placement='top'
            closable={true}
            onClose={onClose}
            open={isDrawerOpen}
            getContainer={false}
            height={'79svh'}
            zIndex={1}
        >
            <div style={{zIndex:10001}}>
                <DesignBadge></DesignBadge>
            </div>
        </Drawer>
    );
}
