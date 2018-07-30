import React from 'react';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGenre} from 'root/redux-core/actions'

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


class GenreList extends React.PureComponent {
  getSuggestionList = () => {
    const {list, currentCountry} = this.props;
    const genreList = Object.entries(list[currentCountry.label]);

    return genreList.reduce((acc, next) => {
      const suggestion = next[1].map(({title}) =>
        ({label: `${title} \uD83C\uDF99${next[0].toUpperCase()}`})
      );

      return [...acc, ...suggestion]
    }, []);
  };

  state = {
    alphabetReady: false,
    isSearch: false,
    searchRadio: {value: ''},
    suggestions: this.getSuggestionList(),
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

  handleChangeGenre = (event, index) => {
    const {list, currentCountry, currentGenre, setGenre} = this.props;

    if (currentGenre.index !== index) {
      const country = currentCountry.label;
      const label = Object.keys(list[country])[index];

      setGenre({index, label})
    }
  };

  handleSearchRadio = (event, {newValue}) => {
    this.setState({searchRadio: {value: newValue.trimStart()}});
  };

  render() {
    const {list, currentCountry, currentGenre} = this.props;
    const {alphabetReady, isSearch, searchRadio, suggestions} = this.state;
    const genreList = Object.keys(list[currentCountry.label]);

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
              {genreList.map(genre => (
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
            suggestions={suggestions}
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

const mapStateToProps = ({sunny: {list, currentCountry, currentGenre}}) => ({
  list,
  currentCountry,
  currentGenre,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setGenre,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);