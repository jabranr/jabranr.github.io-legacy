import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import style from './index.module.scss';

const HomePage = ({ data, location }) => {
  const articles = data.articles.edges;
  const projects = data.projects.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Jabran Rafique"
        keywords={[`blog`, `jabran`, `rafique`, `javascript`, `react`]}
      />
      <Bio />
      <h4 className={style.h4}>Projects</h4>
      <div className={style.projects}>
        {projects.map(({ node }) => (
          <Link to={node.fields.slug} className={style.project}>
            <img
              src={node.frontmatter.thumbnail.childImageSharp.resize.src}
              className={style.thumbnail}
              alt={node.frontmatter.title}
            />
          </Link>
        ))}
      </div>
      {/* {projects.map(({ node }) => (
        <Link
          className={style.card}
          to={node.fields.slug}
          key={node.fields.slug}
        >
          <div className={style.timestamp}>{node.frontmatter.date}</div>
          {node.frontmatter.thumbnail && (
            <img
              src={node.frontmatter.thumbnail.childImageSharp.resize.src}
              className={style.thumbnail}
              alt=""
            />
          )}
          <div>
            <h3 className={style.h3}>
              {node.frontmatter.title || node.fields.slug}
            </h3>
            <p
              className={style.excerpt}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </div>
        </Link>
      ))} */}
      <p className={style.more}>
        <Link to="/projects">More projects &raquo;</Link>
      </p>
      <h4 className={style.h4}>Articles</h4>
      {articles.map(({ node }) => (
        <Link
          className={style.card}
          to={node.fields.slug}
          key={node.fields.slug}
        >
          <div className={style.timestamp}>{node.frontmatter.date}</div>
          {node.frontmatter.thumbnail && (
            <img
              src={node.frontmatter.thumbnail.childImageSharp.resize.src}
              className={style.thumbnail}
              alt=""
            />
          )}
          <div>
            <h3 className={style.h3}>
              {node.frontmatter.title || node.fields.slug}
            </h3>
            <p
              className={style.excerpt}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </div>
        </Link>
      ))}
      <p className={style.more}>
        <Link to="/articles">More articles &raquo;</Link>
      </p>
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
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { private: { eq: false }, categories: { eq: "articles" } }
      }
      limit: 5
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
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { private: { eq: false }, categories: { eq: "projects" } }
      }
      limit: 5
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
