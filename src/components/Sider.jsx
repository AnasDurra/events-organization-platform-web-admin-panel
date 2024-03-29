import { GoOrganization } from 'react-icons/go';

import { Layout, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const { Sider: AntDSider } = Layout;

export default function Sider({ isSiderOpen }) {
  const navigate = useNavigate();
  return (
    <AntDSider
      collapsedWidth='0'
      trigger={null}
      collapsed={!isSiderOpen}
    >
      <Menu
        mode='inline'
        style={siderMenuStyle}
        items={items}
        onSelect={(info) => {
          navigate(info.key);
        }}
      />
    </AntDSider>
  );
}

const items = [getItem('Organizations', 'org/all', <GoOrganization />)];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const siderMenuStyle = {
  height: '100%',
};
