import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const requestUser = await getUser();
      this.setState({
        loading: false,
        user: requestUser,
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <label htmlFor="name">
              <h3>Nome:</h3>
              <p id="name">{name}</p>
            </label>
            <label htmlFor="email">
              <h3>E-mail:</h3>
              <p id="email">{email}</p>
            </label>
            <label htmlFor="description">
              <h3>Descrição:</h3>
              <p id="description">{description}</p>
            </label>
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
