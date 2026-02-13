import React from 'react';
import './ReportReward.scss';

type Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function ReportReward({ label, value, icon, className }: Props): React.ReactElement {
  return (
    <div className={(className ?? '') + ' reportReward'}>
      <div className='reportReward__icon' aria-hidden>
        {icon ?? <span />}
      </div>
      <div>
        <div className='reportReward__label'>{label}</div>
        <div className='reportReward__value'>{value}</div>
      </div>
    </div>
  );
}
