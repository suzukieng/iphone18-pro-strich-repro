import {StrichSDK, BarcodeReader} from "https://cdn.jsdelivr.net/npm/@pixelverse/strichjs-sdk@1.18.0";

const messageElem = document.querySelector('#message');
const initializeButton = document.querySelector('#initialize-button');
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const destroyButton = document.querySelector('#destroy-button');

let barcodeReader = null;
const config = {
    selector: '.barcode-scanner',
    frameSource: {
        resolution: 'full-hd',
        rememberCameraDeviceId: true
    },
    feedback: {
        audio: true,
        vibration: true
    },
    locator: {
        regionOfInterest: {
            left: 0.1,
            right: 0.1,
            top: 0.2,
            bottom: 0.2
        }
    },
    engine: {
        symbologies: [
            "ean13", "ean8", "upca", "qr", "datamatrix"
        ],
        duplicateInterval: 500
    }
}

initializeButton.addEventListener('click', async () => {
    try {
        await StrichSDK.initialize('license-key');
        barcodeReader = new BarcodeReader(config);
        await barcodeReader.initialize();
    } catch (e) {
        messageElem.innerText = `ERR: ${e.message}`;
    }
});

startButton.addEventListener('click', async () => {
    try {
        await barcodeReader.start();
        messageElem.innerText = `BarcodeReader.start(): OK`;
    } catch (e) {
        messageElem.innerText = `ERR: ${e.message}`;
    }
});

stopButton.addEventListener('click', async () => {
    try {
        await barcodeReader.stopButton();
        messageElem.innerText = `BarcodeReader.stop(): OK`;
    } catch (e) {
        messageElem.innerText = `ERR: ${e.message}`;
    }
});

destroyButton.addEventListener('click', async () => {
    try {
        await barcodeReader.destroy();
        messageElem.innerText = `BarcodeReader.destroy(): OK`;
        barcodeReader = null;
    } catch (e) {
        messageElem.innerText = `ERR: ${e.message}`;
    }
});


