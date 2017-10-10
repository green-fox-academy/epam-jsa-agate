import React from 'react';
import './style.scss';
import SingleBusinessOverview from '../SingleBusinessOverview';

class BusinessOverview extends React.Component {
  render() {
    let imagesDetails = [
      {
        businessImageUrl: {
          background: `url(${require('./images/1.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription: 'businessdescriptionf' +
        'dkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfldaf' +
        'ahdddddddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },

      {
        businessImageUrl: {
          background: `url(${require('./images/2.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription:
          'businessdescriptionfdkssa' +
          'jflkdjalfjdaljfdlasjfljfaljfalf' +
          'jlajfldafahdddddddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },

      {
        businessImageUrl: {
          background: `url(${require('./images/3.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription: 'businessd' +
        'escriptionfdkssajflkdjalfj' +
        'daljfdlasjfljfaljfalfjlajfldafahdddddddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },

      {businessImageUrl: {background: `url(${require('./images/4.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription: 'businessdescriptionf' +
        'dkssajflkdjalfjdaljfdlasjfljfaljfalfjlajfld' +
        'afahdddddddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },

      {
        businessImageUrl: {
          background: `url(${require('./images/5.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription: 'businessdescriptionfdkssa' +
        'jflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahddddd' +
        'ddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },

      {
        businessImageUrl: {
          background: `url(${require('./images/6.png')})`},
        businessScore: '*****',
        businessName: 'EpamjsaAgate',
        businessTitle: 'EpamjsaAgate-titel',
        businessDescription: 'businessdescriptionfdkss' +
        'ajflkdjalfjdaljfdlasjfljfaljfalfjlajfldafahdddd' +
        'dddddddddddddrjgtkrejtkFdd',
        businessKeywords: '#Nishi-nari Ward',
        businessMore: 'http://www.baidu.com',
      },
    ];

    let allBusiness = [];

    imagesDetails.map(
      function(item, index) {
        item.businessTitle = index+1 + '. ' + item.businessTitle;
        allBusiness.push(
          <SingleBusinessOverview itemInfo={item} />
        );
      }, this);

    return (
      <div id="business-overview-container">
        {allBusiness}
      </div>
    );
  }
}

export default BusinessOverview;
