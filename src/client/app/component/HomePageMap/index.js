/* global google*/
import React from 'react';
import './style.scss';

class HomePageMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    const center = {lat: 22.528113, lng: 113.946343};
    const mapProp = {
      center: center,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const map = new google.maps.Map(
      document.getElementsByClassName('home-page-map')[0], mapProp);
    this.setState({map: map});
    this.makeMarkers();
  }
  makeMarkers() {
    const that = this;
    if (this.props.businesses && this.state.map) {
      this.props.businesses.forEach(function(value) {
        const marker = new google.maps.Marker({
          position: {lat: value.latitude, lng: value.longitude},
          map: that.state.map,
        });
      });
    }
  }
  render() {
    this.makeMarkers();
    return <div className="home-page-map" ></div>;
  }
}

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

export default HomePageMap;
