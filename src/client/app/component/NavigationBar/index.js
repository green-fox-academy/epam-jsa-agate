import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-title">
          <h1>Browsing Osaka</h1>
        </div>
        <nav id="nav-container">
          <a href="#" id="1-link" className= 'nav-link-change'>OVERVIEW</a>
          <a href="#" id="2-link" className= 'nav-link-origin'>RESTARUANTS</a>
          <a href="#" id="3-link" className= 'nav-link-origin'>NIGHTLIFE</a>
          <a href="#" id="4-link" className= 'nav-link-origin'>HOME SERVICE</a>
          <a href="#" id="5-link" className= 'nav-link-origin'>WRITE A REVIEW
            <img id="comment-img" src="./images/edit.png"/></a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
