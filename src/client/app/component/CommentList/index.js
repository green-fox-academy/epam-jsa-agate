import React from 'react';
import './style.scss';
import SingleComment from '../SingleComment';

class CommentList extends React.Component {
  render() {
    let allComments = [];
    console.log('printout1', allComments.length);
    if (this.props.comments && this.props.comments.length > 0) {
      console.log('printout2', allComments.length);
      allComments = this.props.comments.map(
        (element, index) => <SingleComment commentInfo={element}/>
      );
      console.log('printout3', allComments.length);
    }


    return (
      <div className="comment-list-container">
        <div className="comment-list">
          {allComments};
        </div>
      </div>
    );
  }
}

export default CommentList;

