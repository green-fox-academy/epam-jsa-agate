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
  }
  getSingleBusinessStyle() {
    if (this.props.theme === 'dark') {
      return 'single-business single-business-dark-theme';
    }
    return 'single-business single-business-red-theme';
  }
  render() {
    let data = this.props.itemInfo;
    let score = Math.floor(data.rating);
    let style = {'backgroundImage': 'url(' + data.images[0] + ')'};
    const singleBusinessStyle = this.getSingleBusinessStyle();

    data.score = '★'.repeat(score);

    return (
      <div className={singleBusinessStyle} ref="businessCard">
        <div className="image-container" ref="imageContainer"
          style={style} >
          <span className="business-score">
            {data.score}</span>
          <span className="business-name" ref="businessName">
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
