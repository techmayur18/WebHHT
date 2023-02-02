import { useState, useEffect } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { toast } from 'react-toastify';

function Settings() {
  const [changeURL, setChangeURL] = useState('');

  useEffect(() => {
    let APP_CONFIG = localStorage.getItem('APP_CONFIG');
    if (APP_CONFIG) {
      APP_CONFIG = JSON.parse(APP_CONFIG);
      setChangeURL(APP_CONFIG.API_URL);
    }
  }, []);

  const oncChange = e => {
    setChangeURL(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    localStorage.setItem('APP_CONFIG', JSON.stringify({ API_URL: changeURL }));
    toast.success('Set successfully');
    window.location.href = '/WebHHT';
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
              type="url"
              className="form-control"
              id="url"
              name="url"
              value={changeURL === '' ? 'Using Default configuration' : changeURL}
              placeholder="API URL"
              onChange={oncChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Set
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Settings;
