import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import {
  Content,
  Cover,
  PauseIcon,
  PlayIcon,
  PlayPauseBtn,
  Spinner,
  Wrap,
} from './style';

const StationCard = () => {

  return (
    <Wrap>
      <Content>
        <CardContent>
          <Typography variant="headline">Live From Space</Typography>
        </CardContent>
        <PlayPauseBtn aria-label="Play/pause-cart-station" color="secondary">
          <PauseIcon/>
        </PlayPauseBtn>
        <Spinner color="secondary" thickness={1}/>
      </Content>
      <Cover image="https://sakals.000webhostapp.com/share/HelloKitty2.png"
             title="Live from space album cover"
      />
    </Wrap>
  );
};

export default StationCard;