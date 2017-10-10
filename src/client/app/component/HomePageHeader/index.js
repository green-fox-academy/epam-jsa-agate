import React from 'react';
import './style.scss';

class HomePageHeader extends React.Component {
  render() {
    return (
      <div className = "HomePageHeader">
        <div className="menu"></div>
        <form className="header">
          <label htmlFor="mySearch"></label>
          <input className="search" type="search" id="mySearch" name="q"
            placeholder="Search"/>
        </form>
      </div>
    );
  }
}

export default HomePageHeader;
