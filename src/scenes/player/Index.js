import Fade from "@material-ui/core/Fade";
import React from 'react';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {} from 'root/redux-core/actions';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import {
  ChartIcon,
  Content,
  Controller,
  Info,
  Logo,
  PauseIcon,
  PlayIcon,
  ProgressBar,
  Title,
} from './style';

let alphabet = null;

class Player extends React.PureComponent {
  state = {
    alphabetReady: false,
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

  renderNavigationBtn = param => (
    <Tooltip id={`tooltip__${param}-station-player`} title={`${param} station`} placement="top">
      <IconButton aria-label={`${param}-station-player`}>
        {param === 'Next' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
      </IconButton>
    </Tooltip>
  );

  render() {
    const {currentStation} = this.props;
    const {alphabetReady} = this.state;

    return (
      <Collapse mountOnEnter unmountOnExit timeout={800} in={!!currentStation.uid}>
        {currentStation.title && alphabetReady && (
          <div>
            <ProgressBar color="secondary" variant="query"/>

            <Content>
              <Logo alt="Name Radio" src="https://sakals.000webhostapp.com/share/DeadKitty.png"/>

              <Info>
                <Title>
                  <Typography variant="headline" component="h3">{currentStation.title}</Typography>
                  <Typography variant="caption">{currentStation.country.label}</Typography>
                </Title>
                <span>
                  {
                    [...currentStation.genre.label.toUpperCase()]
                      .map((chart, index) => (
                        <ChartIcon key={String(index)} viewBox="0 0 34 34">
                          <path d={alphabet[chart]}/>
                        </ChartIcon>
                      ))
                  }
                </span>
              </Info>

              <Controller>
                {this.renderNavigationBtn('Previous')}
                <IconButton aria-label="Play/pause-player" color="secondary">
                  <PauseIcon/>
                </IconButton>
                {this.renderNavigationBtn('Next')}
              </Controller>
            </Content>
          </div>
        )}
      </Collapse>
    );
  }
}


const mapStateToProps = ({sunny: {currentStation}}) => ({
  currentStation,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);