import { useState } from 'react';
import { GiCardPickup } from 'react-icons/gi';
import ScanBarcode from './ScanBarcode';
import { toast } from 'react-toastify';
import axios from 'axios';
import { config } from '../config';

const Picking = () => {
  const [palletBarcode, setPalletBarcode] = useState('');
  const [articleBarcode, setArticleBarcode] = useState([]);
  const [isConfirmPick, setIsConfirmPick] = useState('');

  const token = localStorage.getItem('accessToken');

  const onPChange = async e => {
    setPalletBarcode(e.target.value);
  };

  const confirmPallet = async () => {
    try {
      const { data: Resp } = await axios({
        method: 'GET',
        url: `${config.API_URL}pallet/${palletBarcode}`,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      console.log('first in picking pallet--->', palletBarcode);
      console.log(Resp);
      setIsConfirmPick(Resp);
    } catch (err) {
      console.log('EXECUTION_ERR:-->', err);
      if (err.response && err.response.data) {
        const errMsg = err.response.data || 'Wrong Pallet ID';

        console.log('picking Msg-->', errMsg);
        toast.error(errMsg, {
          autoClose: false
        });
        return false;
      }
    }
  };

  const onAChange = async e => {
    setArticleBarcode(e.target.value);
  };

  const onSubmit = async e => {
    try {
      const { data: Resp } = await axios({
        method: 'POST',
        url: `${config.API_URL}pallet/${palletBarcode}?isFull=true`,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: isConfirmPick
      });
      console.log('Picking Response data -->', Resp);
      toast.success('Picking Successfully!!');
    } catch (err) {
      if (err.response && err.response.data) {
        const errMsg = err.response.data || 'Retrieval Failed.';
        console.log(err.response.data);
        toast.info(errMsg.desc[0]);
        toast.error(errMsg.desc[1]);
        return false;
      }
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <GiCardPickup /> PICKING
        </h1>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
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
            <button
              type="button"
              className="btn btn-sm"
              onClick={confirmPallet}
              style={{ fontSize: 'x-small', background: '#055160' }}
            >
              Confirm pallet
            </button>
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
            <button type="button" onClick={onSubmit} className="btn btn-block">
              Confirm Picking
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Picking;
