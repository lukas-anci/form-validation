import React, { Component } from 'react';
class ValidationResults extends Component {
  state = {};
  render() {
    return (
      <div className="results">
        {this.props.passErr ? (
          <p>
            {' '}
            <i style={{ color: 'tomato' }} className="fa fa-close"></i>
            Passwords do not match
          </p>
        ) : (
          <p>
            {' '}
            <i style={{ color: 'green' }} className="fa fa-check"></i>
            Passwords match
          </p>
        )}
      </div>
    );
  }
}

export default ValidationResults;
