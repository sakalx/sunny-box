import React from 'react';
import styled, {keyframes} from 'styled-components';
import muiTheme from 'root/theme';

import cacheConfig from 'root/config/cache';
import {getCountriesList} from 'root/api';
import getLocation from 'root/helpers/location';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCountryList} from 'root/redux-core/actions/countries';
import {setCurrentStation, setStationsByCountry} from 'root/redux-core/actions/stations';

import Pulse from './components/pulse';
import SnackBarMessage from './components/snack-bar';

import Footer from './scenes/footer';
import GenreTabs from './scenes/genre-tabs';
import Player from './scenes/player';
import StationTabs from './scenes/station-tabs';
import WorldMap from './scenes/world-map';

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
    const {stations} = this.props;
    const {isReady} = this.state;

    if (!isReady) return <Splashscreen><Pulse height={'98vh'}/></Splashscreen>;

    return (
      <Wrap>
        <GenreTabs/>

        {stations.fetchingStation &&
        <WrapLoader>
          <Pulse color={palette.error.light} height={'100%'} width={'60%'}/>
        </WrapLoader>}

        <WrapStations>
          <StationTabs/>
        </WrapStations>

        <Player/>
        <WorldMap/>

        <Footer/>
        <SnackBarMessage/>
      </Wrap>
    )
  }
}

const {palette} = muiTheme;

const fadesOut = keyframes`
  from {background-color: ${palette.action.disabledBackground}} 
  to {background-color: ${palette.action.active}}
`;
const Splashscreen = styled('div')`
  animation: ${fadesOut} 3s infinite linear;
  box-shadow: inset 0 0 300px 20px ${palette.background.default};
`;
const Wrap = styled('section')`
  overflow: hidden;
`;
const WrapLoader = styled('div')`
  box-shadow: inset 0 0 120px 50px ${palette.background.default};
  animation: ${fadesOut} 7s infinite ease-in-out;
  display: flex;
  height: 305px;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 1;
`;
const WrapStations = styled('main')`
  background: ${palette.action.hover};
  border-top: 1px solid ${palette.action.disabledBackground};
  box-shadow: inset 0 35px 35px -25px ${palette.background.default};
  height: 100%;
`;


const mapStateToProps = ({stations}) => ({
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCountryList,
  setCurrentStation,
  setStationsByCountry,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);