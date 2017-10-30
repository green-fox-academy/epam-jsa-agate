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
  getClassList4NavItem() {
    if (this.props.theme === 'dark') {
      return 'nav-link-dark-theme';
    }
    return 'nav-link-red-theme';
  }
  render() {
    const classList = this.getClassList4NavBar();
    const navLinkClassList = this.getClassList4NavItem();

    return (
      <div className={classList}>
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className={navLinkClassList.concat(' nav-link-clicked')}>
            Overview
          </a>
          <a href="#" className={navLinkClassList}>Restaurants</a>
          <a href="#" className={navLinkClassList}>Nightlife</a>
          <a href="#" className={navLinkClassList}>Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
