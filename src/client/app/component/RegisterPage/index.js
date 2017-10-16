import React from 'react';
import {Redirect} from 'react';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      status: 'being',
      warning: false,
      warningMessage: '',
      successLogin: false,
    };
  }
  resetState() {
    this.setState({warning: false});
    this.setState({warningMessage: ''});
  }
  showPasswordError() {
    this.setState({warning: true});
    this.setState({warningMessage: 'These two passwords are not the same.'});
  }
  register(postData) {
    let that = this;
    let jSONPostData = JSON.stringify(postData);
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let result = JSON.parse(xhr.responseText);

        if (result.status === '409') {
          that.setState({warning: true});
          that.setState({warningMessage: 'User name conflict.'});
        }
        if (result.status === '201') {
          window.location.href = '/login';
        }
        that.setState({'status': 'being'});
      }
    });
    xhr.open('POST', '/api/register', true);
    this.setState({'status': 'loading'});
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('content-type', 'application/json');
    this.setState({'status': 'loading'});
    xhr.send(jSONPostData);
  }
  submitHandle(event) {
    this.resetState();
    event.preventDefault();

    let postUserName = event.target.elements[0].value;
    let postPassword = event.target.elements[1].value;
    let retypePassword = event.target.elements[2].value;

    if (postPassword !== retypePassword) {
      this.showPasswordError();
    } else {
      let postData = {
        'username': postUserName,
        'password': postPassword,
      };

      this.register(postData);
    }
  }
  clickLogin() {
    // window.location.href = '/login';
    // if (this.state.successLogin) {
    return (<Redirect to="/login" />);
    // }
  }
  render() {
    return this.state.successLogin ? <Redirect to="/" /> : (
      <div className="register-page">
        <Header />
        <div className="register-page-content">
          <RegisterForm onSubmit={this.submitHandle.bind(this)} warningInfo={this.state.warningMessage}
            isLoading={this.state.status === 'loading'} onClickLogin={this.clickLogin} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
