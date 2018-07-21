import React from 'react';

import radioList from 'root/static/radio-list';
import genreList from 'root/static/genre-list';

import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HelpIcon from '@material-ui/icons/Help';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PhoneIcon from '@material-ui/icons/Phone';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import {
  SearchBtn,
  SearchRadio,
  Wrap,
} from './style';

class RadioList extends React.PureComponent {
  state = {
    isSearch: false,
    searchRadio: {value: ''},
  };

  handleSearchRadio = (event, {newValue}) => {
    this.setState({searchRadio: {value: newValue.trimStart()}});
  };

  render() {
    const {genreIndex, handleChangeGenre} = this.props;
    const {
      isSearch,
      searchRadio,
    } = this.state;

    return (
      <Wrap>

        <Slide
          in={!isSearch}
          mountOnEnter
          timeout={{enter: 800, exit: 500}}
          unmountOnExit
        >
          <AppBar color="default" position="absolute">
            <Tabs
              indicatorColor="primary"
              onChange={handleChangeGenre}
              scrollable
              textColor="primary"
              value={genreIndex}
            >
              {
                genreList.map(({label}) => (
                  <Tab
                    icon={<PhoneIcon/>}
                    key={label}
                    label={label}
                  />
                ))
              }
            </Tabs>
          </AppBar>
        </Slide>

        <Fade in={isSearch} mountOnEnter unmountOnExit>
          <SearchRadio
            label="searchRadio"
            onChange={this.handleSearchRadio}
            suggestions={radioList}
            value={searchRadio.value}
          />
        </Fade>

        <SearchBtn
          handleClick={() => this.setState({isSearch: !isSearch})}
          label="radio"
        />
      </Wrap>
    );
  }
}

export default RadioList;