import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = () => {
  try {
    const userToken = window.localStorage.getItem('accessToken');
    if (userToken) {
      // check if token is valid then set isLogin true
      const decodeToken = jwt_decode(userToken);
      const curTime = new Date();
      const tokenExpiryTime = new Date(decodeToken.exp * 1000 - 1 * 60 * 60 * 1000); // Subtract 1 hour
      if (tokenExpiryTime > curTime) return <Outlet />;
    }
    return <Navigate to="/WebHHT" />;
  } catch (err) {
    console.log(err);
    return <Navigate to="/WebHHT" />;
  }
};

export default PrivateRoute;
