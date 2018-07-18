import styled from 'styled-components';
import muiTheme from 'root/theme';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import PauseIcn from '@material-ui/icons/PauseCircleFilled';
import PlayIcn from '@material-ui/icons/PlayCircleOutline';

export const Wrap = styled(Card)`
  display: flex;
  margin: 15px;
  width: 300px;
  &:hover {
    ${props => `
      box-shadow: 5px 5px 20px ${props.playing === 'true' ? muiTheme.palette.secondary.light: muiTheme.palette.primary.light};
    `};
    };
  transition: all 0.3s linear;
`;

export const Content = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const playPauseIcon = `
  height: 44px !important;
  width: 44px !important;
`;

export const PlayIcon = styled(PlayIcn)`
  ${playPauseIcon};
`;

export const PauseIcon = styled(PauseIcn)`
  ${playPauseIcon};
`;

export const Cover = styled(CardMedia)`
  height: 150px;
  width: 150px;
`;

export const Spinner = styled(CircularProgress)`
  bottom: 4px;
  position: absolute;
`;