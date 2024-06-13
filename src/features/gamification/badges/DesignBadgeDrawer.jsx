import { Drawer } from 'antd';
import React from 'react';
import DesignBadge from './design/DesignBadge';
export default function DesignBadgeDrawer({ isDrawerOpen, onClose, onFinish, showSettings = true }) {
    return (
        <Drawer
            title='Design Badge'
            placement='top'
            closable={true}
            onClose={onClose}
            open={isDrawerOpen}
            //getContainer={false}
            height={'90svh'}
        >
            <div style={{ zIndex: 10001 }}>
                <DesignBadge
                    showSettings={showSettings}
                    onFinish={onFinish}
                ></DesignBadge>
            </div>
        </Drawer>
    );
}
