import React from 'react';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGenre, setStation} from 'root/redux-core/actions';

import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SvgIcon from '@material-ui/core/SvgIcon';

import {
  SearchBtn,
  SearchRadio,
  Wrap,
} from './style';

let alphabet = null;

class GenreTabs extends React.PureComponent {
  state = {
    alphabetReady: false,
    isSearch: false,
    searchRadio: {value: ''},
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

  getSuggestionList = () => {
    const genreList = Object.entries(this.props.currentCountry.genres);

    return genreList.reduce((acc, next) => {
      const suggestion = next[1].map(({title}) =>
        ({label: `${title} --${next[0].toUpperCase()}`})
      );

      return [...acc, ...suggestion]
    }, []);
  };

  handleChangeGenre = (event, index) => {
    const {currentCountry, currentGenre, setGenre} = this.props;

    if (currentGenre.index !== index) {
      const label = Object.keys(currentCountry.genres)[index];
      setGenre({index, label})
    }
  };

  handleSearchRadio = (event, {newValue}) => {
    const {
      currentCountry: {genres}, currentCountry, setGenre, setStation,
    } = this.props;

    const value = newValue.split('--')[0].trim();
    let index = -1;

    for (let genre in genres) {
      const foundStation = genres[genre].find(({title}) => title === value);
      index++;

      if(foundStation) {
        const station = {
          ...foundStation,
          country: currentCountry,
          genre: {index, label: genre},
        };

        setGenre({index, label: genre});
        setStation(station);
        break;
      }
    }

    this.setState({searchRadio: {value}});
  };

  render() {
    const {currentCountry, currentGenre} = this.props;
    const {alphabetReady, isSearch, searchRadio} = this.state;

    if (!alphabetReady) {
      return <span>Loading ...</span>
    }

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
              onChange={this.handleChangeGenre}
              scrollable
              textColor="primary"
              value={currentGenre.index}
            >
              {Object.keys(currentCountry.genres).map(genre => (
                <Tab
                  key={genre}
                  label={genre}
                  icon={
                    <SvgIcon viewBox="0 0 32 32">
                      <path d={alphabet[genre[0].toUpperCase()]}/>
                    </SvgIcon>
                  }
                />
              ))}
            </Tabs>
          </AppBar>
        </Slide>

        <Fade in={isSearch} mountOnEnter>
          <SearchRadio
            label="searchRadio"
            onChange={this.handleSearchRadio}
            suggestions={this.getSuggestionList()}
            value={searchRadio.value}
          />
        </Fade>

        <SearchBtn
          handleClick={() => this.setState({isSearch: !isSearch})}
          label="radio"
          placement="left"
          title="Search radio"
        />
      </Wrap>
    );
  }
}

const mapStateToProps = ({sunny: {currentCountry, currentGenre}}) => ({
  currentCountry,
  currentGenre,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setGenre,
  setStation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GenreTabs);