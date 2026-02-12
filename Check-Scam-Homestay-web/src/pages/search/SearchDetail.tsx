import React from 'react';
import { Avatar, Button, Card, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

import './Search.scss';

const { Text, Title } = Typography;

type ResultStatus = 'blacklisted' | 'caution' | 'verified';

type SearchResultDetail = {
  id: string;
  status: ResultStatus;
  title: string;
  phone?: string;
  bankAccount?: string;
  bankName?: string;
  trustScore: string;
  reportCount: string;
  verifiedByLabel?: string;
};

const mockResults: SearchResultDetail[] = [
  {
    id: 'villa-ocean-star',
    status: 'blacklisted',
    title: 'Villa Ocean Star - Nguyễn Thị Định',
    phone: '0987 123 456',
    bankAccount: '19034567891011',
    bankName: 'MB Bank',
    trustScore: '15/100',
    reportCount: '12 lần',
  },
  {
    id: 'hoang-homestay-da-lat',
    status: 'caution',
    title: 'Hoang Homestay Da Lat',
    phone: '0912 345 678',
    trustScore: '45/100',
    reportCount: '2 lần',
  },
  {
    id: 'sapa-cloud-garden-resort',
    status: 'verified',
    title: 'Sapa Cloud Garden Resort',
    trustScore: '100/100',
    reportCount: '0',
    verifiedByLabel: 'CheckStay Verified',
  },
];

function getStatusLabel(status: ResultStatus): string {
  return status === 'blacklisted' ? 'BLACKLISTED' : status === 'caution' ? 'CAUTION' : 'VERIFIED';
}

export default function SearchDetail(): React.ReactElement {
  const { id } = useParams();
  const result = mockResults.find((r) => r.id === id);
  const caseItems = [
    {
      id: 'case-01',
      author: 'Lan Anh',
      role: '15 tháng 05, 2024 • Vũng Tàu',
      label: 'LỪA CỌC VILLA',
      tagType: 'scam',
      title: 'Mất 2 triệu tiền cọc cho Villa “Ocean Star” ảo',
      description:
        'Kẻ này dùng hình ảnh Villa ở Bãi Rôi bảo là ở Bãi Sau Vũng Tàu. Sau khi mình chuyển khoản 2 triệu đặt cọc qua STK 19034567891011 (MB Bank) thì lập tức bị chặn liên lạc trên Facebook và Zalo.',
      images: ['/mock-case-1.png', '/mock-case-2.png'],
      moreImages: 3,
      likes: 42,
      comments: 8,
    },
    {
      id: 'case-02',
      author: 'Thanh Thảo',
      role: '02 tháng 05, 2024',
      label: 'TÀI KHOẢN ẢO',
      tagType: 'default',
      title: 'Facebook “Linh Villa” chuyển combo du lịch rẻ bất thường',
      description:
        'Yêu cầu chuyển khoản vào STK này rồi biến mất. Mọi người cần thận trọng và báo cáo sớm.',
      images: [],
      moreImages: 0,
      likes: 15,
      comments: 2,
    },
  ];

  if (!result) {
    return (
      <div className='searchPage'>
        <div className='searchPage__grid'>
          <main className='searchPage__main'>
            <Card bordered={false} className='searchResult'>
              <Title level={4} style={{ margin: 0 }}>
                Không tìm thấy kết quả
              </Title>
              <Text type='secondary'>ID: {id}</Text>
              <div style={{ marginTop: 12 }}>
                <Link to='/search'>
                  <Button>Quay lại trang tìm kiếm</Button>
                </Link>
              </div>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className='searchPage searchDetail'>
      <div className='searchDetail__grid'>
        <aside className='searchDetail__left'>
          <Card bordered={false} className='searchDetailCard'>
            <div className='searchDetailCard__badge'>
              <img src='/warning.svg' alt='' aria-hidden className='searchDetailCard__statusIcon' />
            </div>

            <Title level={2} className='searchDetailCard__statusText'>
              BLACKLISTED
            </Title>
            <Text type='secondary' className='searchDetailCard__subtitle'>
              Đối tượng có dấu hiệu lừa đảo
            </Text>

            <div className='searchDetailCard__info'>
              {result.phone ? (
                <div className='searchDetailCard__infoRow'>
                  <Text className='searchDetailCard__infoLabel'>Số điện thoại</Text>
                  <Text className='searchDetailCard__infoValue'>{result.phone}</Text>
                </div>
              ) : null}

              {result.bankAccount ? (
                <div className='searchDetailCard__infoRow'>
                  <Text className='searchDetailCard__infoLabel'>Số tài khoản ({result.bankName})</Text>
                  <Text className='searchDetailCard__infoValue'>{result.bankAccount}</Text>
                </div>
              ) : null}
            </div>

            <div className='searchDetailCard__metrics'>
              <div className='searchDetailCard__metricBox searchDetailCard__metricBox--trust'>
                <Text className='searchDetailCard__metricLabel'>TRUST SCORE</Text>
                <Text className='searchDetailCard__metricValue'>{result.trustScore}</Text>
              </div>
              <div className='searchDetailCard__metricBox searchDetailCard__metricBox--reports'>
                <Text className='searchDetailCard__metricLabel'>SỐ LẦN TỐ CÁO</Text>
                <Text className='searchDetailCard__metricValue'>{result.reportCount}</Text>
              </div>
            </div>
          </Card>

          <Card bordered={false} className='searchDetailAlert'>
            <div className='searchDetailAlert__title'>
              <img src='/hammer.svg' alt='' aria-hidden className='searchDetailAlert__icon' />
              <span>Miễn trừ trách nhiệm</span>
            </div>
            <Text type='secondary'>
              Thông tin được cung cấp bởi cộng đồng và chỉ mang tính chất tham khảo. CheckStay không chịu trách nhiệm pháp
              lý cho các giao dịch cá nhân.
            </Text>
            <ul className='searchDetailAlert__list'>
              <li>Luôn yêu cầu xác thực video chính chủ.</li>
              <li>Sử dụng cổng giao dịch của CheckStay.</li>
            </ul>
          </Card>
        </aside>

        <main className='searchDetail__main'>
          <div className='searchDetail__header'>
            <div className='searchDetail__titleWrap'>
              <img src='/note.svg' alt='' aria-hidden className='searchDetail__titleIcon' />
              <Title level={4} className='searchDetail__title'>
                Chi tiết các vụ việc (12)
              </Title>
            </div>
            <div className='searchDetail__actions'>
              <Button
                type='primary'
                icon={<img src='/protect.svg' alt='' style={{ width: 20, height: 20, marginRight: 4 }} />}
              >
                Gửi thêm bằng chứng
              </Button>
            </div>
          </div>

          {caseItems.map((item) => (
            <Card key={item.id} bordered={false} className='searchCase'>
              <div className='searchCase__header'>
                <div className='searchCase__author'>
                  <Avatar size={40}>{item.author.charAt(0)}</Avatar>
                  <div>
                    <Text strong>{item.author}</Text>
                    <div className='searchCase__meta'>{item.role}</div>
                  </div>
                </div>
                <span className={`searchCase__tag searchCase__tag--${item.tagType}`}>{item.label}</span>
              </div>

              <Title level={5} className='searchCase__title'>
                {item.title}
              </Title>
              <Text type='secondary' className='searchCase__description'>
                {item.description}
              </Text>

              {item.images.length ? (
                <div className='searchCase__images'>
                  {item.images.map((src, index) => (
                    <div key={`${item.id}-img-${index}`} className='searchCase__image'>
                      <img src={src} alt='' />
                    </div>
                  ))}
                  {item.moreImages ? (
                    <div className='searchCase__image searchCase__image--more'>+{item.moreImages} hình</div>
                  ) : null}
                </div>
              ) : null}

              <div className='searchCase__footer'>
                <span className='searchCase__stat'>
                  <LikeOutlined /> Hữu ích ({item.likes})
                </span>
                <span className='searchCase__stat'>
                  <MessageOutlined /> Thảo luận ({item.comments})
                </span>
              </div>

              <div className='searchCase__comments'>
                <div className='searchCase__commentItem'>
                  <Avatar size={32} src='/avatar-minhquang.png' />
                  <div className='searchCase__commentContent'>
                    <div className='searchCase__commentHeader'>
                      <Text strong>Minh Quang</Text>
                      <Text type='secondary' className='searchCase__commentTime'>
                        1 giờ trước
                      </Text>
                    </div>
                    <Text>Mình cũng suýt bị lừa ở đây, may mà lên CheckStay tra trước. Cảm ơn bạn!</Text>
                  </div>
                </div>
                <div className='searchCase__commentInputWrapper'>
                  <Avatar size={32} src='/avatar-user.png' />
                  <div className='searchCase__commentBox'>
                    <input className='searchCase__input' placeholder='Viết phản hồi...' />
                    <Button type='text' icon={<SendOutlined />} className='searchCase__sendBtn' />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
