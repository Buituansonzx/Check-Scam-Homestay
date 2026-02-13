import React from 'react';
import { Typography } from 'antd';
import './ReportHeader.scss';

const { Title, Text } = Typography;

type Props = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
};

export default function ReportHeader({ title, subtitle, className }: Props): React.ReactElement {
  return (
    <div className={className ?? 'reportPage__head'}>
      <Title level={2} className='reportPage__title'>
        {title}
      </Title>
      <Text type='secondary' className='reportPage__subTitle'>
        {subtitle}
      </Text>
    </div>
  );
}
