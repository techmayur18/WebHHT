import { useState } from "react";
import { GiCardPickup } from "react-icons/gi";
import ScanBarcode from "./ScanBarcode";

function Picking() {
  const [palletBarcode, setPalletBarcode] = useState("");
  const [articleBarcode, setArticleBarcode] = useState([]);

  const oncChange = (e) => {
    console.log("Hello World");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

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
              onChange={oncChange}
              disabled
            />
          </div>
          <div className="form-group">
            {/* <button className="btn btn-sm" id="scan_pallet">
              Scan Article
            </button> */}
            <div>{<ScanBarcode setArticleBarcode={setArticleBarcode} />}</div>
            <input
              type="text"
              className="form-control"
              id="article"
              name="article"
              value={articleBarcode.join(",")}
              placeholder="Article Barcode"
              onChange={oncChange}
              disabled
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
