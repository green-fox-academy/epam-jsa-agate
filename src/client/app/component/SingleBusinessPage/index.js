import React from 'react';
import {Redirect} from 'react-router-dom';
import SingleBusinessTitle from '../SingleBusinessTitle';
import HomePageHeader from '../HomePageHeader';
import HomePageMap from '../HomePageMap';
import DisplayImage from '../DisplayImage';
import CommentList from '../CommentList';
import './style.scss';

class SingleBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'id': this.props.match.params.id};
  }

  render() {
    return (
      <div className="single-business-page">
        <HomePageHeader/>
        <SingleBusinessTitle/>
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
