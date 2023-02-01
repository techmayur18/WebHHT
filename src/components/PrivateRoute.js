import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  try {
    const token = localStorage.getItem('accessToken');
    jwt_decode(token, { header: true });

    return token ? <Outlet /> : <Navigate to="/" />;
  } catch (err) {
    toast.info('Please Login First...');
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
