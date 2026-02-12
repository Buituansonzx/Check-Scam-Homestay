import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { getEnvString } from 'shared/env';
import { login, register } from '../../store/auth/slices/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthLoginRequest, AuthRegisterRequest } from '../../store/auth/slices/type';
import './AuthModal.scss';
import { AuthServices } from '../../store/auth/services/AuthServices';

// Icons as pure SVGs for password feedback
const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const XIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#FF5A3C" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FF5A3C" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const VerifiedIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
       <circle cx="20" cy="20" r="20" fill="#E6F7EF" />
       <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10ZM17.29 25.29L13.7 21.7C13.31 21.31 13.31 20.68 13.7 20.29C14.09 19.9 14.72 19.9 15.11 20.29L18 23.17L24.88 16.29C25.27 15.9 25.9 15.9 26.29 16.29C26.68 16.68 26.68 17.31 26.29 17.7L18.7 25.29C18.31 25.68 17.68 25.68 17.29 25.29Z" fill="#00BFA5"/>
    </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6 12.227c0-.71-.064-1.392-.183-2.045H12v3.87h5.381a4.6 4.6 0 0 1-1.997 3.017v2.51h3.23c1.89-1.74 2.986-4.303 2.986-7.352Z" fill="#4285F4"/>
    <path d="M12 22c2.7 0 4.964-.895 6.619-2.431l-3.23-2.51c-.895.6-2.04.955-3.389.955-2.605 0-4.81-1.76-5.6-4.13H3.06v2.59A10 10 0 0 0 12 22Z" fill="#34A853"/>
    <path d="M6.4 11.884A6.01 6.01 0 0 1 6.083 10c0-.654.111-1.289.317-1.884V5.526H3.06A10 10 0 0 0 2 10c0 1.614.386 3.142 1.06 4.474l3.34-2.59Z" fill="#FBBC05"/>
    <path d="M12 3.986c1.47 0 2.79.505 3.83 1.495l2.87-2.87C16.96.985 14.7 0 12 0A10 10 0 0 0 3.06 5.526l3.34 2.59c.79-2.37 2.995-4.13 5.6-4.13Z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.5c0-1.01.28-1.7 1.73-1.7H17V2.64C16.7 2.6 15.67 2.5 14.46 2.5c-2.53 0-4.26 1.54-4.26 4.37V9.5H7v3.5h3.2v9h3.3Z" fill="white"/>
  </svg>
);

type AuthMode = 'login' | 'register';

type Props = {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
};

