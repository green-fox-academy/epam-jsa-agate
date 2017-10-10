import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <nav id="nav-container">
        <a className="nav-link" href="#">OVERVIEW</a>
        <a className="nav-link" href="#">RESTARUANTS</a>
        <a className="nav-link" href="#">NIGHTLIFE</a>
        <a className="nav-link" href="#">HOME SERVICE</a>
        <a className="nav-link" id="comment-img" href="#">WRITE A REVIEW</a>
        <img src="../src/client/app/component/Navigation/images/edit.png"/>
      </nav>
    );
  }
}

export default NavigationBar;
