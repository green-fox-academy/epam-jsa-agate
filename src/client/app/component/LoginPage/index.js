import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import './style.scss';

const ZERO = 0;
const MINUS_ONE = -1;
const TWO = 2;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'form': undefined,
      'isLoggedIn': document.cookie.length > ZERO,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true, 'form': event.target});
    event.preventDefault();
    this.submitData({
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    });
  }
  errorHandler(err) {
    document.getElementsByClassName('form-error-message')[0].innerText = err;
    for (let i = 0; i < TWO; i++) {
      let element = this.state.form.elements[i];

      if (element.className.indexOf('login-form-error') === MINUS_ONE) {
        this.state.form.elements[i].className += ' login-form-error';
      }
    }
  }
  removeErrorHandler() {
    document.getElementsByClassName('form-error-message')[0].innerText = '';
    for (let i = 0; i < TWO; i++) {
      let element = this.state.form.elements[i];

      if (element.className.indexOf('login-form-error') > MINUS_ONE) {
        element.className = element.className.replace(
          (new RegExp('(^|\\s)' + 'login-form-error' + '(\\s|$)')), ' ');
      }
    }
  }

  successHandler(token) {
    document.cookie = 'Authorization=' + token;
    this.removeErrorHandler();
    this.setState({'isLoggedIn': true});
  }

  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    fetch('/api/login', myInit).then(function(response) {
      return response.json();
    }).then(function(value) {
      that.setState({'loading': false});
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.successHandler(value.token);
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    return this.state.isLoggedIn ? (<Redirect to="/" />) : (
      <div className="login-page">
        <Header />
        <div className="login-page-content">
          <LoginForm onSubmit={this.submitHandler.bind(this)}
            loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default LoginPage;
