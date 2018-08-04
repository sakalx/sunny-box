import React from 'react';

import muiTheme from 'root/theme';

import {
  Path,
} from './style';

const Pulse = ({color = muiTheme.palette.text.primary, height="80", viewBox="0 85 545 50"}) => (
  <svg viewBox={viewBox} width="100%" height={height}>
    <Path stroke={color} fill="none"
          d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"/>
  </svg>
);

export default Pulse;