---
layout: post
title: 'Rebuilding United Website - Development Workflow'
date: 2014-06-10 08:00:00
categories: articles
tags: Personal
excerpt: 'Recently I developed the redesigned website of United Agency. Here I share development workflow and overview of tools used during this process.'
permalink:
thumbnail: united-agency-new-website.png
comment: true
private: false
---

Around three weeks ago, we ([@_Bchalk](https://twitter.com/_Bchalk) and myself) were given the task to redesign and redevelop the United website. The website have not been touched in months and totally required an overhaul. This was a very basic website spanned over a single page – with information about clients, services and contact. So basically keeping the original amount of contents with an new section showcasing United work/case studies – idea is to give it a whole new vibrant look and make it more widely usable in terms of accessibility and user experience. So this was what we started with:

<img src="{{ site.url }}/img/united-agency-old-website.png" alt="" class="img-responsive">

### Design &amp; Wireframes

Ben worked through design process with mobile-first approach since being responsive was one of the important part of this overhaul. After brainstorming over few mockups and wireframes by Ben, set of final wireframes were selected for development. Ben worked on these wireframes to create the first actual and visual design of the website. Once happy with designs, the project goes into development process.

### Development:

Since responsiveness was an important part of it so development had to start with mobile-first approach as well. Twitter Bootstrap provides an excellent support for fluid layouts out of the box. To make sure that fluid layouts work as expected on most devices and different screen resolutions, I had following few excellent testing tools on board:

+ [Google Chrome Mobile Emulator](https://developer.chrome.com/devtools/docs/mobile-emulation)
+ [Resizer by Malte Wassermann](http://lab.maltewassermann.com/viewport-resizer/)

Google Chrome Mobile Emulator provides an excellent set of environment for variety of devices. Resizer provides a comprehensive list of screen resolutions as well as options to define custom. 

Since amount of contents of this website were not massive and did not need to be generated dynamically from a CMS or database, I used [Jekyll](http://jekyllrb.com/) for content delivery. Jekyll also provides a local server to run the tests and confirm outputs. In addition to Jekyll, I used [Grunt.js](http://gruntjs.com) to automate my tasks and make the overflow smooth. Grunt plugins helped in automating the following tasks:

+ Optimizing and compressing the images
+ Concat SASS files from various packages i.e. Bootstrap, Animate.css, IcoMoon
+ Concat, compress and minify the JavaScript packages
+ Contents delivery using Jekyll with Grunt
+ Watching the file changes automatically to run appropriate tasks

Sass provides an excellent support for manipulating and customizing the default packages without touching the core code. It also helps to concatenate more than one Sass files together as well as to reuse variables, functions, compressing and minifying the CSS output for production use.

[Bootstrap Sass](http://getbootstrap.com/customize/) provides excellent support for optional selection of modules required for a project. By simply commenting out the modules that are not required saves on output file size and removes the unused CSS from production code.

> It is important to understand that one should not include a complete library for few functions but rather tailor it to the needs.

Merging different CSS files into single output file helps to enhance the performance by saving on HTTP round trips.

<img src="{{ site.url }}/img/bootstrap-sass-selective-modules.png" alt="" class="img-responsive">

This awesomeness of selecting only required modules doesn't just stop at Bootstrap or Sass! It continues to other front-end tools used in this project as well i.e. jQuery, jQuery Mobile, Animate.css, Bootstrap.js etc. In addition to these, I also used a selective set of font icons from [IcoMoon](http://icomoon.io) that enables the social media links at the website. Once again, it is important to only import the glyphs that are required rather than loading a complete font file.

> In short, sole purpose of this all “selective” practice is to keep the files size as minimum as required and to keep up with overall performance.

### Setup Instagram &amp; Twitter Feeds:

The contact section has feed from Instagram and Twitter channels.

<img src="{{ site.url }}/img/united-agency-contact.png" alt="" class="img-responsive">

#### Instagram Feed:

[Instagram API](http://instagram.com/developer/) now provides a very convenient way to grab a user feed with [a new addition to its users endpoint](http://instagram.com/developer/endpoints/users/#get_users_media_recent_with_client_id). I used `jQuery.getJSON` method as exampled below to grab the feed. The `callback=?` parameter here is to get the response in JSONP type to bypass the cross-domain restrictions in a `XMLHttpRequest`.

``` javascript
	var url = "https://api.instagram.com/v1/users/396527045/media/recent/";
		url += "?client_id=012345689";
		url += "&count=10";
		url += "&callback=?";

	$.getJSON(url, function(data) {
		// Setup Instagram feed here.
	});
```

#### Twitter Feed:

To get a feed from Twitter API requires an OAuth authentication. For this purpose, I used [PHP library Fetchwitter](https://github.com/jabranr/Fetchwitter). A `XMLHttpRequest` call (somewhat similar to above example) to Fetchwitter output would grab the response in JSON format. Once Twitter feed is setup, its time to decorate it so it looks more like a Tweet.

Fetchwitter has built-in method `to_tweet` that formats plain text into proper tweet with links, hashtags and mentions enabled appropriately. Since I am getting data in JSON format from Fetchwitter, it was more convenient to format the tweet at front-end than using the `to_tweet` method. So I decided to use JavaScript at front-end by modifying the `String` prototype and adding few methods to it. This prototyping used JavaScript `indexOf` method which is not available in Internet Explorer 8 therefore to make this String prototype available in IE8 as well I also needed an extra prototype manipulation in `Array` object. Here is what it looks like:

<p data-height="268" data-theme-id="6602" data-slug-hash="wBxGA" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/jabranr/pen/wBxGA/'>Format text to tweet using JavaScript String prototyping</a> by Jabran Rafique (<a href='http://codepen.io/jabranr'>@jabranr</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

[Also available on Gist](https://gist.github.com/jabranr/68515719cde0653d641d#file-format-text-string-to-tweet-with-javascript-string-prototype-js)

The last thing was to add the animations. We wanted to give it a very subtle parallax affect. [Animate.css](http://daneden.github.io/animate.css/) is a wonderful collection of beautiful CSS3 animations. I used the <kbd>Fading Entrances</kbd> and <kbd>Fading Exits</kbd> modules to create a easing parallax effect when scrolling down for first time.

Visit new website at [http://united-agency.co.uk](http://united-agency.co.uk)!