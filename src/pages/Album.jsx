import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import getMusics from '../services/musicsAPI';
import CardAlbuns from '../Components/CardAlbuns';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      albumMusic: [],
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { match: { params: { id } } } = this.props;
      const request = await getMusics(id);
      this.setState({
        albumMusic: [...request],
        loading: false,
      });
    });
  }

  render() {
    const { loading, albumMusic } = this.state;
    const loneyMusic = albumMusic.filter((e, i) => i > 0);
    return (
      <div data-testid="page-album" className="pages">
        <Header />
        {loading ? <Loading />
          : (
            <div className="musics-album">
              <div>
                <CardAlbuns albuns={ albumMusic[0] } />
              </div>
              <div className="list-music">
                {loneyMusic.map((music) => (
                  <MusicCard key={ music.trackId } music={ music } />))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {},
};

export default Album;
