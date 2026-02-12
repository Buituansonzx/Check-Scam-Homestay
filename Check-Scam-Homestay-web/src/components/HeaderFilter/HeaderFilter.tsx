import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './HeaderFilter.scss';

type Props = {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export default function HeaderFilter({
  placeholder = 'Tra cứu: Tên, SĐT, STK ngân hàng, Link Fanpage...',
  onChange,
  onSearch,
}: Props): React.ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = React.useState(queryFromUrl);

  React.useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  const handleSubmit = (rawValue: string) => {
    const nextValue = rawValue.trim();
    if (onSearch) {
      onSearch(nextValue);
      return;
    }

    if (nextValue) {
      navigate(`/search?q=${encodeURIComponent(nextValue)}`);
      return;
    }

    navigate('/search');
  };

  return (
    <div className='headerFilter'>
      <Input
        className='headerFilter__input'
        allowClear
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onPressEnter={(event) => handleSubmit((event.target as HTMLInputElement).value)}
      />
    </div>
  );
}
