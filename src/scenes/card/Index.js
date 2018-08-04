import React from 'react';
import muiTheme from 'root/theme';

import {connect} from 'react-redux';

import Pulse from 'root/components/pulse';

import {
  City,
  Cover,
  PlayIcon,
  Wrap,
} from './style';

const StationCard = ({currentStation, playing}) => (
  <Wrap playing={String(playing)}>
    <City component="span" variant="caption">
      {currentStation.city}
    </City>
    <Cover image={"https://sakals.000webhostapp.com/share/logo.png"}
           title={currentStation.title}
    />
    {playing
      ? <Pulse color={muiTheme.palette.secondary.dark}/>
      : <PlayIcon color="primary"/>
    }
    <h3>New York</h3>
  </Wrap>
);

const mapStateToProps = ({sunny: {currentCountry, currentStation}}) => ({
  currentCountry,
  currentStation,
});

export default connect(mapStateToProps, null)(StationCard);