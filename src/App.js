import React from 'react';
import styled from 'styled-components';

import cacheConfig from 'root/config/cache';
import {getCountriesList} from 'root/api';
import getLocation from 'root/helpers/location';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCountryList} from 'root/redux-core/actions/countries';
import {setCurrentStation, setStationsByCountry} from 'root/redux-core/actions/stations';

import Pulse from './components/pulse';
import GenreTabs from './scenes/genre-tabs';
import Player from './scenes/player';
import StationTabs from './scenes/station-tabs';
import WorldMap from './scenes/world-map';

const Wrap = styled('section')`
  overflow: hidden;
`;

class App extends React.PureComponent {
  state = {
    isReady: false,
  };

  componentDidMount() {
    getCountriesList()
      .then(list => {
        this.props.setCountryList(list);
        this.initApp(list);
      });
  };

  initApp = countriesList => {
    const {setCurrentStation, setStationsByCountry} = this.props;
    const stationCache = localStorage.getItem(cacheConfig.station.key);

    if (stationCache) {
      const station = JSON.parse(stationCache);

      setStationsByCountry(station.countryIndex, station.genreIndex);
      setCurrentStation(station);
      this.setState({isReady: true});
    } else {
      getLocation().then(country => {
        const countryIndex = countriesList.indexOf(country);

        setStationsByCountry(countryIndex);
        this.setState({isReady: true});
      })
    }
  };

  render() {
    const {isReady} = this.state;

    if (!isReady) return <Pulse height={'98vh'}/>;

    return (
      <Wrap>
        <GenreTabs/>
        <StationTabs/>
        <Player/>
        <WorldMap/>
      </Wrap>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setCountryList,
  setCurrentStation,
  setStationsByCountry,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
