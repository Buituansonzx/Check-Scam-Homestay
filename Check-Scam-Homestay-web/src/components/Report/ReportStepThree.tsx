import { ClockCircleOutlined, EyeOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Progress, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GuardIcon, MedalThreeIcon, MedalTwoIcon, TksIcon } from './ReportIcons';
import './ReportStepThree.scss';

const { Title, Text } = Typography;

type Props = {
  rewardPoints?: number;
};

export default function ReportStepThree({ rewardPoints = 100 }: Props): React.ReactElement {
  const navigate = useNavigate();
  const currentProgress = 62; // Example progress

  return (
    <div className='reportSuccess'>
      <div className='reportSuccess__hero'>
        <div className='reportSuccess__badge' aria-hidden>
          <GuardIcon />
        </div>

        <Title level={2} className='reportSuccess__title'>
          Tố cáo của bạn đã được <span className='reportSuccess__accent'>gửi thành công!</span>
        </Title>

        <div className='reportSuccess__sub'>
          <ClockCircleOutlined /> Đội ngũ Admin sẽ kiểm duyệt trong vòng 24h
        </div>
      </div>

      <div className='reportSuccess__card'>
        <div className='reportSuccess__cardTop'>
          <div className='reportSuccess__cardLabel'>PHẦN THƯỞNG CỦA BẠN</div>
          <div className='reportSuccess__points'>
            <MedalTwoIcon className='reportSuccess__pointsIcon' />
            <span className='reportSuccess__pointsValue'>+{rewardPoints}</span>
          </div>
          <Text className='reportSuccess__pointsUnit'>Trust Points</Text>
        </div>

        <div className='reportSuccess__rank'>
          <div className='reportSuccess__rankLeft'>
            <div className='reportSuccess__rankLabel'>HẠNG HIỆN TẠI</div>
            <div className='reportSuccess__rankValue'>
              <MedalThreeIcon /> Người dùng Tích cực
            </div>
          </div>
          <div className='reportSuccess__rankRight'>
            <div className='reportSuccess__rankHintAccent'>Còn 200 điểm nữa</div>
            <div className='reportSuccess__rankHint'>Đạt danh hiệu Hiệp sĩ Đồng</div>
          </div>
        </div>

        <Progress
          percent={currentProgress}
          showInfo={false}
          className='reportSuccess__progress'
          strokeColor='#FF6B35'
        />
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

      <div className='reportSuccess__thanks'>
       Cảm ơn bạn đã chung tay xây dựng cộng đồng du lịch an toàn hơn!
      </div>
    </div>
  );
}
