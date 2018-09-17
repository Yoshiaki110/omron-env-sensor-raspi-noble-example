'use strict';

const noble = require('noble');

const NAME = 'IM';
const ADDRESS = 'e7e6a420bdcf';
const INTERVAL_MILLISEC = 1000;

//discovered BLE device
const discovered = (peripheral) => {
  const device = {
    name: peripheral.advertisement.localName,
    uuid: peripheral.uuid,
    rssi: peripheral.rssi
  };
  if(NAME === device.name && ADDRESS === device.uuid) {
    const v = peripheral.advertisement.manufacturerData.toString('hex').substring(30, 34);
    var s = v.substring(2,4) + v.substring(0,2);
    var d = parseInt(s, 16) * 360 / 65535 - 180;
    console.log(d);
    if (d > 0) {
      d = (d - 180) * 180 / (-55);
    } else {
      d = (d + 125) * 90 / (-55);
    }
    console.log(d);
    console.log('');
  }
}

//BLE scan start
const scanStart = () => {
  setInterval(() => { noble.startScanning(); }, INTERVAL_MILLISEC);
  noble.on('discover', discovered);
}

if(noble.state === 'poweredOn'){
  scanStart();
}else{
  noble.on('stateChange', scanStart);
}
