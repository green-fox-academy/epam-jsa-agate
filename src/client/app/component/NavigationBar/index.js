import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  categoryFilter(arrList) {
    const that = this;
    const map = Array.prototype.map;

    map.call(arrList,
      (element) => element.addEventListener('click', function(event) {
        const category = element.innerText;

        let removeClassNameFromListPromise = new Promise((resolve, reject) => {
          resolve(that.removeClassNameFromList(arrList)());
        });

        removeClassNameFromListPromise.then(
          (success) => {
            element.classList.add('nav-link-change');
            if (category !== 'OVERVIEW') {
              that.props.navigation(category, 'category')();
            } else {
              that.props.navigation('', 'name')();
            }
          }
        );
      })

    );
  }
  removeClassNameFromList(arrList) {
    const map = Array.prototype.map;

    return function() {
      map.call(arrList,
        (element) => element.classList.remove('nav-link-change'));
    };
  }

  componentDidMount() {
    const that = this;
    const navLinkOrigin = document.getElementsByClassName('nav-link-origin');

    that.categoryFilter(navLinkOrigin);
  }

  render() {
    return (
      <div className="home-page-navigation-container">
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-origin" ref="navBtn">Overview</a>
          <a href="#" className="nav-link-origin" ref="navBtn">Restaurants</a>
          <a href="#" className="nav-link-origin" ref="navBtn">Nightlife</a>
          <a href="#" className="nav-link-origin" ref="navBtn">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
