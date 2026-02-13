import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import Home from './pages/home/Home';
import Lookup from './pages/lookup/Lookup';
import Report from './pages/report/Report';
import Search from './pages/search/Search';
import SearchDetail from './pages/search/SearchDetail';

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
            <Route path='/lookup' element={<Lookup />} />
            <Route path='/search' element={<Search />} />
            <Route path='/search/:id' element={<SearchDetail />} />
            <Route path='/report' element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
