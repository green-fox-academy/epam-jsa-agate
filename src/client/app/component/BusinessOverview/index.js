import React from 'react';
import './style.scss';
import SingleBusinessOverview from'../SingleBusinessOverview';
import {imagesDetails} from'./imagesDetails';

class BusinessOverview extends React.Component {

  render() {    
    var allBusiness = imagesDetails.map((item, index) => {
        item.businessTitle = index+1 + ". " + item.businessTitle;
        return <SingleBusinessOverview itemInfo={item} />        
      });

    return (
      <div id="business-overview-container">
        {allBusiness}
      </div>
    );
  }
}

export default BusinessOverview;
