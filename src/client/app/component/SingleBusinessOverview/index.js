import React from 'react';
import './style.scss';

class SingleBusinessOverview extends React.Component {
  render() {
    let data = this.props.itemInfo;
    let score = Math.floor(data.rating);
    data.rating = '★'.repeat(score);
    data.imageUrl = {background: 'url(./images/' + (data.id % 6 + 1) + '.png)'};

    return (
      <div className="single-business">
        <div className="image-container"
          style={data.imageUrl} >
          <span className="business-score">
            {data.rating}</span>
          <span className="business-name">
            {data.name}</span>
        </div>
        <p className="business-title">
          {data.name}</p>
        <p className="business-description">
          {data.description}</p>
        <div className="business-infor">
          <span className="business-keywords">
            #Nishi-nari Ward</span>
          <a className="business-more" href={data.businessMore}>
            MORE</a>
        </div>
      </div>
    );
  }
}

export default SingleBusinessOverview;
