import React from 'react';
import muiTheme from 'root/theme';

import defaultImg from 'root/static/img/default-img.jpg';

import Pulse from 'root/components/pulse';

import {
  Country,
  Cover,
  PlayIcon,
  Wrap,
} from './style';

const StationCard = ({station, playing}) => (
  <Wrap playing={String(playing)}>
    <Country component="span" variant="caption">
      {station.country}
    </Country>
    <Cover image={station.image || defaultImg}
           title={station.name}
    />
    {playing
      ? <Pulse color={muiTheme.palette.secondary.light}/>
      : <PlayIcon color="primary"/>
    }
  </Wrap>
);

export default StationCard;