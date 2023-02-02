import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, setIsLoggedIn, API_URL }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'username') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    try {
      // e.preventDefault();
      if (!username || !password) {
        return toast.warn('Missing required fields');
      }
      if (username.length > 30) return toast.warn('Invalid username');
      if (password.length > 20) return toast.warn('Password too long');

      const { data: loginResp } = await axios({
        url: `${API_URL}login`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        data: { username: username, password }
      });
      toast.success('Logged In');
      window.localStorage.setItem('accessToken', loginResp.accessToken);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        return toast.error(err.response.data?.message || 'Invalid Credentials');
      }
      toast.error(err.message);
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to continue</p>
      </section>
      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleSubmit} className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
