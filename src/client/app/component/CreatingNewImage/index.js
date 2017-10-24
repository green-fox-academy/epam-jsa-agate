import React from 'react';
import {Redirect} from 'react-router-dom';
import HomePageMap from '../HomePageMap';
import './style.scss';

class CreatingNewImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="creating-new-map">
        <HomePageMap />
      </div>

    );
  }
}

export default CreatingNewImage;
