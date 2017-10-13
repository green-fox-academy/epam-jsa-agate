import React from 'react';
import './style.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="register-box">
        <h1>Sign up</h1>
        <form onSubmit={this.props.onSubmit}>
          <input title="Username must be 3 to 15 letters" type="text"
            name="username" required placeholder="Username" pattern="[A-Za-z]{3,15}"/>
          <input title="Password must be 6-8 letters or numbers" type="password"
            name="password" required placeholder="Password" pattern="[A-Za-z0-9]{6,8}" />
          <input title="Password must be 6-8 letters or numbers" type="password" name="retype-password" required
            placeholder="Re-type Password" pattern="[A-Za-z0-9]{6,8}"/>
          <input type="submit" value="Register me!"/>
        </form>
        <button type="button" onClick={this.props.onClickLogin}>Log in</button>
      </div>
    );
  }
}

export default RegisterForm;
