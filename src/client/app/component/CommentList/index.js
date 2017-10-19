import React from 'react';
import './style.scss';
import SingleComment from '../SingleComment';

class CommentList extends React.Component {
  render() {
    let allComments = [];
    const zero = 0;

    if (this.props.comments && this.props.comments.length > zero) {
      allComments = this.props.comments.map(
        (element, index) => <SingleComment commentInfo={element}/>
      );
    }

    return (
      <div className="comment-list-container">
        <h2 className="comment-list-tile">Comments List</h2>
        <div className="comment-list">
          {allComments};
        </div>
      </div>
    );
  }
}

export default CommentList;

