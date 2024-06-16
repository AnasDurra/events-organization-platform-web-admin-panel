import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/index.jsx';
import { store } from './store.js';
import { NotificationProvider } from './utils/useAntNotification.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider
            theme={{
                token: {
                    /*         colorPrimary: '#002c8c',
                     */
                    colorPrimary: '#2B3467',
                    fontFamily: 'Arial',
                },
                components: {
                    Layout: {
                        headerBg: '#2B3467',
                    },
                    Table: {
                        headerBg: '#2B3467',
                        headerSplitColor: 'transparent',
                        headerColor: 'white',
                        rowHoverBg: '334a9c',
                    },
                    Menu: {
                        itemSelectedBg: lightenColor('#2B3467', 70),
                    },
                },
            }}
        >
            <NotificationProvider>
                <RouterProvider router={router} />
            </NotificationProvider>
        </ConfigProvider>
    </Provider>
);

function lightenColor(color, amount) {
    const colorValue = color.replace('#', '');
    const num = parseInt(colorValue, 16);
    const amt = Math.round(2.55 * amount);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;
    const newColor = (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1);

    return `#${newColor}`;
}
