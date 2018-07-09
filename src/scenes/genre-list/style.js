import styled from 'styled-components';

import SearchButton from 'root/components/search-button';

export const Wrap = styled('section')`
  position: relative;
`;

export const List = styled('div')`
  min-height: 72px;
  overflow-x: hidden;
`;

export const SearchSection = styled('div')`
   left: 0;
   overflow-x: hidden;
   position: fixed;
   top: 15px;
   width: 100%;
`;

export const SearchBtn = styled(SearchButton)`
  margin: 15px;
  position: fixed;
  right: 0;
  top: 70px;
`;