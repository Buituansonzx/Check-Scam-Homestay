import React from 'react';
import { Avatar, Button, Card, Space, Tag, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

import './ScamAlertCard.scss';

const { Text, Title } = Typography;

type Props = {
  name: string;
  phoneMasked?: string;
  headline: string;
  detailsLeft: Array<{ label: string; value: string }>;
  detailsRight: Array<{ label: string; value: string }>;
  reportCountText?: string;
};

export default function ScamAlertCard({
  name,
  phoneMasked = '(SĐT: 0912xxxx89)',
  headline,
  detailsLeft,
  detailsRight,
  reportCountText = 'Đã có 14 người báo cáo tài khoản này',
}: Props): React.ReactElement {
  const disclaimerText =
    '* Legal Disclaimer: Thông tin bài đăng dựa trên xác thực định danh tại thời điểm hiện tại. CheckStay khuyến khích giao dịch qua cổng ký quỹ để đảm bảo an toàn tối đa.';

  return (
    <Card bordered={false} className='scamAlertCard'>
      <div className='scamAlertCard__top'>
        <Space size={10} align='start'>
          <Avatar size={44}>{name.trim().slice(0, 1).toUpperCase()}</Avatar>
          <div>
            <Space size={8} wrap>
              <Text strong>{name}</Text>
              <Text type='secondary'>{phoneMasked}</Text>
              <Tag color='red' className='scamAlertCard__tag'>
                BLACKLISTED
              </Tag>
            </Space>
            <Title level={5} className='scamAlertCard__headline'>
              {headline}
            </Title>
          </div>
        </Space>
      </div>

      <div className='scamAlertCard__details'>
        <div className='scamAlertCard__detailCol'>
          {detailsLeft.map((d) => (
            <div key={d.label} className='scamAlertCard__detailRow'>
              <Text type='secondary'>{d.label}</Text>
              <Text>{d.value}</Text>
            </div>
          ))}
        </div>
        <div className='scamAlertCard__detailCol'>
          {detailsRight.map((d) => (
            <div key={d.label} className='scamAlertCard__detailRow'>
              <Text type='secondary'>{d.label}</Text>
              <Text>{d.value}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className='scamAlertCard__bottom'>
        <Text type='danger' className='scamAlertCard__reportCount'>
          <WarningOutlined /> {reportCountText}
        </Text>

        <Button type='primary' danger className='scamAlertCard__cta'>
          Xác nhận hữu ích
        </Button>
      </div>

      <Text type='secondary' className='scamAlertCard__disclaimer'>
        {disclaimerText}
      </Text>
    </Card>
  );
}
