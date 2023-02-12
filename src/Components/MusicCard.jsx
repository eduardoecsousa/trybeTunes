import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import heart from '../images/iconHeart.svg';
import heartClear from '../images/iconHeartClear.svg';

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
        if (func) {
          func();
        }
      });
    }
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, valueCheck } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div className="music">
            <div className="name-music">
              <h5>{trackName}</h5>
            </div>
            {/* <img src={ artworkUrl60 } alt={ trackName } /> */}
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
                className="checkbox"
              />
              {
                valueCheck
                  ? <img src={ heart } alt="herart" />
                  : <img src={ heartClear } alt="herart" />
              }
            </label>
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
  func: PropTypes.func,
};

MusicCard.defaultProps = {
  music: {},
  func: undefined,
};

export default MusicCard;
