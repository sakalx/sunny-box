import styled from 'styled-components';

import Autocomplete from 'root/components/autocomplete';
import SearchButton from 'root/components/search-button';

import AppBar from '@material-ui/core/AppBar';

export const Wrap = styled('section')`
  height: 80px;
  position: relative;
`;

export const TabBar = styled(AppBar)`
  top: 15px !important;
`;

export const SearchCountry = styled(Autocomplete)`
  width: 100%;
`;

export const SearchBtn = styled(SearchButton)`
  bottom: -55px;
  margin: 15px;
  position: absolute;
  right: 0;
`;