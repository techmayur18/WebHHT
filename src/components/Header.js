import { FaSignInAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h6>
            <b>Web Palletizer</b>
          </h6>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
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
