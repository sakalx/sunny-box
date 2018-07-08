import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Tooltip from '@material-ui/core/Tooltip';

import {
  Content,
  Controller,
  Main,
  PauseIcon,
  PlayIcon,
  ProgressBar,
  Title,
  Wrap,
} from './style';

const Player = () => {

  const renderNavigationBtn = param => (
    <Tooltip id={`tooltip__${param}-station-player`} title={`${param} station`} placement="top">
      <IconButton aria-label={`${param}-station-player`}>
        {param === 'Next' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
      </IconButton>
    </Tooltip>
  );

  return (
    <Wrap>
      <Content elevation={24}>

        <Main>
          <Avatar alt="Name Radio" src="https://sakals.000webhostapp.com/share/HelloKitty2.png"/>
          <Controller>
            <Title variant="headline" component="h3"> Radio Name Gop FM</Title>
            {renderNavigationBtn('Previous')}
            <IconButton aria-label="Play/pause-player" color="secondary">
              <PauseIcon/>
            </IconButton>
            {renderNavigationBtn('Next')}
          </Controller>
        </Main>

        <ProgressBar color="secondary" variant="query"/>
      </Content>
    </Wrap>
  );
};

export default Player;