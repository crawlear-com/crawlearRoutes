import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectUserSession } from '@/application/features/users/store/selectors/userSelectors';
import Spinner from '@/application/components/ui/Spinner/Spinner';
import useSession from '@/application/hooks/useSession';

export const PrivateRoute: React.FC = () => {
  useSession();
  const session = useSelector(selectUserSession);
  const location = useLocation();
  const isLoadingUser = useSelector(selectIsLoading);

  if (isLoadingUser) {
    return (<div className="w-full h-dvh flex flex-col items-center justify-center">
      <Spinner />
    </div>);
  }

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