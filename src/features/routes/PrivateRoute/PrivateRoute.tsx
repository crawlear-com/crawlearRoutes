import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../../users/store/selectors/userSelectors';

export const PrivateRoute: React.FC = () => {
  const session = useSelector(selectUserSession);
  const location = useLocation();

  return session ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
    />
  );
};