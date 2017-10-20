/* global google*/
import React from 'react';
import './style.scss';

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

class HomePageMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {map: undefined, markers: []};
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    const center = {lat: 22.528113, lng: 113.946343};
    const zoom = this.props.mapType === 'detail' ? 15 : 14;
    const map = new google.maps.Map(
      document.getElementsByClassName('google-map-component')[0], {
        center: center,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

    this.setState({map: map});
    this.makeMarkers(this.props.businesses);
  }
  componentWillReceiveProps(nextProps) {
    this.makeMarkers(nextProps.businesses);
  }
  clearMarkers() {
    if (this.state.markers && this.state.markers.length > 0) {
      this.state.markers.forEach(function(item) {
        item.setMap(null);
      });
      this.setState({markers: []});
    }
  }
  setCenter(center) {
    if (this.props.mapType === 'detail') {
      this.state.map.setCenter(center);
    }
  }
  createMarker(value) {
    const that = this;
    let marker = new google.maps.Marker({
      position: {lat: value.latitude, lng: value.longitude},
      map: that.state.map,
    });

    marker.addListener('click', function() {
      that.state.map.setCenter(marker.getPosition());
    });
    return marker;
  }
  makeMarkers(businesses) {
    if (businesses && this.state.map) {
      this.clearMarkers();
      this.setCenter({
        lat: businesses[0].latitude,
        lng: businesses[0].longitude,
      });

      this.setState({markers: businesses.map(this.createMarker.bind(this))});
    }
  }
  render() {
    this.makeMarkers();
    return <div className="google-map-component" ></div>;
  }
}

export default HomePageMap;
