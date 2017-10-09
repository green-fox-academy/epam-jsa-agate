import React from 'react';
import './style.scss';

class BusinessOverview extends React.Component {
  imagesDetails = [
    {
      business-rate : ***,

    },
    {

    }
  ];

  render() {
  return (
    <div id="business-overview-container">
      <div className="single-business">
        <div className="image-container">
          <span className="business-rate">***</span>
          <span className="business-name">EpamjsaAgate</span>
        </div>

        <p className="business-title"><span>1.</span>EpamjsaAgate-titel</p>
        <p className="business-description">businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfld
          afahddddddddddddd'ddddrjgtkrejtkFdd</p>

        <div className="business-infor">
          <span className="business-keywords">#Nishi-nari Ward</span>
          <a className="business-more">More</a>
        </div>
      </div>
    </div>
  );
  }
}

export default BusinessOverview;
