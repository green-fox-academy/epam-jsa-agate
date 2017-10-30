import React from 'react';
import SingleBusinessTitle from '../SingleBusinessTitle';
import HomePageHeader from '../HomePageHeader';
import SingleBusinessMapContainer from '../SingleBusinessMapContainer';
import ImageDisplay from '../ImageDisplay';
import CommentList from '../CommentList';
import notification from 'antd/lib/notification';
import utilities from '../../utilities/common';
import 'antd/lib/notification/style/index.css';
import './style.scss';
import CreatingNewCommentPage from '../CreatingNewCommentPage';

class SingleBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': this.props.match.params.id,
      'businessDetail': {},
      'commentPage': false,
      'theme': utilities.decideTheme(),
    };
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.goToCommentPage = this.goToCommentPage.bind(this);
  }
  themeSwitchHandler(color) {
    localStorage.setItem('theme', color);
    this.setState({'theme': color});
  }
  componentDidMount() {
    this.fetchBusinessesDetail();
  }
  componentWillUpdate(nextProps, nextStates) {
    if (this.state.commentPage === true &&
        nextStates.commentPage === false) {
      this.fetchBusinessesDetail();
    }
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
  goToCommentPage() {
    let loginStatus = localStorage.getItem('Authorization') !== null;

    if (loginStatus) {
      this.setState({'commentPage': true});
    } else {
      this.errorHandler(new Error('You should login.'));
    }
  }
  getClassList4SingelBusinessPage() {
    if (this.state.theme === 'dark') {
      return 'single-business-page single-business-page-dark-theme';
    }
    return 'single-business-page single-business-page-red-theme';
  }
  handleSubmitComment() {
    this.setState({'commentPage': false});
  }
  render() {
    const commentPage = this.state.commentPage;
    const classListOfSingelBusinessPage =
      this.getClassList4SingelBusinessPage();
    const theme = this.state.theme;

    return commentPage ? (
      <CreatingNewCommentPage
        businessDetail={this.state.businessDetail}
        handleSubmitComment={this.handleSubmitComment.bind(this)}/>) : (
      <div className={classListOfSingelBusinessPage}>
        <HomePageHeader themeSwitchHandler={this.themeSwitchHandler.bind(this)}
          theme={this.state.theme}/>
        <SingleBusinessTitle title={this.state.businessDetail.name}
          rating={this.state.businessDetail.rating}
          phone ={this.state.businessDetail.phone}
          goToCommentPage={this.goToCommentPage.bind(this)}/>
        <div className="display-business">
          <SingleBusinessMapContainer theme={theme}
            businessDetail={this.state.businessDetail} />
          <ImageDisplay images={this.state.businessDetail.images}/>
        </div>
        {this.state.businessDetail.comments ?
          <CommentList theme={theme}
            comments={this.state.businessDetail.comments}/>
          : ''}
      </div>
    );
  }
}

export default SingleBusinessPage;
