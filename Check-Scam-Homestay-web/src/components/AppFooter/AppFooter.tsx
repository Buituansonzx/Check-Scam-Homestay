import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './AppFooter.scss';

const { Text } = Typography;

export default function AppFooter(): React.ReactElement {
  return (
    <Layout.Footer className='appFooter'>
      <div className='appFooter__inner'>
        <div className='appFooter__top'>
          <div className='appFooter__brand'>
            <div className='appFooter__brandRow' aria-label='CheckStay'>
              <img className='appFooter__logo' src='/CheckStay.svg' alt='CheckStay' />
              <span className='appFooter__name'>CheckStay</span>
            </div>
            <Text type='secondary' className='appFooter__desc'>
              CheckStay - Mạng xã hội tin cậy tích hợp tra cứu chống scam và cảnh báo rủi ro du lịch đầu tiên tại Việt Nam.
              Chúng tôi xây dựng cộng đồng du lịch minh bạch.
            </Text>

            <Space size={10} className='appFooter__social' aria-label='Social'>
              <a className='appFooter__socialBtn' href='#' aria-label='Social 1'>
                <img className='appFooter__socialIcon' src='/footericon.svg' alt='' aria-hidden />
              </a>
              <a className='appFooter__socialBtn' href='#' aria-label='Social 2'>
                <img className='appFooter__socialIcon' src='/footericon2.svg' alt='' aria-hidden />
              </a>
            </Space>
          </div>

          <div className='appFooter__cols'>
            <div className='appFooter__col'>
              <Text strong className='appFooter__colTitle'>
                KHÁM PHÁ
              </Text>
              <div className='appFooter__links'>
                <Link className='appFooter__link' to='/search'>
                  Tra cứu đối tượng
                </Link>
                <a className='appFooter__link' href='#'>
                  Danh sách Đen (Blacklist)
                </a>
                <a className='appFooter__link' href='#'>
                  Hồ sơ Sellers uy tín
                </a>
                <a className='appFooter__link' href='#'>
                  Gửi tố cáo mới
                </a>
              </div>
            </div>

            <div className='appFooter__col'>
              <Text strong className='appFooter__colTitle'>
                HỖ TRỢ
              </Text>
              <div className='appFooter__links'>
                <a className='appFooter__link' href='#'>
                  Trung tâm trợ giúp
                </a>
                <a className='appFooter__link' href='#'>
                  Quy trình Ký quỹ
                </a>
                <a className='appFooter__link' href='#'>
                  Pháp lý & Miễn trừ
                </a>
                <a className='appFooter__link' href='#'>
                  Liên hệ CheckStay
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='appFooter__divider' />

        <div className='appFooter__bottom'>
          <Text type='secondary' className='appFooter__copy'>
            © {new Date().getFullYear()} CHECKSTAY SOCIAL - PROTECTING YOUR TRAVEL JOURNEY
          </Text>

          <Space size={16} className='appFooter__bottomLinks'>
            <a className='appFooter__bottomLink' href='#'>
              ĐIỀU KHOẢN
            </a>
            <a className='appFooter__bottomLink' href='#'>
              BẢO MẬT
            </a>
          </Space>
        </div>
      </div>
    </Layout.Footer>
  );
}
