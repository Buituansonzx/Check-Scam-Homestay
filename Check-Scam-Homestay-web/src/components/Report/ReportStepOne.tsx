import { Button, Card, Input, Typography } from 'antd';
import React from 'react';
import { DocsIcon, InfoIcon, MedalIcon, PinIcon, UploadIcon, RedirectIcon } from './ReportIcons';

import ReportHeader from './ReportHeader';
import ReportReward from './ReportReward';
import './ReportStepOne.scss';

const { Text } = Typography;

type Props = {
  subjectValue: string;
  amountValue: string;
  detailValue: string;
  onChangeSubject: (next: string) => void;
  onChangeAmount: (next: string) => void;
  onChangeDetail: (next: string) => void;
  onNext: () => void;
};

export default function ReportStepOne({
  subjectValue,
  amountValue,
  detailValue,
  onChangeSubject,
  onChangeAmount,
  onChangeDetail,
  onNext,
}: Props): React.ReactElement {
  return (
    <>
      <ReportHeader
        title={
          <>
            Tố cáo <span className='reportPage__titleAccent'>Hành vi lừa đảo</span>
          </>
        }
        subtitle='Thông tin của bạn giúp bảo vệ cộng đồng du lịch khỏi các đối tượng xấu.'
      />

      <div className='reportPage__content'>
        <Card bordered={false} className='reportCard'>
          <div className='reportCard__heading'>
            <div className='reportCard__icon' aria-hidden>
              <InfoIcon />
            </div>
            <div className='reportCard__title'>1. Thông tin đối tượng bị tố cáo</div>
          </div>

          <div className='reportGrid'>
            <div className='reportField'>
              <div className='reportField__label'>Số điện thoại / STK / Link trang cá nhân</div>
              <Input
                value={subjectValue}
                onChange={(e) => onChangeSubject(e.target.value)}
                placeholder='Dùng để định danh kẻ lừa đảo...'
                className='reportInput'
              />
            </div>

            <div className='reportField'>
              <div className='reportField__label'>Số tiền bị lừa (VND)</div>
              <Input
                value={amountValue}
                onChange={(e) => onChangeAmount(e.target.value)}
                placeholder='Ví dụ: 2,000,000'
                className='reportInput'
              />
            </div>
          </div>
        </Card>

        <Card bordered={false} className='reportCard'>
          <div className='reportCard__heading'>
            <div className='reportCard__icon reportCard__icon--orange' aria-hidden>
              <DocsIcon />
            </div>
            <div className='reportCard__title'>2. Nội dung chi tiết vụ việc</div>
          </div>

          <Input.TextArea
            value={detailValue}
            onChange={(e) => onChangeDetail(e.target.value)}
            className='reportTextarea'
            autoSize={{ minRows: 5, maxRows: 8 }}
            placeholder='Hãy mô tả chi tiết thủ đoạn của đối tượng (ví dụ: yêu cầu chuyển cọc rồi chặn liên lạc, treo đầu dê bán thịt chó...)'
          />

          <div className='reportUploadLabel'>
            <PinIcon className='reportUploadLabel__pin' aria-hidden />
            <span>Tải lên bằng chứng (Chat, Biên lai chuyển tiền)</span>
          </div>

          <div className='reportUpload' role='group' aria-label='Tải lên bằng chứng'>
            <div className='reportUpload__icon' aria-hidden>
              <UploadIcon />
            </div>
            <div className='reportUpload__title'>Kéo thả ảnh vào đây</div>
            <Text className='reportUpload__sub'>Hỗ trợ JPG, PNG, tối đa 5 ảnh (Max 10MB/ảnh)</Text>
          </div>
        </Card>
      </div>

      <div className='reportPage__footer'>
        <ReportReward
          label='Điểm uy tín nhận được'
          value='+100 Trust Points'
          icon={<MedalIcon className='reportReward__medalIcon' aria-hidden />}
        />

        <Button type='primary' className='reportSubmit' onClick={onNext}>
          Gửi Tố cáo &amp; Cảnh báo <RedirectIcon className='reportSubmit__icon' aria-hidden />
        </Button>
      </div>
    </>
  );
}
