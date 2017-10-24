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
    this.state = {loading: false};
  }
  render() {
    const {loading, onSubmit} = this.props;

    return (
      <div className="creating-new-comment-form">
        <Spin spinning={loading}>
          <h1> Add Your Comment</h1>
          <p>Add information about your comment below.</p>
          <form className="comment-info"
            method="POST" name="comment-info-form"
            onSubmit={onSubmit}>
            <Rate allowHalf character="★"
              value={0} />
            <textarea rows="4" cols="50" name="comment-input" required placeholder="Input comment" />
            <input className="comment-submit"
              type="submit" value="Add Comment"/>
          </form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(CreatingNewBusinessForm);
