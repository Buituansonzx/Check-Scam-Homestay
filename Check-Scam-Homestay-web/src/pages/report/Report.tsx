import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './Report.scss';

import ReportStepOne from '../../components/Report/ReportStepOne';
import ReportStepTwo from '../../components/Report/ReportStepTwo';
import ReportStepThree from '../../components/Report/ReportStepThree';

export default function Report(): React.ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = parseInt(searchParams.get('step') || '1', 10);

  const [subjectValue, setSubjectValue] = React.useState('');
  const [amountValue, setAmountValue] = React.useState('');
  const [detailValue, setDetailValue] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);

  const handleNextStep = () => {
    setSearchParams({ step: '2' }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackStep = () => {
    setSearchParams({ step: '1' }, { replace: true });
  };

  const handleSubmitReport = () => {
    setSearchParams({ step: '3' }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='reportPage'>
      {step === 1 ? (
        <ReportStepOne
          subjectValue={subjectValue}
          amountValue={amountValue}
          detailValue={detailValue}
          onChangeSubject={setSubjectValue}
          onChangeAmount={setAmountValue}
          onChangeDetail={setDetailValue}
          onNext={handleNextStep}
        />
      ) : step === 2 ? (
        <ReportStepTwo
          subjectValue={subjectValue}
          amountValue={amountValue}
          detailValue={detailValue}
          agreed={agreed}
          onChangeAgreed={setAgreed}
          onEdit={handleBackStep}
          onSubmit={handleSubmitReport}
        />
      ) : (
        <ReportStepThree rewardPoints={100} />
      )}
    </div>
  );
}
