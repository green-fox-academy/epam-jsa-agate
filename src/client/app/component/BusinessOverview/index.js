import React from 'react';
import './style.scss';

class BusinessOverview extends React.Component {

  render() {
    var imagesDetails = [
       {businessImageUrl: {background: `url(${require("./images/1.png")})`},
       businssRate: '*****',
       businessName: 'EpamjsaAgate',
       businessTitle: 'EpamjsaAgate-titel',
       businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
       businessKeywords: '#Nishi-nari Ward',
       businessMore: 'More'},

      //  {businessImage: 'url(./images/2.png)',
      //  businssRate: '*****',
      //  businessName: 'EpamjsaAgate',
      //  businessTitle: 'EpamjsaAgate-titel',
      //  businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
      //  businessKeywords: '#Nishi-nari Ward',
      //  businessMore: 'More'},

      //  {businessImage: 'url(./images/3.png)',
      //  businssRate: '*****',
      //  businessName: 'EpamjsaAgate',
      //  businessTitle: 'EpamjsaAgate-titel',
      //  businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
      //  businessKeywords: '#Nishi-nari Ward',
      //  businessMore: 'More'},

      //  {businessImage: 'url(./images/4.png)',
      //  businssRate: '*****',
      //  businessName: 'EpamjsaAgate',
      //  businessTitle: 'EpamjsaAgate-titel',
      //  businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
      //  businessKeywords: '#Nishi-nari Ward',
      //  businessMore: 'More'},

      //  {businessImage: 'url(./images/5.png)',
      //  businssRate: '*****',
      //  businessName: 'EpamjsaAgate',
      //  businessTitle: 'EpamjsaAgate-titel',
      //  businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
      //  businessKeywords: '#Nishi-nari Ward',
      //  businessMore: 'More'},

      //  {businessImage: 'url(./images/6.png)',
      //  businssRate: '*****',
      //  businessName: 'EpamjsaAgate',
      //  businessTitle: 'EpamjsaAgate-titel',
      //  businessDescription: 'businessdescriptionfdkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
      //  businessKeywords: '#Nishi-nari Ward',
      //  businessMore: 'More'},
    ];

    var allBusiness = [];

     imagesDetails.map(
      function(item, index) {
        allBusiness.push(
          <div className="single-business">
          <div className="image-container" style={item.businessImageUrl} >
            <span className="business-rate">{item.businssRate}</span>
            <span className="business-name">{item.businessName}</span>
          </div>
  
          <p className="business-title"><span>{index+1}</span>{item.businessTitle}</p>
          <p className="business-description">{item.businessDescription}</p>
  
          <div className="business-infor">
            <span className="business-keywords">{item.businessKeywords}</span>
            <a className="business-more">{item.businessMore}</a>
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
