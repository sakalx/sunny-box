import styled from 'styled-components';
import muiTheme from 'root/theme';

import {ComposableMap} from 'react-simple-maps';
import {spring} from 'react-motion';

const {palette} = muiTheme;
export const Wrap = styled('div')`
  margin: 0 auto;
  width: 100%;
`;

export const ComponentMap = styled(ComposableMap)`
  height: auto;
  width: 100%;
`;

export const motionStyle = {
  default: {
    zoom: 1,
    x: 0,
    y: 20,
  },
  motion(zoom, center) {
    return ({
      zoom: spring(zoom, {stiffness: 210, damping: 20}),
      x: spring(center[0], {stiffness: 210, damping: 20}),
      y: spring(center[1], {stiffness: 210, damping: 20}),
    })
  }
};

export const geographyStyle = isSelected => ({
  default: {
    fill: isSelected ? palette.primary.light : '#ECEFF1',
    stroke: '#607D8B',
    strokeWidth: .75,
    outline: 'none',
  },
  hover: {
    fill: isSelected ? palette.primary.light : palette.error.light,
    stroke: palette.primary.light,
    strokeWidth: .75,
    outline: 'none',
  },
  pressed: {
    fill: palette.primary.main,
    stroke: '#607D8B',
    strokeWidth: .75,
    outline: 'none',
  },
});