import React from 'react';
import './style.scss';

class CreatingNewBusinessForm extends React.Component {
  render() {
    return (
      <div className="creating-new-business-form">
        <h1> Add Your Business</h1>
        <p>Add information about your business below.</p>
        <form className="business-info" method="POST" name="business-info-form">
          <label for="business-name">Business Name</label>
          <input name="name" id="business-name"
            type="text" placeholder="Mel's Diner"/>
          <label for="business-description">Business Description</label>
          <input name ="description" id="business-description"
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
        </form>
      </div>
    );
  }
}

export default CreatingNewBusinessForm;
