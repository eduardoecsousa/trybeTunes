import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbuns from './CardAlbuns';
import Loading from './Loading';

let albumName = '';

class FormSearch extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      disabled: true,
      loading: false,
      requisit: false,
      empty: false,
      albuns: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const TWO = 2;
    this.setState({
      inputValue: value,
    }, () => {
      const { inputValue } = this.state;
      const validaiton = (inputValue.length >= TWO);
      this.setState({
        disabled: !validaiton,
      });
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    albumName = inputValue;
    this.setState({
      loading: true,
      inputValue: '',
    }, async () => {
      const request = await searchAlbumsAPI(albumName.toString());
      if (request.length) {
        this.setState({
          loading: false,
          albuns: [...request],
          requisit: true,
          empty: false,
        });
        return;
      }
      this.setState({
        loading: false,
        empty: true,
        requisit: false,
      });
    });
  };

  render() {
    const { inputValue, disabled, loading, albuns, requisit, empty } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                id="search-artist-input"
                data-testid="search-artist-input"
                value={ inputValue }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>)}
        { empty && <h1>Nenhum álbum foi encontrado</h1> }
        {requisit && (
          <div>
            <h4>{`Resultado de álbuns de: ${albumName}`}</h4>
            <div className="resultAlbuns">
              {albuns.map((album) => (
                <CardAlbuns key={ album.collectionId } albuns={ album } />))}
            </div>
          </div>
        ) }
      </div>
    );
  }
}

export default FormSearch;
