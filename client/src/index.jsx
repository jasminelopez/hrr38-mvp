import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import YELP_API_KEY from './config/yelp.js';
const yelp = require('yelp-fusion');
const client = yelp.client(YELP_API_KEY);
import styled from 'styled-components';

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
            <Button type="submit" value="Submit" />
            {this.state.tacoListings.map(restaurant => (
              <div key={restaurant.alias}>
                <Restaurant>
                <img src={restaurant.image_url} height="100" width="100"></img>
                <div>{restaurant.name}</div>
                <div>{restaurant.price}</div>
                <div>{restaurant.rating}</div>
                <div>{restaurant.review_count}</div>
                <div>{restaurant.location.display_address}</div>
                <a href={`"${restaurant.url}"`}>{restaurant.name}</a>
                <Button type="submit" value="Add to favorites!"></Button>
                </Restaurant>
              </div>
            ))}
          </form>
        </div>
      )
    }
  }

  const Button = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;
const Restaurant = styled.div`
  display: flex;
  height: 73px;
  border-bottom: solid;
  border-bottom-color: #E8E8E8;
  border-bottom-width: 0.5px;
  border-top: solid;
  border-top-color: #E8E8E8;
  border-top-width: 0.5px;
`;

  ReactDOM.render(<App />, document.getElementById('taco'));

export default App;