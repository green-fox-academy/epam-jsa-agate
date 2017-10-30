import React from 'react';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import utilities from '../../utilities/common';
import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'successRegister': localStorage.getItem('Authorization') !== null,
      'formHasError': false,
      'theme': utilities.decideTheme(),
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    let password = event.target.elements[1].value;
    let retypePassword = event.target.elements[2].value;

    this.validatePasswords(password, retypePassword);
  }

  validatePasswords(password, retypePassword) {
    if (password != retypePassword) {
      this.setState({'loading': false});
      this.setState({
        'errMsg': 'Passwords are not the same.',
        'formHasError': true,
      });
    } else {
      this.submitData({
        username: event.target.elements[0].value,
        password: password,
      });
    }
  }
  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('content-type', 'application/json');

    fetch('/api/register', myInit).then(function(response) {
      return response.json();
    }).then(function(value) {
      that.setState({'loading': false});
      if (value.error === 'Conflict user name.') {
        throw new Error(value.error);
      } else {
        that.successHandler(value.token);
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  successHandler(token) {
    this.setState({'errMsg': '', 'formHasError': false});
    localStorage.setItem('Authorization', token);
    this.setState({'successRegister': true});
  }
  errorHandler(err) {
    if (err.message === 'Conflict user name.') {
      this.setState({
        'errMsg': 'User name has been used.',
        'formHasError': true,
      });
      localStorage.removeItem('Authorization');
    }
  }
  getClassList() {
    if (this.state.theme === 'dark') {
      return 'register-page-content register-page-content-dark-theme';
    }
    return 'register-page-content';
  }
  render() {
    const {successRegister, loading, errMsg, formHasError, theme} = this.state;
    const classList = this.getClassList();

    return successRegister ? (<Redirect to="/" />) : (
      <div className="register-page">
        <Header theme={theme}/>
        <div className={classList}>
          <RegisterForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} errMsg={errMsg}
            formHasError={formHasError} theme={theme}/>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
