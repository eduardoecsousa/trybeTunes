import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.svg';
import Loading from './Loading';

class FormLogin extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      disabled: true,
      loading: false,
      direct: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const TREE = 3;
    this.setState({
      userName: value,
    }, () => {
      const { userName } = this.state;
      const validaiton = (userName.length >= TREE);
      this.setState({
        disabled: !validaiton,
      });
    });
  };

  handleClick = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      this.setState({
        direct: true,
        loading: false,
        userName: '',
      });
    });
  };

  render() {
    const { userName, disabled, loading, direct } = this.state;
    return (
      <div>
        {direct && <Redirect to="/search" />}
        {loading ? <Loading /> : (
          <div className="login">
            <form>
              <img src={ logo } alt="logo-pag" />
              <label htmlFor="login-name-input">
                <input
                  data-testid="login-name-input"
                  placeholder="qual o seu nome ?"
                  name="userName"
                  type="text"
                  id="login-name-input"
                  value={ userName }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </div>)}
      </div>
    );
  }
}

export default FormLogin;
