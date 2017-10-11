import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';

import './style.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className = "HomePage">
        <HomePageHeader/>
        <div className = "Main">
          <HomePageContainer/>
          <HomePageMap/>
        </div>
      </div>
    );
  }
}

export default HomePage;
