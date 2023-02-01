import { useState } from 'react';
import { GiCardPickup } from 'react-icons/gi';
import ScanBarcode from './ScanBarcode';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { config } from '../config';

function Picking() {
  const [palletBarcode, setPalletBarcode] = useState('');
  const [articleBarcode, setArticleBarcode] = useState([]);

  const onPChange = e => {
    setPalletBarcode(e.target.value);
  };

  const onAChange = e => {
    setArticleBarcode(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
  };

  //  const token = localStorage.getItem('accessToken');

  //   const onSubmit = async e => {
  //     e.preventDefault();

  //     try {
  //       const { data: Resp } = await axios({
  //         method: 'POST',
  //         url: `${config.API_URL}pallet/register/${palletBarcode}?withPkg=true`,
  //         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  //         data: {
  //           sku: 'EL0001',
  //           qty: articleBarcode.split(',').length,
  //           pkgs: [articleBarcode]
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
