import React from 'react';
import AuthModal from '../components/AuthModal/AuthModal';

type AuthMode = 'login' | 'register';

type AuthModalContextValue = {
  open: boolean;
  mode: AuthMode;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
  setMode: (mode: AuthMode) => void;
};

const AuthModalContext = React.createContext<AuthModalContextValue | null>(null);

export function useAuthModal(): AuthModalContextValue {
  const value = React.useContext(AuthModalContext);
  if (!value) throw new Error('useAuthModal must be used within AuthModalProvider');
  return value;
}

type ProviderProps = {
  children: React.ReactNode;
};

export function AuthModalProvider({ children }: ProviderProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<AuthMode>('login');

  const openLogin = () => {
    setMode('login');
    setOpen(true);
  };

  const openRegister = () => {
    setMode('register');
    setOpen(true);
  };

  const close = () => setOpen(false);

  const value: AuthModalContextValue = {
    open,
    mode,
    openLogin,
    openRegister,
    close,
    setMode,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal open={open} mode={mode} onClose={close} onModeChange={setMode} />
    </AuthModalContext.Provider>
  );
}
