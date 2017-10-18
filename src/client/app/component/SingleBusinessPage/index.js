import React from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../HomePageHeader';
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
        <DisplayBusiness/>
        <CommentList/>
      </div>
    );
  }
}
