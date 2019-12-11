---
layout: post
title: 'WordPress to Github with Jekyll, SASS and Grunt.js'
date: 2014-05-17 07:00:00
categories: articles
tags:
  [
    WordPress,
    Github,
    Jekyll,
    Sass,
    Gruntjs,
    Socialmedia,
    CoffeeScript,
    Twitter Bootstrap,
  ]
excerpt: 'Here is a quick overview of my journey from WordPress to Github that introduced me to amazing collection of tools in web industry.'
permalink:
thumbnail: ../../assets/images/avatar.jpg
comment: true
private: false
---

So back to 90s, huh? Yes, kind of. Moving from [WordPress](http://wordpress.org) to [Github pages](http://github.io) is more like it. Since website is not anymore generated dynamically through a Content Management System (CMS) but merely is a collection of static HTML pages. But good news is that workflow of this process is lot better than the era of [FrontPage](http://en.wikipedia.org/wiki/Microsoft_FrontPage) and [Dreamweaver](http://en.wikipedia.org/wiki/Dreamweaver) etc.

No doubt WordPress is a wonderful framework, platform and CMS. But for a simple blog/portfolio, it probably is more than what anyone might ask for. Basically what excited me much in this move was the list of new technologies I would be learning. Jekyll, Sass, Grunt.js, Bower and CoffeeScript<sup>1</sup> were few to name that I was keen to learn. That probably is quite a list to go through by using a single project. So I divided and spread the list over couple of projects for more detailed learning.

Since best way to learn a technology is by practicing it so I started with rewriting the [Socialmedia.js](http://jabran.me/projects/socialmedia-js/) with CoffeeScript and Grunt.js. CoffeeScript is basically used to write JavaScript more effeciently and it helps in speeding up the workflow by not needing to care about braces and semicolons. But that is just a part of it and complete power of CoffeeScript is much more than that.

Grunt.js is a task runner. So basically anything you do in your workflow is a task. How useful it would be if merging, conversions, compression and naming files etc. is done automatically instead of doing each of the tasks manually. That’s exactly what Grunt.js does. By settings up tasks required in the project, it did not let me use the alt+tab (to switch between windows) and kept me focus on writing code. Here are tasks that I used in this project:

- grunt-contrib-coffee
- grunt-contrib-concat
- grunt-contrib-uglify
- grunt-contrib-watch

The learning experience that lasted over few days was so wonderful that it doubled up my excitement to learn rest of technologies. After releasing Socialmedia 1.4.1, I went on rebuilding and simplifying this website with Jekyll, Sass, Twitter Bootstrap (TWBS)<sup>2</sup> and Grunt.js to automate my tasks.

In this website renovation, for reset, grids layout and other custom styling requirements I wanted to use TWBS. But I also wanted to avoid loading the complete TWBS code with unwanted blocks. I could go to [Customize section of TWBS](http://getbootstrap.com/customize/) and download a custom bundle but then if I needed to make changes in it, I had to remember all custom choices to generate same custom bundle. This does not sound very helpful in workflow.

Bower and [TWBS Sass](https://github.com/twbs/bootstrap-sass) came to rescue. By using Bower, I installed the TWBS Sass into project directory.

```bash
  $ bower install bootstrap-sass-official
```

Then imported the `/bootstrap.scss` file into website’s custom Sass file. Now not only I can simply comment out the unwanted parts of TWBS to exclude the code from final CSS file but I can also setup custom values for TWBS Sass variables. Additionally, I can even make use of TWBS Sass `mixin` too.

Grunt.js once again, automated the compiling of TWBS Sass and my custom Sass files into one CSS file and then minified it further to save more bytes on overall size. This not only reduced the overall CSS file size but also killed the extra HTTP request(s). I also used [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) task in Grunt.js to compress images used in the website. Here is a complete list<sup>5</sup> of all tasks in Gruntfile.js for this project:

- grunt-contrib-concat
- grunt-contrib-uglify
- grunt-contrib-imagemin
- grunt-contrib-sass
- grunt-contrib-watch

The projects section of the website, generates projects information from [Jekyll Front Matter](http://jekyllrb.com/docs/frontmatter/). I initially thought of pulling the Github feed but then trashed the idea to keep the overall website experience more personalized. Each project status and version is color-coded giving you an idea of what is the current status of each project. The website is built using mobile-first approach<sup>3</sup> and is fully responsive. The front-end is originally based on CSS and it enhances progressively and degrades gracefully<sup>4</sup> to defaults wherever needed. The [website source is available](https://github.com/jabranr/jabranr.github.io) under MIT License at Github.

The whole experience of moving from a comprehensive CMS to a content generating platform (Jekyll) with automated tasks runner (Grunt.js) was just brilliant. I recommend giving these and other tools a go to speedup the overall development work flow. Have a quick start with Grunt.js by reading through [Chris Coyier's very well written article about Grunt.js](http://24ways.org/2013/grunt-is-not-weird-and-hard/) on 24ways.

...and welcome to my new website!

### References

1. [Jekyll](http://jekyllrb.com), [Sass](http://sass-lang.com), [Grunt.js](http://gruntjs.com), [Bower](http://bower.io/), [CoffeeScript](http://coffeescript.org) <br>
2. [Twitter Bootstrap](http://getbootstrap.com) <br>
3. [Mobile First Responsive Web Design - Brad Frost](http://bradfrostweb.com/blog/web/mobile-first-responsive-web-design/) <br>
4. [Progressive Enhancement &amp; Graceful Degradation](http://www.sitepoint.com/progressive-enhancement-graceful-degradation-basics/) <br>
5. [Grunt.js plugins](http://gruntjs.com/plugins)
