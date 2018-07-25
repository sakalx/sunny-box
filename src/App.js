import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getCountriesList, getRadioStationsByCountry} from 'root/redux-core/actions/sterling';

import styled from 'styled-components';
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


import SvgIcon from '@material-ui/core/SvgIcon';

class App extends React.PureComponent {
  state = {
    genreIndex: 0,
  };

  handleChangeGenre = (event, genreIndex) => {
    this.setState({genreIndex});
  };

  componentDidMount() {

   // this.props.getCountriesList();
    //  setTimeout(this.props.getRadioStationsByCountry, 2000, 'USA');
    //  setTimeout(this.props.getRadioStationsByCountry, 4000, 'Russia');
  }

  render() {
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

const mapStateToProps = ({cache}) => ({
  cache,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCountriesList,
  getRadioStationsByCountry,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);