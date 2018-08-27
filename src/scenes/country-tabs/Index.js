import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStationsByCountry} from 'root/redux-core/actions/stations';

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
    this.props.countries.list.map(country => ({label: country}));

  state = {
    isSearch: false,
    searchCountry: {value: ''},
    suggestions: this.getSuggestionList(),
  };

  handleChangeCountry = (event, index) => {
    const {countries, setStationsByCountry, onTabClick} = this.props;

    if (countries.index !== index) {
      setStationsByCountry(index);
      onTabClick(countries.list[index])
    }
  };

  handleSearchCountry = (event, {newValue}) => {
    const {countries, setStationsByCountry, onTabClick} = this.props;

    const value = newValue.trimStart();
    const index = countries.list.indexOf(value);

    if (index >= 0) {
      setStationsByCountry(index);
      onTabClick(countries.list[index]);
      this.setState({
        isSearch: false,
        searchCountry: {value: ''},
      });
    } else {
      this.setState({searchCountry: {value}});
    }
  };

  render() {
    const {countries} = this.props;
    const {isSearch, searchCountry, suggestions} = this.state;

    return (
      <Wrap>
        <Slide direction="left" in={!isSearch}>
          <TabBar color="default" position="absolute">
            <Tabs
              indicatorColor="primary"
              onChange={this.handleChangeCountry}
              scrollable
              textColor="primary"
              value={countries.index}
            >
              {countries.list.map((name, index) => (
                <Tab key={String(index)} label={name}/>
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

const mapStateToProps = ({countries}) => ({
  countries,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setStationsByCountry,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryTabs);