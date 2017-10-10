import React from 'react';
import './style.scss';
import SingleBusinessOverview from'../SingleBusinessOverview';

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
        item.businessTitle = index+1 + ". " + item.businessTitle;
        allBusiness.push(
         <SingleBusinessOverview itemInfo={item} />        
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
