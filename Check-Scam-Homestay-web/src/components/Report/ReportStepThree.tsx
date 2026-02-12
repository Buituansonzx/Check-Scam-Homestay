import { EyeOutlined, HomeOutlined, SafetyOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

type Props = {
  rewardPoints?: number;
};

export default function ReportStepThree({ rewardPoints = 100 }: Props): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div className='reportSuccess'>
      <div className='reportSuccess__hero'>
        <div className='reportSuccess__badge' aria-hidden>
          <SafetyOutlined />
        </div>

        <Title level={2} className='reportSuccess__title'>
          Tố cáo của bạn đã được <span className='reportSuccess__accent'>gửi thành công!</span>
        </Title>

        <div className='reportSuccess__sub'>Đội ngũ Admin sẽ kiểm duyệt trong vòng 24h</div>
      </div>

      <div className='reportSuccess__card'>
        <div className='reportSuccess__cardTop'>
          <div className='reportSuccess__cardLabel'>PHẦN THƯỞNG CỦA BẠN</div>
          <div className='reportSuccess__points'>
            <span className='reportSuccess__pointsValue'>+{rewardPoints}</span>
            <span className='reportSuccess__pointsUnit'>Trust Points</span>
          </div>
        </div>

        <div className='reportSuccess__rank'>
          <div className='reportSuccess__rankLeft'>
            <div className='reportSuccess__rankLabel'>HẠNG HIỆN TẠI</div>
            <div className='reportSuccess__rankValue'>Người dùng Tích cực</div>
          </div>
          <div className='reportSuccess__rankRight'>
            <div className='reportSuccess__rankHintAccent'>Còn 200 điểm nữa</div>
            <div className='reportSuccess__rankHint'>Đạt danh hiệu Hiệp sĩ Đồng</div>
          </div>
        </div>

        <div className='reportSuccess__progress' role='progressbar' aria-label='Tiến độ điểm uy tín'>
          <div className='reportSuccess__progressFill' style={{ width: '62%' }} />
        </div>
      </div>

      <div className='reportSuccess__actions'>
        <Button
          className='reportSuccess__btn reportSuccess__btn--ghost'
          onClick={() => {
            void navigate('/');
          }}
        >
          <HomeOutlined /> Về trang chủ
        </Button>
        <Button
          type='primary'
          className='reportSuccess__btn reportSuccess__btn--primary'
          onClick={() => {
            void navigate('/search');
          }}
        >
          <EyeOutlined /> Xem các báo cáo khác
        </Button>
      </div>

      <div className='reportSuccess__thanks'>Cảm ơn bạn đã chung tay xây dựng cộng đồng du lịch an toàn hơn!</div>
    </div>
  );
}
