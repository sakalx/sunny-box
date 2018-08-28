import React from 'react';

import Typography from '@material-ui/core/Typography';

import {
  Link,
  Wrap,
} from 'root/scenes/footer/style';

const Footer = () => (
  <Wrap>
    <Link href='https://www.linkedin.com/in/serhii-sakal/'>
      <Typography
        align="center"
        color='textSecondary'
        variant="title"
      >
        Developed by Sakal
      </Typography>
    </Link>

    <Link href='https://www.linkedin.com/in/serhii-sakal/'>
      <Typography
        align="center"
        variant="button"
      >
        Open Source
      </Typography>
    </Link>
  </Wrap>
);

export default Footer;
