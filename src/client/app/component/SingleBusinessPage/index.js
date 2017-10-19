import React from 'react';
import {Redirect} from 'react-router-dom';
import SingleBusinessTitle from '../SingleBusinessTitle';
import HomePageHeader from '../HomePageHeader';
import HomePageMap from '../HomePageMap';
import DisplayImage from '../DisplayImage';
import CommentList from '../CommentList';
import notification from 'antd/lib/notification';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class SingleBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'id': this.props.match.params.id, 'businessDetail': {}};
  }
  componentWillMount() {
    this.fetchBusinessesDetail();
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'Please try again.',
      placement: 'bottomLeft',
    });
  }
  fetchBusinessesDetail() {
    let that = this;

    fetch('/api/business/' + that.state.id).then(function(response) {
      return response.json();
    }).then(function(value) {
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.setState({'businessDetail': value});
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    return (
      <div className="single-business-page">
        <HomePageHeader/>
        <SingleBusinessTitle singleBusinessDetail={this.state.businessDetail}/>
        <div className="display-business">
          <HomePageMap/>
          <DisplayImage/>
        </div>
        <CommentList/>
      </div>
    );
  }
}

export default SingleBusinessPage;
