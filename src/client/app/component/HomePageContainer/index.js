import React from 'react';
import NavigationBar from '../NavigationBar';
import BusinessOverview from '../BusinessOverview';
import './style.scss';

class HomePageContainer extends React.Component {
  render() {
    return (
      <div className = "HomePageContainer">
        <NavigationBar />
        <BusinessOverview />
      </div>
    );
  }
}

export default HomePageContainer;
