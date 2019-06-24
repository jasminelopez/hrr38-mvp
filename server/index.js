var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const key = require('../client/src/config/yelp.js');
const fetch = require("node-fetch");
var app = express();

app.use(express.static(__dirname + "/../client/dist"));
app.options('*', cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var queryParams = {
  location: 'Chicago',
  price: '2'
};

app.post('/search-locations', (req, res) => {
  console.log(req.body);
  queryParams.location = req.body.location;
  queryParams.price = req.body.price;
});

app.get('/get-taco-restaurants', (req, res, next) => {
  console.log(queryParams);
  var url = `https://api.yelp.com/v3/businesses/search?term=tacos&location=${queryParams.location}&price=${queryParams.price}`;
  var token = key.API_KEY;
  fetch(url, {
      mode: 'cors',
      headers: { 
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
      }
    })
    .then(results => results.json())
    .then(data => {
        res.send({data});
    })
    .catch(err => {
      res.redirect('/error');
    });
})



var port = 8080;

app.listen(port);
console.log('Now listening to port ' + port);