const metadata = {
  title: `Jabran Rafique - Software Engineer (Web)`,
  author: `Jabran Rafique`,
  description: `I like to develop on ideas that are useful and beneficial to everyone`,
  siteUrl: `https://www.jabran.me`,
  avatar: `content/assets/images/avatar.png`
};

module.exports = {
  siteMetadata: {
    ...metadata,
    social: {
      codepen: `jabranr`,
      github: `jabranr`,
      twitter: `jabranr`
    }
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 675
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-MHKHDT`,
        includeInDevelopment: false
      }
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: metadata.title,
        short_name: `Jabran.me`,
        description: metadata.description,
        start_url: `/`,
        background_color: `#9dbf8e`,
        theme_color: `#9dbf8e`,
        display: `minimal-ui`,
        icon: metadata.avatar
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};
