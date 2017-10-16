import React from 'react';
import {Spin} from 'antd';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  render() {
    return (
      <div className="login-box">
        <Spin spinning={this.props.loading}>
          <h1>Log in</h1>
          <form method="post" onSubmit={this.props.onSubmit}>
            <label className="form-error-message"></label>
            <input name="username" required placeholder="Username" />
            <input type="password" name="password" required
              placeholder="Password"/>
            <input type="submit" value="login"/>
          </form>
          <button onClick={this.goToRegisterPage}>Register</button>
        </Spin>
      </div>
    );
  }
}

export default LoginForm;
