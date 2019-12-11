import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import style from './index.module.scss';

const ProjectPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO
        title="Projects"
        keywords={[
          `projects`,
          `code`,
          `github`,
          `jabran`,
          `rafique`,
          `javascript`,
          `react`
        ]}
      />
      <h2 className={style.h2}>Projects</h2>
      <p>This page has information about various projects of Jabran Rafique.</p>
      <p>
        Here is list of projects I have worked on from time to time. Most of
        these are open-source and hosted at{' '}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://www.github.com/jabranr"
        >
          GitHub
        </a>{' '}
        – free to use and explore. You are most welcome to share your feedback,
        corrections and even enhancements to any of those.
      </p>

      <p>
        I also use{' '}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://gist.github.com/jabranr"
        >
          GitHub Gist
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://codepen.io/jabranr"
        >
          CodePen
        </a>{' '}
        to share experiments from day to day work.
      </p>
      {posts.map(({ node }) => (
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
      <hr className={style.hr} />
      <p>
        <a
          href="https://www.github.com/jabranr"
          target="_blank"
          rel="noopener noreferer"
        >
          More projects at GitHub &raquo;
        </a>
      </p>
    </Layout>
  );
};

export default ProjectPage;

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
        frontmatter: { private: { eq: false }, categories: { eq: "projects" } }
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
