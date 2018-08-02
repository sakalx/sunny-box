import styled from 'styled-components';
import muiTheme from 'root/theme';

import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';

export const Wrap = styled(Paper)`
  flex: 1;
  margin-top: 15px;
`;

export const RowTable = styled(TableRow)`
  cursor: pointer;
  &:nth-of-type(even) {
    background-color: ${muiTheme.palette.background.default};
  };
`;
