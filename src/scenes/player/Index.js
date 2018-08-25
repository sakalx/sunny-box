import React from 'react';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStation} from 'root/redux-core/actions';

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
    alphabetReady: false,
    audio: new Audio(this.props.currentStation.src[0].stream)
  };

  componentDidMount() {
    const {key} = cacheConfig.alphabet;
    const alphabetCache = localStorage.getItem(key);

    if (alphabetCache) {
      alphabet = JSON.parse(alphabetCache);
      this.setState({alphabetReady: true})
    } else {
      waitFetching(key).then(value => {
        alphabet = JSON.parse(value);
        this.setState({alphabetReady: true})
      })
    }


  }

  handleNavigationBtn = direct => {
    const {currentStation, setStation} = this.props;

    const genre = currentStation.genre.label;
    const stations = currentStation.country.genres[genre];
    const currentIndex = stations.findIndex(({uid}) => uid === currentStation.uid);
    const lastIndex = stations.length - 1;

    const accStation = direct === 'Next'
      ? (currentIndex === lastIndex ? stations[0] : stations[currentIndex + 1])
      : (currentIndex === 0 ? stations[lastIndex] : stations[currentIndex - 1]);

    const station = {
      ...currentStation,
      ...accStation,
    };

    setStation({...station, uid: false});
    setTimeout(setStation, 0, station)
  };

  handleStopPlay = () => {
    const {currentStation, setStation} = this.props;

    setStation({...currentStation, uid: false});
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

  ggg = () => {
    const {audio} = this.state;
    audio.pause();

    this.setState(() => ({audio: new Audio(this.props.currentStation.src[0].stream)}),
      () => {
        this.state.audio.play();
        this.state.audio.addEventListener('loadeddata',() => {
          console.log(5555);
        });
      }
      );

  };

  render() {
    const {currentStation} = this.props;
    const {alphabetReady} = this.state;

    return (
      <Collapse mountOnEnter unmountOnExit timeout={800} in={!!currentStation.uid}>
        <button onClick={this.ggg}>srfese</button>
        {currentStation.name && alphabetReady && (
          <Wrap>
            <Logo alt="Name Radio" src={"https://sakals.000webhostapp.com/share/nice.jpg"}/>

            <Info>
              <Title>
                <Typography variant="headline" component="h3">{currentStation.title}</Typography>
                <Typography variant="caption">{currentStation.country.label}</Typography>
              </Title>
              <div>
                {
                  [...currentStation.genre.label.toUpperCase()]
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

const mapStateToProps = ({sunny: {currentStation}}) => ({
  currentStation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);