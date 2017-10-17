import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';
import {notification} from 'antd';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {businesses: []};
  }
  componentWillMount() {
    this.fetchBusinesses();
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'please try again.',
      placement: 'bottomLeft',
    });
  }
  fetchBusinesses() {
    let that = this;

    fetch('/api/businesses').then(function(response) {
      return response.json();
    }).then(function(value) {
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.setState({businesses: value.businesses});
      }
    }).catch(function(err) {
      that.errorHandler(err);
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

