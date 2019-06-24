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
      popularListings: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = event => {
    const { value } = event.target;
    console.log(event.target.value);
    this.setState({
      query: value
    });
  };

  handleSearch () {
    event.preventDefault();
    fetch('/get-taco-restaurants')
		.then(res => res.json())
		.then(listings => {
      this.setState({ tacoListings: listings.data.businesses });
    })
  };

  render () {
    return (
      <div>
        <div>Search for Tacos!</div>
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              className="search-box"
              placeholder="Search for..."
              onChange={this.onChange}
            />
          <input type="submit" value="Submit" />
          {this.state.tacoListings.map(restaurant => (
              <ul key={restaurant.alias}>
                <li>{restaurant.name}</li>
                <li>{restaurant.price}</li>
                <li>{restaurant.rating}</li>
                <li>{restaurant.review_count}</li>
                <a href={ `"${restaurant.url}"`}>{restaurant.name}</a>
              </ul>
            ))}
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('taco'));

export default App;