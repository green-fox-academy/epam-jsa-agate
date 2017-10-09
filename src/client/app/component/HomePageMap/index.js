import React from 'react';

import './style.scss';

class ReactHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    let center = {lat: 22.528640199999998, lng: 113.93874219999998};
    let mapProp = {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(
      document.getElementsByClassName('MapContainer')[0], mapProp);
    this.props.businesses.forEach(function(value) {
      let marker = new google.maps.Marker({
        position: value,
        map: map,
      });
    });
    // let marker = new google.maps.Marker({
    //   position: center,
    //   map: map,
    // });
    // let marker2 = new google.maps.Marker({
    //   position: {lat: 22.528640199999998, lng: 113.94},
    //   map: map,
    // });

  }
  render() {
    return <div className="MapContainer" ></div>;
  }
}

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  ref.parentNode.insertBefore(script, ref);
}

export default ReactHeader;