export default function AuthModal({ open, mode, onClose, onModeChange }: Props): React.ReactElement {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const googleAuthUrl = AuthServices.getSocialLoginUrl('google');
  const facebookAuthUrl = AuthServices.getSocialLoginUrl('facebook');
  const [form] = Form.useForm();
  
  const password = Form.useWatch('password', form);

  const redirectTo = (url: string | undefined, providerLabel: string) => {
    if (!url) {
      void message.error(`Chưa cấu hình ${providerLabel} auth URL`);
      return;
    }
    window.location.assign(url);
  };

  const handleLogin = async (values: AuthLoginRequest) => {
    const result = await dispatch(login(values));
      if (login.fulfilled.match(result)) {
      message.success('Đăng nhập thành công!');
      onClose();
    } else {
      const payload = result.payload as any;
      const errorMsg = payload?.message || 'Đăng nhập thất bại';
      message.error(errorMsg);
      if (payload?.errors) {
        const fieldErrors = Object.keys(payload.errors).map((key) => ({
          name: key,
          errors: payload.errors[key],
        }));
        form.setFields(fieldErrors as any);
      }
    }
  };

  const handleRegister = async (values: AuthRegisterRequest) => {
    const result = await dispatch(register(values));
    if (register.fulfilled.match(result)) {
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      onModeChange('login');
    } else {
      const payload = result.payload as any;
      const errorMsg = payload?.message || 'Đăng ký thất bại';
      message.error(errorMsg);
      if (payload?.errors) {
        const fieldErrors = Object.keys(payload.errors).map((key) => ({
          name: key,
          errors: payload.errors[key],
        }));
        form.setFields(fieldErrors as any);
      }
    }
  };

  // Reset form when mode changes
  React.useEffect(() => {
    form.resetFields();
  }, [mode, form]);

  const LeftBanner = () => (
    <div className='authModal__left'>
      {/* Background Shapes */}
      <div className='bg-glow-center'></div>
      <div className='bg-circle-bottom'></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className='authModal__logo'>
          <img src='/CheckStay.svg' alt='CheckStay' style={{ height: 32 }} />
          <span>CheckStay</span>
        </div>
        <div className='authModal__headline'>
          Du lịch an tâm,<br />Tránh xa lừa đảo.
        </div>
        <div className='authModal__subtext'>
          Mạng xã hội tin cậy về xác thực homestay và cộng đồng đẩy lùi scam.
        </div>
      </div>
      
      <div className='authModal__illustration'>
        {/* Layer 1: Backdrop Card */}
        <div className='backdrop-card'>
            <div className="card-header">
                <VerifiedIcon />
                <div className="lines">
                    <div className="line long"></div>
                    <div className="line short"></div>
                </div>
            </div>
            <div className="lines body">
                <div className="line full"></div>
                <div className="line full"></div>
            </div>
        </div>

        {/* Layer 2: Floating Front Card */}
        <div className='floating-card'>
            <div className="shield-icon">
                <ShieldIcon />
            </div>
            <span className="card-text">Ký quỹ bảo hiểm 50tr</span>
        </div>
      </div>

      <div className='authModal__community'>
        <div className='avatars'>
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Hungs" alt="User" className="avatar" />
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Linh" alt="User" className="avatar" />
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Minh" alt="User" className="avatar" />
            <div className="avatar more">+99</div>
        </div>
        <span>Hơn 50,000+ người dùng đã tham gia cộng đồng</span>
      </div>
    </div>
  );
  
  const getPasswordFeedback = (pwd: string) => {
      // If empty, return undefined to let standard Required rule show if touched
      if (!pwd) return undefined;

      const rules = [
          { regex: /.{8,}/, label: 'Ít nhất 8 ký tự' },
          { regex: /[A-Z]/, label: 'Ít nhất 1 chữ hoa' },
          { regex: /[a-z]/, label: 'Ít nhất 1 chữ thường' },
          { regex: /[0-9]/, label: 'Ít nhất 1 số' },
          { regex: /[^A-Za-z0-9]/, label: 'Ít nhất 1 ký tự đặc biệt' },
      ];

      const allValid = rules.every(r => r.regex.test(pwd));
      if (allValid) return undefined; // Hide if all valid

      return (
          <div className="password-requirements">
              {rules.map((rule, idx) => {
                  const isValid = rule.regex.test(pwd);
                  return (
                      <div key={idx} className={`requirement-item ${isValid ? 'valid' : 'invalid'}`}>
                          <span className="icon">{isValid ? <CheckIcon /> : <XIcon />}</span>
                          {rule.label}
                      </div>
                  );
              })}
          </div>
      );
  };

  return (
    <Modal 
        open={open} 
        onCancel={onClose} 
        footer={null} 
        centered 
        destroyOnClose 
        width={900}
        wrapClassName="auth-modal"
        closeIcon={null}
    >
      <div className='authModal__container'>
        <LeftBanner />
        
        <div className='authModal__right'>
            {mode === 'login' ? (
                <>
                    <div className='form-title'>Đăng nhập</div>
                    <div className='form-subtitle'>Chào mừng bạn quay trở lại với CheckStay</div>
                    
                    <div className='authModal__socialButtons'>
                        <button className='social-btn google' onClick={() => redirectTo(googleAuthUrl, 'Google')}>
                            <span className='icon'><GoogleIcon /></span> Google
                        </button>
                        <button className='social-btn facebook' onClick={() => redirectTo(facebookAuthUrl, 'Facebook')}>
                            <span className='icon'><FacebookIcon /></span> Facebook
                        </button>
                    </div>

                    <div className='authModal__divider'>
                        <span>Hoặc đăng nhập bằng Email</span>
                    </div>

                    <Form form={form} layout='vertical' onFinish={handleLogin} className='authModal__form'>
                        <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                            <Input placeholder='example@gmail.com' autoComplete='email' />
                        </Form.Item>
                        <Form.Item name='password' label='Mật khẩu' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder='••••••••' autoComplete='current-password' />
                        </Form.Item>

                        <Button className='submit-btn' type='primary' htmlType='submit' loading={isLoading} block>
                            ĐĂNG NHẬP NGAY
                        </Button>
                    </Form>

                    <div className='authModal__footer'>
                        Chưa có tài khoản? 
                        <span className='link-btn' onClick={() => onModeChange('register')}>Đăng ký ngay</span>
                    </div>
                </>
            ) : (
                <>
                    <div className='form-title'>Đăng ký tài khoản</div>
                    <div className='form-subtitle'>Tham gia cộng đồng CheckStay ngay hôm nay</div>

                    <div className='authModal__socialButtons'>
                        <button className='social-btn google' onClick={() => redirectTo(googleAuthUrl, 'Google')}>
                            <span className='icon'><GoogleIcon /></span> Google
                        </button>
                        <button className='social-btn facebook' onClick={() => redirectTo(facebookAuthUrl, 'Facebook')}>
                            <span className='icon'><FacebookIcon /></span> Facebook
                        </button>
                    </div>

                    <div className='authModal__divider'>
                        <span>Hoặc đăng ký bằng Email</span>
                    </div>

                    <Form form={form} layout='vertical' onFinish={handleRegister} className='authModal__form'>
                        <Form.Item name='name' label='Họ và tên' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                            <Input placeholder='Nhập họ tên đầy đủ' autoComplete='name' />
                        </Form.Item>
                        
                        <Form.Item 
                            name='email' 
                            label='Email' 
                            validateTrigger='onBlur'
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' },
                            ]}
                        >
                            <Input placeholder='example@gmail.com' autoComplete='email' />
                        </Form.Item>

                        <Form.Item 
                            name='password' 
                            label='Mật khẩu'
                            validateTrigger='onChange'
                            help={getPasswordFeedback(password)}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                // Keep regex rules to block submit, but suppress message since 'help' handles display
                                { min: 8, message: '' },
                                { pattern: /[A-Z]/, message: '' },
                                { pattern: /[a-z]/, message: '' },
                                { pattern: /[0-9]/, message: '' },
                                { pattern: /[^A-Za-z0-9]/, message: '' },
                            ]}
                        >
                            <Input.Password placeholder='••••••••' autoComplete='new-password' />
                        </Form.Item>
                        
                        <Form.Item
                            name='passwordConfirm'
                            label='Nhập lại mật khẩu'
                            dependencies={['password']}
                            validateTrigger='onChange'
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
                            <Input.Password placeholder='••••••••' autoComplete='new-password' />
                        </Form.Item>

                        <Form.Item name="agreement" valuePropName="checked" rules={[{validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản'))}]}>
                            <Checkbox>Tôi đồng ý với <a href="#">Điều khoản</a> và <a href="#">Chính sách bảo mật</a></Checkbox>
                        </Form.Item>

                        <Button className='submit-btn' type='primary' htmlType='submit' loading={isLoading} block>
                            TẠO TÀI KHOẢN NGAY
                        </Button>
                    </Form>

                    <div className='authModal__footer'>
                        Đã có tài khoản? 
                        <span className='link-btn' onClick={() => onModeChange('login')}>Đăng nhập ngay</span>
                    </div>
                </>
            )}
        </div>
      </div>
    </Modal>
  );
}
