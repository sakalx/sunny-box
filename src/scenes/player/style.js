import styled from 'styled-components';

import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import PauseIcn from '@material-ui/icons/PauseCircleFilled';
import PlayIcn from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';

export const Wrap = styled('div')`
  bottom: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
`;

export const Content = styled(Paper)`
  margin: 15px 15px 0;
  width: 100%;
`;

export const Main = styled('div')`
  align-items: center;
  display: flex;
  padding: 5px;
`;

export const Controller = styled('section')`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-evenly;
`;

export const Title = styled(Typography)`
  margin: auto 5px !important;
`;

const playPauseIcon = `
  height: 50px !important;
  width: 50px !important;
`;

export const PlayIcon = styled(PlayIcn)`
  ${playPauseIcon};
`;

export const PauseIcon = styled(PauseIcn)`
  ${playPauseIcon};
`;

export const ProgressBar = styled(LinearProgress)`
  height: 7px !important;
`;