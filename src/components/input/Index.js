import React from 'react';

import {camelCaseToString} from 'root/helpers/camel-case';

import {InputField} from './style';

const RenderInput = ({ref, label=false, className = '', ...other}) => (
  <InputField
    className={className}
    label={label && camelCaseToString(label)}
    margin="normal"
    InputProps={{
      inputRef: ref,
      ...other,
    }}
  />);

export default RenderInput