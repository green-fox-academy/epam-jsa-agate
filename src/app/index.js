import {Component} from 'react';
import ReactDOM from 'react-dom';

require('./scss/styles.scss');

class ReactHeader extends Component {
  render() {
    return (
      <div>
        <header>Hello World!</header>
      </div>);
  }
}

ReactDOM.render(<ReactHeader/>, document.getElementById('root'));
