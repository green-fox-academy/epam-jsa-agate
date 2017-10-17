import React from 'react';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  goToLoginPage() {
    this.props.history.push('/login');
  }
  render() {
    const formClassNames = this.props.formHasError ?
      'register-box error-form-box' : 'login-box';
    const {loading, onSubmit, errMsg} = this.props;

    return (
      <div className={formClassNames}>
        <Spin spinning={loading}>
          <h1>Sign up</h1>
          <form method="post" onSubmit={onSubmit}>
            <p className="form-error-message">{errMsg}</p>
            <input title="Username must be 3 to 15 letters" type="text"
              name="username" placeholder="Username" pattern="[A-Za-z]{3,15}"
              required />
            <input title="Password must be 6-50 letters or numbers"
              type="password" name="password" placeholder="Password"
              pattern="[A-Za-z0-9]{6,50}" required/>
            <input title="Password must be 6-50 letters or numbers"
              type="password" name="retype-password"
              placeholder="Re-type Password" pattern="[A-Za-z0-9]{6,50}"
              required/>
            <input type="submit" value="Register me!"/>
          </form>
          <button onClick={this.goToLoginPage.bind(this)}>Log in</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
