import React from 'react';
import './style.scss';
import SingleComment from '../SingleComment';

class CommentList extends React.Component {
  getClassList() {
    if (this.props.theme === 'dark') {
      return 'comment-list-container comment-list-container-dark-theme';
    }
    return 'comment-list-container comment-list-container-red-theme';
  }
  render() {
    let allComments = [];
    const classList = this.getClassList();

    if (this.props.comments && this.props.comments.length) {
      allComments = this.props.comments.map(
        (element) => <SingleComment info={element}/>
      );
    }

    return (
      <div className={classList}>
        <h2 className="comment-list-title">Comments</h2>
        <div className="comment-list">
          {allComments}
        </div>
      </div>
    );
  }
}

export default CommentList;

