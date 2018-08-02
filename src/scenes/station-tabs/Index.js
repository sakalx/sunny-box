import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStation} from 'root/redux-core/actions';

import StationCard from 'root/scenes/card';

import Tab from '@material-ui/core/Tab';

import {
  WrapTabs,
} from './style';

class StationTabs extends React.PureComponent {

  handleChangeStation = (event, uid) => {
    const {
      currentCountry, currentGenre, currentStation, setStation,
    } = this.props;

    const selectedStation = currentCountry.genres[currentGenre.label]
      .find(station => station.uid === uid);

    const station = {
      ...selectedStation,
      uid: currentStation.uid !== uid ? uid : false,
      country: currentCountry,
      genre: currentGenre,
    };

    setStation(station)
  };


  render() {
    const {currentCountry, currentGenre, currentStation} = this.props;
    const stationList = currentCountry.genres[currentGenre.label];

    const selectedStation = stationList.find(station => station.uid === currentStation.uid);

// add transition fade
    return (
      <WrapTabs
        indicatorColor="primary"
        onChange={this.handleChangeStation}
        scrollable
        textColor="primary"
        value={selectedStation ? selectedStation.uid : false}
      >
        {stationList.map(station => (
          <Tab
            icon={<StationCard playing={currentStation.uid === station.uid}/>}
            key={station.uid}
            label="Brooklyn"
            value={station.uid}
          />
        ))}
      </WrapTabs>

    );
  }
}

const mapStateToProps = ({sunny: {countryList, currentCountry, currentGenre, currentStation}}) => ({
  countryList,
  currentCountry,
  currentGenre,
  currentStation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StationTabs);