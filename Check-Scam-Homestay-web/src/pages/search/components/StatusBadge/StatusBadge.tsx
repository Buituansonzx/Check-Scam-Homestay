import React from 'react';

type ResultStatus = 'blacklisted' | 'caution' | 'verified';

export default function StatusBadge({ status }: { status: ResultStatus }): React.ReactElement {
  const label = status === 'blacklisted' ? 'BLACKLISTED' : status === 'caution' ? 'CAUTION' : 'VERIFIED';

  return (
    <div className={`searchResult__statusBadge searchResult__statusBadge--${status}`}>
      <span className='searchResult__statusDot' aria-hidden />
      <span className='searchResult__statusText'>{label}</span>
    </div>
  );
}

