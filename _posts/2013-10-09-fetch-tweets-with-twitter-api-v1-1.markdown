---
layout: post
title: 'Fetch tweets with Twitter API v1.1'
date: 2013-10-09 07:00:00
categories: articles
tags: Personal
excerpt: 'An attampt to create a PHP wrapper to easily access the methods of Twitter API v1.1 that requires OAuth authentication and authorization on all endpoints unlike its previous version.'
permalink: fetch-tweets-with-twitter-api-v1-1
comment: true
private: false
---

<blockquote>A better version of this library is available by the name of <a href="http://j.mp/fetchwitter" title="Fetchwitter">Fetchwitter</a></blockquote>

If you happen to follow my updates at Twitter, you may have come across [ranting me about bugs](https://twitter.com/jabranr/statuses/354288195694886912) in Twitter API v1.1 documentations.

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>The worse documentation of <a href="https://twitter.com/search?q=%23twitterapi&amp;src=hash">#twitterapi</a> 1.1 suggests make use of <a href="https://twitter.com/anywhere">@anywhere</a> that actually deprecated on March 5th! <a href="https://t.co/WZ9aRfqlRD">https://t.co/WZ9aRfqlRD</a></p>&mdash; Jabran Rafique (@jabranr) <a href="https://twitter.com/jabranr/statuses/354288195694886912">July 8, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Twitter made an oAuth authorization compulsory for any type of request made to its API with release of their latest version 1.1. It is obvious that publicly accessible data was gated behind a complicated authorization mechanism and therefore was [not welcomed by majority of developers](https://dev.twitter.com/discussions/rest-api-v11).

After going through few months’ procrastination, I finally figured out that I will have to work it out sooner or later. So I went through few of these discussions at [Twitter devs](https://dev.twitter.com/discussions/) and [stackoverflow](http://stackoverflow.com/questions/tagged/twitter) forums but in vain and later decided to go through official documentations that turned out to be fruitful at the end.

Twitter API has [two types of authentication](https://dev.twitter.com/docs/auth) models, first is user type authentication and other is application-only authentication. In case of a user authentication, user has to authorise the application in order to provide it the access to various request methods while in case of an application-only authentication, application makes the requests at user’s behalf and of course there are limitations of certain extents to such liberty.

The process revolves around getting an `access token` by exchanging the credentials with which we can make requests to Twitter API 1.1 endpoint. Following outline explains the process flow.

### Step 1: Create an application

First of you will need to register/login at [https://dev.twitter.com/apps](https://dev.twitter.com/apps) and create a new application. Fill out the required fields and it will generate the required credentials for you. The only credentials you need are “consumer key” and “consumer secret”.

### Step 2: Exchange credentials for access token

Now you need to make a POST request to API’s oAuth endpoint to exchange above-mentioned credentials for an `access token`. The request made at this stage requires Authorization headers. This will result in a response with app level bearer `access token`. You might want to save/cache the acquired `access token` instead of making a request each time.

### Step 3: Make request to get the required feed

Now that you have the `access token`, you can make requests to Twitter API endpoint and receive data in response. The request made at this stage also requires inclusion of Authorization headers.

Now since all these results are returned in plain text and so are the links, hashtags and mentions in the tweets. This issue can easily be solved by using regex match and replace methods, that is available in this example as <del>`text2html()`</del> `text2tweet()` function. You can get the [complete source at Github](https://github.com/jabranr/twitter-api-v1.1).