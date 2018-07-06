import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import SearchIcn from '@material-ui/icons/Search';

export const Wrap = styled('div')`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 15px 15px 15px;
  width: 100%;
`;

export const SearchInput = styled(TextField)`
  flex: 1;
`;
export const SearchIcon = styled(SearchIcn)`
  font-size: 34px !important;
`;