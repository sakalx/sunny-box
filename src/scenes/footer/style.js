import styled, {keyframes} from 'styled-components';

import Typography from '@material-ui/core/Typography';

const neon = keyframes`
  from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FF1177, 0 0 70px #FF1177, 0 0 80px #FF1177, 0 0 100px #FF1177, 0 0 150px #FF1177;
    }
    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FF1177, 0 0 35px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 75px #FF1177;
    }
`;

export const Wrap = styled('footer')`
  margin: 15px;
`;

export const Link = styled('a')`
  text-decoration: none;
`;

export const LinkSrc = styled('a')`
  text-decoration: none;
  animation: ${neon} 1s ease-in-out infinite alternate;
`;

export const Title = styled(Typography)`
  margin-bottom: 20px !important;
  background-color: #666;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  color: transparent;
  text-shadow: rgba(255,255,255,.5) 0px 3px 3px;
  -webkit-box-reflect: below 0 -webkit-linear-gradient(bottom, rgba(255, 255, 255, .5) 0%, transparent 50%, transparent 100%)
`;