import React from 'react';
import './style.scss';

class BusinessOverview extends React.Component {

  render() {
    var imagesDetails = [
      {
       businessImageUrl: {
         background: `url(${require("./images/1.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },

      {
       businessImageUrl: {
         background: `url(${require("./images/2.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },

      {
       businessImageUrl: {
         background: `url(${require("./images/3.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },

       {businessImageUrl: {background: `url(${require("./images/4.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },

      {
       businessImageUrl: {
         background: `url(${require("./images/5.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },

      {
       businessImageUrl: {
         background: `url(${require("./images/6.png")})`},
       businessScore: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'http://www.baidu.com'
      },
    ];

    var allBusiness = [];

     imagesDetails.map(
      function(item, index) {
        allBusiness.push(
          <div className="single-business">
          <div className="image-container" style={item.businessImageUrl} >
            <span className="business-score">{item.businessScore}</span>
            <span className="business-name">{item.businessName}</span>
          </div>
  
          <p className="business-title"><span>{index+1}. </span>{item.businessTitle}</p>
          <p className="business-description">{item.businessDescription}</p>
  
          <div className="business-infor">
            <span className="business-keywords">{item.businessKeywords}</span>
            <a className="business-more" href={item.businessMore}>More</a>
          </div>
        </div>
        );
      },this);

  return (
    <div id="business-overview-container">
      {allBusiness}
    </div>
  );
  }
}

export default BusinessOverview;
