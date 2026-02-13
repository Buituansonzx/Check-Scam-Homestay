import React from 'react';
import { Button, Divider, Form, Input, Modal, Space, Typography, message } from 'antd';
import { getEnvString } from 'shared/env';
import { login, register } from '../../store/auth/slices/thunks';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';
import { AuthState, AuthLoginRequest, AuthRegisterRequest, AuthLoginResponse, AuthRegisterResponse } from '../../store/auth/slices/type';
import './AuthModal.scss';

type AuthMode = 'login' | 'register';

type Props = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

const { Text, Title } = Typography;

function SocialIcon({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <span aria-hidden className='authModal__socialIcon'>
      {children}
    </span>
  );
}

function GoogleIcon(): React.ReactElement {
  return (
    <SocialIcon>
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M21.6 12.227c0-.71-.064-1.392-.183-2.045H12v3.87h5.381a4.6 4.6 0 0 1-1.997 3.017v2.51h3.23c1.89-1.74 2.986-4.303 2.986-7.352Z'
          fill='#4285F4'
        />
        <path
          d='M12 22c2.7 0 4.964-.895 6.619-2.431l-3.23-2.51c-.895.6-2.04.955-3.389.955-2.605 0-4.81-1.76-5.6-4.13H3.06v2.59A10 10 0 0 0 12 22Z'
          fill='#34A853'
        />
        <path
          d='M6.4 11.884A6.01 6.01 0 0 1 6.083 10c0-.654.111-1.289.317-1.884V5.526H3.06A10 10 0 0 0 2 10c0 1.614.386 3.142 1.06 4.474l3.34-2.59Z'
          fill='#FBBC05'
        />
        <path
          d='M12 3.986c1.47 0 2.79.505 3.83 1.495l2.87-2.87C16.96.985 14.7 0 12 0A10 10 0 0 0 3.06 5.526l3.34 2.59c.79-2.37 2.995-4.13 5.6-4.13Z'
          fill='#EA4335'
        />
      </svg>
    </SocialIcon>
  );
}

function FacebookIcon(): React.ReactElement {
  return (
    <SocialIcon>
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13.5 22v-9h3l.5-3.5h-3.5V7.5c0-1.01.28-1.7 1.73-1.7H17V2.64C16.7 2.6 15.67 2.5 14.46 2.5c-2.53 0-4.26 1.54-4.26 4.37V9.5H7v3.5h3.2v9h3.3Z'
          fill='#1877F2'
        />
      </svg>
    </SocialIcon>
  );
}

export default function AuthModal({ open, mode, onClose, onModeChange }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  // Lấy trạng thái loading từ auth slice để hiển thị hiệu ứng trên nút bấm
  const { isLoading } = useAppSelector((state) => state.auth);
  const googleAuthUrl = getEnvString('GOOGLE_AUTH_URL');
  const facebookAuthUrl = getEnvString('FACEBOOK_AUTH_URL');

  const redirectTo = (url: string | undefined, providerLabel: string) => {
    if (!url) {
      void message.error(`Chưa cấu hình ${providerLabel} auth URL`);
      return;
    }

    window.location.assign(url);
  };

  interface AuthFormValues {
    email: string;
    password: string;
  }

  const [form] = Form.useForm<AuthFormValues>();

  // Xử lý Đăng nhập
  const handleLogin = async (values: AuthLoginRequest) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      message.success('Đăng nhập thành công!');
      onClose(); // Đóng modal sau khi thành công
    } else {
      // result.payload thường chứa message lỗi từ backend trả về
      message.error((result.payload as string) || 'Đăng nhập thất bại');
    }
  };

  // Xử lý Đăng ký
  const handleRegister = async (values: AuthRegisterRequest) => {
    const result = await dispatch(register(values));
    if (register.fulfilled.match(result)) {
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      onModeChange('login'); // Chuyển sang form đăng nhập
    } else {
      message.error((result.payload as string) || 'Đăng ký thất bại');
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered destroyOnClose width={420}>
      {mode === 'login' ? (
        <>
          <Title level={4} className='authModal__title'>
            Đăng nhập
          </Title>

          <Form form={form} layout='vertical' onFinish={handleLogin}>
            <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
              <Input placeholder='Email đăng nhập' autoComplete='email' />
            </Form.Item>
            <Form.Item name='password' label='Mật khẩu' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
              <Input.Password placeholder='Mật khẩu' autoComplete='current-password' />
            </Form.Item>

            <Button type='primary' htmlType='submit' loading={isLoading} block>
              Đăng nhập
            </Button>
          </Form>

          <Divider />

          <Space direction='vertical' className='authModal__socialButtons' size={12}>
            <Button
              block
              icon={<GoogleIcon />}
              className='authModal__socialButton'
              onClick={() => redirectTo(googleAuthUrl, 'Google')}
            >
              Đăng nhập với Google
            </Button>
            <Button
              block
              icon={<FacebookIcon />}
              className='authModal__socialButton'
              onClick={() => redirectTo(facebookAuthUrl, 'Facebook')}
            >
              Đăng nhập với Facebook
            </Button>
          </Space>

          <Divider />

          <Text type='secondary'>Chưa có tài khoản? </Text>
          <Button
            type='link'
            onClick={() => onModeChange('register')}
            className='authModal__switchLink'
          >
            Đăng ký
          </Button>
        </>
      ) : (
        <>
          <Title level={4} className='authModal__title'>
            Đăng ký
          </Title>

          <Form layout='vertical' onFinish={handleRegister}>
            <Form.Item name='name' label='Họ và tên' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
              <Input placeholder='Họ và tên' autoComplete='name' />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
              <Input placeholder='Email đăng nhập' autoComplete='email' />
            </Form.Item>
            <Form.Item name='password' label='Mật khẩu' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
              <Input.Password placeholder='Mật khẩu' autoComplete='new-password' />
            </Form.Item>
            <Form.Item
              name='passwordConfirm'
              label='Nhập lại mật khẩu'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder='Nhập lại mật khẩu' autoComplete='new-password' />
            </Form.Item>

            <Button type='primary' htmlType='submit' loading={isLoading} block>
              Đăng ký
            </Button>
          </Form>

          <Divider />

          <Text type='secondary'>Đã có tài khoản? </Text>
          <Button
            type='link'
            onClick={() => onModeChange('login')}
            className='authModal__switchLink'
          >
            Quay lại đăng nhập
          </Button>
        </>
      )}
    </Modal>
  );
}
