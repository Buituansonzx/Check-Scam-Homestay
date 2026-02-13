import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  HomeOutlined,
  SearchOutlined,
  SafetyOutlined,
  HistoryOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import './HomeSidebar.scss';

const { Text } = Typography;

type NavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { key: 'feed', label: 'Bảng tin', icon: <HomeOutlined /> },
  { key: 'lookup', label: 'Tra cứu tập trung', icon: <SearchOutlined /> },
  { key: 'verify', label: 'Dịch vụ Xác thực HomeStay', icon: <SafetyOutlined /> },
  { key: 'history', label: 'Lịch sử check', icon: <HistoryOutlined /> },
];

type Props = {
  activeKey?: string;
  onNavClick?: (key: string) => void;
  onQuickSearch?: () => void;
  onReport?: () => void;
};

export default function HomeSidebar({
  activeKey = 'feed',
  onNavClick,
  onQuickSearch,
  onReport,
}: Props): React.ReactElement {
  return (
    <div className='homeSidebar'>
      <div className='homeSidebar__nav'>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type='button'
              className={isActive ? 'homeSidebar__navItem homeSidebar__navItem--active' : 'homeSidebar__navItem'}
              onClick={() => onNavClick?.(item.key)}
            >
              <span className='homeSidebar__navIcon' aria-hidden>
                {item.icon}
              </span>
              <span className='homeSidebar__navLabel'>{item.label}</span>
            </button>
          );
        })}
      </div>

      <Button
        type='primary'
        icon={<SearchOutlined />}
        className='homeSidebar__quickSearch'
        onClick={onQuickSearch}
      >
        Tra cứu nhanh
      </Button>

      {activeKey === 'lookup' ? (
        <Card className='homeSidebar__helpCard' bordered={false}>
          <div className='homeSidebar__helpHeading'>
            <span className='homeSidebar__helpDot' aria-hidden>
              <ExclamationCircleFilled />
            </span>
            <Text strong className='homeSidebar__helpTitle'>
              CHECKSTAY GIÚP BẠN
            </Text>
          </div>

          <div className='homeSidebar__helpList'>
            <div className='homeSidebar__helpItem'>
              <CheckCircleFilled className='homeSidebar__helpCheck' aria-hidden />
              <span>Phát hiện scam qua SĐT/STK</span>
            </div>
            <div className='homeSidebar__helpItem'>
              <CheckCircleFilled className='homeSidebar__helpCheck' aria-hidden />
              <span>Xem review thật từ cộng đồng</span>
            </div>
            <div className='homeSidebar__helpItem'>
              <CheckCircleFilled className='homeSidebar__helpCheck' aria-hidden />
              <span>Kiểm tra xác minh host thực tế</span>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className='homeSidebar__reportCard' bordered={false}>
        <Space direction='vertical' size={8}>
          <Text strong className='homeSidebar__reportTitle'>
            Bị lừa đảo?
          </Text>
          <Text type='secondary' className='homeSidebar__reportDesc'>
            Tố cáo ngay đến CheckStay để cảnh báo cộng đồng.
          </Text>
          <Button
            type='primary'
            danger
            icon={<WarningOutlined />}
            onClick={onReport}
            className='homeSidebar__reportBtn'
          >
            Gửi báo cáo
          </Button>
        </Space>
      </Card>
    </div>
  );
}
