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

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
            </Route>
            <Route path="/pallet" element={<PrivateRoute />}>
              <Route exact path="/pallet" element={<Palletization />} />
            </Route>
            <Route path="/picking" element={<PrivateRoute />}>
              <Route exact path="/picking" element={<Picking />} />
            </Route>
            <Route path="/settings" element={<PrivateRoute />}>
              <Route exact path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>

      {/* The below toast options are default, we don't need to pass it. Though passing it for reference purpose */}
      <ToastContainer
        position="top-right"
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
