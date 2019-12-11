import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import africaMappers from '../../content/assets/images/speaking/africa-mappers.png';
// import tedxLahore from '../../content/assets/images/speaking/tedx-lahore.png';
// import gmmRegionalConference from '../../content/assets/images/speaking/gmm-regional-conference.png';
// import geoUsersSummit from '../../content/assets/images/speaking/geo-users-summit.png';
// import bigTent from '../../content/assets/images/speaking/big-tent.png';

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
        I have spoken at various events in past. Mostly these talks were related
        to my work with{' '}
        <a
          href="https://mapmaker.google.com"
          target="_blank"
          rel="noopener noreferer"
        >
          Google Map Maker
        </a>
        . However I am now more focused on giving talks and workshops on tech
        related topics.
      </p>

      <hr />
      <div className={style.speaking}>
        <div>
          <h3>Google Africa Mappers Conference Kenya 2010</h3>
          <img src={africaMappers} alt="" />
        </div>
        {/* <div>
          <img src={tedxLahore} alt="" /> TEDx Lahore 2010
        </div>
        <div>
          <img src={gmmRegionalConference} alt="" /> Google Map Maker Regional
          Conference Dubai 2011
        </div>
        <div>
          <img src={geoUsersSummit} alt="" /> Google Geo Users Summit Singapore
          2011
        </div>
        <div>
          <img src={bigTent} alt="" /> Google Big Tent Sendai 2011
        </div> */}
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
