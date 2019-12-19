import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import africaMappers from '../../content/assets/images/speaking/africa-mappers.png';
import tedxLahore from '../../content/assets/images/speaking/tedx-lahore.png';
import gmmRegionalConference from '../../content/assets/images/speaking/gmm-regional-uae.png';
import geoUsersSummit from '../../content/assets/images/speaking/geo-summit-singapore.png';
import bigTent from '../../content/assets/images/speaking/big-tent-sendai.png';

import style from './speaking.module.scss';

const SpeakingPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Speaking"
        keywords={[
          `speaking`,
          `jabran`,
          `rafique`,
          `javascript`,
          `react`,
          `google`,
          `maps`,
          `map maker`,
          `cartography`,
          `tech events`,
          `disaster relief`
        ]}
      />
      <h2 className={style.h2}>Speaking</h2>
      <p>
        I have spoken at various events in the past, ran workshops and training
        sessions. Mostly these talks were related to my work with{' '}
        <a
          href="https://mapmaker.google.com"
          target="_blank"
          rel="noopener noreferer"
        >
          Google Map Maker
        </a>
        . However I am now more focused towards tech, startups and mentoring.
      </p>

      <hr />
      <div className={style.speaking}>
        <div className={style.event}>
          <h3>Google Big Tent Sendai &ndash; 2011</h3>
          <img src={bigTent} alt="" />
          <p>
            I was invited along with{' '}
            <a
              href="https://www.twitter.com/momers"
              target="_blank"
              rel="noopener noreferer"
            >
              Omer Sheikh
            </a>
            , a fellow mapper to highlight our mapping efforts through Google
            Map Maker during couple of natural disasters that helped facilitate
            relief and rescue efforts on grounds for various agencies such as
            UNITAR/UNOSAT.
          </p>
          <p>
            <a
              href="https://googleblog.blogspot.com/2012/07/big-tent-sendai-smarter-ways-to-share.html"
              target="_blank"
              rel="noopener noreferer"
            >
              Google blog &raquo;
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>Google Geo Users Summit Singapore &ndash; 2011</h3>
          <img src={geoUsersSummit} alt="" />
          <p>
            The Summit hosted Google Map Maker Mappers, Geo Modelers, Panoramio
            Enthusiasts from Asia Pacific to celebrate their contribution in
            crowd-sourced efforts and to set new strategies to increase
            community engagement.
          </p>
          <p>
            <a
              href="https://sites.google.com/site/2011geocommunityapac/"
              target="_blank"
              rel="noopener noreferer"
            >
              More details &raquo;
            </a>
          </p>
          <p>
            <a
              href="https://maps.googleblog.com/2011/04/celebrating-top-geo-contributors-in.html"
              target="_blank"
              rel="noopener noreferer"
            >
              Google blog &raquo;
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>Google Map Maker Regional Conference Dubai &ndash; 2011</h3>
          <img src={gmmRegionalConference} alt="" />
          <p>
            The Regional Conference brought most active cartographers together
            to meet, have fun and learn from each other. Teams and individuals
            from each region presented their interesting stories of mapping and
            how digital maps have helped their regions.
          </p>
          <p>
            <a
              href="https://sites.google.com/site/2012mapmakercommunity/mena"
              target="_blank"
              rel="noopener noreferer"
            >
              More details &raquo;
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>Africa Supper Mappers Conference, Kenya &ndash; 2010</h3>
          <img src={africaMappers} alt="" />
          <p>
            I was invited along with{' '}
            <a
              href="https://www.twitter.com/farazilu"
              target="_blank"
              rel="noopener noreferer"
            >
              Faraz Ahmad
            </a>{' '}
            , a fellow mapper at Google Map Maker to share our experience and
            strategies we adapted to rapidly map Pakistan &ndash; with keeping
            up the quality. This helped attendees learn different methodologies
            towards digital cartography of Africa.
          </p>
          <p>
            <a
              href="https://sites.google.com/site/superafricamappers/home"
              target="_blank"
              rel="noopener noreferer"
            >
              More details &raquo;
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>TEDx Lahore &ndash; 2010</h3>
          <img src={tedxLahore} alt="" />
          <p>
            I was invited along with{' '}
            <a
              href="https://www.twitter.com/momers"
              target="_blank"
              rel="noopener noreferer"
            >
              Omer Sheikh
            </a>{' '}
            at TEDx Lahore 2010 to speak about improtance of open access to
            public information and data &ndash; especially during times of
            natural disasters. We spoke about the struggle faced by agencies due
            to limited and restricted availability of information and data.
          </p>
          <p>
            <a
              href="https://www.ted.com/tedx/events/915"
              target="_blank"
              rel="noopener noreferer"
            >
              More details &raquo;
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SpeakingPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { private: { eq: false }, categories: { eq: "articles" } }
      }
      limit: 1000
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            permalink
            thumbnail {
              childImageSharp {
                resize(width: 125, height: 125) {
                  src
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }
`;
