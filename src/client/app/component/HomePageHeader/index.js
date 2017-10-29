import React from 'react';
import {withRouter} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style/index.css';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/index.css';
import './style.scss';

class HomePageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isLoggedIn': localStorage.getItem('Authorization') !== null,
      'theme': this.decideTheme(),
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.onClickHeaderLogBtn = this.onClickHeaderLogBtn.bind(this);
    this.handleMenuBtnClick = this.handleMenuBtnClick.bind(this);
  }

  componentDidMount() {
    const that = this;

    this.refs.menuButton.addEventListener('click', function(event) {
      that.props.history.push('/');
    });
  }

  decideTheme() {
    let theme = 'red';
    let storedTheme = localStorage.getItem('theme');

    if (storedTheme && (storedTheme === 'red' || storedTheme === 'dark')) {
      theme = storedTheme;
    } else {
      localStorage.setItem('theme', theme);
    }

    return theme;
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
  redirectTopage(path) {
    this.props.history.push(path);
  }
  handleMenuBtnClick(e) {
    if (e.key === "1") {
      this.logOut();
    } else if (e.key === "2") {
      this.redirectTopage.bind(this, '/create-business')();
    }
  }
  logOut() {
    localStorage.removeItem('Authorization');
    this.setState({'isLoggedIn': false});
  }
  onClickHeaderLogBtn(event) {
    if (this.state.isLoggedIn) {
      this.logOut();
    } else {
      this.redirectTopage.call(this, '/login');
    }
  }
  valueChangeHandler(event) {
    const input = event.target.value;

    this.props.search(input)();
  }
  getUserName() {
    let btnText = 'Log In';

    if (this.state.isLoggedIn) {
      btnText = JSON.parse(atob(localStorage
        .getItem('Authorization').split('.')[1]))
        .username;
    }
    return btnText;
  }
  themeSwitchClicked(checked) {
    const theme = checked ? 'red' : 'dark';

    localStorage.setItem('theme', theme);
    this.setState({theme: theme});
    this.props.themeSwitchHandler(theme);
  }
  getHeaderClassList() {
    const themeClassList = 'home-page-header';

    if (this.state.theme === 'dark') {
      return 'home-page-header home-page-header-dark-theme';
    }
    return themeClassList;
  }
  getLogBtnType() {
    let button = <button onClick={this.onClickHeaderLogBtn}>Log In</button>;

    if (this.state.isLoggedIn) {
      const menu = (
        <Menu onClick={this.handleMenuBtnClick}>
          <Menu.Item key="2">
            <button className="home-page-header-create-btn">
              Create Business
            </button>
          </Menu.Item>
          <Menu.Item key="3">
            <Switch onChange={this.themeSwitchClicked.bind(this)}
              checkedChildren="red" unCheckedChildren="dark"
              defaultChecked={true}/>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <button className="home-page-header-log-out-btn">
              Log Out
            </button>
          </Menu.Item>
        </Menu>);

      button = <Dropdown overlay={menu} trigger={['click']}
        size="small" placement="bottomRight">
        <button className="ant-dropdown-link">
          {JSON.parse(
            atob(localStorage.getItem('Authorization').split('.')[1])
          ).username}
        </button>
      </Dropdown>;
    }
    return button;
  }
  render() {
    const button = this.getLogBtnType();
    const headerClassList = this.getHeaderClassList();

    return (
      <div className={headerClassList}>
        <div className="home-page-header-left">
          <div className="menu" ref="menuButton"></div>
          {this.props.headerType === 'create' ?
            (<div className="create-page-header-infor">
              for Business Owners</div>) :
            (<form className="header" onSubmit={this.submitHandler}>
              <input className="search" type="search" id="mySearch"
                placeholder="Search"
                onInput={this.valueChangeHandler}/>
            </form>)}
        </div>
        <div className="home-page-header-right">
          {button}
        </div>
      </div>
    );
  }
}

export default withRouter(HomePageHeader);
