import styled from 'styled-components';

export const Name = styled('strong')`
  font-weight: 300;
`;

export const style = {
  container: {
  },
  suggestionsContainerOpen: {
    marginTop: '5px',
    position: 'absolute',
    zIndex: 3000,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
};