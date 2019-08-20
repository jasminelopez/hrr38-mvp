var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// const key = require('../client/src/config/yelp.js');
const fetch = require("node-fetch");
const db = require('../database/index');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));
app.options('*', cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var queryParams = {
  location: 'Chicago',
  price: '3'
};

app.post('/search-locations', (req, res) => {
  console.log(req.body);
  queryParams.location = req.body.location;
  queryParams.price = req.body.price;
});

//TODO create a button on each restaurant that adds it to the database
app.post('/post-taco-restaurant', (req, res) => {
  res.send('hello world!')
  //take information from restaurant div and post it into the mongoDB database
  // var restaurantData = new Restaurant(req.body);

});

const API_KEY = process.env.YELP_API_KEY;

app.get('/get-taco-restaurants', (req, res, next) => {
  console.log(queryParams);
  var url = `https://api.yelp.com/v3/businesses/search?term=tacos&location=${queryParams.location}&price=${queryParams.price}`;
  var token = process.env.YELP_API_KEY;
  fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(results =>
      results.json()
    )
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
      console.log(err);
    });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log('Now listening to port ' + port);