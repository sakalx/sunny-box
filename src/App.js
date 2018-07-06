import React from 'react';

import AlertMessage from 'root/components/AlertMessage';
import SnackBarMessage from 'root/components/SnackBarMessage';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

import Header from './scenes/header'

import styled from 'styled-components';



class App extends React.PureComponent {
  state = {
    tabIndex: 0,
  };

  render() {
    const {tabIndex} = this.state;

    return (
      <React.Fragment>
        <div>
          <Header/>
          <AppBar position="sticky" color="default">
            <Tabs
              value={tabIndex}
              onChange={(event, tabIndex) => this.setState({tabIndex})}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Item One" icon={<PhoneIcon/>}/>
              <Tab label="Item Two" icon={<FavoriteIcon/>}/>
              <Tab label="Item Three" icon={<PersonPinIcon/>}/>
              <Tab label="Item Four" icon={<HelpIcon/>}/>
              <Tab label="Item Five" icon={<ShoppingBasket/>}/>
              <Tab label="Item Six" icon={<ThumbDown/>}/>
              <Tab label="Item Seven" icon={<ThumbUp/>}/>
            </Tabs>
          </AppBar>
          {tabIndex === 0 && <Typography style={{height: '300vh'}}>Item One</Typography >}
          {tabIndex === 1 && <Typography >Item Two</Typography >}
          {tabIndex === 2 && <Typography >Item Three</Typography >}
          {tabIndex === 3 && <Typography >Item Four</Typography >}
          {tabIndex === 4 && <Typography >Item Five</Typography >}
          {tabIndex === 5 && <Typography >Item Six</Typography >}
          {tabIndex === 6 && <Typography >Item Seven</Typography >}
        </div>
        {/*<SnackBarMessage/>*/}
        {/*<AlertMessage/>*/}
      </React.Fragment>
    )
  }
}

export default App