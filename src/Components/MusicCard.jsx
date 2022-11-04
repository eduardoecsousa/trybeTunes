import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  componentDidMount() {
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl } = music;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <hr />
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }),
};

MusicCard.defaultProps = {
  music: {},
};

export default MusicCard;
