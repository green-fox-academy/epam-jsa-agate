import React from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../HomePageHeader';
import Map from '../HomePageMap';
import Images from '../DisplayImage';
import './style.scss';

class SingleBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'name': this.props.param.name};
  }
  render() {
    return (
      <div className="single-business-page">
        <Header/>
        <div classNmae="display-business">
          <Map/>
          <Images/>
        </div>
        <CommentList/>
      </div>
    );
  }
}

export default SingleBusinessPage;