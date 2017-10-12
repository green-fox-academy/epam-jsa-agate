import React from 'react';
import './style.scss';
import BusinessCard from '../BusinessCard';

class BusinessOverview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let allBusiness = this.props.businesses.map((item, index) => {
      return <BusinessCard itemInfo={item} />;
    });

    return (
      <div id="business-overview-container">
        <div className="business-overview-title">
          The Best places you should not miss in Osaka</div>
        {allBusiness}
      </div>
    );
  }
}

export default BusinessOverview;
