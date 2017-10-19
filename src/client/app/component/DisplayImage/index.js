import React from 'react';
import './style.scss';
import * as imagesJson from './imagesForTest.json';

const imagesList = imagesJson.imagesUrl;
const imageData =
  [imagesList[2], imagesList[3], imagesList[4], imagesList[5]];

class DisplayImage extends React.Component {
  render() {
    return (
      <div className="display-image">
        <img className="slot one" src={imagesList[0]}/>
        <img className="slot two" src={imagesList[1]}/>
        <img className="slot three" src={imagesList[2]}/>
      </div>
    );
  }
}

export default DisplayImage;
