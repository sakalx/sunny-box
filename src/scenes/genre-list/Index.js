import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
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


import Search from 'root/scenes/search';


import StationCard from 'root/components/station-card';
import SearchButton from 'root/components/search-button';
import radioList from "root/static/radio-list";


import {
  List,
  SearchBtn,
  SearchSection,
  Wrap,
} from './style';

class GenreList extends React.PureComponent {
  state = {
    tabIndex: 0,
    isSearch: false,
  };

  handleChange = (event, tabIndex) => {
    this.setState({tabIndex});
  };

  render() {
    const {tabIndex, isSearch} = this.state;

    return (
      <Wrap>
        <List>
          <Slide timeout={{enter: 800, exit: 200}}  in={!isSearch}
                 mountOnEnter unmountOnExit>
            <AppBar position="fixed" color="default">
              <Tabs indicatorColor="primary"
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="on"
                    textColor="primary"
                    value={tabIndex}
              >
                <Tab label="Item One" icon={<PhoneIcon/>}/>
                <Tab label="Item Two" icon={<FavoriteIcon/>}/>
                <Tab label="Item Three" icon={<PersonPinIcon/>}/>
                <Tab label="Item Four" icon={<HelpIcon/>}/>
                <Tab label="Item Five" icon={<PhoneIcon/>}/>
                <Tab label="Item Six" icon={<PersonPinIcon/>}/>
                <Tab label="Item Seven" icon={<HelpIcon/>}/>
              </Tabs>
            </AppBar>
          </Slide>
        </List>

        {tabIndex === 0 &&

        <div style={{height: '120vh'}}>
          <StationCard/>
        </div>
        }

        {tabIndex === 1 && <Typography>Item Two</Typography>}
        {tabIndex === 2 && <Typography>Item Three</Typography>}
        {tabIndex === 3 && <Typography>Item Four</Typography>}
        {tabIndex === 4 && <Typography>Item Five</Typography>}
        {tabIndex === 5 && <Typography>Item Six</Typography>}
        {tabIndex === 6 && <Typography>Item Seven</Typography>}


        <SearchSection>
          <Slide timeout={{enter: 800, exit: 200}} direction="left" in={isSearch}
                 mountOnEnter unmountOnExit>
            <Search suggestionsValue={radioList} title="radio"/>
          </Slide>
        </SearchSection>

        <SearchBtn label="radio" handleClick={() => this.setState({isSearch: !isSearch})}/>

      </Wrap>
    );
  }
}

export default GenreList;