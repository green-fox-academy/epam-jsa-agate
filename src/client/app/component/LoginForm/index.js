import React from 'react';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  goToRegisterPage() {
    this.props.history.push('/register');
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
          <button onClick={this.goToRegisterPage.bind(this)}>Register</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(LoginForm);
