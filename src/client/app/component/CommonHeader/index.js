import React from 'react';
import './style.scss';

class CommonHeader extends React.Component {
  render() {
    return (
      <div className="CommonHeader">
        <div className="Menu"></div>
        <div className="Avatar"></div>
      </div>
    );
  }
}

export default CommonHeader;
