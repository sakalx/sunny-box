import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SearchField from 'root/components/search-field';

const Header = () => {

  return (
    <Toolbar>
      <Typography variant="title" color="inherit">
        StreetRadio
      </Typography>
      <SearchField/>
    </Toolbar>
  );
};

export default Header