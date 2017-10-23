import React from 'react';
import HomePageMap from '../HomePageMap';
import './style.scss';

class SingleBusinessMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: ''};
  }
  render() {
    const mapType = 'detail';
    let business = {};

    if (this.props.businesses && this.props.businesses.length > 0) {
      business = this.props.businesses[0];
    }

    return (
      <div className="detail-page-map-container">
        <HomePageMap businesses=
          {this.props.businesses} mapType={mapType} />
        <div className="detail-page-map-container-information">
          <p>Location: {business.address
            || (business.longitude + ', ' + business.latitude)}</p>
          <p>Keyword: {business.keyword}</p>
        </div>
      </div>);
  }
}

export default SingleBusinessMapContainer;
