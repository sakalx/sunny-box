import React from 'react';
import waitFetching from "root/helpers/caching";
import Base64Decode from "root/helpers/decoder-base64";
import styled from 'styled-components';

import moment from 'moment-timezone';

import cacheConfig from 'root/config/cache';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  fetchCountriesList,
  fetchStationsByCountry,
  getCountriesListCache,
  getStationsCache,
} from 'root/redux-core/actions';

//import Player from './scenes/player';
import WorldMap from './scenes/world-map';
import CountriesList from './scenes/countries-list';
import RadioList from './scenes/genre-radio-list';
import StationList from './scenes/station-list';

import Typography from '@material-ui/core/Typography';

const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone
  || moment.tz.guess()
  || 'America/New_York';

const Wrap = styled('section')`
  overflow: hidden;
  //overflow-x: auto;
`;

class App extends React.PureComponent {
  state = {
    genreIndex: 0,
    location: null,
  };

  handleChangeGenre = (event, genreIndex) => {
    this.setState({genreIndex});
  };

  componentDidMount() {
    const {timezones, countryList} = cacheConfig;
    const {fetchCountriesList, getCountriesListCache} = this.props;

    const setStations = timezone => {
      const location = this._getLocation(timezone).label;

      this._getStations(location);
      this.setState({location});
    };

    const timezonesCache = localStorage.getItem(timezones.key);

    timezonesCache
      ? setStations(timezonesCache)
      : waitFetching(timezones.key).then(value => setStations(value));


    const countriesCache = localStorage.getItem(countryList.key);

    countriesCache
      ? getCountriesListCache(countriesCache)
      : fetchCountriesList();
  }

  _getLocation = timezones =>
    Base64Decode(timezones).timezones
      .find(({timezones}) => timezones
        .find(timezone => timezone === getTimezone()));

  _getStations = country => {
    const {fetchStationsByCountry, getStationsCache} = this.props;
    const stationsCache = localStorage.getItem(country);

    stationsCache
      ? getStationsCache(stationsCache)
      : fetchStationsByCountry(country);
  };

  render() {
    const {genreIndex, location} = this.state;

    return (
      <Wrap>
        <RadioList
          genreIndex={genreIndex}
          handleChangeGenre={this.handleChangeGenre}

        />

        {genreIndex === 0 &&

        <StationList/>

        }
        {genreIndex === 1 && <Typography style={{minHeight: '305px'}}>Item Two</Typography>}
        {genreIndex === 2 && <Typography>Item Three</Typography>}
        {genreIndex === 3 && <Typography>Item Four</Typography>}
        {genreIndex === 4 && <Typography>Item Five</Typography>}
        {genreIndex === 5 && <Typography>Item Six</Typography>}
        {genreIndex === 6 && <Typography>Item Seven</Typography>}

        <CountriesList/>
        <WorldMap/>
        {/*<Player/>*/}
        {/*<SnackBarMessage/>*/}
        {/*<AlertMessage/>*/}
      </Wrap>
    )
  }
}

const mapStateToProps = ({sunny}) => ({
  sunny,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCountriesList,
  fetchStationsByCountry,
  getCountriesListCache,
  getStationsCache,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);