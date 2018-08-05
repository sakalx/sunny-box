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
  getCountryStations,
  getLastCountryStations,
  setGenre,
  setStation,
} from 'root/redux-core/actions';

import Pulse from './components/pulse';
import GenreTabs from './scenes/genre-tabs';
import Player from './scenes/player';
import StationTabs from './scenes/station-tabs';
import WorldMap from './scenes/world-map';

const Wrap = styled('section')`
  overflow: hidden;
`;
const Sound = styled('audio')`
  display: none;
`;

class App extends React.PureComponent {
  state = {};

  componentDidMount() {
    const {
      fetchCountriesList,
      getCountriesListCache,
      getLastCountryStations,
      setGenre,
      setStation,
    } = this.props;

    const countriesListCache = localStorage.getItem(cacheConfig.countryList.key);
    const stationCache = localStorage.getItem(cacheConfig.lastStation.key);

    countriesListCache
      ? getCountriesListCache(countriesListCache)
      : fetchCountriesList();

    if (stationCache) {
      const station = JSON.parse(stationCache);

      getLastCountryStations(station.country);
      setGenre(station.genre);
      setStation(station);
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      sunny: {
        countryList, currentCountry, fetchingStations
      }, getCountryStations,
    } = props;

    if (countryList.length && !currentCountry.label && !fetchingStations) {
      const timezonesCache = localStorage.getItem(cacheConfig.timezones.key);

      const setCountryStations = timezones => {
        const country = getLocation(timezones).label;

        getCountryStations(country);
      };

      timezonesCache
        ? setCountryStations(timezonesCache)
        : waitFetching(cacheConfig.timezones.key)
          .then(timezones => setCountryStations(timezones));
    }

    return null;
  }

  render() {
    const {sunny: {currentCountry, currentStation}} = this.props;

    if (!currentCountry.label && !currentCountry.genres.length) {
      return <Pulse height={'98vh'}/>
    }

    return (
      <Wrap>
        <GenreTabs/>
        <StationTabs/>
        <Player/>
        <WorldMap/>
        {currentStation.uid && (
          <Sound autoPlay={currentStation.uid}>
            {currentStation.src.map((src, i) =>
              <source key={String(i)} src={src.stream} type={src.content_type}/>
            )}
            Your browser does not support the audio element.
          </Sound>
        )}
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
  getCountryStations,
  getLastCountryStations,
  setGenre,
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);