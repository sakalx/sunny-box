import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LSConfig from 'root/config/local-storage';
import {waitStorage} from 'root/helpers/caching-local-storage';
import Base64Decode from 'root/helpers/decoder-base64';

import radioList from 'root/static/radio-list';
import genreList from 'root/static/genre-list';

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

class RadioList extends React.PureComponent {
  state = {
    isSearch: false,
    searchRadio: {value: ''},
    alphabetReady: false,
  };

  componentDidMount() {
    if (!alphabet) {
      waitStorage().then(() => {
        alphabet = Base64Decode(LSConfig.alphabet.key);
        this.setState({alphabetReady: true})
      })
    }
  }

  handleSearchRadio = (event, {newValue}) => {
    this.setState({searchRadio: {value: newValue.trimStart()}});
  };

  render() {
    const {genreIndex, handleChangeGenre} = this.props;
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
              onChange={handleChangeGenre}
              scrollable
              textColor="primary"
              value={genreIndex}
            >
              {
                genreList.map(({label}) => {
                  const chart = label[0];

                  return (
                    <Tab
                      key={label}
                      label={label}
                      icon={
                        <SvgIcon viewBox="0 0 32 32">
                          <path d={alphabet[chart]}/>
                        </SvgIcon>
                      }
                    />
                  )
                })
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
          placement="left"
          title="Search radio"
        />
      </Wrap>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(null, null)(RadioList);