import styled from 'styled-components';
import muiTheme from 'root/theme';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PauseIc from '@material-ui/icons/PauseCircleFilled';
import PlayIc from '@material-ui/icons/PlayCircleOutline';
import SvgIcon from '@material-ui/core/SvgIcon';

const {palette} = muiTheme;

export const Wrap = styled('div')`
  align-items: center;
  border-bottom: 1px solid ${palette.action.disabledBackground};
  box-shadow: inset 0 35px 35px -25px ${palette.action.disabledBackground};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;

export const Logo = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
`;

export const Info = styled('div')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex: 2 1 280px;
  justify-content: space-evenly;
`;

export const Title = styled('section')`
  margin: 15px;
`;

export const ChartIcon = styled(SvgIcon)`
  color: ${palette.text.primary};
  font-size: 37px !important;
`;

export const Controller = styled('div')`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-evenly;
  position: relative;
`;

export const PauseIcon = styled(PauseIc)`
  height: 50px !important;
  width: 50px !important;
`;

export const PauseButton = styled(IconButton)`
  top: 1px;
  position: absolute !important;
`;