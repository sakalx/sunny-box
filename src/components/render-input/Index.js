import React from 'react';

import {InputField} from './style';

const RenderInput = ({ref, ...other}) =>
  <InputField style={{padding: '7px 15px'}}
    fullWidth
    InputProps={{
      inputRef: ref,
      ...other,
    }}
  />;

export default RenderInput