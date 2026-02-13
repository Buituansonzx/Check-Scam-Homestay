import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Typography } from 'antd';
import React from 'react';

import { DolarTwoIcon, InfoTwoIcon, TksIcon, DocsIcon, RedirectIcon } from './ReportIcons';
import './ReportStepTwo.scss';

const { Title } = Typography;

type Props = {
  subjectValue: string;
  amountValue: string;
  detailValue: string;
  agreed: boolean;
  onChangeAgreed: (next: boolean) => void;
  onEdit: () => void;
  onSubmit: () => void;
};

export default function ReportStepTwo({
  subjectValue,
  amountValue,
  detailValue,
  agreed,
  onChangeAgreed,
  onEdit,
  onSubmit,
}: Props): React.ReactElement {
  const subjectParts = (subjectValue || '0901234567')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);

  const evidenceCount = 4;

  return (
    <div className='reportPage__main container-confirm'>
      <div className='confirmationHeader'>
        <Title level={2} className='confirmationHeader__title'>
          Kiểm tra &amp; <span className='reportPage__titleAccent'>Xác nhận</span>
        </Title>
        <div className='confirmationHeader__subtitle'>Vui lòng rà soát lại thông tin trước khi gửi để đảm bảo tính chính xác cao nhất.</div>
      </div>

      <div className='confirmationCard'>
        <div className='summaryHeader'>
          <div className='summaryHeader__title'>
            <span className='summaryHeader__titleIcon' aria-hidden>
              <DocsIcon />
            </span>
            Tóm tắt nội dung tố cáo
          </div>
          <button type='button' className='summaryHeader__editBtn' onClick={onEdit}>
            <EditOutlined className='summaryHeader__editIcon' /> Chỉnh sửa
          </button>
        </div>

        <div className='confirmationBody'>
          <div className='confirmTopGrid'>
            <div className='confirmTopGrid__left'>
              <div className='confirmBlock'>
                <div className='confirmBlock__label'>ĐỐI TƯỢNG BỊ TỐ CÁO</div>
                <div className='summarySubject'>
                  {subjectParts.map((part) => (
                    <div key={part} className='summarySubject__line'>
                      <InfoTwoIcon className='summarySubject__icon' aria-hidden />
                      <span className='summarySubject__text'>{part}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='confirmBlock confirmBlock--amount'>
                <div className='confirmBlock__label'>SỐ TIỀN THIỆT HẠI</div>
                <div className='confirmAmount'>
                  <DolarTwoIcon className='confirmAmount__icon' aria-hidden />
                  <span className='confirmAmount__value'>{amountValue || '2,500,000'} VND</span>
                </div>
              </div>
            </div>

            <div className='confirmTopGrid__right'>
              <div className='confirmBlock'>
                <div className='confirmBlock__label'>MINH CHỨNG ĐÃ TẢI LÊN ({evidenceCount})</div>
                <div className='confirmEvidence' aria-label='Minh chứng đã tải lên'>
                  <img src='https://placehold.co/100' alt='evidence 1' className='evidenceThumb' />
                  <img src='https://placehold.co/100' alt='evidence 2' className='evidenceThumb' />
                  <img src='https://placehold.co/100' alt='evidence 3' className='evidenceThumb' />
                  <div className='evidenceMore' aria-label='Thêm 1 ảnh'>
                    +1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='summarySection'>
            <div className='summarySection__label'>NỘI DUNG CHI TIẾT VỤ VIỆC</div>
            <div className='summaryContentBox'>
              {detailValue ||
                'Đối tượng giả danh chủ homestay, yêu cầu chuyển khoản cọc 50% trước khi nhận phòng. Sau khi nhận tiền thì chặn số, khóa facebook và không thể liên lạc được...'}
            </div>
          </div>
        </div>
      </div>

      <div className='reportDisclaimer'>
        <Checkbox checked={agreed} onChange={(e) => onChangeAgreed(e.target.checked)}>
          Tôi cam đoan thông tin trên là đúng sự thật và chịu trách nhiệm trước pháp luật về tính xác thực của nội dung tố cáo này.
        </Checkbox>
      </div>

      <div className='finalActions'>
        <Button type='primary' className='finalSubmitBtn' disabled={!agreed} onClick={onSubmit}>
          Gửi Tố cáo ngay <RedirectIcon className='finalSubmitBtn__icon' aria-hidden />
        </Button>

        <div className='finalReward'>
          <div className='confirmThanks'>
            <TksIcon className='confirmThanks__icon' aria-hidden /> Cộng đồng cảm ơn sự đóng góp của bạn
          </div>
          <div className='confirmRewardPill'>
            Bạn sẽ nhận được:&nbsp;<span className='confirmRewardPill__value'>+150 Trust Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}
