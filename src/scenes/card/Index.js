import React from 'react';

import coverImg from 'root/static/Sketch.png';


import {
  City,
  Cover,
  PauseIcon,
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
      <Cover image={coverImg}
             title="Live from space album cover"
      />
      <Title variant="title" playing={String(playing)}>Gop Fm</Title>
      {playing ?
        <React.Fragment>
          <PauseIcon color="secondary"/>
          <Spinner color="secondary" thickness={1} size={45}/>
        </React.Fragment> :
        <PlayIcon color="primary"/>
      }
    </Wrap>
  );
};

export default StationCard;