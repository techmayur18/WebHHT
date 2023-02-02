import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const ScanBarcode = props => {
  const firstUpdate = useRef(true);

  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    return () => {
      if (isStart) stopScanner();
    };
  }, [isStart]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (isStart) {
      startScanner();
    }
    // eslint-disable-next-line
  }, [isStart]);

  const _onDetected = (res, scanResult) => {
    stopScanner();
    scanResult = res.codeResult.code;
    console.log('just want to check --->', scanResult);
    if (props.setBarcode) {
      props.setBarcode(res.codeResult.code);
    } else if (props.setArticleBarcode) {
      props.setArticleBarcode(prevState => {
        const lastValues = [...prevState, res.codeResult.code];
        return lastValues;
      });
    } else {
      alert('nothing scanned');
    }
  };

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            width: 300,
            height: 150,
            facingMode: 'environment' // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        },
        decoder: {
          readers: props.readers
        }
      },
      err => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed(result => {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(box => box !== result.box)
            .forEach(box => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });
  };

  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm"
        onClick={() => setIsStart(prevStart => !prevStart)}
        style={{ marginBottom: 20 }}
      >
        {isStart ? 'Stop ' : props.setArticleBarcode ? 'Scan Article' : 'Scan Pallet'}
      </button>
      {isStart && (
        <React.Fragment>
          <div id="scanner-container" className="scan_div" />
          {/* <span>Barcode: {barcode}</span> */}
        </React.Fragment>
      )}
    </div>
  );
};

export default ScanBarcode;
