import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        {header}
        {children}
        <footer
          style={{
            borderTop: '2px solid #eee',
            padding: '1.5rem 0'
          }}
        >
          <small>
            &copy; {new Date().getFullYear()} Local.com.pk &ndash;{' '}
            <a
              href="https://www.facebook.com/localpakistan"
              target="_blank"
              rel="noopener"
            >
              Facebook
            </a>{' '}
            |{' '}
            <a
              href="https://www.twitter.com/jabranr"
              target="_blank"
              rel="noopener"
            >
              Twitter (@jabranr)
            </a>
          </small>
        </footer>
      </div>
    );
  }
}

export default Layout;
