import React from 'react';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="LoginBox">
        <h1 className="LoginBoxTitle">Log in</h1>
        <form className="LoginForm" >
          <input type="email" name="email" required placeholder="E-mail" />
          <input type="password" name="password" required
            placeholder="Password"/>
          <input type="submit" value="login"/>
        </form>
        <button>Register</button>
      </div>);
  }
}

export default LoginForm;
