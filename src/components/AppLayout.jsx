import { Grid, Layout, Spin, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from '../utils/antd.utils';
import Sider from './Sider';
import { useCheckAccessTokenQuery } from '../services/authSlice';
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlinePushpin } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { CgOrganisation } from 'react-icons/cg';
import { MdPayments } from 'react-icons/md';
import { TiTicket } from 'react-icons/ti';
import { GrTransaction } from 'react-icons/gr';
import { MdBlock } from 'react-icons/md';
import { SiGamejolt } from 'react-icons/si';
import { SlBadge } from 'react-icons/sl';
import { GoWorkflow } from 'react-icons/go';
import { FaStarHalfStroke } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

import { Icon } from '@iconify/react';

const { useToken } = theme;

export default function AppLayout() {
    const screens = Grid.useBreakpoint();
    const navigate = useNavigate();
    const { token } = useToken();

    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));
    const {
        data: checkAccessTokenObj,
        isLoading: isAccessTokenLoading,
        error: checkAccessTokenError,
    } = useCheckAccessTokenQuery();
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    useEffect(() => {
        setIsSiderOpen(isLargerThanLGScreen);
    }, [isLargerThanLGScreen]);

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    useEffect(() => {
        if (checkAccessTokenError) {
            navigate('/login');
        }
    }, [checkAccessTokenError]);

    return (
        <>
            {isAccessTokenLoading ? (
                <Spin fullscreen spinning tip={'checking access..'} />
            ) : (
                <Layout>
                    <Header
                        onTriggerSiderIconClicked={() => {
                            setIsSiderOpen(!isSiderOpen);
                        }}
                    />
                    <Layout hasSider={true}>
                        <Sider
                            isSiderOpen={isSiderOpen}
                            userMenu={[
                                {
                                    id: '1',
                                    name: 'Account',
                                    url: '/',
                                    icon: <MdAccountCircle style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                },
                                {
                                    id: '2',
                                    name: 'Featured',
                                    url: '/featured',
                                    icon: <AiOutlinePushpin style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                },
                                {
                                    id: '3',
                                    name: 'Attendees',
                                    url: '/attendees',
                                    icon: <FiUsers style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                },
                                {
                                    id: '4',
                                    name: 'Organizations',
                                    url: '/org',
                                    icon: <CgOrganisation style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                },
                                {
                                    id: '5',
                                    name: 'Payments',
                                    url: '/payment',
                                    icon: <MdPayments style={{ fontSize: '1.5em', color: token.colorPrimary }} />,

                                    sub_menu: [
                                        {
                                            id: '5-1',
                                            name: 'Packages',
                                            url: '/packages',
                                            icon: <TiTicket style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                        },
                                        {
                                            id: '5-2',
                                            name: 'Transactions',
                                            url: '/transactions',
                                            icon: (
                                                <GrTransaction
                                                    style={{ fontSize: '1.5em', color: token.colorPrimary }}
                                                />
                                            ),
                                        },
                                    ],
                                },
                                {
                                    id: '6',
                                    name: 'Gamification',
                                    url: '/gamification',
                                    icon: <SiGamejolt style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                    sub_menu: [
                                        {
                                            id: '6-1',
                                            name: 'Rules',
                                            url: '/gamification/rules',
                                            icon: (
                                                <GoWorkflow style={{ fontSize: '1.5em', color: token.colorPrimary }} />
                                            ),
                                        },
                                        {
                                            id: '6-2',
                                            name: 'Badges',
                                            url: '/gamification/badges',
                                            icon: <SlBadge style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                        },
                                        {
                                            id: '6-3',
                                            name: 'Points',
                                            url: '/gamification/points',
                                            icon: <FaStarHalfStroke style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                        },
                                        {
                                            id: '6-4',
                                            name: 'Shop',
                                            url: '/gamification/shop',
                                            icon: <LuShoppingCart style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                        },
                                    ],
                                },
                                {
                                    id: '7',
                                    name: 'Block list',
                                    url: '/blocked',
                                    icon: <MdBlock style={{ fontSize: '1.5em', color: token.colorPrimary }} />,

                                    sub_menu: [
                                        {
                                            id: '7-1',
                                            name: 'organizations',
                                            url: '/blocked/orgs',
                                            icon: (
                                                <CgOrganisation
                                                    style={{ fontSize: '1.5em', color: token.colorPrimary }}
                                                />
                                            ),
                                        },
                                        {
                                            id: '7-2',
                                            name: 'attendees',
                                            url: '/blocked/attendees',
                                            icon: <FiUsers style={{ fontSize: '1.5em', color: token.colorPrimary }} />,
                                        },
                                    ],
                                },
                                {
                                    id: '7',
                                    name: 'Reports',
                                    url: '/reports ',
                                    icon: (
                                        <Icon
                                            icon='icon-park-solid:table-report'
                                            style={{ fontSize: '1.5em', color: token.colorPrimary }}
                                        />
                                    ),
                                },
                            ]}
                        />
                        <Content style={contentStyle}>
                            <Outlet />
                        </Content>
                    </Layout>
                    <Footer />
                </Layout>
            )}
        </>
    );
}

const contentStyle = {
    padding: '1% 5%',
    backgroundColor: '#fdfdfd',
    minHeight: '82vh',
    width: '75%',
    overflow: 'auto',
    marginLeft: '10%',
};
