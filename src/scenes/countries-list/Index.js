import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import countriesName from 'root/static/countries-name';

class CountriesList extends React.PureComponent {
  state = {
    tabIndex: 0,
  };

  handleChange = (event, tabIndex) => {
    this.setState({tabIndex});
  };

  render() {
    const {tabIndex} = this.state;

    return (
      <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          onChange={this.handleChange}
          scrollable
          scrollButtons="on"
          textColor="primary"
          value={tabIndex}
        >
          {countriesName.map((country, i) => (
            <Tab key={country + i} label={country}/>
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export default CountriesList;