import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/index.jsx';
import { store } from './store.js';
import { NotificationProvider } from './utils/useAntNotification.jsx';

const theme = {
    token: {
        colorPrimary: '#002c8c',
    },
    components: {
        Layout: {
            headerBg: '#2B3467',
        },
        Table: {
            headerBg: '#334a9c',
            headerSplitColor: 'transparent',
            headerColor: 'white',
            rowHoverBg:'334a9c'
        },
    },
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider theme={theme}>
            <NotificationProvider>
                <RouterProvider router={router} />
            </NotificationProvider>
        </ConfigProvider>
    </Provider>
);
