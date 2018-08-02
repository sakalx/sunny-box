import React from 'react';

import {
  City,
  Cover,
  StopIcon,
  PlayIcon,
  Spinner,
  Title,
  Wrap,
} from './style';

const StationCard = ({playing}) => {

  return (
    <Wrap playing={String(playing)}>
      <City component="span" variant="caption">
        New York
      </City>
      <Cover image={'https://sakals.000webhostapp.com/share/DeadKitty.png'}
             title="Live from space album cover"
      />
      <Title variant="title" playing={String(playing)}>Gop Fm</Title>
      {playing ?
        <React.Fragment>
          <StopIcon color="secondary"/>
          <Spinner color="secondary" thickness={1} size={45}/>
        </React.Fragment> :
        <PlayIcon color="primary"/>
      }
    </Wrap>
  );
};

export default StationCard;