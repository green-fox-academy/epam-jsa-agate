import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewCommentForm from '../CreatingNewCommentForm';
// import CreatingNewImage from '../CreatingNewImage';
import Header from '../HomePageHeader';
import './style.scss';

class CreatingNewBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'formHasError': false,
      'rating': 2,
    };
  }

  changeRating(currentRating) {
    console.log('changerating: ' + currentRating);
    this.setState({'rating': currentRating});
    console.log('change rating after set state: ' + this.state.rating);
  }
  submitHandler(event) {
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

    let businessId = '59e988d562e4e88dad8ee5df';

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
            loading={loading} formHasError={formHasError} changeRating={this.changeRating}
            rating={this.state.rating}/>
          {/* <CreatingNewImage /> */}
        </main>
      </div>
    );
  }
}

export default CreatingNewBusinessPage;
