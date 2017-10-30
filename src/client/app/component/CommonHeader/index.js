import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';

class CommonHeader extends React.Component {
  componentDidMount() {
    const that = this;

    this.refs.menuButton.addEventListener('click', function(event) {
      that.props.history.push('/');
    });
  }
  getHeaderClassList() {
    if (this.props.theme === 'dark') {
      return 'common-header common-header-dark-theme';
    }
    return 'common-header common-header-red-theme';
  }

  render() {
    const headerClassList = this.getHeaderClassList();

    return (
      <div className={headerClassList}>
        <div className="menu" ref="menuButton"></div>
        <div className="avatar"></div>
      </div>
    );
  }
}

export default withRouter(CommonHeader);
