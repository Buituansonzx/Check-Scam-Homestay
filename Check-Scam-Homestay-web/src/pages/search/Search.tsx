import React from 'react';
import { Avatar, Button, Card, Checkbox, Space, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatusBadge from './components/StatusBadge/StatusBadge';

import './Search.scss';

const { Text, Title } = Typography;

type ResultStatus = 'blacklisted' | 'caution' | 'verified';

type SearchResult = {
  id: string;
  status: ResultStatus;
  title: string;
  phone?: string;
  bankAccount?: string;
  bankName?: string;
  trustScore: string;
  reportCount: string;
  primaryActionLabel: string;
  primaryActionType?: 'primary' | 'default';
  primaryActionDanger?: boolean;
  primaryActionColor?: 'green' | 'orange';
  verifiedByLabel?: string;
  primaryActionIcon?: 'pre' | 'eyes' | 'redirectgorio';
  primaryActionHref?: string;
};

export default function Search(): React.ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q')?.trim() ?? '';
  const queryText = queryFromUrl || 'Tất cả';
  const samplePhone = queryFromUrl || '0987 123 456';

  const results: SearchResult[] = [
    {
      id: 'villa-ocean-star',
      status: 'blacklisted',
      title: 'Villa Ocean Star - Nguyễn Thị Định',
      phone: samplePhone,
      bankAccount: '19034567891011',
      bankName: 'MB Bank',
      trustScore: '15/100',
      reportCount: '12 lần',
      primaryActionLabel: 'Xem chi tiết thông tin',
      primaryActionType: 'primary',
      primaryActionDanger: false,
      primaryActionColor: 'orange',
      primaryActionIcon: 'pre',
    },
    {
      id: 'hoang-homestay-da-lat',
      status: 'caution',
      title: 'Hoang Homestay Da Lat',
      phone: '0912 345 678',
      trustScore: '45/100',
      reportCount: '2 lần',
      primaryActionLabel: 'Xem chi tiết',
      primaryActionType: 'default',
      primaryActionDanger: false,
      primaryActionIcon: 'eyes',
    },
    {
      id: 'sapa-cloud-garden-resort',
      status: 'verified',
      title: 'Sapa Cloud Garden Resort',
      trustScore: '100/100',
      reportCount: '0',
      primaryActionLabel: 'Đặt ngay qua Gorio',
      primaryActionType: 'primary',
      primaryActionDanger: false,
      primaryActionColor: 'green',
      verifiedByLabel: 'CheckStay Verified',
      primaryActionIcon: 'redirectgorio',
      primaryActionHref: 'https://gorio.vn/',
    },
  ];

  const actionIconSrcMap: Record<NonNullable<SearchResult['primaryActionIcon']>, string> = {
    pre: '/pre.svg',
    eyes: '/eyes.svg',
    redirectgorio: '/redirectgorio.svg',
  };

  return (
    <div className='searchPage'>
      <Button
        type='primary'
        className='searchPage__reportFloat'
        icon={<img className='searchButtonIcon searchButtonIcon--light' src='/protect.svg' alt='' aria-hidden />}
        onClick={() => navigate('/report')}
      >
        Tố cáo ngay
      </Button>

      <div className='searchPage__grid'>
        <aside className='searchPage__left'>
          <Card bordered={false} className='searchSidebarCard'>
            <div className='searchSidebarCard__heading'>
              <img className='searchSidebarCard__icon' src='/data.svg' alt='' aria-hidden />
              <Text strong className='searchSidebarCard__title'>
                Thống kê rủi ro
              </Text>
            </div>

            <div className='searchSidebarCard__stats'>
              <div className='searchSidebarCard__stat searchSidebarCard__stat--red'>
                <Text type='secondary' className='searchSidebarCard__statLabel'>
                  Lừa đảo đã thống kê
                </Text>
                <Text strong className='searchSidebarCard__statValue'>
                  1,284
                </Text>
              </div>

              <div className='searchSidebarCard__stat searchSidebarCard__stat--orange'>
                <Text type='secondary' className='searchSidebarCard__statLabel'>
                  Cảnh báo rủi ro
                </Text>
                <Text strong className='searchSidebarCard__statValue'>
                  3,512
                </Text>
              </div>

              <div className='searchSidebarCard__stat searchSidebarCard__stat--green'>
                <Text type='secondary' className='searchSidebarCard__statLabel'>
                  Đã xác thực
                </Text>
                <Text strong className='searchSidebarCard__statValue'>
                  8,902
                </Text>
              </div>
            </div>
          </Card>

          <Card bordered={false} className='searchSidebarCard'>
            <div className='searchSidebarCard__heading'>
              <img className='searchSidebarCard__icon' src='/filter.svg' alt='' aria-hidden />
              <Text strong className='searchSidebarCard__title'>
                Bộ lọc
              </Text>
            </div>

            <Space direction='vertical' size={10} className='searchSidebarCard__filters'>
              <Checkbox defaultChecked>
                <span className='searchSidebarCard__filterLabel searchSidebarCard__filterLabel--verified'>
                  Đã xác thực (Verified)
                </span>
              </Checkbox>
              <Checkbox defaultChecked>
                <span className='searchSidebarCard__filterLabel searchSidebarCard__filterLabel--blacklisted'>
                  Lừa đảo (Blacklisted)
                </span>
              </Checkbox>
              <Checkbox defaultChecked>
                <span className='searchSidebarCard__filterLabel searchSidebarCard__filterLabel--caution'>
                  Cảnh báo (Caution)
                </span>
              </Checkbox>
            </Space>
          </Card>
        </aside>

        <main className='searchPage__main'>
          <div className='searchPage__header'>
            <Title level={5} className='searchPage__title'>
              Kết quả tìm kiếm cho “{queryText}”
            </Title>

            <Text type='secondary' className='searchPage__sub'>
              {results.length} kết quả tìm thấy
            </Text>
          </div>

          <div className='searchPage__results'>
            {results.map((r) => (
              <Card key={r.title} bordered={false} className='searchResult'>
                <div className='searchResult__content'>
                  <div className='searchResult__top'>
                    <div className='searchResult__info'>
                      <StatusBadge status={r.status} />

                      <Title level={4} className='searchResult__title'>
                        {r.title}
                      </Title>

                      <Space size={10} wrap className='searchResult__meta'>
                        {r.phone ? (
                          <div className='searchResult__pill'>
                            <Text type='secondary'>số điện thoại</Text>
                            <Text>{r.phone}</Text>
                          </div>
                        ) : null}

                        {r.bankAccount ? (
                          <div className='searchResult__pill'>
                            <Text type='secondary'>stk/ngân hàng</Text>
                            <Text>
                              {r.bankAccount} ({r.bankName})
                            </Text>
                          </div>
                        ) : null}
                      </Space>

                      {r.verifiedByLabel ? (
                        <div className='searchResult__verifiedBy'>
                          <Text type='secondary' className='searchResult__verifiedByLabel'>
                            Xác thực bởi
                          </Text>
                          <span className='searchResult__verifiedChip'>{r.verifiedByLabel}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className='searchResult__metrics'>
                      <div className={`searchResult__metricBox searchResult__metricBox--trust searchResult__metricBox--${r.status}`}>
                        <Text type='secondary' className='searchResult__metricLabel'>
                          TRUSTSCORE
                        </Text>
                        <Text strong className='searchResult__metricValue'>
                          {r.trustScore}
                        </Text>
                      </div>

                      <div className={`searchResult__metricBox searchResult__metricBox--reports searchResult__metricBox--${r.status}`}>
                        <Text type='secondary' className='searchResult__metricLabel'>
                          Tố cáo
                        </Text>
                        <Text strong className='searchResult__metricValue'>
                          {r.reportCount}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className='searchResult__bottom'>
                    <Space size={6} className='searchResult__avatars'>
                      <Avatar size={18} />
                      <Avatar size={18} />
                      <Text type='secondary'>+10</Text>
                    </Space>

                    <Button
                      type={r.primaryActionType ?? 'default'}
                      danger={r.primaryActionDanger}
                      href={r.primaryActionHref}
                      target={r.primaryActionHref ? '_blank' : undefined}
                      rel={r.primaryActionHref ? 'noopener noreferrer' : undefined}
                      onClick={
                        r.primaryActionHref
                          ? undefined
                          : () => {
                              navigate(`/search/${r.id}`);
                            }
                      }
                      className={
                        r.primaryActionColor === 'green'
                          ? 'searchResult__action searchResult__action--green'
                          : r.primaryActionColor === 'orange'
                            ? 'searchResult__action searchResult__action--orange'
                            : 'searchResult__action searchResult__action--neutral'
                      }
                    >
                      <span className='searchResult__actionText'>{r.primaryActionLabel}</span>
                      {r.primaryActionIcon ? (
                        <img
                          className={
                            r.primaryActionType === 'primary'
                              ? 'searchButtonIcon searchButtonIcon--light'
                              : 'searchButtonIcon'
                          }
                          src={actionIconSrcMap[r.primaryActionIcon]}
                          alt=''
                          aria-hidden
                        />
                      ) : null}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className='searchPage__disclaimer'>
            <Text type='secondary'>
              * Legal Disclaimer: Thông tin bài đăng dựa trên xác thực định danh tại thời điểm hiện tại. CheckStay khuyến khích giao
              dịch qua cổng ký quỹ để đảm bảo an toàn tối đa.
            </Text>
          </div>
        </main>
      </div>
    </div>
  );
}
