import { AppstoreOutlined, CloseOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { TiTicket } from 'react-icons/ti';
import { MdCardGiftcard } from 'react-icons/md';
import { CgPushChevronUpR } from 'react-icons/cg';
import { GiHummingbird } from 'react-icons/gi';
import { Outlet, useNavigate } from 'react-router-dom';
const items = [
    {
        type: 'group',
        label: <div className='text-center'>Categories</div>,
    },
    {
        key: 'tickets',
        label: (
            <div className='flex  justify-between items-center'>
                <div>Tickets</div>

                <TiTicket className='text-xl'></TiTicket>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'discount',
        label: (
            <div className='flex  justify-between items-center'>
                <div>Discount cards</div>

                <MdCardGiftcard className='text-xl'></MdCardGiftcard>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'form',
        label: (
            <div className='flex  justify-between items-center'>
                <div>Form booster</div>

                <CgPushChevronUpR className='text-xl'></CgPushChevronUpR>
            </div>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: 'early',
        label: (
            <div className='flex  justify-between items-center'>
                <div>Early access</div>

                <GiHummingbird className='text-xl'></GiHummingbird>
            </div>
        ),
    },
];

export default function ViewShop() {
    const navigate = useNavigate();

    const onClick = (e) => {
        if (e.key == 'tickets') navigate('/gamification/shop');
    };

    return (
        <div className='flex space-x-8 justify-between'>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={['tickets']}
                mode='vertical'
                items={items}
                className='min-w-[15svw] rounded-3xl h-fit '
            />
        </div>
    );
}
