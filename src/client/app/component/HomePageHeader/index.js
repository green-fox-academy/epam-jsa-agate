import React from 'react';
import './style.scss';

class HomePageHeader extends React.Component {
  render() {
    return (
      <div className = "HomePageHeader">
        <div className="align_text_left"></div>
        <form>
          <div>
            <label for="mySearch"></label>
            <input className="search" type="search" id="mySearch" name="q"
              placeholder="Search"/>
          </div>
        </form>
      </div>
    );
  }
}

export default HomePageHeader;
