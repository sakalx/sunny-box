import React from 'react';

import {linkedinIco, githubIco} from 'root/static/custom-icons';

import {
  GithubIcon,
  Link,
  LinkedinIcon,
  SourceText,
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
        <LinkedinIcon viewBox="0 0 434 434">
          <path d={linkedinIco}/>
        </LinkedinIcon>
      </Title>
    </Link>

    <Link href='https://github.com/sakalx/sunny-box/' target="_blank">
      <SourceText variant="caption">
        open source
        <GithubIcon viewBox="0 0 434 434">
          <path d={githubIco}/>
        </GithubIcon>
      </SourceText>
    </Link>
  </Wrap>
);

export default Footer;
