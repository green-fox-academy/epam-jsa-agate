import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewBusinessForm from '../CreatingNewBusinessForm';
import HomePageMap from '../HomePageMap';
import Header from '../HomePageHeader';
import notification from 'antd/lib/notification';
import utilities from '../../utilities/common';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class CreatingNewBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'successCreate': false,
      'theme': utilities.decideTheme(),
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.clickMapHandler = this.clickMapHandler.bind(this);
  }
  submitHandler(event, imagesArr) {
    event.preventDefault();
    if (imagesArr.length === 0) {
      this.errorHandler(new Error('Please at least upload one image.'));
    } else {
      this.setState({'loading': true});
      while (imagesArr.length < 3) {
        imagesArr.push('/images/no_image_available.png');
      }
      this.submitData({
        name: event.target.elements[0].value,
        description: event.target.elements[1].value,
        address: event.target.elements[2].value,
        phone: event.target.elements[3].value,
        keyword: event.target.elements[4].value,
        longitude: this.state.longitute,
        latitude: this.state.latitude,
        images: imagesArr,
      });
    }
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'Please try again.',
      placement: 'bottomLeft',
    });
  }
  successHandler() {
    this.setState({'successCreate': true});
  }
  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInt = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    fetch('/api/businesses', myInt).then(
      function(response) {
        return response.json();
      }).then(
      function(value) {
        that.setState({'loading': false});
        if (value.error) {
          throw new Error(value.error);
        } else {
          that.successHandler();
        }
      }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  clickMapHandler(position, address) {
    this.setState({
      longitute: position.lng(),
      latitude: position.lat(),
      address: address,
    });
  }
  getClassList() {
    if (this.state.theme === 'dark') {
      return 'content-container content-container-dark-theme';
    }
    return 'content-container';
  }
  themeSwitchHandler(color) {
    localStorage.setItem('theme', color);
    this.setState({'theme': color});
  }
  render() {
    const {loading, address} = this.state;
    const classList = this.getClassList();

    return this.state.successCreate ? (<Redirect to="/" />) : (
      <div className="creating-new-business">
        <Header headerType="create" theme={this.state.theme}
          themeSwitchHandler={this.themeSwitchHandler.bind(this)}/>
        <main className={classList}>
          <CreatingNewBusinessForm onSubmit={this.submitHandler}
            loading={loading} address={address} theme={this.state.theme} />
          <div className="creating-new-map">
            <HomePageMap mapType="create"
              clickHandlerForCreate={this.clickMapHandler}/>
          </div>
        </main>
      </div>
    );
  }
}

export default CreatingNewBusinessPage;
