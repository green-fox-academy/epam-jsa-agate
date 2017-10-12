import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';

import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };
  }
  componentWillMount() {
    this.fetchBusinesses();
  }
  fetchBusinesses() {
    let that = this;
    let myInit = {method: 'GET'};
    fetch('/api/businesses', myInit).then(function(response) {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error('Businesses not found');
      }
    }).then(function(value) {
      that.setState({businesses: value.businesses});
      return value;
    }).catch(function(err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div className = "home-page">
        <HomePageHeader/>
        <div className = "main">
          <HomePageContainer businesses={this.state.businesses}/>
          <HomePageMap businesses={this.state.businesses}/>
        </div>
      </div>
    );
  }
}

export default HomePage;

