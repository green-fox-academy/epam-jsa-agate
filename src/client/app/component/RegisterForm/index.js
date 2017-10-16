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
            <input name="username" required placeholder="Username" />
            <input type="password" name="password" required
              placeholder="Password"/>
            <input type="password" name="retype-password" required
              placeholder="Re-type Password"/>
            <input type="submit" value="Register me!"/>
          </form>
          <button onClick={this.goToLoginPage.bind(this)}>Log in</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
