import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProfile extends Component {
  render() {
    const { name, image, email, description } = this.props;
    return (
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
    );
  }
}

CardProfile.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
};

CardProfile.defaultProps = {
  name: '',
  image: '',
  email: '',
  description: '',
};

export default CardProfile;
