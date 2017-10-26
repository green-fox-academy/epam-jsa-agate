import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/index.css';

import message from 'antd/lib/message';
import 'antd/lib/message/style/index.css';

class CreatingNewBusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.setState({address: nextProps.address});
    }
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
      .then((url) => console.log(url))
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  handleImageSubmit(file) {
    this.uploadToS3(file.file)
      .then(url => {
        // save the url to the database
      });
  }
  render() {
    const {loading, onSubmit, address} = this.props;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {authorization: 'authorization-text'},
      data: {
        ddd: 111,
        ds: 222,
      },
      customRequest: this.handleImageSubmit,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="creating-new-business-form">
        <Spin spinning={loading}>
          <h1>Add Your Business</h1>
          <p>Add information about your business below.</p>
          <form className="business-info"
            method="POST" name="business-info-form"
            onSubmit={onSubmit}>
            <label htmlFor="business-name">Business Name</label>
            <input name="name" id="business-name"
              type="text" placeholder="Mel's Diner" required/>
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
            {/* <textarea id="image-url" rows="3" placeholder=
              "Highly recommend to input 3 images and seperate them into 3 lines."
            required></textarea> */}
            <Upload {...props}>
              <Button>Click to Upload</Button>
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
