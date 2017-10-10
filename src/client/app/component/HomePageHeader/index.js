import React from 'react';
import './style.scss';

class HomePageHeader extends React.Component {
  render() {
    return (
      <div className = "HomePageHeader">
        <button className="align_text_left"></button>
        <form className="header">
          <label for="mySearch"></label>
          <input className="search" type="search" id="mySearch" name="q"
            placeholder="Search"/>
        </form>
      </div>
    );
  }
}

export default HomePageHeader;
