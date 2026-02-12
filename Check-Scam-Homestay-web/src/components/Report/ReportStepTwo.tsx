import { EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Typography } from 'antd';
import React from 'react';

import ReportReward from './ReportReward';

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
  return (
    <div className='reportPage__main container-confirm'>
      <div className='confirmationHeader'>
        <Title level={2} className='confirmationHeader__title'>
          Kiểm tra &amp; Xác nhận
        </Title>
        <div className='confirmationHeader__subtitle'>Vui lòng rà soát lại thông tin trước khi gửi</div>
      </div>

      <div className='confirmationCard'>
        <div className='summaryHeader'>
          <div className='summaryHeader__title'>Tóm tắt nội dung tố cáo</div>
          <button type='button' className='summaryHeader__editBtn' onClick={onEdit}>
            <EditOutlined style={{ marginRight: 4 }} /> Chỉnh sửa
          </button>
        </div>

        <div className='summarySection'>
          <div className='summarySection__label'>THÔNG TIN ĐỐI TƯỢNG</div>
          <div className='summaryRow'>
            <div className='summaryItem'>
              <div className='summaryItem__value'>{subjectValue || '0901234567'}</div>
            </div>
            <div className='summaryItem summaryItem--right'>
              <div className='summaryItem__value high'>{amountValue || '2,500,000'} đ</div>
            </div>
          </div>
        </div>

        <div className='summarySection'>
          <div className='summarySection__label'>BẰNG CHỨNG (IMAGES)</div>
          <div className='summaryEvidenceGrid'>
            <img src='https://placehold.co/100' alt='evidence 1' className='evidenceThumb' />
            <img src='https://placehold.co/100' alt='evidence 2' className='evidenceThumb' />
            <img src='https://placehold.co/100' alt='evidence 3' className='evidenceThumb' />
          </div>
        </div>

        <div className='summarySection'>
          <div className='summarySection__label'>NỘI DUNG CHI TIẾT</div>
          <div className='summaryContentBox'>
            {detailValue ||
              'Đối tượng giả danh chủ homestay, yêu cầu chuyển khoản cọc 50% trước khi nhận phòng. Sau khi nhận tiền thì chặn số, khóa facebook và không thể liên lạc được...'}
          </div>
        </div>

        <div className='reportDisclaimer'>
          <Checkbox checked={agreed} onChange={(e) => onChangeAgreed(e.target.checked)}>
            Tôi cam đoan thông tin trên là đúng sự thật và chịu hoàn toàn trách nhiệm trước pháp luật về nội dung tố cáo này.
          </Checkbox>
        </div>

        <div className='finalActions'>
          <Button type='primary' className='finalSubmitBtn' disabled={!agreed} onClick={onSubmit}>
            Gửi Tố cáo ngay
          </Button>

          <div className='finalReward'>
            <ReportReward
              className='reportReward reportReward--transparent'
              label='Cộng đồng cảm ơn bạn! Bạn sẽ nhận được:'
              value='+150 Trust Points'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
