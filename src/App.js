import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Palletization from './components/Palletization';
import Home from './components/Home';
import Login from './components/Login';
import Settings from './components/Settings';
import Picking from './components/Picking';
import PrivateRoute from './components/PrivateRoute';
import { useState, useEffect } from 'react';
import { config } from './config';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [API_URL, setAPI_URL] = useState(config.API_URL);

  useEffect(() => {
    let APP_CONFIG = localStorage.getItem('APP_CONFIG');
    if (APP_CONFIG) {
      APP_CONFIG = JSON.parse(APP_CONFIG);
      setAPI_URL(APP_CONFIG.API_URL);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              exact
              path="/"
              element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} />}
            />
            <Route
              exact
              path="/WebHHT"
              element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} />}
            />
            <Route path="/home" element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
            </Route>
            <Route path="/pallet" element={<PrivateRoute />}>
              <Route exact path="/pallet" element={<Palletization API_URL={API_URL} />} />
            </Route>
            <Route path="/picking" element={<PrivateRoute />}>
              <Route exact path="/picking" element={<Picking API_URL={API_URL} />} />
            </Route>

            <Route exact path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>

      {/* The below toast options are default, we don't need to pass it. Though passing it for reference purpose */}
      <ToastContainer
        position="bottom-center"
        style={{ width: '250px', marginLeft: 70, bottom: 70 }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
