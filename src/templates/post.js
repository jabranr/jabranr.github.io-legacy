import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import style from './post.module.scss';

const PostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <h1 className={style.title}>{post.frontmatter.title}</h1>
      <p className={style.timestamp}>{post.frontmatter.date}</p>
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <hr className={style.hr} />

      {(previous || next) && (
        <>
          <h3>More articles</h3>
          <ul className={style.nav}>
            {previous && (
              <li className={style.prev}>
                <Link to={previous.fields.slug} rel="prev">
                  &laquo; {previous.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li className={style.next}>
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} &raquo;
                </Link>
              </li>
            )}
          </ul>
        </>
      )}
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
