import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import {
  RowTable,
  Wrap,
} from './style';

const dummy = [
  {genre: 'pop', quantity: 12},
  {genre: 'rock', quantity: 22},
  {genre: 'chanson', quantity: 2},
  {genre: 'clasick', quantity: 33},
  {genre: 'juzz', quantity: 44},
  {genre: 'bluzz', quantity: 21},
  {genre: 'chanson1', quantity: 75},
  {genre: 'juzz3', quantity: 32},
  {genre: 'chanson2', quantity: 9},
];

const CountryInfo = (props) => {

  return (
    <Wrap>
      <Table>
        <TableBody>
          {dummy.map(({genre, quantity}) => {
            return (
              <RowTable key={genre} hover>
                <TableCell component="th" scope="row">
                  {genre}
                </TableCell>
                <TableCell numeric>{quantity}</TableCell>
              </RowTable>
            );
          })}
        </TableBody>
      </Table>
    </Wrap>
  );
};

export default CountryInfo;