import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
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
  getFormClass() {
    let formClassNames = 'login-box';
    const errorClass = this.props.formHasError ? ' error-form-box' : '';
    const themeClass = this.props.theme === 'dark' ?
      ' login-form-dark-theme' : ' login-form-red-theme';

    formClassNames += (errorClass + themeClass);
    return formClassNames;
  }
  render() {
    const {loading, onSubmit, errMsg} = this.props;
    const formClassList = this.getFormClass();

    return (
      <div className={formClassList}>
        <Spin spinning={loading}>
          <h1>Log in</h1>
          <form method="post" onSubmit={onSubmit}>
            <p className="form-error-message">{errMsg}</p>
            <input name="username" required placeholder="Username" />
            <input type="password" name="password" required
              placeholder="Password"/>
            <input type="submit" value="Log in"/>
          </form>
          <button onClick={this.goToRegisterPage.bind(this)}>Register</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(LoginForm);
