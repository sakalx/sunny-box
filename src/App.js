import React from 'react';

import AlertMessage from 'root/components/AlertMessage';
import SnackBarMessage from 'root/components/SnackBarMessage';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HelpIcon from '@material-ui/icons/Help';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


import Player from './scenes/player';
import WorldMap from './scenes/world-map';
import CountriesList from './scenes/countries-list';
import GenreList from './scenes/genre-list';

import StationCard from './components/station-card';


import styled from 'styled-components';

class App extends React.PureComponent {
  state = {
    tabIndex: 0,
  };

  render() {
    const {tabIndex} = this.state;

    return (
      <React.Fragment>



        <GenreList/>


        <CountriesList/>
        <WorldMap/>

        <Player/>
        {/*<SnackBarMessage/>*/}
        {/*<AlertMessage/>*/}
      </React.Fragment>
    )
  }
}
// onClick={() => this.setState({isSearch: !isSearch})}
export default App