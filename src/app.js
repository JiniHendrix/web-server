const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { geocode, forecast } = require('./utils');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jin Choi'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jin Choi'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help yourself foo',
    name: 'Jin Choi'
  })
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({ error: 'Please provide an address' });
  }

  geocode(address, (error, data) => {
    if (error) {
      return res.send(error);
    }

    forecast(data.latitude, data.longitude, (error, data) => {
      if (error) {
        return res.send(error);
      }

      res.send(data);
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found',
    name: 'Jin Choi',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found',
    name: 'Jin Choi',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});