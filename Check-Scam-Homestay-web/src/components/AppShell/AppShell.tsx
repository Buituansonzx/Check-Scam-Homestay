import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import { AuthModalProvider, useAuthModal } from 'shared/authModal';
import './AppShell.scss';

const { Content } = Layout;

export default function AppShell(): React.ReactElement {
  return (
    <AuthModalProvider>
      <AppShellInner />
    </AuthModalProvider>
  );
}

function AppShellInner(): React.ReactElement {
  const { openLogin } = useAuthModal();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Layout className='appShell'>
      <AppHeader onLogin={openLogin} />
      <Content className='content'>
        <div className='content__inner'>
          <Outlet />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}
