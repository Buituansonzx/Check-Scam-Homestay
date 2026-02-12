import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import Home from './pages/home/Home';
import Report from './pages/report/Report';
import Search from './pages/search/Search';
import SearchDetail from './pages/search/SearchDetail';
import SocialCallback from './pages/auth/SocialCallback';

export default function App(): React.ReactElement {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF6B35',
          fontFamily:
            "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:id' element={<SearchDetail />} />
            <Route path='/report' element={<Report />} />
            <Route path='/auth/callback' element={<SocialCallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
