import { useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

function Header({ isLoggedIn, setIsLoggedIn }) {
  // const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = window.localStorage.getItem('accessToken');
    if (userToken) {
      // check if token is valid then set isLogin true
      const decodeToken = jwt_decode(userToken);
      const curTime = new Date();
      const tokenExpiryTime = new Date(decodeToken.exp * 1000 - 1 * 60 * 60 * 1000); // Subtract 1 hour
      if (tokenExpiryTime > curTime) setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    toast.success('Logged out');
    navigate('/WebHHT');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <h6>
            <b>Web HHT</b>
          </h6>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/" onClick={handleLogout} style={isLoggedIn ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <FaSignInAlt />
            Logout
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <AiFillSetting /> Settings
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
