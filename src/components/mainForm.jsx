import Joi from 'joi-browser';
import React, { Component } from 'react';
import ValidationResults from './validationResults';
class MainForm extends Component {
  state = {
    account: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agreement: false,
    },
    errors: {},
    errorMessages: {
      agreement: 'PLease confirm terms and conditions',
      repeatPassword: 'Passwords must match',
    },
  };

  // validacijos schema
  schema = {
    username: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(4).required(),
    repeatPassword: Joi.ref('passworrd'),
    agreement: Joi.boolean().required().invalid(false).default(false),
  };

  validateForm() {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    console.log('Joi result', result);

    if (!result.error) return;

    const errors = {};
    // errors.username = result.error.details
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log('local errors', errors);
    this.setState({ errors: errors });

    // if (this.state.account.username.length === 0) {
    //   this.setState({ errors: { username: 'Cant be blank' } });
    // }
    // if (this.state.account.username.length <= 3) {
    //   this.setState({ errors: { username: 'At least 3 letters' } });
    // }
  }

  resetErrors() {
    this.setState({ errors: {} });
    // jei agreement yra false tai => ''
    this.state.account.agreement === false &&
      this.setState({ account: { ...this.state.account, agreement: '' } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.resetErrors();
    this.validateForm();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      account: { ...this.state.account, [name]: value },
    });
    this.validateProperty(name, value);
  };
  handleCheck = (event) => {
    console.log(event.target.checked);
    this.setState({
      account: { ...this.state.account, agreement: event.target.checked },
    });
  };

  validateProperty(name, value) {
    console.log(name, value);
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema);
    if (result.error) {
      console.log(result.error.details[0].message);
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: result.error.details[0].message,
        },
      });
    } else {
      const errorsCopy = { ...this.state.errors };
      delete errorsCopy[name];
      this.setState({
        errors: errorsCopy,
      });
    }
  }

  passProps() {
    if (this.state.errors.password) return true;
    if (this.state.errors.repeatPassword) return true;
    return false;
  }

  render() {
    const { account, errors, errorMessages } = this.state;
    return (
      <div className="main-form">
        <div className="flex">
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
              className={'input' + (errors.email && 'is-invalid')}
              type="email"
              name="email"
              id=""
            />
            {this.state.errors.email && (
              <p className="error-msg">{this.state.errors.email}</p>
            )}
            Password:
            <input
              onChange={this.handleChange}
              value={account.password}
              className={'input' + (errors.password && 'is-invalid')}
              type="password"
              name="password"
              id=""
            />
            {this.state.errors.password && (
              <p className="error-msg">{this.state.errors.password}</p>
            )}
            Repeat Password:
            <input
              onChange={this.handleChange}
              value={account.repeatPassword}
              className={'input' + (errors.repeatPassword && 'is-invalid')}
              type="password"
              name="repeatPassword"
              id=""
            />
            {this.state.errors.repeatPassword && (
              <p className="error-msg">{errorMessages.repeatPassword}</p>
            )}
            <div className="check-group">
              <label htmlFor="Terms and Conditions:">
                Terms and Conditions:
              </label>
              <input
                onChange={this.handleCheck}
                value={account.agreement}
                type="checkbox"
                name="agreement"
              />
            </div>
            {this.state.errors.agreement && (
              <p className="error-msg">{errorMessages.agreement}</p>
            )}
            <button className="button" type="submit">
              Send
            </button>
          </form>
          <ValidationResults passErr={this.passProps()} />
        </div>
      </div>
    );
  }
}

export default MainForm;
