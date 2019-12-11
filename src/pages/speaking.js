import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import style from './index.module.scss';

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

      <ul>
        <li>Google Africa Mappers Conference Kenya 2010</li>
        <li>TEDx Lahore 2010</li>
        <li>Google Map Maker Regional Conference Dubai 2011</li>
        <li>Google Geo User Summit Singapore 2011</li>
        <li>Google Big Tent Sendai 2011</li>
      </ul>
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
