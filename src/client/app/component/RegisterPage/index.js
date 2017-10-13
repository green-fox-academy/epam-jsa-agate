import React from 'react';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  
  submitHandle(event) {
    event.preventDefault();
    let postUserName = event.target.elements[0].value;
    let postPassword = event.target.elements[1].value;
    let retypePassword = event.target.elements[2].value;
    if (postPassword !== retypePassword) {
      alert('this two password are not the same');
    } else {
      let postData = {
        'username': postUserName,
        'password': postPassword,
      };
      let jSONPostData = JSON.stringify(postData);
      let xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(xhr.responseText);
          console.log(result);
          if (result.status === '201') {
            window.location.href = '/login';
          }
        }
      });
      xhr.open('POST', '/api/register', true);
      this.setState({'status': 'loading'});
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(jSONPostData);
    }
  }

  clickLogin(event) {
    window.location.href = '/login';
  }
  render() {
    return (
      <div className="register-page">
        <Header />
        <div className="register-page-content">
          <RegisterForm onSubmit={this.submitHandle.bind(this)}
            onClickLogin={this.clickLogin.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default RegisterPage;