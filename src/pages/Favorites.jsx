import React, { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteMusic: [],
    };
  }

  async componentDidMount() {
    this.handleUpdate();
  }

  async componentWillUnmount() {
    const { loading } = this.state;
    if (loading) {
      console.log('entrou');
    }
  }

  handleUpdate = () => {
    this.setState({
      loading: true,
    }, async () => {
      const request = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteMusic: [...request],
      });
    });
  };

  render() {
    const { loading, favoriteMusic } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <div>
            {favoriteMusic.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                func={ this.handleUpdate }
              />
            )) }
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
