import React from 'react';
// import {withRouter} from 'react-router-dom';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class SingleBusinessTitle extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {'isLoggedIn': localStorage.getItem('Authorization') !== null};
  }
  // submitHandler(event) {
  //   event.preventDefault();
  //   const input = event.target.elements[0].value;

  //   this.props.search(input)();
  // }
  // keyUPHandler(event) {
  //   const input = event.target.value;

  //   this.props.search(input)();
  // }
  // onClickHeaderLogBtn(event) {
  //   if (this.state.isLoggedIn) {
  //     localStorage.removeItem('Authorization');
  //     this.setState({'isLoggedIn': false});
  //   } else {
  //     this.props.history.push('/login');
  //   }
  // }

  render() {
    // const btnText = this.state.isLoggedIn ? 'Log Out' : 'Log In';

    return (
      <div className="display-business-title">
        <div>
          <div className="single-business-name">Cahoots Bar</div>
          <div>
            <Rate disabled defaultValue={2} />
          </div>
        </div>
        <div>
          <div className="write-comment">
            <button type="button">Wrtie a Review</button>
            <button type="button">Add Photo</button>
            <button type="button">Share</button>
            <button type="button">Bookmark</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBusinessTitle;
