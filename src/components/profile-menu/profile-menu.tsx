import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user-slice';
import { clearConstructor } from '../../services/slices/constructor-slice';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(clearConstructor());
      localStorage.removeItem('constructorState');
      navigate('/login');
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
