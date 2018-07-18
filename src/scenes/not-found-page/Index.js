import React from 'react';
import styled from 'styled-components';

const Warning = styled('section')`
  text-align: center;
  overflow: hidden;
`;
const Emoji = styled('div')`
  transform: scale(2.1);
`;

const NotFound = ({title = 'Page'}) =>
  <Warning>
    {/*<LinkToHome/>*/}
    <h1>404</h1>
    <Emoji>⛔</Emoji>
    <h2>We are Sorry</h2>
    <h4>but the {title} you are looking for does not exist.</h4>
  </Warning>;

export default NotFound;