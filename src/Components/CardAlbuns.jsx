import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbuns extends Component {
  render() {
    const { albuns } = this.props;
    const { artistName, collectionId, collectionName,
      artworkUrl100 } = albuns;
    return (
      <div className="card">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <p className="album" data-testid="album-name">{collectionName}</p>
          <p className="artist" data-testid="artist-name">{artistName}</p>
        </Link>
      </div>
    );
  }
}

CardAlbuns.propTypes = {
  albuns: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }),
};

CardAlbuns.defaultProps = {
  albuns: {},
};

export default CardAlbuns;
