import React, { Component } from 'react';
import FormSearch from '../Components/FormSearch';
import Header from '../Components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <FormSearch />
      </div>
    );
  }
}

export default Search;
