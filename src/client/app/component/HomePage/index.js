import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';
import notification from 'antd/lib/notification';
import utilities from '../../utilities/common';
import 'antd/lib/notification/style/index.css';
import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      constBusinesses: [],
      theme: utilities.decideTheme(),
    };
  }
  themeSwitchHandler(color) {
    localStorage.setItem('theme', color);
    this.setState({'theme': color});
  }
  getClassList() {
    const themeClassList = 'home-page-main';

    if (this.state.theme === 'dark') {
      return 'home-page-main home-page-dark-theme';
    }
    return themeClassList;
  }
  filterBusinesses(inputStr) {
    const filteredBusinesses =
      () => this.state.constBusinesses.filter((el) =>
        this.searchString(el.name.toLowerCase(), inputStr.toLowerCase()));

    return () => {
      this.setState({businesses: filteredBusinesses()});
    };
  }
  searchString(business, inputStr) {
    return business.includes(inputStr);
  }
  componentWillMount() {
    this.fetchBusinesses();
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'Please try again.',
      placement: 'bottomLeft',
    });
  }
  fetchBusinesses() {
    let that = this;

    fetch('/api/businesses').then(function(response) {
      return response.json();
    }).then(function(value) {
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.setState({
          businesses: value.businesses,
          constBusinesses: value.businesses,
        });
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    const classList = this.getClassList();

    return (
      <div className="home-page">
        <div className={classList}>
          <HomePageHeader search={this.filterBusinesses.bind(this)}
            themeSwitchHandler={this.themeSwitchHandler.bind(this)}
            theme={this.state.theme}/>
          <HomePageContainer businesses={this.state.businesses}
            theme={this.state.theme}/>
        </div>
        <HomePageMap businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default HomePage;

