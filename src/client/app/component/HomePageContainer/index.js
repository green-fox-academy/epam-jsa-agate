import React from 'react';
import BusinessOverview from '../BusinessOverview';
import './style.scss';

class HomePageContainer extends React.Component {
  render() {
    return (
      <div className = "HomePageContainer">
        <BusinessOverview />
      </div>
    );
  }
}

export default HomePageContainer;
