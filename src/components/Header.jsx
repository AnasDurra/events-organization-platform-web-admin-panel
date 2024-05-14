import { MoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Flex, Grid } from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import { isLargerThanLG } from '../utils/antd.utils';
import { useEffect, useState } from 'react';
import { useLogoutMutation } from '../services/authSlice';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../utils/useAntNotification';

export default function Header({ onTriggerSiderIconClicked }) {
    const screens = Grid.useBreakpoint();
    const navigate = useNavigate();
    const { openNotification } = useNotification();

    const [logout,{isLoading:isLogoutLoading}] = useLogoutMutation();

    const [isLargerThanLGScreen, setIsLargerThanLGScreen] = useState(isLargerThanLG(screens));

    useEffect(() => {
        setIsLargerThanLGScreen(isLargerThanLG(screens));
    }, [screens]);

    return (
        <AntDHeader style={triggerStyle}>
            <div className='flex justify-between  lg:justify-end w-full items-start'>
                {!isLargerThanLGScreen && (
                    <UnorderedListOutlined
                        onClick={onTriggerSiderIconClicked}
                        style={triggerSiderStyle}
                    />
                )}
                <Button
                    type='link'
                    className='text-white hover:bg-white'
                    loading={isLogoutLoading}
                    onClick={() => {
                        logout().then((res) => {
                            if (res.error) {
                                openNotification({
                                    type: 'error',
                                    message: 'Failed to logout',
                                    description: 'try again later',
                                    placement: 'bottomRight',
                                });
                            } else {
                                navigate('/login');
                            }
                        });
                    }}
                >
                    Logout
                </Button>
            </div>
        </AntDHeader>
    );
}

const triggerSiderStyle = { fontSize: '1.5em', color: 'whitesmoke' };
const triggerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: '1em',
};
