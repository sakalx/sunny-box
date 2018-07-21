import React from 'react';

import countriesList from 'root/static/countries-list';

import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  SearchBtn,
  SearchCountry,
  TabBar,
  Wrap,
} from './style';

class CountriesList extends React.PureComponent {
  state = {
    tabIndex: false,
    isSearch: false,
    searchCountry: {value: ''},
  };

  handleChange = (event, tabIndex) => {
    this.setState({tabIndex});
  };

  handleSearchCountry = (event, {newValue}) => {
    this.setState({searchCountry: {value: newValue.trimStart()}});
  };

  render() {
    const {
      isSearch,
      searchCountry,
      tabIndex,
    } = this.state;

    return (
      <Wrap>
        <Slide
          direction="left"
          in={!isSearch}
          mountOnEnter
          timeout={{enter: 800, exit: 500}}
          unmountOnExit
        >
          <TabBar color="default" position="absolute">
            <Tabs
              indicatorColor="primary"
              onChange={this.handleChange}
              scrollable
              textColor="primary"
              value={tabIndex}
            >
              {countriesList.map(({label}, index) => (
                <Tab key={String(index)} label={label}/>
              ))}
            </Tabs>
          </TabBar>
        </Slide>

        <Slide
          direction="left"
          in={isSearch}
          mountOnEnter
          timeout={{enter: 800, exit: 500}}
          unmountOnExit
        >
          <SearchCountry
            label="searchCountry"
            onChange={this.handleSearchCountry}
            suggestions={countriesList}
            value={searchCountry.value}
          />
        </Slide>

        <SearchBtn
          handleClick={() => this.setState({isSearch: !isSearch})}
          label="country"
        />
      </Wrap>
    );
  }
}

export default CountriesList;