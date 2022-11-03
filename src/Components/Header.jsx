import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    this.setState({
      name: userName.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : <p data-testid="header-user-name">{name}</p> }
      </header>
    );
  }
}

export default Header;
