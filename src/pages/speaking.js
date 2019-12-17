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
        I have spoken at various events in the past. Mostly these talks were
        related to my work with{' '}
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
          <h3>Google Africa Mappers Conference Kenya 2010</h3>
          <img src={africaMappers} alt="" />
          <p>
            I was invited with{' '}
            <a
              href="https://www.twitter.com/farazilu"
              target="_blank"
              rel="noopener noreferer"
            >
              Faraz Ahmad
            </a>{' '}
            – a fellow mapper at Google Map Maker to share our experience with
            the platform and strategies we adopted to rapidly map Pakistan with
            maintaining the quality. At this 2 days conference, we presented to
            share methodologies with Africa mappers who were just get started.
            More info at{' '}
            <a
              href="https://sites.google.com/site/superafricamappers/home"
              target="_blank"
              rel="noopener noreferer"
            >
              https://sites.google.com/site/superafricamappers/home
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>TEDx Lahore 2010</h3>
          <img src={tedxLahore} alt="" />
          <p>
            I was part of the TEDx Lahore 2010 to emphasize on need of open
            access to public information with our struggle to help rescue and
            relief efforts in recent natual disaster. More info at{' '}
            <a
              href="https://www.ted.com/tedx/events/915"
              target="_blank"
              rel="noopener noreferer"
            >
              https://www.ted.com/tedx/events/915
            </a>
          </p>
        </div>
        <div className={style.event}>
          <h3>Google Map Maker Regional Conference Dubai 2011</h3>
          <img src={gmmRegionalConference} alt="" />
        </div>
        <div className={style.event}>
          <h3>Google Geo Users Summit Singapore 2011</h3>
          <img src={geoUsersSummit} alt="" />
        </div>
        <div className={style.event}>
          <h3>Google Big Tent Sendai 2011</h3>
          <img src={bigTent} alt="" />
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
