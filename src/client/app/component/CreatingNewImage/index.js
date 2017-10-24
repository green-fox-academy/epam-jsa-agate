import React from 'react';
import {Redirect} from 'react-router-dom';
import Image from './images/businessPic.jpg';
import './style.scss';

const businessImage = Image;

class CreatingNewImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="creating-new-image">
        <img src={businessImage}/>
      </div>

    );
  }
}

export default CreatingNewImage;
