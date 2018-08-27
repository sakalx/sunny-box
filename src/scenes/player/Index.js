import React from 'react';

import cacheConfig from 'root/config/cache';
import {getCache} from 'root/api';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setCurrentStation} from 'root/redux-core/actions/stations';


import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import {
  ChartIcon,
  Controller,
  Info,
  Logo,
  PauseButton,
  PauseIcon,
  Title,
  Wrap,
} from './style';

let alphabet = null;

class Player extends React.PureComponent {
  state = {
    alphabetIsReady: false,
  };

  componentDidMount() {
    getCache(cacheConfig.alphabet)
      .then(alphabetCache => {
        alphabet = alphabetCache;
        this.setState({alphabetIsReady: true})
      });
  }

  handleNavigationBtn = direct => {
    const {genres, stations, setCurrentStation} = this.props;

    const genre = genres.list[genres.index];
    const stationByGenre = stations.list[genre];
    const currentIndex = stationByGenre.findIndex(({uid}) => uid === stations.station.uid);
    const lastIndex = stationByGenre.length - 1;

    const accStation = direct === 'Next'
      ? (currentIndex === lastIndex ? stationByGenre[0] : stationByGenre[currentIndex + 1])
      : (currentIndex === 0 ? stationByGenre[lastIndex] : stationByGenre[currentIndex - 1]);

    const station = {
      ...stations.station,
      ...accStation,
    };

    setCurrentStation(station)
  };

  handleStopPlay = () => {
    const {stations, setCurrentStation} = this.props;

    setCurrentStation({...stations.station, uid: false});
  };

  renderNavigationBtn = direct => (
    <Tooltip id={`tooltip__${direct}-station-player`} title={`${direct} station`} placement="top">
      <IconButton aria-label={`${direct}-station-player`}
                  onClick={() => this.handleNavigationBtn(direct)}
      >
        {direct === 'Next' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
      </IconButton>
    </Tooltip>
  );

  render() {
    const {countries, stations} = this.props;
    const {alphabetIsReady} = this.state;

    return (
      <Collapse  timeout={800} in={!!stations.station.uid}>
        {alphabetIsReady && stations.station.genreIndex && (
          <Wrap>

            <Logo alt={stations.station.name}
                  src={"https://sakals.000webhostapp.com/share/nice.jpg"}
            />

            <Info>
              <Title>
                <Typography variant="headline" component="h3">
                  {stations.station.name}
                </Typography>
                <Typography variant="caption">
                  {countries.list[stations.station.countryIndex]}
                </Typography>
              </Title>
              <div>
                {
                  [...stations.station.genre.toUpperCase()]
                    .map((chart, index) => (
                      <ChartIcon key={String(index)} viewBox="0 0 34 34">
                        <path d={alphabet[chart]}/>
                      </ChartIcon>
                    ))
                }
              </div>
            </Info>

            <Controller>
              {this.renderNavigationBtn('Previous')}

              <PauseButton
                aria-label="Player-pause-button"
                color="secondary"
                onClick={this.handleStopPlay}
              >
                <CircularProgress color="secondary" thickness={1} size={47}/>
              </PauseButton>
              <PauseIcon color="secondary"/>

              {this.renderNavigationBtn('Next')}
            </Controller>

          </Wrap>
        )}
      </Collapse>
    );
  }
}

const mapStateToProps = ({countries, genres, stations}) => ({
  countries,
  genres,
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setCurrentStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);