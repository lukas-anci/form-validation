import React, { Component } from 'react';
class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: '',
    },
    errors: {},
  };

  validateForm() {
    if (this.state.account.username.length === 0) {
      this.setState({ errors: { username: 'Cant be blank' } });
    }
    if (this.state.account.username.length <= 3) {
      this.setState({ errors: { username: 'At least 3 letters' } });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {} });
    this.validateForm();
  };

  handleChange = (e) => {
    this.setState({
      account: { ...this.state.account, [e.target.name]: e.target.value },
    });
  };
  handleCheck = (event) => {
    console.log(event.target.checked);
    this.setState({
      account: { ...this.state.account, agreement: event.target.checked },
    });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="main-form">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          Name:
          <input
            onChange={this.handleChange}
            value={account.username}
            className={'input' + (errors.username && 'is-invalid')}
            type="text"
            name="username"
            id=""
          />
          {this.state.errors.username && (
            <p className="error-msg">{this.state.errors.username}</p>
          )}
          Email:
          <input
            onChange={this.handleChange}
            value={account.email}
            className="input"
            type="email"
            name="email"
            id=""
          />
          Password:
          <input
            onChange={this.handleChange}
            value={account.password}
            className="input"
            type="password"
            name="password"
            id=""
          />
          Repeat Password:
          <input
            onChange={this.handleChange}
            value={account.repeatPassword}
            className="input"
            type="password"
            name="repeatPassword"
            id=""
          />
          <div className="check-group">
            <label htmlFor="Terms and Conditions:">Terms and Conditions:</label>
            <input
              onChange={this.handleCheck}
              value={account.agreement}
              type="checkbox"
              name="agreement"
            />
          </div>
          <button className="button" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default MainForm;
