import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import style from './index.module.scss';

const HomePage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Jabran Rafique"
        keywords={[`blog`, `jabran`, `rafique`, `javascript`, `react`]}
      />
      <Bio />
      <h4 className={style.h4}>Articles</h4>
      {posts.map(({ node }) => (
        <Link
          className={style.card}
          to={node.fields.slug}
          key={node.fields.slug}
        >
          <div className={style.datetime}>{node.frontmatter.date}</div>
          <h3 className={style.h3}>
            {node.frontmatter.title || node.fields.slug}
          </h3>
          <p
            className={style.excerpt}
            dangerouslySetInnerHTML={{ __html: node.excerpt }}
          />
        </Link>
      ))}
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`;
