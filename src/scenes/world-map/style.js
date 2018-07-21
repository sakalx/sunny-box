import styled from 'styled-components';
import muiTheme from 'root/theme';

import {ComposableMap} from 'react-simple-maps';
import {spring} from 'react-motion';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';

const {palette} = muiTheme;

export const Wrap = styled('div')`
  margin: 0 auto;
  max-width: 100%;
`;

export const Head = styled('section')`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const CountryName = styled(Typography)`
  position: absolute;
  top: 0;
`;

export const ComponentMap = styled(ComposableMap)`
  height: auto;
  width: 100%;
`;

export const ZoomOutButton = styled(IconButton)`
  position: absolute !important;
  right: 10px;
  top: 45px;
`;

export const ZoomOutIcon = styled(ZoomOutMap)`
  font-size: 36px !important;
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

export const geographyStyle = isSelected => {
  const hoverColor = isSelected
    ? palette.primary.light
    : palette.error.light;

  return ({
    default: {
      fill: isSelected ? palette.primary.light : '#ECEFF1',
      stroke: '#607D8B',
      strokeWidth: .75,
      outline: 'none',
    },
    hover: {
      fill: hoverColor,
      stroke: hoverColor,
      strokeWidth: .75,
      outline: 'none',
      cursor: 'pointer',
    },
    pressed: {
      fill: palette.primary.main,
      stroke: '#607D8B',
      strokeWidth: .75,
      outline: 'none',
    },
  })
};

export const tooltipStyle = position => ({
  color: palette.error.dark,
  fontSize: '14px',
  left: position[0],
  position: 'absolute',
  top: position[1],
});