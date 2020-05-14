const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamluaWhlbmRyaXgiLCJhIjoiY2s5dDJlYzFjMDA4MDNucG43c3dxM2ZhcyJ9.5gUfNd3yNgXZWtsu8owG8A`;

  request({ url, json: true }, (err, res, body) => {
    if (err) {
      callback('Unable to connect to geo service!')
    } else if (!body.features.length) {
      callback('Location not found! Try another search');
    } else {
      const {
        center: [longitude, latitude],
        place_name: location,
      } = body.features[0];

      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
}

module.exports = geocode;