import React from 'react';


import {
  SearchIcon,
  SearchInput,
  Wrap,
} from './style';

const SearchField = () => {

  return (
    <Wrap>
      <SearchInput id="inherit" label="Search"/>
      <SearchIcon color="disabled"/>
    </Wrap>
  );
};

export default SearchField;