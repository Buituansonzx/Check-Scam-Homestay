import React from 'react';
import { Button, Layout, Space, Avatar, Divider, Dropdown, MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import HeaderFilter from '../HeaderFilter/HeaderFilter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth/slices/slice';
import './AppHeader.scss';

type Props = {
  onLogin: () => void;
};

export default function AppHeader({ onLogin }: Props): React.ReactElement {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const shouldHideSearch = location.pathname.startsWith('/report');

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenu: MenuProps['items'] = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  // Default avatar if user doesn't have one
  const defaultAvatar = "https://api.dicebear.com/9.x/micah/svg?seed=Default";
  const userAvatar = user?.avatar || user?.avatar_url || defaultAvatar;

  return (
    <Layout.Header className='appHeader'>
      <div className='appHeader__inner'>
        <Link to='/' className='appHeader__brand' aria-label='CheckStay'>
          <img className='appHeader__logo' src='/CheckStay.svg' alt='CheckStay' />
          <span className='appHeader__name'>CheckStay</span>
        </Link>

        {!shouldHideSearch ? (
          <div className='appHeader__filter'>
            <HeaderFilter />
          </div>
        ) : (
          <div className='appHeader__filter' />
        )}

        <Space size={24}>
          {user ? (
            <div className="header-actions">
              <div className="header-notifications">
                <BellOutlined style={{ fontSize: 20 }} />
              </div>
              
              <div className="header-divider"></div>

              <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
                <div className="header-avatar">
                  <Avatar 
                    size={40} 
                    src={userAvatar}
                  />
                </div>
              </Dropdown>
            </div>
          ) : (
            <Button onClick={onLogin} type="primary" className="login-btn">Đăng nhập</Button>
          )}
        </Space>
      </div>
    </Layout.Header>
  );
}
