import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStation} from 'root/redux-core/actions';

import StationCard from 'root/scenes/card';

import Tab from '@material-ui/core/Tab';

import {
  WrapTabs,
} from './style';

class StationList extends React.PureComponent {

  handleChangeStation = (event, uid) => {
    const {currentStation, setStation} = this.props;
    console.log(uid);
    const station = {
      ...currentStation,
      uid: currentStation.uid !== uid ? uid : false,
    };

    setStation(station)
  };


  render() {
    const {list, currentCountry, currentGenre, currentStation} = this.props;
    const stationList = list[currentCountry.label][currentGenre.label];
    const selectedStation = stationList.find(station => station.uid === currentStation.uid);


    return (
      <WrapTabs
        indicatorColor="primary"
        onChange={this.handleChangeStation}
        scrollable
        textColor="primary"
        value={selectedStation ? selectedStation.uid : false }
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

const mapStateToProps = ({sunny: {list, currentCountry, currentGenre, currentStation}}) => ({
  list,
  currentCountry,
  currentGenre,
  currentStation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StationList);