import React, { Component } from 'react';

class FormSearch extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      disabled: true,
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

  render() {
    const { inputValue, disabled } = this.state;
    return (
      <div>
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default FormSearch;
