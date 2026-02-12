import React from 'react';

import './Report.scss';

import ReportStepOne from '../../components/Report/ReportStepOne';
import ReportStepTwo from '../../components/Report/ReportStepTwo';
import ReportStepThree from '../../components/Report/ReportStepThree';

export default function Report(): React.ReactElement {
  const [step, setStep] = React.useState(1); // 1: Input Form, 2: Confirmation, 3: Success
  const [subjectValue, setSubjectValue] = React.useState('');
  const [amountValue, setAmountValue] = React.useState('');
  const [detailValue, setDetailValue] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);

  const handleNextStep = () => {
    // Validation logic could go here
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmitReport = () => {
    setStep(3);
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
