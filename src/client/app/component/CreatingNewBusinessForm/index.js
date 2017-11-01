import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';

import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/index.css';
import Cascader from 'antd/lib/cascader';
import 'antd/lib/cascader/style/index.css';

class CreatingNewBusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, imgList: []};
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.onSubmitTrigger = this.onSubmitTrigger.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.setState({address: nextProps.address});
    }
  }

  onSubmitTrigger(event) {
    this.props.onSubmit(event, this.state.imgList);
  }

  getSignedRequest(file) {
    return fetch(`/sign-s3?fileName=${file.name}&fileType=${file.type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
  }

  uploadFile(binaryFile, signedRequest, url) {
    const options = {
      method: 'PUT',
      body: binaryFile,
    };

    return fetch(signedRequest, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
      });
  }

  uploadToS3(file) {
    return this.getSignedRequest(file)
      .then((json) => this.uploadFile(file, json.signedRequest, json.url))
      .then((url) => {
        return url;
      }).catch((err) => {
        console.error(err);
        return null;
      });
  }

  handleImageSubmit(file) {
    const that = this;
    let {imgList} = this.state;

    this.uploadToS3(file.file)
      .then((url) => {
        imgList.push(url);
        that.setState({imgList: imgList});
      });
  }

  onChange(value) {
    console.log(value);
  }

  render() {
    const {loading, address} = this.props;
    const props = {
      action: '/',
      customRequest: this.handleImageSubmit,
    };

    const options = [{
      value: 'Restaurants',
      label: 'Restaurants',
    }, {
      value: 'Night Life',
      label: 'Night-Life',
    }, {
      value: 'Home Service',
      label: 'Home-Service',
    }, {
      value: '',
      label: 'Others',
    },
  ];

    return (
      <div className="creating-new-business-form">
        <Spin spinning={loading}>
          <p>Add information about your business below.</p>
          <form className="business-info"
            method="POST" name="business-info-form"
            onSubmit={this.onSubmitTrigger}>
            <label htmlFor="business-name">Business Name</label>
            <input name="name" id="business-name"
              type="text" placeholder="Mel's Diner" required/>
            <label>Business Category</label>
            <Cascader options={options} onChange={this.onChange} placeholder="Please select" />
            <label htmlFor="business-description">Business Description</label>
            <input name="description" id="business-description" required
              type="text" placeholder="Organic Coffee, Natural Food"/>
            <label htmlFor="business-address">Address</label>
            <input name="address" id="business-address"
              type="text" placeholder="Click the map to get the address..."
              value={address} required readOnly/>
            <label htmlFor="business-phone">Phone</label>
            <input name="phone" id="business-phone" required
              type="text" placeholder="+86 136 8888 8888"/>
            
            <label htmlFor="business-key-words">Key Words</label>
            <input name="key-words" id="business-key-words" required
              type="text" placeholder="Coffee Asian ..."/>
            <label htmlFor="image-url">Images url</label>
            <Upload {...props}>
              <div className="create-page-upload-btn">
                Click to Upload
              </div>
            </Upload>
            <input className="business-submit"
              type="submit" value="Add business"/>
          </form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(CreatingNewBusinessForm);
