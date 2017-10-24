import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class CreatingNewBusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  render() {
    const {loading, onSubmit} = this.props;

    return (
      <div className="creating-new-business-form">
        <Spin spinning={loading}>
          <h1> Add Your Business</h1>
          <p>Add information about your business below.</p>
          <form className="business-info"
            method="POST" name="business-info-form"
            onSubmit={onSubmit}>
            <label for="business-name">Business Name</label>
            <input name="name" id="business-name"
              type="text" placeholder="Mel's Diner"/>
            <label for="business-description">Business Description</label>
            <input name="description" id="business-description"
              type="text" placeholder="Organic Coffee, Natural Food"/>
            <label for="business-address">Address</label>
            <input name="address" id="business-address"
              type="text" placeholder=""/>
            <label for="business-phone">Phone</label>
            <input name="phone" id="business-phone"
              type="text" placeholder="+86 136 8888 8888"/>
            <label for="business-key-words">Business Key Words</label>
            <input name="key-words" id="business-key-words"
              type="text" placeholder="Coffee Asian ..."/>
            <label for="business-longitute">Longitute</label>
            <input name="longitute" id="business-longitute"
              type="text" placeholder="22.33434"/>
            <label for="business-latitude">Latitude</label>
            <input name="latitude" id="business-latitude"
              type="text" placeholder="30.12323"/>
            <label for="image-url-1">image url 1</label>
            <input name="url1" id="image-url-1"
              type="text" placeholder="https://image.com"/>
            <label for="image-url-2">image url 2</label>
            <input name="url2" id="image-url-2"
              type="text" placeholder="https://image.com"/>
            <label for="image-url-3">image url 3</label>
            <input name="url3" id="image-url-3"
              type="text" placeholder="https://image.com"/>
            <input className="business-submit"
              type="submit" value="Add business"/>
          </form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(CreatingNewBusinessForm);
