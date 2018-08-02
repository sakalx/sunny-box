import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setGenre} from 'root/redux-core/actions/index';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import {
  RowTable,
  Wrap,
} from './style';

const CountryInfo = ({currentCountry, setGenre}) => {

  const genreList = Object.entries(currentCountry.genres);

  return (
    <Wrap>
      <Table>
        <TableHead>
          <RowTable>
            <TableCell colSpan={2}>
              <h1>{currentCountry.label}</h1>
            </TableCell>
          </RowTable>
        </TableHead>
        <TableBody>
          {genreList.map((genre, index) => {
            return (
              <RowTable
                key={genre[0]}
                hover
                onClick={() => setGenre({index, label: genre[0]})}
              >
                <TableCell component="th" scope="row">
                  {genre[0]}
                </TableCell>
                <TableCell numeric>{genre[1].length}</TableCell>
              </RowTable>
            );
          })}
        </TableBody>
      </Table>
    </Wrap>
  );
};

const mapStateToProps = ({sunny: {currentCountry}}) => ({
  currentCountry,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setGenre,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountryInfo);