import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewBusinessForm from '../CreatingNewBusinessForm';
import HomePageMap from '../HomePageMap';
import Header from '../HomePageHeader';
import notification from 'antd/lib/notification';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class CreatingNewBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'successCreate': false,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    this.submitData({
      name: event.target.elements[0].value,
      description: event.target.elements[1].value,
      address: event.target.elements[2].value,
      phone: event.target.elements[3].value,
      keyword: event.target.elements[4].value,
      rating: 3,
      longitude: this.state.longitute,
      latitude: this.state.latitude,
      images: [
        event.target.elements[5].value,
        event.target.elements[6].value,
        event.target.elements[7].value,
      ],
    });
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
  render() {
    const {loading, address} = this.state;

    return this.state.successCreate ? (<Redirect to="/" />) : (
      <div className="creating-new-business">
        <Header/>
        <main className="content-container">
          <CreatingNewBusinessForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} address={address}/>
          <div className="creating-new-map">
            <HomePageMap mapType="create"
              clickHandlerForCreate={this.clickMapHandler.bind(this)}/>
          </div>
        </main>
      </div>
    );
  }
}

export default CreatingNewBusinessPage;
