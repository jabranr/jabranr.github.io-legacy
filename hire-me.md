---
layout: page
title: Hire me &ndash; current status
date: 2016-05-09 8:00:00
categories: announcements
tags: ['hire', 'freelancing', 'web development', 'consultancy']
excerpt: Details on hiring me
permalink: /hire-me/
thumbnail:
comment: false
private: true
---

{% if site.hire != true %}
  <p class="lead">I am not accepting any projects currently as I am very busy with my partner Ruby bringing up our son Omer born on <time datetime="{{ '2016-01-01' | date_to_xmlschema }}">1<sup>st</sup> January 2016</time>.</p>
  <p>I have tried to work on couple of projects recently. Although I met the deadlines but it was difficult to achieve. Therefore I am not accepting any projects until I am sure that I can spare appropriate time for one.</p>
  <p>Nevertheless <a href="https://twitter.com/@{{ site.twitter.username }}">say hi on Twitter</a> if you have anything to talk about!</p>
{% else %}
  <p class="lead">I am currently accepting small projects for <em>weekends</em> only!</p>
  <p>A small project can be a development of a web site, web app or consultancy services for a web projects that can be covered over a/few <strong>weekends</strong> only. If you would like me to involve in any of your awesome project then get in touch via <a href="mailto:{{ site.email }}">email</a> or <a href="https://twitter.com/@{{ site.twitter.username }}">Twitter</a>!</p>
{% endif %}

<p>Updated: <time datetime="{{ page.date | date_to_xmlschema }}">{{ page.date | date_to_long_string }}</time></p>