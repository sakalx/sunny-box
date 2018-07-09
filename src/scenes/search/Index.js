import React from 'react';

import Autosuggest from 'react-autosuggest';

import RenderInput from 'root/components/render-input';
import {
  getSuggestions,
  getSuggestionValue,
  RenderSuggestion,
  RenderSuggestionsContainer,
} from 'root/components/render-suggestion';

import {style} from './style';

class Search extends React.PureComponent {
  state = {
    value: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({value}) => {
    const {suggestionsValue} = this.props;

    this.setState({
      suggestions: getSuggestions(suggestionsValue, value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, {newValue}) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const {title} = this.props;
    const {value, suggestions} = this.state;

    return (
      <Autosuggest theme={{
        container: style.container,
        suggestionsContainerOpen: style.suggestionsContainerOpen,
        suggestionsList: style.suggestionsList,
        suggestion: style.suggestion,
      }}
                   renderInputComponent={RenderInput}
                   suggestions={suggestions}
                   onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                   onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                   renderSuggestionsContainer={RenderSuggestionsContainer}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={RenderSuggestion}
                   inputProps={{
                     onChange: this.handleChange,
                     placeholder: `Search a ${title}`,
                     value,
                   }}
      />
    );
  }
}

export default Search;