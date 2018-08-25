import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGenreIndex} from 'root/redux-core/actions/genres';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import {
  RowTable,
  Wrap,
} from './style';

const CountryInfo = ({countries, stations, setGenreIndex}) => {

  const stationsListData = Object.entries(stations.list);

  const handleClickGenre = index => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setGenreIndex(index);
  };

  return (
    <Wrap>
      <Table>
        <TableHead>
          <RowTable>
            <TableCell colSpan={2}>
              <h1>{countries.list[countries.index]}</h1>
            </TableCell>
          </RowTable>
        </TableHead>
        <TableBody>
          {stationsListData.map((station, index) => {
            return (
              <RowTable
                key={station[0]}
                hover
                onClick={() => handleClickGenre(index)}
              >
                <TableCell component="th" scope="row">
                  {station[0]}
                </TableCell>
                <TableCell numeric>{station[1].length}</TableCell>
              </RowTable>
            );
          })}
        </TableBody>
      </Table>
    </Wrap>
  );
};

const mapStateToProps = ({countries, stations}) => ({
  countries,
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setGenreIndex,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryInfo);