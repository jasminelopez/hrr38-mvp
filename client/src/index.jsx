import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import YELP_API_KEY from './config/yelp.js';
const yelp = require('yelp-fusion');
const client = yelp.client(YELP_API_KEY);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      tacoListings: [],
      popularListings: [],
      location: '',
      rating: '',
      price: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fetch('/get-taco-restaurants')
      .then(res => res.json())
      .then(listings => {
        this.setState({ tacoListings: listings.data.businesses });
      })
  }

  onChange (event) {
    this.setState({[event.target.name]: event.target.value}); 
  }

  handleSearch() {
    fetch('/search-locations', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "location": this.state.location,
        "price": this.state.price
      })
    })
  };



    render() {
      return (
        <div>
          <div>Search for Tacos!</div>
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              className="location"
              name="location"
              placeholder="Search by your city"
              value={this.state.location}
              onChange={this.onChange}
            />
            <input
              type="text"
              className="price"
              name="price"
              placeholder="Search by price"
              value={this.state.price}
              onChange={this.onChange}
            />
            <input type="submit" value="Submit" />
            {this.state.tacoListings.map(restaurant => (
              <div key={restaurant.alias}>
                <img src={restaurant.image_url} height="100" width="100"></img>
                <div>{restaurant.name}</div>
                <div>{restaurant.price}</div>
                <div>{restaurant.rating}</div>
                <div>{restaurant.review_count}</div>
                <div>{restaurant.location.display_address}</div>
                <a href={`"${restaurant.url}"`}>{restaurant.name}</a>
              </div>
            ))}
          </form>
        </div>
      )
    }
  }

  ReactDOM.render(<App queryParams = { queryParams } />, document.getElementById('taco'));

export default App;