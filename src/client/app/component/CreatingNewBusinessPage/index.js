import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewBusinessForm from '../CreatingNewBusinessForm';
import CreatingNewImage from '../CreatingNewImage';
import Header from '../HomePageHeader';
import './style.scss';

class CreatingNewBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'formHasError': false,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    console.log('values', event.target.elements);
    event.preventDefault();
    this.submitData({
      name: event.target.elements[0].value,
      description: event.target.elements[1].value,
      address: event.target.elements[2].value,
      phone: event.target.elements[3].value,
      keyword: event.target.elements[4].value,
      rating: 3,
      longitude: 20,
      latitude: 30,
      image: [
        event.target.elements[5].value,
        event.target.elements[6].value,
        event.target.elements[7].value,
      ],
    });
  }
  errorHandler(err) {
    this.setState({'errMsg': err.message, 'formHasError': true});
  }
  successHandler() {
    this.setState({'errMsg': '', 'formHasError': false});
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
  render() {
    const {loading, formHasError} = this.state;

    return (
      <div className="creating-new-business">
        <Header/>
        <main className="content-container">
          <CreatingNewBusinessForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} formHasError={formHasError}/>
          <CreatingNewImage />
        </main>
      </div>
    );
  }
}

export default CreatingNewBusinessPage;
