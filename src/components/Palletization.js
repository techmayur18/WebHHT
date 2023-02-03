import { useState } from 'react';
import { FaPallet } from 'react-icons/fa';
import ScanBarcode from './ScanBarcode';
import { toast } from 'react-toastify';
import axios from 'axios';
import { config } from '../config';

const Palletization = API_URL => {
  const [isSku, setIsSku] = useState('');
  const [palletBarcode, setPalletBarcode] = useState('');
  const [articleBarcode, setArticleBarcode] = useState([]);

  const onSChange = e => {
    setIsSku(e.target.value);
  };

  const onPChange = async e => {
    setPalletBarcode(e.target.value);

    // try {
    //   axios.defaults.headers['Bearer'] = token;
    //   const { data: Resp } = await axios({
    //     url: `${config.API_URL}pallet/validate`
    //   });
    //   console.log('first in function--->', palletBarcode);

    //   if (palletBarcode === Resp.data) console.log('Successfully Validate', palletBarcode);
    // } catch (err) {
    //   console.log('EXECUTION_ERR:-->', err);
    //   if (err.response && err.response.data) {
    //     const errMsg = err.response.data.message || 'Wrong Pallet ID';
    //     // console.log('Error data validation---->', err.response.data);
    //     console.log('Error Msg-->', errMsg);
    //     // toast.error(errMsg, {
    //     //   autoClose: false
    //     // });
    //     return false;
    //   }
    // }
  };

  const onAChange = e => {
    setArticleBarcode(e.target.value);
  };
  const token = localStorage.getItem('accessToken');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { data: Resp } = await axios({
        method: 'POST',
        url: `${config.API_URL}pallet/register/${palletBarcode}?withPkg=true`,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: {
          sku: isSku,
          qty: articleBarcode.split(',').length,
          pkgs: [articleBarcode]
        }
      });

      toast.success('Successfully Pallatize!!', Resp.message);
      setPalletBarcode('');
      setArticleBarcode('');
      // window.location.reload();
    } catch (err) {
      if (err.response && err.response.data) {
        const errMsg = err.response.data || 'Retrieval Failed.';
        console.log(err.response.data);
        toast.info(errMsg.error);
        toast.error(errMsg.desc[1]);
        return false;
      }
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaPallet /> PALLETIZATION
        </h1>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="sku"
              name="sku"
              value={isSku}
              placeholder="Add SKU ID"
              onChange={onSChange}
              // disabled
            />
            <div>{<ScanBarcode setBarcode={setPalletBarcode} />}</div>
            <input
              type="text"
              className="form-control"
              id="pallet"
              name="pallet"
              value={palletBarcode}
              placeholder="Pallet Barcode"
              onChange={onPChange}
              // disabled
            />
          </div>
          <div className="form-group">
            <div>{<ScanBarcode setArticleBarcode={setArticleBarcode} />}</div>
            <input
              type="text"
              className="form-control"
              id="article"
              name="article"
              value={articleBarcode}
              placeholder="Article Barcode"
              onChange={onAChange}
              // disabled
            />
          </div>
          <div className="form-group">
            <button onClick={onSubmit} className="btn btn-block">
              Confirm Palletization
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Palletization;
