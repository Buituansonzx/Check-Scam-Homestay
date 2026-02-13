import React from 'react';
import { Avatar, Button, Card, Space, Tag, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';

import './FeedPostCard.scss';

const { Text, Title } = Typography;

type BadgeKey = 'pro' | 'insured' | 'verified' | 'id_card';

type Props = {
  name: string;
  subName?: string;
  badges?: BadgeKey[];
  title: string;
  description: string;
  stats?: { likes: number; comments: number };
};

function Badge({ type }: { type: BadgeKey }): React.ReactElement {
  switch (type) {
    case 'pro':
      return <Tag className='feedPostCard__badge'>PRO</Tag>;
    case 'insured':
      return (
        <Tag color='blue' className='feedPostCard__badge'>
          INSURED
        </Tag>
      );
    case 'verified':
      return (
        <Tag color='green' className='feedPostCard__badge'>
          VERIFIED
        </Tag>
      );
    case 'id_card':
      return (
        <Tag color='geekblue' className='feedPostCard__badge'>
          id_card
        </Tag>
      );
    default:
      return <></>;
  }
}

export default function FeedPostCard({
  name,
  subName,
  badges = ['pro', 'insured', 'id_card', 'verified'],
  title,
  description,
  stats = { likes: 482, comments: 56 },
}: Props): React.ReactElement {
  const disclaimerText =
    '* Legal Disclaimer: Thông tin bài đăng dựa trên xác thực định danh tại thời điểm hiện tại. CheckStay khuyến khích giao dịch qua cổng ký quỹ để đảm bảo an toàn tối đa.';

  return (
    <Card bordered={false} className='feedPostCard'>
      <Space align='start' size={12} className='feedPostCard__header'>
        <Avatar size={44}>{name.trim().slice(0, 1).toUpperCase()}</Avatar>
        <div className='feedPostCard__meta'>
          <Space direction='vertical' size={2}>
            <div className='feedPostCard__nameRow'>
              <Text strong>{name}</Text>
              {subName ? <Text type='secondary'>{subName}</Text> : null}
            </div>
            <Space size={6} wrap>
              {badges.map((b) => (
                <Badge key={b} type={b} />
              ))}
            </Space>
          </Space>
        </div>
      </Space>

      <Title level={5} className='feedPostCard__title'>
        {title}
      </Title>
      <Text type='secondary' className='feedPostCard__desc'>
        {description}
      </Text>

      <div className='feedPostCard__media' aria-hidden />

      <div className='feedPostCard__footer'>
        <Space size={18}>
          <button type='button' className='feedPostCard__stat'>
            <LikeOutlined /> {stats.likes}
          </button>
          <button type='button' className='feedPostCard__stat'>
            <MessageOutlined /> {stats.comments}
          </button>
        </Space>

        <div className='feedPostCard__footerRight'>
          <Button type='default' className='feedPostCard__cta'>
            Check Uy Tín
          </Button>
          <Button type='text' icon={<ShareAltOutlined />} className='feedPostCard__share' />
        </div>
      </div>

      <Text type='secondary' className='feedPostCard__disclaimer'>
        {disclaimerText}
      </Text>
    </Card>
  );
}
