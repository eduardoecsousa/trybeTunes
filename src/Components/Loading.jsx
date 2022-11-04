import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img
          src="https://institutoconexo.com.br/assets/images/preloader.gif"
          alt="load"
          className="imgLoad"
        />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
