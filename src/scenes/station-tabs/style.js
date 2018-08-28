import styled from 'styled-components';
import muiTheme from 'root/theme';

import Tabs from '@material-ui/core/Tabs';

export const WrapTabs = styled(Tabs)`
  color: ${muiTheme.palette.primary.main};
  margin: 25px 0;
`;