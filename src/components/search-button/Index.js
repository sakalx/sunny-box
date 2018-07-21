import React from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton = ({label, handleClick, className, ...other}) =>
  <div className={className}>
    <Tooltip
      id={`tooltip-search-${label}`}
      {...other}
    >
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