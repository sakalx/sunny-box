import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PauseIcn from '@material-ui/icons/PauseCircleFilled';
import PlayIcn from '@material-ui/icons/PlayCircleOutline';

export const Wrap = styled(Card)`
  display: flex;
  margin: 15px;
  width: 300px;
`;

export const Content = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PlayPauseBtn = styled(IconButton)`
  z-index: 1;
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
 bottom: 10px;
 position: absolute;
`;