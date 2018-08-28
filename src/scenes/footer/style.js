import styled from 'styled-components';
import muiTheme from 'root/theme';

import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

const {palette} = muiTheme;

export const Wrap = styled('footer')`
  margin: 15px;
`;

export const Link = styled('a')`
  text-decoration: none;
`;

export const Title = styled(Typography)`
  align-items: center;
  display: flex !important;
  justify-content: center;
  margin-bottom: 20px !important;
  background-color: #666;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  color: transparent;
  text-shadow: rgba(255,255,255,.5) 0px 3px 3px;
  -webkit-box-reflect: below 0 -webkit-linear-gradient(bottom, rgba(255, 255, 255, .5) 0%, transparent 50%, transparent 100%)
`;

export const SourceText = styled(Typography)`
  align-items: center;
  display: flex !important;
  justify-content: center;
`;

export const LinkedinIcon = styled(SvgIcon)`
  margin: 0 10px;
`;

export const GithubIcon = styled(SvgIcon)`
  font-size: 18px !important;
  margin: 0 10px;
`;