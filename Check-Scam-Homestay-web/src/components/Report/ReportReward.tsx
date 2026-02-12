import React from 'react';

type Props = {
  label: string;
  value: string;
  className?: string;
};

export default function ReportReward({ label, value, className }: Props): React.ReactElement {
  return (
    <div className={className ?? 'reportReward'}>
      <div className='reportReward__icon' aria-hidden>
        <span />
      </div>
      <div>
        <div className='reportReward__label'>{label}</div>
        <div className='reportReward__value'>{value}</div>
      </div>
    </div>
  );
}
