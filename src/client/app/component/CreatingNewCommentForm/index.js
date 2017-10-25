import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';
import businessImage from './imagegs/businessPic.jpg';

class CreatingNewCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'loading': false};
  }

  render() {
    const {loading, onSubmit, changeRating, rating} = this.props;

    return (
      <div className="creating-new-comment-form">
        <Spin spinning={loading}>
          <p> Add Your Comment</p>
          <p>Add information about your comment below.</p>
          <form className="comment-info"
            method="POST" name="comment-info-form"
            onSubmit={onSubmit}>
            <Rate onChange={changeRating} character="★"
              value={rating} />
            <textarea rows="4" cols="50" name="comment-input" required placeholder="Input comment" />
            <input className="comment-submit"
              type="submit" value="Add Comment"/>
          </form>
        </Spin>
        <div className="single-business-info">
          <div>{this.props.businessDetail.name}</div>
          <div>{this.props.businessDetail.rating}</div>
          <div>{this.props.businessDetail.phone}</div>
          <div>{this.props.businessDetail.address}</div>
          <div>
            <img src={businessImage}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatingNewCommentForm);
