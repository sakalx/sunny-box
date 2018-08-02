import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCountryStations} from 'root/redux-core/actions';

import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  SearchBtn,
  SearchCountry,
  TabBar,
  Wrap,
} from './style';

class CountryTabs extends React.PureComponent {
  getSuggestionList = () =>
    this.props.countryList.map(country => ({label: country}));

  state = {
    isSearch: false,
    searchCountry: {value: ''},
    suggestions: this.getSuggestionList(),
  };

  handleChangeCountry = (event, index) => {
    const {
      countryList,
      currentCountry,
      getCountryStations,
      onTabClick,
    } = this.props;

    if (currentCountry.index !== index) {
      const country = countryList[index];
      getCountryStations(country);
      onTabClick(country)
    }
  };

  handleSearchCountry = (event, {newValue}) => {
    const {countryList, getCountryStations, onTabClick} = this.props;
    const value = newValue.trimStart();
    const index = countryList.indexOf(value);

    if (index >= 0) {
      getCountryStations(countryList[index]);
      onTabClick(countryList[index])
    }

    this.setState({searchCountry: {value}});
  };

  render() {
    const {countryList, currentCountry} = this.props;
    const {isSearch, searchCountry, suggestions} = this.state;

    return (
      <Wrap>
        <Slide
          direction="left"
          in={!isSearch}
        >
          <TabBar color="default" position="absolute">
            <Tabs
              indicatorColor="primary"
              onChange={this.handleChangeCountry}
              scrollable
              textColor="primary"
              value={currentCountry.index}
            >
              {countryList.map((country, index) => (
                <Tab key={String(index)} label={country}/>
              ))}
            </Tabs>
          </TabBar>
        </Slide>

        <SearchCountry
          label="searchCountry"
          onChange={this.handleSearchCountry}
          suggestions={suggestions}
          value={searchCountry.value}
        />

        <SearchBtn
          handleClick={() => this.setState({isSearch: !isSearch})}
          label="country"
          placement="left-start"
          title="Search country"
        />
      </Wrap>
    );
  }
}

const mapStateToProps = ({sunny: {countryList, currentCountry}}) => ({
  countryList,
  currentCountry
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCountryStations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryTabs);