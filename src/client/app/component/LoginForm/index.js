import React from 'react';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  goToRegisterPage() {
    window.location.href = '/register';
  }
  render() {
    return (
      <div className="login-box">
        <h1>Log in</h1>
        <form method="post" onSubmit={this.props.onSubmit}>
          <input name="username" required placeholder="Username" />
          <input type="password" name="password" required
            placeholder="Password"/>
          <input type="submit" value="login"/>
        </form>
        <button onClick={this.goToRegisterPage}>Register</button>
      </div>
    );
  }
}

export default LoginForm;
