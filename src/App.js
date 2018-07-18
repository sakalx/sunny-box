import React from 'react';


import Typography from '@material-ui/core/Typography';


import Player from './scenes/player';
import WorldMap from './scenes/world-map';
import CountriesList from './scenes/countries-list';
import GenreList from './scenes/radio-list';

import StationCard from './scenes/card';


import styled from 'styled-components';

const Wrap = styled('section')`
  overflow: hidden;
`;

class App extends React.PureComponent {
  state = {
    genreIndex: 0,
  };

  handleChangeGenre = (event, genreIndex) => {
    this.setState({genreIndex});
  };

  render() {
    const {genreIndex} = this.state;

    return (
      <Wrap>
        <GenreList genreIndex={genreIndex} handleChangeGenre={this.handleChangeGenre}/>

        {genreIndex === 0 &&

        <div>
          <StationCard/>
          <StationCard/>
          <StationCard/>
        </div>
        }
        {genreIndex === 1 && <Typography>Item Two</Typography>}
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

// onClick={() => this.setState({isSearch: !isSearch})}
export default App