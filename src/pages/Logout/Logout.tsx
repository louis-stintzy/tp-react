import { useEffect } from 'react';
import { useAuth } from '../../store/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    void logout();
    void navigate('/home');
  }, [logout, navigate]);
  return null;
}

export default Logout;
