import { Link } from "react-router-dom";
import { FaPallet } from "react-icons/fa";
import { GiCardPickup } from "react-icons/gi";
import tufropesLogo from "../assets/tufropes-logo.png";

function Home() {
  return (
    <>
      <section className="heading">
        <div className="img_logo">
          <img
            src={tufropesLogo}
            alt="tufropes_Logo"
            className="img_logo"
          ></img>
        </div>

        <p>Please choose from an option below</p>
      </section>

      <Link to="/pallet" className="btn btn-reverse">
        <FaPallet />
        PALLETIZATION
      </Link>

      <Link to="/picking" className="btn btn-block">
        <GiCardPickup />
        PICKING
      </Link>
    </>
  );
}

export default Home;
