import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }
  getClassList4NavBar() {
    if (this.props.theme === 'dark') {
      return 'home-page-navigation-container navigation-dark-theme';
    }
    return 'home-page-navigation-container navigation-red-theme';
  }
  render() {
    const classList = this.getClassList4NavBar();

    return (
      <div className={classList}>
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-change">Overview</a>
          <a href="#" className="nav-link-origin">Restaurants</a>
          <a href="#" className="nav-link-origin">Nightlife</a>
          <a href="#" className="nav-link-origin">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
