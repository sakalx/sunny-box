import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import {
  Content,
  Cover,
  PauseIcon,
  PlayIcon,
  Spinner,
  Wrap,
} from './style';

const StationCard = () => {

  return (
    <Wrap playing={true.toString()}>


         <ButtonBase focusRipple>
        <Content>
          <CardContent>
            <Typography variant="headline">Live From Space</Typography>
          </CardContent>
          <PauseIcon color="secondary"/>
          <Spinner color="secondary" thickness={1} size={45}/>
        </Content>
        <Cover image="https://sakals.000webhostapp.com/share/HelloKitty2.png"
               title="Live from space album cover"
        />
      </ButtonBase>
    </Wrap>
  );
};

export default StationCard;