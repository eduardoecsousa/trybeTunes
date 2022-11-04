import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      valueCheck: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const request = await getFavoriteSongs();
      const { music: { trackId } } = this.props;
      request.forEach((favorit) => (
        favorit.trackId === trackId && this.setState({
          valueCheck: true })));
      this.setState({
        loading: false,
      });
    });
  }

  handleChange = ({ target }) => {
    const { func } = this.props;
    const { checked } = target;
    if (checked) {
      this.setState({
        loading: true,
        valueCheck: checked,
      }, async () => {
        const { music } = this.props;
        await addSong(music);
        this.setState({
          loading: false,
        });
      });
    } else {
      this.setState({
        loading: true,
        valueCheck: checked,
      }, async () => {
        const { music } = this.props;
        await removeSong(music);
        this.setState({
          loading: false,
        });
        func();
      });
    }
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId, artworkUrl60 } = music;
    const { loading, valueCheck } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <h5>{trackName}</h5>
            <img src={ artworkUrl60 } alt={ trackName } />
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              <input
                type="checkbox"
                id={ `checkbox-music-${trackId}` }
                name={ `checkbox-music-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                checked={ valueCheck }
                onChange={ this.handleChange }
              />
              Favorita
            </label>
            <hr />
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    artworkUrl60: PropTypes.string,
  }),
};

MusicCard.defaultProps = {
  music: {},
};

export default MusicCard;
