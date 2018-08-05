import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStation} from 'root/redux-core/actions';

import StationCard from 'root/scenes/card';

import Fade from '@material-ui/core/Fade';
import Tab from '@material-ui/core/Tab';

import {
  WrapTabs,
} from './style';

const StationTabs = ({
                       countryList,
                       currentCountry,
                       currentGenre,
                       currentStation,
                       howler,
                       setStation,
                     }) => {

  const stationList = currentCountry.genres[currentGenre.label];

  const selectedStation = stationList
    .find(station => station.uid === currentStation.uid);


  const handleChangeStation = (event, uid) => {
    const play = currentStation.uid !== uid;

    const selectedStation = currentCountry.genres[currentGenre.label]
      .find(station => station.uid === uid);

    const station = {
      ...selectedStation,
      uid: play ? uid : false,
      country: currentCountry,
      genre: currentGenre,
    };


    setStation({...station, uid: false});
    setTimeout(setStation, 0, station)
  };

  return (
    <WrapTabs
      indicatorColor="primary"
      onChange={handleChangeStation}
      scrollable
      textColor="primary"
      value={selectedStation ? selectedStation.uid : false}
    >
      {stationList.map((station, i) => (
        <Fade
          key={station.uid}
          mountOnEnter unmountOnExit
          timeout={1200 + (i * 200)} in={true}
          value={station.uid}
        >
          <Tab
            icon={<StationCard playing={station.uid === currentStation.uid}/>}
            label={station.title}
          />
        </Fade>
      ))}
    </WrapTabs>
  );
};

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