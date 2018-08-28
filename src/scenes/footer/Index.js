import React from 'react';

import Typography from '@material-ui/core/Typography';

import {
  Link,
  LinkSrc,
  Title,
  Wrap,
} from 'root/scenes/footer/style';

const Footer = () => (
  <Wrap>
    <Link href='https://www.linkedin.com/in/serhii-sakal/' target="_blank">
      <Title
        align="center"
        color='textSecondary'
        variant="title"
      >
        Developed by Sakal
      </Title>
    </Link>

    <LinkSrc href='https://github.com/sakalx/sunny-box/' target="_blank">
      <Typography
        align="center"
        variant="caption"
      >
        open source 😈
      </Typography>
    </LinkSrc>
  </Wrap>
);

export default Footer;
