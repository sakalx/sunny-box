import styled from 'styled-components';
import muiTheme from 'root/theme';

import {ComposableMap} from 'react-simple-maps';
import {spring} from 'react-motion';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';

const {palette} = muiTheme;

const _flex = styled('div')`
  display: flex;
`;

export const Wrap = _flex.extend`
  flex-wrap: wrap;
`;

export const WrapMap = styled('div')`
  flex: 1 1 750px;
`;

export const Head = _flex.extend`
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

export const geographyStyle = (isSelected, hasStations) => {

  const strokeColor = hasStations ? palette.grey['700'] : palette.grey['400'];

  return ({
    default: {
      fill: hasStations
        ? (isSelected ? palette.primary.light : palette.grey['300'])
        : palette.grey['50'],
      stroke: strokeColor,
      strokeWidth: .75,
      outline: 'none',
    },
    hover: {
      fill: hasStations
        ? (isSelected ? palette.primary.light : palette.grey['400'])
        : palette.grey['50'],
      stroke: strokeColor,
      strokeWidth: .75,
      outline: 'none',
      cursor: 'pointer',
    },
    pressed: {
      fill: hasStations ? palette.primary.main : palette.grey['50'],
      stroke: strokeColor,
      strokeWidth: .75,
      outline: 'none',
    },
  })
};

export const tooltipStyle = position => ({
  color: palette.grey['A700'],
  left: position[0],
  position: 'absolute',
  top: position[1],
});