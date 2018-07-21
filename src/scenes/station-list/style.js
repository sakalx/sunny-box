import styled from 'styled-components';
import muiTheme from 'root/theme';

import Tabs from '@material-ui/core/Tabs';

export const WrapTabs = styled(Tabs)`
  margin: 25px 0;
  color: ${muiTheme.palette.primary.main};
`;