import React from 'react';

import {camelCaseToString} from 'root/helpers/camel-case';

import TextField from '@material-ui/core/TextField';

const RenderInput = ({ref, label = false, className = '', ...other}) => (
  <TextField
    className={className}
    label={label && camelCaseToString(label)}
    margin="normal"
    InputProps={{
      inputRef: ref,
      ...other,
    }}
    inputProps={{
      style: {paddingLeft: "15px"},
    }}
  />);


export default RenderInput