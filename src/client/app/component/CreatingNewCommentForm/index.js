import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class CreatingNewBusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'loading': false };
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
            <Rate onChange={changeRating.bind(this)} character="★"
              value={rating} />
            <textarea rows="4" cols="50" name="comment-input" required placeholder="Input comment" />
            <input className="comment-submit"
              type="submit" value="Add Comment"/>
          </form>
        </Spin>
        <div className="single-business-info">
          <p>12323289389348983098</p>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatingNewBusinessForm);