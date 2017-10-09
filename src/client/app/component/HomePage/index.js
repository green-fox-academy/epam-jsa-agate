import {Component} from 'react';
import from '../HomePageHeader';
import from '../HomePageContainer';
import from '../HomePageMap';
import './style.scss';

class HomePage extends Component {
  render(){
    return (
      <div className = "homePage">
        <HomePageHeader/>
        <HomePageContainer/>
        <HOmePageMap/>
      </div>
    )
  }
}

