import styled from 'styled-components';

import Autocomplete from 'root/components/autocomplete';
import SearchButton from 'root/components/search-button';

export const Wrap = styled('section')`
  position: relative;
  height: 80px;
`;

export const SearchRadio = styled(Autocomplete)`
  width: 100%;
`;

export const SearchBtn = styled(SearchButton)`
  position: absolute;
  right: 15px;
  top: 85px;
`;