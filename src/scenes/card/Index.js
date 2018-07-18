import React from 'react';

import {
  City,
  Cover,
  PauseIcon,
  Spinner,
  Title,
  Wrap,
} from './style';

const StationCard = ({active}) => {

  return (
    <Wrap playing={String(true)}>
      <City component="span" variant="caption">
        New York
      </City>
      <Cover image="https://sakals.000webhostapp.com/share/HelloKitty2.png"
             title="Live from space album cover"
      />
      <Title variant="title" active={String(active)}>Gop Fm</Title>
      <PauseIcon color="secondary"/>
      <Spinner color="secondary" thickness={1} size={45}/>
    </Wrap>
  );
};

export default StationCard;