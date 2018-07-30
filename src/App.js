import React from 'react';
import styled from 'styled-components';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';

import getLocation from 'root/helpers/location';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  fetchCountriesList,
  getCountriesListCache,
  getStations,
  setCountry,
  setGenre,
  setStation,
} from 'root/redux-core/actions';

//import Player from './scenes/player';
import WorldMap from './scenes/world-map';
import CountryList from './scenes/country-list';
import GenreList from './scenes/genre-list';
import StationList from './scenes/station-list';


const Wrap = styled('section')`
  overflow: hidden;
  //overflow-x: auto;
`;

class App extends React.PureComponent {
  state = {};

  componentDidMount() {
    const {
      fetchCountriesList,
      getCountriesListCache,
      getStations,
      setCountry,
      setGenre,
      setStation,
    } = this.props;

    const countriesCache = localStorage.getItem(cacheConfig.countryList.key);
    const stationCache = localStorage.getItem(cacheConfig.lastStation.key);

    countriesCache
      ? getCountriesListCache(countriesCache)
      : fetchCountriesList();

    if (stationCache) {
      const {country, genre, station} = JSON.parse(stationCache);

      setCountry(country);
      setGenre(genre);
      getStations(country.label);
      setStation(station);
    }
  }

  static getDerivedStateFromProps(props) {
    const {sunny, getStations, setCountry, setGenre} = props;
    const currentCountry = sunny.currentCountry.label;
    const currentGenre = sunny.currentGenre.label;
    const list = sunny.list;

    if (list && !currentCountry) {
      const timezonesCache = localStorage.getItem(cacheConfig.timezones.key);

      timezonesCache
        ? setCurrentCountry(timezonesCache)
        : waitFetching(cacheConfig.timezones.key)
          .then(timezones => setCurrentCountry(timezones));

      function setCurrentCountry(timezones) {
        const countries = Object.keys(list);
        const country = getLocation(timezones).label;
        const index = countries.indexOf(country);

        setCountry({index, label: country});
        getStations(country);
      }

      return null;
    }

    if (currentCountry && list[currentCountry] && !currentGenre) {
      const genre = Object.keys(list[currentCountry])[0];

      setGenre({index: 0, label: genre})
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const {sunny: {list, currentCountry, currentGenre}} = this.props;

    if (!list && !currentCountry.label && !currentGenre.label) {
      return <h1>Loading ...</h1>
    }
    if (!list[currentCountry.label]) {
      return <h1>Loading ...</h1>
    }

    return (
      <Wrap>
        <GenreList/>
        <StationList/>
        <CountryList/>
        <WorldMap/>
      </Wrap>
    )
  }
}

const mapStateToProps = ({sunny}) => ({
  sunny,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCountriesList,
  getCountriesListCache,
  getStations,
  setCountry,
  setGenre,
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);