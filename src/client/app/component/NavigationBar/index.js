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
    const navContainer = document.getElementsByClassName('nav-container')[0];
    const navLinkOrigin = navContainer.getElementsByTagName('a');

    that.categoryFilter(navLinkOrigin);
  }

  render() {
    return (
      <div className="home-page-navigation-container">
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-clicked">Overview</a>
          <a href="#">Restaurants</a>
          <a href="#">Nightlife</a>
          <a href="#">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
