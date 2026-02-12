import React from 'react';
import { Button, Layout, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import HeaderFilter from '../HeaderFilter/HeaderFilter';
import './AppHeader.scss';

type Props = {
  onLogin: () => void;
};

export default function AppHeader({ onLogin }: Props): React.ReactElement {
  const location = useLocation();
  const shouldHideSearch = location.pathname.startsWith('/report');

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

        <Space>
          <Button onClick={onLogin}>Đăng nhập</Button>
        </Space>
      </div>
    </Layout.Header>
  );
}
