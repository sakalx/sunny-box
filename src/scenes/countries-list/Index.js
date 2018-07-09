import React from 'react';
import {getSuggestionValue} from "root/components/render-suggestion";

import countriesList from 'root/static/countries-list';

import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Search from 'root/scenes/search';
import SearchButton from 'root/components/search-button';

import {
  List,
  SearchBtn,
  SearchSection,
  Wrap,
} from './style';

class CountriesList extends React.PureComponent {
  state = {
    tabIndex: 0,
    isSearch: false,
  };

  handleChange = (event, tabIndex) => {
    this.setState({tabIndex});
  };

  render() {
    const {tabIndex, isSearch} = this.state;

    return (
      <Wrap>
        <List>
          <Slide timeout={{enter: 1000, exit: 200}} direction="left" in={!isSearch}
                 mountOnEnter unmountOnExit>
            <AppBar position="static" color="default">
              <Tabs indicatorColor="primary"
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="on"
                    textColor="primary"
                    value={tabIndex}
              >
                {countriesList.map(({label}, index) => (
                  <Tab key={String(index)} label={label}/>
                ))}
              </Tabs>
            </AppBar>
          </Slide>
        </List>

        <SearchSection>
          <Slide timeout={{enter: 1000, exit: 200}} direction="left" in={isSearch}
                 mountOnEnter unmountOnExit>
            <Search suggestionsValue={countriesList} title="country"/>
          </Slide>
        </SearchSection>

        <SearchBtn label="country" handleClick={() => this.setState({isSearch: !isSearch})}/>
      </Wrap>
    );
  }
}

export default CountriesList;