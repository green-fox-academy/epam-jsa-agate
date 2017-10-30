import React from 'react';
import {withRouter} from 'react-router-dom';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import utilities from '../../utilities/common';
import './style.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'isLoggedIn': localStorage.getItem('Authorization') !== null,
      'formHasError': false,
      'theme': utilities.decideTheme(),
    };
  }
  componentWillUpdate(nextProps, nextStates) {
    if (this.state.isLoggedIn === false && nextStates.isLoggedIn === true) {
      this.props.history.go(-1);
    }
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
    localStorage.removeItem('Authorization');
  }
  successHandler(value) {
    this.setState({'errMsg': '', 'formHasError': false});
    localStorage.setItem('Authorization', value.token);
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
        that.successHandler(value);
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  getClassList() {
    if (this.state.theme === 'dark') {
      return 'login-page-content login-page-content-dark-theme';
    }
    return 'login-page-content';
  }
  render() {
    const {loading, errMsg, formHasError, theme} = this.state;
    const classList = this.getClassList();

    return (
      <div className="login-page">
        <Header theme={theme}/>
        <div className={classList}>
          <LoginForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} errMsg={errMsg}
            formHasError={formHasError} theme={theme}/>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
