import React from 'react';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'successRegister': false,
      'formHasError': false,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    this.submitData({
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    });
  }
  errorHandler(err) {
    this.setState({'errMsg': err.message, 'formHasError': true});
    // localStorage.removeItem('Authorization');
  }

  successHandler() {
    this.setState({'errMsg': '', 'formHasError': false});
    // localStorage.setItem('Authorization', token);
    this.setState({'successRegister': true});
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
      if (value.status === '409') {
        throw new Error(value.status);
      } else {
        that.successHandler();
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }


  render() {
    const {successRegister, loading, errMsg, formHasError} = this.state;
    
    return successRegister ? (<Redirect to="/login" />) : (
      <div className="register-page">
        <Header />
        <div className="register-page-content">
          <RegisterForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} errMsg={errMsg}
            formHasError={formHasError} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;