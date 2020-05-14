const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?units=f&access_key=fd6621ff82539cd3e25a24d3d6243596&query=${latitude},${longitude}`;

  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback('Location not found!');
    } else {
      callback(null, body);
    }
  });
}

module.exports = forecast;