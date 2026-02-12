import React from 'react';
import { Card, Space, Tag, Typography } from 'antd';

import './RightPanel.scss';

const { Text } = Typography;

type LegendItem = {
  label: string;
  desc: string;
  color?: string;
};

type Props = {
  title?: string;
  items: LegendItem[];
};

export default function BadgeLegendCard({ title = 'HỆ THỐNG BADGE MỚI', items }: Props): React.ReactElement {
  return (
    <Card bordered={false} className='rightPanelCard'>
      <Text strong>{title}</Text>
      <div className='rightPanelCard__legend'>
        {items.map((it) => (
          <div key={it.label} className='rightPanelCard__legendRow'>
            <Space size={8} align='start'>
              <Tag color={it.color} className='rightPanelCard__legendTag'>
                {it.label}
              </Tag>
              <Text type='secondary'>{it.desc}</Text>
            </Space>
          </div>
        ))}
      </div>
    </Card>
  );
}
