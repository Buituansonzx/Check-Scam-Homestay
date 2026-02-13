import React from 'react';
import { useNavigate } from 'react-router-dom';

import HomeSidebar from '../../components/Home/HomeSidebar/HomeSidebar';
import HomeFeedHeader from '../../components/Home/HomeFeedHeader/HomeFeedHeader';
import FeedPostCard from '../../components/Home/FeedPostCard/FeedPostCard';
import ScamAlertCard from '../../components/Home/ScamAlertCard/ScamAlertCard';
import TopSellersCard from '../../components/Home/RightPanel/TopSellersCard';
import BadgeLegendCard from '../../components/Home/RightPanel/BadgeLegendCard';

import './Home.scss';

export default function Home(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div className='homePage'>
      <div className='homePage__grid'>
        <HomeSidebar
          activeKey='feed'
          onNavClick={(key) => {
            if (key === 'feed') navigate('/');
            if (key === 'lookup') navigate('/lookup');
          }}
          onQuickSearch={() => navigate('/search')}
          onReport={() => navigate('/report')}
        />

        <main className='homePage__center'>
          <HomeFeedHeader />

          <FeedPostCard
            name='Huy Hoàng'
            subName='Travel'
            title='Combo Nghỉ dưỡng Sun World Phú Quốc - Ưu đãi 30%'
            description='Hỗ trợ đặt phòng và vé máy bay cam kết uy tín. Giao dịch trực tiếp qua cổng thanh toán của CheckStay để được bảo hiểm 100% số tiền nếu có rủi ro.'
            stats={{ likes: 482, comments: 56 }}
          />

          <ScamAlertCard
            name='Phan Mạnh Cường'
            headline='Giả danh đại lý vé máy bay lừa tiền cọc khách hàng'
            detailsLeft={[
              { label: 'Số tài khoản:', value: '1903XXX456 - TECHCOMBANK' },
              { label: 'Tên Fanpage:', value: 'Vé Máy Bay Giá Rẻ 24h' },
            ]}
            detailsRight={[{ label: 'Ngân hàng:', value: 'TECHCOMBANK' }]}
          />
        </main>

        <aside className='homePage__right'>
          <TopSellersCard
            sellers={[
              { name: 'Nam Travel Pro', subtitle: 'key Q1Y-150TR', score: '#1', rank: 1 },
              { name: 'Thanh Thảo Homestay', subtitle: 'key Q1Y-80TR', score: '#2', rank: 2 },
              { name: 'Đức Huy Villa', subtitle: 'key Q1Y-45TR', score: '#3', rank: 3 },
            ]}
          />

          <BadgeLegendCard
            items={[
              { label: 'Verified', desc: 'Đã xác thực căn cước', color: 'green' },
              { label: 'Insured', desc: 'Đã ký quỹ bảo hiểm', color: 'blue' },
              { label: 'Recommended', desc: 'Tin nhiệm cao', color: 'gold' },
              { label: 'Risky', desc: 'Đang bị nghi vấn', color: 'orange' },
              { label: 'Blacklisted', desc: 'Lừa đảo xác nhận', color: 'red' },
            ]}
          />
        </aside>
      </div>
    </div>
  );
}
