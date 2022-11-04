import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      valueCheck: false,
    };
  }

  handleChange = ({ target }) => {
    const { checked } = target;
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
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, valueCheck } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <h5>{trackName}</h5>
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
  }),
};

MusicCard.defaultProps = {
  music: {},
};

export default MusicCard;
