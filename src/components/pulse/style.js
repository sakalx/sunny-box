import styled, {keyframes} from 'styled-components';

const dash = keyframes`
  from {
    stroke-dashoffset: 815;
    } 
  to {
    stroke-dashoffset: -815;
    }
`;

export const Path = styled('path')`
  stroke-dasharray: 280;
  animation: ${dash} 2s infinite linear forwards;
`;