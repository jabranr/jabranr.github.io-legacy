---
layout: post
title: Performance audits with GatsbyJS and Lighthouse
date: 2019-02-05 07:00:00
categories: articles
tags: [gatsbyjs, lighthouse, performance, audit, chrome, devtools, CD, CI]
excerpt: How to integrate Lighthouse into GatsbyJS CD/CI pipeline
comment: true
private: false
---

GatsbyJS is a great tool to create static pages. The best part is the integration of different modern technologies together e.g. NodeJS, ReactJS and GraphQL. A combination of those in GatsbyJS gives you set of powerful tools and commands that sets out a world of unlimited opportunities.

I came across this requirement of integrating performance audits on a GatsbyJS project as part of the Continuous Development(CD) and Continuous Integration(CI) pipelines. [Lighthouse](https://developers.google.com/web/tools/lighthouse/) is without a doubt the best tool out there for such purpose.

Audits are meant to be performed on a production build to reflect more accurate results. Therefore in order to run an audit we must have a production build and being served from a server. GatsbyJS provides options to create a production build and serve it from a local server. These commands are `gatsby build` and `gatsby serve` respectively.

Normally I would have these as a combined command inside `npm scripts` in `package.json` i.e.

```json
...

"scripts": {
  "develop": "gatsby develop",
  "build": "gatsby build",
  "preview": "gatsby build && gatsby serve"
}

...
```

Now we can run `npm run preview` in terminal and it will serve the production site at `http://localhost:9000`. Now we can perform an audit using Chrome browser DevTools `Audit` tab which will produce a nice report for us.

> There is an excellent guide on this at [GatsbyJS docs](https://www.gatsbyjs.org/docs/audit-with-lighthouse/).

However, in order to have this run in a CD/CI pipeline, we need command-line interface of `lighthouse` that we can install as a node module.

```bash
npm install -D lighthouse
```

or

```bash
yarn add -D lighthouse
````

Then we can modify our `npm scripts` in `package.json` to include following:

```json
...

"scripts": {
  ...

  "preview:start": "(gatsby build && (gatsby serve &))",
  "preview:stop": "lsof -i tcp:9000 | awk '{print $2}' | grep \"[0-9]\" | xargs kill -9",
  "audit": "lighthouse http://localhost:9000",

  "perf:audit": "npm run preview:start ; (npm run audit -- --view && npm run preview:stop)"
}

...
```

It may already be self-explanatory but here is quick run through:

- `audit` runs the `lighthouse` on given URL which in this case is `http://localhost:9000` since GatsbyJS serves the site on port 9000.
- `preview:start` is same as `preview` command but with some difference. It makes sure that GatsbyJS serves the site in background and does not block further commands to run.
- `preview:stop` basically kills the GatsbyJS service running in the background assuming it is running on port 9000
- `perf:audit` runs the combination of above commands to make a build, serve it in the background, run the `lighthouse` audit, opens the report in browser and kills the background service

> The `--view` flag to `lighthouse` part will open the report in browser after it is ready.

## Gotcha
GatsbyJS will try to serve on port 9000 but if some other process is already using it then it may offer another port to serve. Normally an increment by one e.g. 9001. In such a case, `lighthouse` may fail to run as port 9000 may not be the one serving the GatsbyJS site.

## Usage in CI pipeline
Since `lighthouse` can generate report in different formats including JSON, it can easily be read and evaluated by CI tools. This would be useful for a website with set performance budget so that in a CI pipeline, a build will fail if it does not meet the defined minimum criteria. This is what we are trying to achieve at [Rated People](https://www.ratedpeople.com).

## References:
- [Lighthouse documentation](https://developers.google.com/web/tools/lighthouse/)
- [GatsbyJS documentation](https://www.gatsbyjs.com)
