import React from 'react';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import './style.scss';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="LoginPage">
        <Header />
        <div className="LoginPageContent">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
