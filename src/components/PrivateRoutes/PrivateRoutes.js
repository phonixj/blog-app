import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const auth = localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
