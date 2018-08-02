import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import PauseIc from '@material-ui/icons/PauseCircleFilled';
import PlayIc from '@material-ui/icons/PlayCircleOutline';
import SvgIcon from '@material-ui/core/SvgIcon';

export const Content = styled('div')`
  align-items: center;
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
  flex: 1 1 250px;
  justify-content: space-evenly;
`;

export const Title = styled('section')`
  margin: auto 15px;
`;

export const ChartIcon = styled(SvgIcon)`
  height: 50px !important;
  width: 50px !important;
`;

export const Controller = styled('div')`
  align-items: center;
  display: flex;
  flex: 1 1 250px;
  justify-content: space-evenly;
`;

const playPauseIcon = `
  height: 50px !important;
  width: 50px !important;
`;

export const PlayIcon = styled(PlayIc)`
  ${playPauseIcon};
`;

export const PauseIcon = styled(PauseIc)`
  ${playPauseIcon};
`;

export const ProgressBar = styled(LinearProgress)`
  height: 5px !important;
`;