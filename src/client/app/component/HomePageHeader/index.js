import React from 'react';
import {withRouter} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style/index.css';
import './style.scss';

class HomePageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'isLoggedIn': localStorage.getItem('Authorization') !== null};
  }

  componentDidMount() {
    const that = this;

    this.refs.menuButton.addEventListener('click', function (event) {
      that.props.history.push('/');
    });
  }

  submitHandler(event) {
    event.preventDefault();
    const input = event.target.elements[0].value;

    this.props.search(input)();
  }

  keyUPHandler(event) {
    const input = event.target.value;

    this.props.search(input)();
  }

  onClickHeaderLogBtn(event) {
    if (this.state.isLoggedIn) {
      localStorage.removeItem('Authorization');
      this.setState({'isLoggedIn': false});
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const userText = localStorage.getItem('Username') === null ?
      'Log Out' : localStorage.getItem('Username');
    const btnText = this.state.isLoggedIn ? userText : 'Log In';
    let button = null;
    const menu = (
      <Menu onClick={this.onClickHeaderLogBtn.bind(this)}>
        <Menu.Item key="1">Log Out</Menu.Item>
      </Menu>);

    if (btnText !== 'Log In') {
      button =
        <Dropdown overlay={menu} size="small">
          <a className="ant-dropdown-link" >
            {btnText}
          </a>
        </Dropdown>;
    } else {
      button = <button onClick={this.onClickHeaderLogBtn.bind(this)}>
        {btnText}</button>;
    }

    return (
      <div className="home-page-header">
        <div className="home-page-header-left">
          <div className="menu" ref="menuButton"></div>
          <form className="header" onSubmit={this.submitHandler.bind(this)}
                onKeyUp={this.keyUPHandler.bind(this)}>
            <input className="search" type="search" id="mySearch"
                   placeholder="Search"/>
          </form>
        </div>
        <div className="home-page-header-right">
          {button}
        </div>
      </div>
    );
  }
}

export default withRouter(HomePageHeader);
