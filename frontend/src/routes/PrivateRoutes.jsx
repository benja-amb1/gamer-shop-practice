
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext.jsx';

const PrivateRoutes = ({ roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/" />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export { PrivateRoutes }