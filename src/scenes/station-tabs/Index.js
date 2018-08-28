import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentStation} from 'root/redux-core/actions/stations';

import StationCard from 'root/scenes/station-card';

import Fade from '@material-ui/core/Fade';
import Tab from '@material-ui/core/Tab';

import {
  WrapTabs,
} from './style';

const StationTabs = ({
                       countries,
                       genres,
                       stations,
                       setCurrentStation,
                     }) => {

  const genre = genres.list[genres.index];
  const stationsByGenre = stations.list[genre] || [];
  const currentStation = stations.station;


  const selectedStation = stationsByGenre
    .find(station => station.uid === currentStation.uid);

  const handleChangeStation = (event, uid) => {
    const selectedStation = stationsByGenre.find(station => station.uid === uid);

    const station = {
      ...selectedStation,
      uid: selectedStation.uid === currentStation.uid ? false : selectedStation.uid,
      countryIndex: countries.index,
      genreIndex: genres.index,
    };

    setCurrentStation(station);
  };

  return (
    <WrapTabs
      indicatorColor="primary"
      onChange={handleChangeStation}
      scrollable
      textColor="primary"
      value={selectedStation ? selectedStation.uid : false}
    >
      {stationsByGenre.map((station, i) => (
        <Fade
          key={station.uid}
          mountOnEnter unmountOnExit
          timeout={1200 + (i * 200)} in={true}
          value={station.uid}
        >
          <Tab
            icon={<StationCard
              playing={station.uid === currentStation.uid}
              station={station}
            />}
            label={station.name}
          />
        </Fade>
      ))}
    </WrapTabs>
  );
};

const mapStateToProps = ({countries, genres, stations}) => ({
  countries,
  genres,
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StationTabs);