import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewBusinessForm from '../CreatingNewBusinessForm';
import Header from '../HomePageHeader';
import './style.scss';

class CreatingNewBusinessPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="creating-new-business">
        <Header/>
        <CreatingNewBusinessForm/>
      </div>
    );
  }
}

export default CreatingNewBusinessPage;