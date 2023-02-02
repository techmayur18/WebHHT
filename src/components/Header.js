import { FaSignInAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useState } from 'react';

function Header() {
  // const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   if (isLogin === true) setIsLogin(false);
  // };

  const handleLogout = () => {
    // if (isLogin === false) setIsLogin(true);
    localStorage.clear();
    toast.success('Logout Successfully!!');
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
        {/* {isLogin ? (
          <li>
            <Link onClick={handleLogin}>
              <FaSignInAlt />
              Login
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/" onClick={handleLogout}>
              <FaSignInAlt />
              Logout
            </Link>
          </li>
        )} */}
        <li>
          <Link to="/" onClick={handleLogout}>
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
