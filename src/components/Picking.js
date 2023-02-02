import { useState } from 'react';
import { GiCardPickup } from 'react-icons/gi';
import ScanBarcode from './ScanBarcode';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { config } from '../config';

function Picking() {
  const [palletBarcode, setPalletBarcode] = useState('');
  const [articleBarcode, setArticleBarcode] = useState([]);

  // const token = localStorage.getItem('accessToken');

  const onPChange = e => {
    setPalletBarcode(e.target.value);
  };

  const onAChange = e => {
    setArticleBarcode(e.target.value);

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
    //     console.log('Error data validation---->', err.response.data);
    //     console.log('Error Msg-->', errMsg);
    //     toast.error(errMsg, {
    //     autoClose: false
    //     });
    //     return false;
    //   }
    // }
  };

  const onSubmit = async e => {};

  //  const token = localStorage.getItem('accessToken');

  //   const onSubmit = async e => {
  //     e.preventDefault();

  //     try {
  //       const { data: Resp } = await axios({
  //         method: 'POST',
  //         url: `${config.API_URL}pallet/${palletBarcode}?isFull=true`,
  //         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  //         data: {
  //
  //         }
  //       });
  //       console.log('resp data fjjr-->', Resp.data);
  //       toast.success(Resp.message);
  //     } catch (err) {
  //       if (err.response && err.response.data) {
  //         const errMsg = err.response.data || 'Retrieval Failed.';
  //         console.log(err.response.data);
  //         toast.info(errMsg.error);
  //         toast.error(errMsg.desc[1]);
  //         return false;
  //       }
  //     }
  //   };

  return (
    <>
      <section className="heading">
        <h1>
          <GiCardPickup /> PICKING
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button className="btn btn-block">Confirm Picking</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Picking;
