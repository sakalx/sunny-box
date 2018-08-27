import React from 'react';

import cacheConfig from 'root/config/cache';
import {getCache} from 'root/api';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGenreIndex} from 'root/redux-core/actions/genres';
import {setCurrentStation} from 'root/redux-core/actions/stations';

import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SvgIcon from '@material-ui/core/SvgIcon';

import {
  SearchBtn,
  SearchRadio,
  Wrap,
} from './style';

let alphabet = null;

class GenreTabs extends React.PureComponent {
  state = {
    alphabetIsReady: false,
    isSearch: false,
    searchRadio: {value: ''},
  };

  componentDidMount() {
    getCache(cacheConfig.alphabet)
      .then(alphabetCache => {
        alphabet = alphabetCache;
        this.setState({alphabetIsReady: true})
      });
  }

  getSuggestionList = () => {
    const stationsList = Object.entries(this.props.stations.list);

    return stationsList.reduce((acc, next) => {
      const suggestion = next[1].map(({name}) =>
        ({label: `${name} --${next[0].toUpperCase()}`})
      );

      return [...acc, ...suggestion]
    }, []);
  };

  handleChangeGenre = (event, index) => {
    const {genres, setGenreIndex} = this.props;

    genres.index !== index && setGenreIndex(index);
  };

  handleSearchRadio = (event, {newValue}) => {
    const {countries, genres, stations, setGenreIndex, setCurrentStation} = this.props;
    const value = newValue.split('--');

    if (value[1]) {
      const searchedName = value[0].trim();
      const genre = value[1].trim().toLocaleLowerCase();
      const index = genres.list.indexOf(genre);

      const matchStation = stations.list[genre]
        .find(({name}) => name === searchedName);

      const station = {
        ...matchStation,
        countryIndex: countries.index,
        genreIndex: index,
      };

      setGenreIndex(index);
      setCurrentStation(station);

      this.setState({
        isSearch: false,
        searchRadio: {value: ''},
      });
    } else {
      this.setState({searchRadio: {value: value[0]}});
    }
  };

  render() {
    const {genres} = this.props;
    const {alphabetIsReady, isSearch, searchRadio} = this.state;

    if (!alphabetIsReady) return <span/>;

    return (
      <Wrap>
        <Slide in={!isSearch}>
          <AppBar color="default" position="absolute">
            <Tabs
              indicatorColor="primary"
              onChange={this.handleChangeGenre}
              scrollable
              textColor="primary"
              value={genres.index}
            >
              {genres.list.map(name => (
                <Tab
                  key={name}
                  label={name}
                  icon={
                    <SvgIcon viewBox="0 0 32 32">
                      <path d={alphabet[name[0].toUpperCase()]}/>
                    </SvgIcon>
                  }
                />
              ))}
            </Tabs>
          </AppBar>
        </Slide>

        <Fade in={isSearch} mountOnEnter>
          <SearchRadio
            label="searchRadio"
            onChange={this.handleSearchRadio}
            suggestions={this.getSuggestionList()}
            value={searchRadio.value}
          />
        </Fade>

        <SearchBtn
          handleClick={() => this.setState({isSearch: !isSearch})}
          label="radio"
          placement="left"
          title="Search radio"
        />
      </Wrap>
    );
  }
}

const mapStateToProps = ({countries, genres, stations}) => ({
  countries,
  genres,
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setGenreIndex,
  setCurrentStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GenreTabs);