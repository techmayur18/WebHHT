import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
// import { toast } from 'react-toastify';

function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email } = formData;

  const oncChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <AiFillSetting /> SETTINGS
        </h1>
        <p>Setup API URL</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="API URL"
              onChange={oncChange}
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Set</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Settings;
