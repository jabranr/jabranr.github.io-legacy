---
layout: post
title: 'Introducing socialmedia.js v1.1'
date: 2013-09-19 07:00:00
categories: articles
tags:
  [
    'Facebook API, Facebook SDK, GitHub, Google Maps API, JavaScript, Socialmedia.js, Twitter API',
  ]
excerpt: 'Socialmedia.js is a JavaScript library that enables social media functions and plugins in web apps and websites. It reduces the pain of collecting code snippets and their setup.'
permalink: introducing-socialmedia-js-v1-1
comment: true
private: false
thumbnail: ../../assets/images/socialmedia-js.png
---

Those who often work with [Facebook API](https://developers.facebook.com/) are aware that how tedious it could be to go find the appropriate code script(s)for [Facebook SDK](https://developers.facebook.com/docs/sdks/) to make various Facebook API functions available into their applications. So was the case with me when I started working with [Facebook applications](http://jabran.me/understanding-user-journey-in-facebook-applications/) about half a year ago.

You have to find and set up the appropriate JavaScript code into HTML of your each file in which you wish to use Facebook API as well as setup the channel file for cross-domain access and the special div tag to let SDK initialise them. It is quite a bit of work if you have to do it regularly or for each file — unless you ease the process a little by using some sort of MVC structured application or personalised templates.

<img src="../../assets/images/socialmedia.js.jpg" alt="Socialmedia.js" />

Let me introduce you with [socialmedia.js](https://github.com/jabranr/socialmedia.js#readme) — a small JavaScript library that includes all required functionality for Facebook API SDKs and ready to go by adding few straightforward script line(s) into your application’s HTML. This library is surely a result of above mentioned bizarre recursion. socialmedia.js also works fine for all kind of Facebook built-in plugins such as [Like button](http://jabran.me/introducing-socialmedia-js-v1-1/https//developers.facebook.com/docs/reference/plugins/like/), [Comments Box](https://developers.facebook.com/docs/reference/plugins/comments/) and [Follow Button](https://developers.facebook.com/docs/reference/plugins/follow/) etc. and built-in functions such as [Share](https://developers.facebook.com/docs/plugins/share/), [Invite](https://developers.facebook.com/docs/reference/dialogs/requests/) etc.

Along with Facebook social actions, it also makes available the function to tweet. Although, I made it for my own ease with only a required limited functionality and had been successfully using it for over 6 months, I now intend to add more SDKs setup i.e. [Twitter API](https://dev.twitter.com/) and [Google Plus API](https://developers.google.com/+/api/) to make it more diverse.

The project is open-source with [MIT license](http://opensource.org/licenses/MIT). Current stable version 1.1 has [detailed guidelines](https://github.com/jabranr/socialmedia.js#readme), [examples](http://jabran.me/sandbox/socialmediadotjs/) and is available to [download from GitHub](https://github.com/jabranr/socialmedia.js/archive/1.1.zip).

Your comments and feedbacks are always welcome and help in improvement.
