import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setLoginSuccess } from '../../store/auth/slices/slice';
import { message, Spin } from 'antd';
import './SocialCallback.scss';

const SocialCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('access_token');
    const userString = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      message.error(decodeURIComponent(error));
      navigate('/');
      return;
    }

    if (token) {
      let user = null;
      try {
        if (userString) {
          user = JSON.parse(decodeURIComponent(userString));
        }
      } catch (e) {
        console.error('Failed to parse user data', e);
      }

      dispatch(setLoginSuccess({ access_token: token, user }));
      message.success('Đăng nhập thành công!');
      navigate('/');
    } else {
       // If no token found, check if it's just an initial render or if truly missing
       if (!searchParams.toString()) return; // Do nothing if params are empty (rare case)
       
       message.error('Không tìm thấy token đăng nhập.');
       navigate('/');
    }
  }, [searchParams, dispatch, navigate]);

  return (
    <div className='social-callback-container'>
      <Spin size="large" />
      <div className='loading-text'>Đang xử lý đăng nhập...</div>
    </div>
  );
};

export default SocialCallback;
