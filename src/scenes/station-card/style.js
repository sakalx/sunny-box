import styled from 'styled-components';
import muiTheme from 'root/theme';

import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import PlayIc from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';

const _playPauseIcon = styled('div')`
  height: 44px !important;
  margin: auto;
  width: 44px !important;
`;

export const Wrap = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 180px;
  justify-content: space-between;
  margin: 15px;
  position: relative;
  transition: all 0.3s linear;
  width: 150px;
  &:hover {
    ${props => `
      box-shadow: 5px 5px 20px ${props.playing === 'true' 
                                  ? muiTheme.palette.secondary.light
                                  : muiTheme.palette.primary.light
      };
    `};
    };
`;

export const Cover = styled(CardMedia)`
  height: 120px;
  width: 100%;
`;

export const Country = styled(Typography)`
  background: ${muiTheme.palette.error.light};
  color: ${muiTheme.palette.common.white} !important;
  padding: 0 5px;
  position: absolute;
  right: 0;
  top: 10px;
`;

export const PlayIcon = _playPauseIcon.withComponent(PlayIc);