import React from 'react';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style/index.css';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class SingleComment extends React.Component {
  render() {
    let data = this.props.commentInfo;
    let score = Math.floor(data.rating);
    let commentSentences = data.comment;
    let username = data.user;
    const character = '★';

    return (
      <div className="single-comment-container">
        <Avatar style={{backgroundColor: '#87d068'}}>U</Avatar>
        <div className="comment-details">
          <div className="comment-username">{username}</div>
          <Rate character={character} disabled allowHalf defaultValue={score}/>
          <div className="comment-content">{commentSentences}</div>
        </div>
      </div>
    );
  }
}

export default SingleComment;