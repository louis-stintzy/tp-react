import { useEffect } from 'react';
import { RegisterCredentials } from '../../../@types/auth';
import { useAuth } from '../../../store/hooks/useAuth';
import ReusableForm from '../../Common/ReusableForm/ReusableForm';
import { registerFormConfig } from './registerForm.config';
import { registerFormSchema } from './registerForm.schema';

import './RegisterForm.style.css';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { isLoading, isAuthenticated, message, register, resetMessage } =
    useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      void navigate('/movies');
    }
    return () => resetMessage();
  }, [isAuthenticated, navigate, resetMessage]);
  return (
    <ReusableForm<RegisterCredentials>
      isLoading={isLoading}
      formConfig={registerFormConfig}
      formSchema={registerFormSchema}
      action={register}
      footerMessage={message ?? undefined}
    />
  );
}

export default RegisterForm;
