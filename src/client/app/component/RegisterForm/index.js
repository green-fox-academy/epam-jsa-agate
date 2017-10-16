import React from 'react';
import './style.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }
  renderSpinnerButton() {
    return (
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 50 50" >
        <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    );
  }
  renderRegisterButton() {
    return (
      <input type="submit" value= 'Register Me!'/>
    );
  }
  render() {
    return (
      <div className="register-box">
        <h1>Sign up</h1>
        <div>
          {this.props.warningInfo}
        </div>
        <form onSubmit={this.props.onSubmit}>
          <input title="Username must be 3 to 15 letters" type="text"
            name="username" required placeholder="Username"
            pattern="[A-Za-z]{3,15}"/>
          <input title="Password must be 6-8 letters or numbers" type="password"
            name="password" required placeholder="Password"
            pattern="[A-Za-z0-9]{6,8}" />
          <input title="Password must be 6-8 letters or numbers" type="password"
            name="retype-password" required
            placeholder="Re-type Password" pattern="[A-Za-z0-9]{6,8}"/>
          {this.props.isLoading ? this.renderSpinnerButton() :
            this.renderRegisterButton()}
        </form>
        <button type="button" onClick={this.props.onClickLogin()}>Log in</button>
      </div>
    );
  }
}

export default RegisterForm;