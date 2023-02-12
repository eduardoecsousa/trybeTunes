import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import userImg from '../images/user.png';
import logo from '../images/logo.svg';
import iconSearch from '../images/iconSearch.svg';
import iconFavorite from '../images/iconFavorite.svg';
import iconProfile from '../images/iconProfile.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    this.setState({
      name: userName.name,
      image: userName.image,
      loading: false,
    });
  }

  render() {
    const { name, loading, image } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="titleName">
          <img src={ logo } alt="logo-pag" />
        </div>
        <nav>
          <Link data-testid="link-to-search" to="/search">
            <img src={ iconSearch } alt="search" />
            Pesquisa
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            <img src={ iconFavorite } alt="favorite" />
            Musicas Favoritas
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            <img src={ iconProfile } alt="profile" />
            Perfil
          </Link>
        </nav>
        { loading ? <Loading /> : (
          <div className="User">
            {image !== '' ? (
              <img
                src={ image }
                alt="imagem user"
                className="ImgUser"
              />
            ) : (
              <img
                src={ userImg }
                alt="imagem user"
                className="ImgUser"
              />
            )}
            <p data-testid="header-user-name">{name}</p>
          </div>
        ) }
      </header>
    );
  }
}

export default Header;
