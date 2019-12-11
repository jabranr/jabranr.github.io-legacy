import React from 'react';
import { Link } from 'gatsby';

import style from './bio.module.scss';

const Bio = () => {
  return (
    <>
      <div className={style.intro}>
        <p>
          Tech Lead at{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://www.ratedpeople.com/c/about-us"
          >
            Rated People
          </a>{' '}
          working on front-end.
        </p>
        <p>
          I am a Software Engineer with a passion for progressive and usable web
          at heart. Nowadays I regularly work with:
          <span className={style.stack}>
            Symfony, JavaScript, NodeJS, React/Gatsby, Redux, CSS/Sass,
            WordPress, Webpack, Composer, npm, docker, AWS, Atlassian suite and
            more.
          </span>
        </p>
      </div>
      <p className={style.subintro}>
        I love to work on ideas when I have a chance. Almost all of projects are
        open-source and available from GitHub. Between 2008 and 2012 I
        volunteered as digital cartographer to map the unmapped areas of the
        world with{' '}
        <a
          href="https://mapmaker.google.com"
          target="_blank"
          rel="noopener noreferer"
        >
          Google Map Maker
        </a>
        . I regularly{' '}
        <a
          href="https://www.twitter.com/jabranr"
          target="_blank"
          rel="noopener noreferer"
        >
          tweet
        </a>
        , share and contribute to{' '}
        <a
          href="https://www.github.com/jabranr"
          target="_blank"
          rel="noopener noreferer"
        >
          code
        </a>
        , <Link to="/articles">write</Link> my thoughts out and occassionally{' '}
        <Link to="/speaking">speak</Link> at events.
      </p>
    </>
  );
};

export default Bio;
