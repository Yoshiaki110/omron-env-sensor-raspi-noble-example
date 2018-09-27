'use strict';

const noble = require('noble');

const NAME = 'IM';
const ADDRESS = 'e7e6a420bdcf';
const INTERVAL_MILLISEC = 100;

//discovered BLE device
const discovered = (peripheral) => {
  const device = {
    name: peripheral.advertisement.localName,
    uuid: peripheral.uuid,
    rssi: peripheral.rssi
  };
  if (NAME === device.name && ADDRESS === device.uuid) {
    const v = peripheral.advertisement.manufacturerData.toString('hex').substring(30, 34);
    var s = v.substring(2,4) + v.substring(0,2);
    var d = parseInt(s, 16) * 360 / 65535;
    //  0     90     180
    // 55      0
    //       360     305
    console.log(d);
    if (d < 55) {
      d = (d * -1 + 55) * 90 / 55;
      console.log('+   ' + parseInt(d));
    } else if (d < 305) {
      ; // nop
    } else if (d <= 360) {
      d = (360 - d) * 90 / 55 + 90;
      console.log('-   ' + parseInt(d));
    }
    console.log('');
  }
}

//BLE scan start
const scanStart = () => {
  setInterval(() => { noble.startScanning(); }, INTERVAL_MILLISEC);
  noble.on('discover', discovered);
}

if (noble.state === 'poweredOn'){
  scanStart();
} else {
  noble.on('stateChange', scanStart);
}
