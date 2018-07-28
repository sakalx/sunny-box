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
} from 'root/redux-core/actions';

//import Player from './scenes/player';
import WorldMap from './scenes/world-map';
import CountriesList from './scenes/countries-list';
import RadioList from './scenes/genre-radio-list';
import StationList from './scenes/station-list';

import Typography from '@material-ui/core/Typography';

const Wrap = styled('section')`
  overflow: hidden;
  //overflow-x: auto;
`;

class App extends React.PureComponent {
  state = {
    genreIndex: 0,
  };

  handleChangeGenre = (event, genreIndex) => {
    this.setState({genreIndex});
  };

  componentDidMount() {
    const {fetchCountriesList, getCountriesListCache, setGenre, sunny} = this.props;
    const countriesCache = localStorage.getItem(cacheConfig.countryList.key);

    if (countriesCache) {
      getCountriesListCache(countriesCache);
    } else {
      fetchCountriesList()
    }
  }

  static getDerivedStateFromProps(props) {
    const {sunny, getStations, setCountry} = props;
    const timezonesCache = localStorage.getItem(cacheConfig.timezones.key);

    if (sunny.list && !sunny.currentCountry.index) {
      timezonesCache
        ? setCurrentCountry(timezonesCache)
        : waitFetching(cacheConfig.timezones.key)
          .then(timezones => setCurrentCountry(timezones));

      function setCurrentCountry(timezones) {
        const countries = Object.keys(sunny.list);
        const country = getLocation(timezones).label;
        const index = countries.indexOf(country);

        setCountry({index, label: country});
        getStations(country);
      }

      return null;
    }
    // Return null to indicate no change to state.
    return null;
  }

  _handleCurrentCountry = () => {
    const timezonesCache = localStorage.getItem(cacheConfig.timezones.key);
    const {sunny, getStations, setCountry} = this.props;

    const setCurrentCountry = timezones => {
      const countries = Object.keys(sunny.list);
      const country = getLocation(timezones).label;
      const index = countries.indexOf(country);

      setCountry({index, label: country});
      getStations(country);
    };


    if (timezonesCache) {
      setCurrentCountry(timezonesCache);
    } else {
      waitFetching(cacheConfig.timezones.key)
        .then(timezones => {
          setCurrentCountry(timezones);
        });
    }
  };

  render() {
    const {sunny,} = this.props;
    const {genreIndex} = this.state;

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
  getCountriesListCache,
  getStations,
  setCountry,
  setGenre,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);