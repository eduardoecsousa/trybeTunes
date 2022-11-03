import React, { Component } from 'react';
import FormLogin from '../Components/FormLogin';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <FormLogin />
      </div>
    );
  }
}

export default Login;
