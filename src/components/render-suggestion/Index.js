import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {Name} from './style';

export const getSuggestions = (suggestionsValue, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestionsValue.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
};

export const getSuggestionValue = suggestion => suggestion.label;

export const RenderSuggestionsContainer = ({containerProps, children}) =>
  <Paper {...containerProps} square>
    {children}
  </Paper>;


export const RenderSuggestion = (suggestion, {query, isHighlighted}) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <b key={String(index)}>
              {part.text}
            </b>
          ) : (
            <Name key={String(index)}>
              {part.text}
            </Name>
          );
        })}
      </div>
    </MenuItem>
  );
};