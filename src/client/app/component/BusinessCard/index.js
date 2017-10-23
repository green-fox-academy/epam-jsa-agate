import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';

class BusinessCard extends React.Component {
  componentDidMount() {
    let businessCard = this.refs.businessCard;

    businessCard.addEventListener('click', function(event) {
      const id = this.props.itemInfo._id;

      this.props.history.push('/business/' + id);
    }.bind(this));

    let imageContainer = this.refs.imageContainer;
    let businessName = this.refs.businessName;

    imageContainer.addEventListener('mouseover', function(event) {
      businessName.classList.remove('hideBusinessName');
    });

    imageContainer.addEventListener('mouseout', function(event) {
      businessName.classList.add('hideBusinessName');
    });
  }
  render() {
    let data = this.props.itemInfo;
    let score = Math.floor(data.rating);
    let style = {background: 'url(' + data.imageUrl + ')'};

    data.score = '★'.repeat(score);

    return (
      <div className="single-business" ref="businessCard">
        <div className="image-container" ref="imageContainer"
          style={style} >
          <span className="business-score">
            {data.score}</span>
          <span className="business-name hideBusinessName" ref="businessName">
            {data.name}</span>
        </div>
        <p className="business-title">
          {data.name}</p>
        <p className="business-description">
          {data.description}</p>
        <div className="business-infor">
          <span className="business-keywords">
            #{data.keyword}</span>
          <a className="business-more" href={data.businessMore}>
            More</a>
        </div>
      </div>
    );
  }
}

export default withRouter(BusinessCard);
