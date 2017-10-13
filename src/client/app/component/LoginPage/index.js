import React from 'react';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import './style.scss';

class LoginPage extends React.Component {
  submitHandler(event) {
    event.preventDefault();
    let userName = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    this.submitData({
      username: userName,
      password: password,
    });
  }
  submitData(data) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };
    fetch('/api/login', myInit).then(function(response) {
      return response.json();
    }).then(function(value) {
      if (value.error) {
        throw new Error(value.error);
      } else {
        document.cookie = 'Authorization=' + value.token;
        window.location.href = '/';
      }
    }).catch(function(err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="login-page">
        <Header />
        <div className="login-page-content">
          <LoginForm onSubmit={this.submitHandler.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default LoginPage;
