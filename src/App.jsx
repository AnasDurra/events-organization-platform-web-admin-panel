import { Grid, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { isLargerThanLG } from './utils/antd.utils';
import Sider from './components/Sider';

export default function App() {
  const { pathname } = useLocation();
  const screens = Grid.useBreakpoint();

  const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(
    isLargerThanLG(screens)
  );
  const [isSiderOpen, setIsSiderOpen] = useState(true);

  const renderHeader = () => {
    return pathname !== '/form/edit';
  };

  const renderSidebar = () => {
    return pathname !== '/form/edit';
  };

  useEffect(() => {
    setIsSiderOpen(isLargerThanLGScreen);
  }, [isLargerThanLGScreen]);

  useEffect(() => {
    setIsLargerThanLGScreen(isLargerThanLG(screens));
  }, [screens]);

  return (
    <Layout>
      {renderHeader() && (
        <Header
          onTriggerSiderIconClicked={() => {
            setIsSiderOpen(!isSiderOpen);
          }}
        />
      )}

      <Layout>
        {renderSidebar() && <Sider isSiderOpen={isSiderOpen} />}
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
};
