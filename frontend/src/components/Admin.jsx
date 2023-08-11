import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.role === 'doctor' ? (
    <Outlet />
  ) : (
    <Navigate to='/register' replace />
  );
}

export default AdminRoute;
