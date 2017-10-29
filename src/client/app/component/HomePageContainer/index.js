import React from 'react';
import NavigationBar from '../NavigationBar';
import BusinessOverview from '../BusinessOverview';
import './style.scss';

class HomePageContainer extends React.Component {
  render() {
    return (
      <div className = "home-page-container">
        <NavigationBar theme={this.props.theme}/>
        <BusinessOverview businesses={this.props.businesses}
          theme={this.props.theme}/>
      </div>
    );
  }
}

export default HomePageContainer;
