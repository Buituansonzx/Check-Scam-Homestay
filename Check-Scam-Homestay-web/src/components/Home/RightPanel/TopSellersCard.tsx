import React from 'react';
import { Avatar, Button, Card, List, Space, Tag, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import './RightPanel.scss';

const { Text } = Typography;

type Seller = {
  name: string;
  subtitle: string;
  score: string;
  rank: number;
};

type Props = {
  title?: string;
  subtitle?: string;
  sellers: Seller[];
};

export default function TopSellersCard({
  title = 'Top Seller Uy Tín',
  subtitle = 'DỰA TRÊN SỐ TIỀN KÝ QUỸ (ICO)',
  sellers,
}: Props): React.ReactElement {
  return (
    <Card bordered={false} className='rightPanelCard'>
      <div className='rightPanelCard__header'>
        <Space align='center' size={8}>
          <Text strong>{title}</Text>
          <StarFilled className='rightPanelCard__star' />
        </Space>
        <Text type='secondary' className='rightPanelCard__sub'>
          {subtitle}
        </Text>
      </div>

      <List
        itemLayout='horizontal'
        dataSource={sellers}
        renderItem={(s) => (
          <List.Item className='rightPanelCard__listItem'>
            <List.Item.Meta
              avatar={<Avatar>{s.name.trim().slice(0, 1).toUpperCase()}</Avatar>}
              title={
                <Space size={8}>
                  <Text>{s.name}</Text>
                  <Tag className='rightPanelCard__rank'>#{s.rank}</Tag>
                </Space>
              }
              description={
                <Space size={8} wrap>
                  <Text type='secondary'>{s.subtitle}</Text>
                  <Text type='secondary'>•</Text>
                  <Text type='secondary'>{s.score}</Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />

      <Button type='link' className='rightPanelCard__link'>
        Xem bảng xếp hạng đầy đủ
      </Button>
    </Card>
  );
}
