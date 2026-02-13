import React from 'react';
import { Space, Tag } from 'antd';

import './HomeFeedHeader.scss';

type FilterKey = 'all' | 'verified' | 'insured' | 'recommended' | 'blacklist';

type Props = {
  activeFilter?: FilterKey;
  onFilterChange?: (key: FilterKey) => void;
};

const FILTERS: Array<{ key: FilterKey; label: string; dotColor?: string }> = [
  { key: 'all', label: 'Tất cả' },
  { key: 'verified', label: 'Verified', dotColor: '#52C41A' },
  { key: 'insured', label: 'Insured', dotColor: '#1677FF' },
  { key: 'recommended', label: 'Recommended', dotColor: '#FAAD14' },
  { key: 'blacklist', label: 'Blacklist', dotColor: '#FF4D4F' },
];

export default function HomeFeedHeader({ activeFilter = 'all', onFilterChange }: Props): React.ReactElement {
  return (
    <div className='homeFeedHeader'>
      <Space size={8} wrap className='homeFeedHeader__filters'>
        {FILTERS.map((f) => {
          const isActive = f.key === activeFilter;
          if (isActive) {
            return (
              <Tag key={f.key} color='orange' className='homeFeedHeader__activeTag'>
                {f.label}
              </Tag>
            );
          }

          return (
            <button
              key={f.key}
              type='button'
              className='homeFeedHeader__filterBtn'
              onClick={() => onFilterChange?.(f.key)}
            >
              {f.dotColor ? <span className='homeFeedHeader__dot' style={{ background: f.dotColor }} /> : null}
              {f.label}
            </button>
          );
        })}
      </Space>
    </div>
  );
}
