import React from 'react';
import { Button, Card, Input, Typography, Row, Col, Avatar, Tag } from 'antd';
import { 
  SearchOutlined, 
  CheckCircleFilled, 
  ExclamationCircleFilled, 
  RightOutlined,
  FireFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import HomeSidebar from '../../components/Home/HomeSidebar/HomeSidebar';
import TopSellersCard from '../../components/Home/RightPanel/TopSellersCard';
import BadgeLegendCard from '../../components/Home/RightPanel/BadgeLegendCard';

import './Lookup.scss';

const { Text, Title, Link } = Typography;

export default function Lookup(): React.ReactElement {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');

  const handleSubmit = () => {
    const nextValue = query.trim();
    if (nextValue) {
      navigate(`/search?q=${encodeURIComponent(nextValue)}`);
      return;
    }
    navigate('/search');
  };

  const handleNavClick = (key: string) => {
    if (key === 'feed') navigate('/');
    if (key === 'lookup') navigate('/lookup');
  };

  return (
    <div className='lookupPage'>
      <div className='content__inner lookupPage__grid'>
        <HomeSidebar
          activeKey='lookup'
          onNavClick={handleNavClick}
          onQuickSearch={() => navigate('/search')}
          onReport={() => navigate('/report')}
        />

        <main className='lookupPage__center'>
          {/* Main Hero Card */}
          <Card bordered={false} className='lookupHero'>
            <div className='lookupHero__content'>
              <div className='lookupHero__header'>
                <Title level={2} className='lookupHero__title'>
                  KIỂM TRA ĐỘ AN TOÀN <br />
                  <span className='lookupHero__titleAccent'>TRƯỚC KHI ĐẶT PHÒNG</span>
                </Title>
                <Text type='secondary' className='lookupHero__sub'>
                  Bảo vệ túi tiền của bạn bằng việc kiểm tra chỉ trong 5 giây.
                </Text>
              </div>

              <div className='lookupHero__inputWrapper'>
                <Input
                  size="large"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onPressEnter={handleSubmit}
                  placeholder='Nhập SĐT, Tên Homestay, Link FB, STK...'
                  prefix={<SearchOutlined style={{ fontSize: 20, color: '#bfbfbf', marginRight: 8 }} />}
                  className='lookupHero__input'
                  suffix={
                    <Button type='primary' className='lookupHero__btn' onClick={handleSubmit}>
                      KIỂM TRA NGAY
                    </Button>
                  }
                />
              </div>
              
              <div className='lookupHero__stats'>
                <div className='lookupHero__liveCount'>
                  <span className='dot orange'></span>
                  <Text type="secondary">23 người vừa tra cứu trong 10 phút qua</Text>
                </div>
                
                <div className='lookupHero__recentActivity'>
                  <CheckCircleFilled className='icon-success' />
                  <Text>
                    <Text strong>Hoàng Nam</Text> vừa kiểm tra số điện thoại <Text type="danger">090xxxx89</Text>
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Alert Banner */}
          <div className='scamAlertBanner'>
            <div className='scamAlertBanner__content'>
              <div className='scamAlertBanner__icon'>
                <ExclamationCircleFilled />
              </div>
              <div className='scamAlertBanner__text'>
                <Text strong style={{ color: '#fff', fontSize: 16 }}>
                  68% VỤ LỪA ĐẢO XẢY RA <br />
                  <span style={{ fontWeight: 400, fontSize: 14 }}>KHI NGƯỜI DÙNG KHÔNG TRA CỨU TRƯỚC</span>
                </Text>
              </div>
            </div>
            <div className='scamAlertBanner__arrow'>
              <RightOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>

          {/* Trending Searches Section */}
          <div className='trendingSection'>
            <div className='trendingSection__header'>
              <div className='title'>
                <FireFilled style={{ color: '#ff4d4f', marginRight: 8, fontSize: 18 }} />
                <Title level={4} style={{ margin: 0 }}>Tra cứu nhiều hôm nay</Title>
              </div>
              <Link className='viewAll'>Xem tất cả</Link>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card bordered={false} className='trendingCard' hoverable>
                  <div className='trendingCard__content'>
                    <Avatar 
                      size={64} 
                      shape="circle" 
                      src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    />
                    <div className='trendingCard__info'>
                      <Text strong className='name'>Ocean Breeze Retreat</Text>
                      <div className='badges'>
                        <Tag color="success" className='customTag verified'>VERIFIED</Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>1.2k lượt check</Text>
                      </div>
                      <Button className='btn-detail'>Xem chi tiết</Button>
                    </div>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card bordered={false} className='trendingCard' hoverable>
                  <div className='trendingCard__content'>
                    <Avatar 
                      size={64} 
                      shape="circle" 
                      src="https://images.unsplash.com/photo-1544376798-89aa6b82c977?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    />
                    <div className='trendingCard__info'>
                      <Text strong className='name'>Nguyễn Văn A (Host)</Text>
                      <div className='badges'>
                        <Tag color="processing" className='customTag insured'>INSURED</Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>842 lượt check</Text>
                      </div>
                      <Button className='btn-detail'>Xem chi tiết</Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </main>

        <aside className='lookupPage__right'>
          <TopSellersCard
            sellers={[
              { name: 'Nam Travel Pro', subtitle: 'key Q1Y-150TR', score: '#1', rank: 1 },
              { name: 'Thanh Thảo Homestay', subtitle: 'key Q1Y-80TR', score: '#2', rank: 2 },
              { name: 'Đức Huy Villa', subtitle: 'key Q1Y-45TR', score: '#3', rank: 3 },
            ]}
          />

          {/* <BadgeLegendCard
            items={[
              { label: 'Verified', desc: 'Đã xác thực căn cước', color: 'green' },
              { label: 'Insured', desc: 'Đã ký quỹ bảo hiểm', color: 'blue' },
              { label: 'Recommended', desc: 'Tin nhiệm cao', color: 'gold' },
              { label: 'Risky', desc: 'Đang bị nghi vấn', color: 'orange' },
              { label: 'Blacklisted', desc: 'Lừa đảo xác nhận', color: 'red' },
            ]}
          /> */}
        </aside>
      </div>
    </div>
  );
}
