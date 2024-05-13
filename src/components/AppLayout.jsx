import { Grid, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from '../utils/antd.utils';
import Sider from './Sider';

export default function AppLayout() {
    const screens = Grid.useBreakpoint();

    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));
    const [isSiderOpen, setIsSiderOpen] = useState(true);

    useEffect(() => {
        setIsSiderOpen(isLargerThanLGScreen);
    }, [isLargerThanLGScreen]);

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    return (
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
                            icon: null,
                        },
                        {
                            id: '2',
                            name: 'Featured',
                            url: '/featured',
                            icon: null,
                        },
                        {
                            id: '3',
                            name: 'Attendees',
                            url: '/attendees',
                            icon: null,
                        },
                        {
                            id: '4',
                            name: 'Organizations',
                            url: '/org',
                            icon: null,
                        },

                        {
                            id: '5',
                            name: 'Payments',
                            url: '/atten1212dee-events',
                            icon: null,
                            sub_menu: [
                                {
                                    id: '5-1',
                                    name: 'Packages',
                                    url: '/packages',
                                    icon: null,
                                },
                                {
                                    id: '5-2',
                                    name: 'Transactions',
                                    url: '/attendee-ev1121ents/near',
                                    icon: null,
                                },
                            ],
                        },
                        {
                            id: '6',
                            name: 'Block list',
                            url: '/attendee-eve121212124nts',
                            icon: null,
                            sub_menu: [
                                {
                                    id: '6-1',
                                    name: 'organizations',
                                    url: '/atte3434ndee-events/popular',
                                    icon: null,
                                },
                                {
                                    id: '6-2',
                                    name: 'attendees',
                                    url: '/at232tendee-events/near',
                                    icon: null,
                                },
                            ],
                        },
                    ]}
                />
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
            <Footer />
        </Layout>
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
