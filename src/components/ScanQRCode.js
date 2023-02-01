import { QrReader } from "react-qr-reader";
import React, { useState } from "react";

const ScanQRCode = () => {
  const [data, setData] = useState("No result");

  return (
    <>
      <div className="row">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{data}</p>
      </div>
    </>
  );
};

export default ScanQRCode;
