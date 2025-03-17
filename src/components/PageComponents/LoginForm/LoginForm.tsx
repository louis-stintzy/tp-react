import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../../@types/auth';
import { useAuth } from '../../../store/hooks/useAuth';
import ReusableForm from '../../Common/ReusableForm/ReusableForm';
import { loginFormConfig } from './loginForm.config';
import { loginFormSchema } from './loginForm.schema';

import './LoginForm.style.css';
import { useEffect } from 'react';

function LoginForm() {
  const { isLoading, isAuthenticated, message, login, resetMessage } =
    useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      void navigate('/movies');
    }
    return () => resetMessage();
  }, [isAuthenticated, navigate, resetMessage]);
  return (
    <ReusableForm<LoginCredentials>
      isLoading={isLoading}
      formConfig={loginFormConfig}
      formSchema={loginFormSchema}
      action={login}
      footerMessage={message ?? undefined}
    />
  );
}

export default LoginForm;
