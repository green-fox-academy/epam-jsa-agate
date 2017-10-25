import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewCommentForm from '../CreatingNewCommentForm';
import Header from '../HomePageHeader';
import './style.scss';

class CreatingNewCommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'formHasError': false,
      'rating': 0,
    };
  }

  changeRating(event) {
    console.log('change rating ' + event);
    this.setState({'rating': event});
    //console.log('after change rating ' + this.state.rating);
  }
  submitHandler(event) {
    console.log('after change rating ' + this.state.rating);
    this.setState({'loading': true});
    console.log('submitHandler rating: ', this.state.rating);
    event.preventDefault();
    this.submitData({
      comment: event.target.elements[0].value,
      rating: this.state.rating,
    });
  }
  errorHandler(err) {
    this.setState({'errMsg': err.message, 'formHasError': true});
  }
  successHandler() {
    this.setState({'errMsg': '', 'formHasError': false});
    this.props.handleSubmitComment();
  }
  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInt = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    let jwtToken = localStorage.getItem('Authorization');

    console.log('token: ' + jwtToken);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + jwtToken);

    let businessId = this.props.businessDetail._id;

    fetch('/api/businesses/' + businessId + '/comments', myInt).then(
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
          <CreatingNewCommentForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} formHasError={formHasError} changeRating={this.changeRating.bind(this)}
            rating={this.state.rating}/>
        </main>
      </div>
    );
  }
}

export default CreatingNewCommentPage;
