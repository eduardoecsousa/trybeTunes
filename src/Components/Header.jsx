import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component" className="header">
        <div className="titleName">
          <h1>Trybetunes</h1>
          { loading ? <Loading /> : (
            <div className="User">
              <img
                src="https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg"
                alt="Imagem Usurio"
                className="ImgUser"
              />
              <p data-testid="header-user-name">{name}</p>
            </div>
          ) }
        </div>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Musicas Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
