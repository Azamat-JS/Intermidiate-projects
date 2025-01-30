const DeviceDetector = require('node-device-detector')
const DeviceHelper = require('node-device-detector/helper')

const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAlias: false,
    deviceTrusted: false,
    deviceInfo: false,
});

const detectDevice = (req) => {
    const userAgent = req.headers['user-agent']
  if(!userAgent) return null

  const result = detector.detect(userAgent)
  const deviceId = `${result.device.type}-${result.os.name}-${result.client.name}`;

  return deviceId
}

module.exports = detectDevice