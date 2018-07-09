import React from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton = ({label, handleClick, className}) =>
  <div className={className}>
    <Tooltip id={`tooltip-search-${label}`} title={`Search ${label}`} placement="left">
      <Button aria-label={`search-${label}`}
              color="primary"
              mini
              onClick={handleClick}
              variant="fab">
        <SearchIcon/>
      </Button>
    </Tooltip>
  </div>;

export default SearchButton