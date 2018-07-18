import React from 'react';

import StationCard from 'root/scenes/card';

import Tab from '@material-ui/core/Tab';

import {
  WrapTabs,
} from './style';

class StationList extends React.PureComponent {
  state = {
    tabIndex: 0,
    isSearch: false,
    searchCountry: {value: ''},
  };

  handleChange = (event, tabIndex) => {
    this.setState({tabIndex});
  };


  render() {
    const {tabIndex} = this.state;

    return (
      <WrapTabs
        indicatorColor="primary"
        onChange={this.handleChange}
        scrollable
        textColor="primary"
        value={tabIndex}
      >
        {[1, 2, 3, 4, 5, 6].map((c, index) => (
          <Tab
            icon={<StationCard active={tabIndex === index}/>}
            key={String(index)}
            label="Brooklyn"
          />
        ))}
      </WrapTabs>

    );
  }
}

export default StationList;