import React from 'react';
import { Space, Typography } from 'antd';

import './RightPanel.scss';

const { Text, Link } = Typography;

type Props = {
  year?: number;
};

export default function RightPanelFooter({ year = 2024 }: Props): React.ReactElement {
  return (
    <div className='rightPanelFooter'>
      <Space size={8} wrap className='rightPanelFooter__links'>
        <Link href='#' className='rightPanelFooter__link'>
          Điều khoản
        </Link>
        <Text type='secondary'>•</Text>
        <Link href='#' className='rightPanelFooter__link'>
          Chính sách bảo mật
        </Link>
        <Text type='secondary'>•</Text>
        <Link href='#' className='rightPanelFooter__link'>
          Hợp tác ký quỹ
        </Link>
      </Space>

      <Text type='secondary' className='rightPanelFooter__copy'>
        © {year} CheckStay Social - Nền tảng Tra cứu & Cộng đồng Tin cậy
      </Text>
    </div>
  );
}
