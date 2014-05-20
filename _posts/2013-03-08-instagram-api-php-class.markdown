---
layout: post
title: 'Instagram API PHP Class'
date: 2013-03-08 07:00:00
categories: articles
tags: 'Beatport API, Facebook API, GitHub, Instagram API, JavaScript, Open Graph, PHP, Spotify API, Twitter API'
excerpt: 'This PHP wrapper for Instagram API intends to provide an easy access to majority of methods in Instagram API as well as to OAuth authentication and authorization.'
permalink: instagram-api-php-class
comment: true
private: false
---


Recently, I have been very much into building Facebook applications. These applications vary from simple HTML forms for user data capture with fan gates to complex surveys—but with interactive, simple and engaging UI.

This also gave me an opportunity to experiment with various RESTful web services such as [Facebook Open Graph][facebook-graph], [Twitter][twitter], [Instagram][instagram], [Spotify][spotify] and [Beatport][beatport] APIs in unique manners. However, Instagram API was the one that I happened to use quite a lot while building few applications—therefore is the main focus of this post.

Going through development with Instagram API with no existing libraries based on its SDKs is a long story itself to tell at another time perhaps. Nonetheless, after facing much of trouble at the end I decided to build a custom PHP class. The idea is to make API’s various methods easily accessible. So here it is with a very initial version. It lacks few important methods currently which I shall be updating in few days. However, current methods are enough to authorise a user and get their basic information.

The package consists of two files.

* `instagram.class.php`
* `ig-config.php`
* `ig-config.php` shall contain the configuration information that is required for `instagram.class.php` to work properly.

### Instructions:

* Include/require the `instagram.class.php` file.
* Create a new instance of class i.e. `$ig = new JRIG( parameters )`;

**Parameters:**


{% highlight php %}

$client_id
$client_secret
$redirect_uri
$scope

{% endhighlight %}

The parameters are optional and by default an instance will take the parameter values from `ig-config.php`

However, if you like to create an instance on the go to use another registered Instagram client then you can do so by providing these optional parameters.

Following methods are currently available using a defined instance:

{% highlight php %}
// returns an Instagram OAuth URI
$ig->get_oauth_uri();

// returns client id
$ig->get_client_id();

// returns client secret
$ig->get_client_secret();

// returns scopes/permissions
$ig->get_scope();

// returns user basic information including access_token as an associative Array()
$ig->get_access_token();

{% endhighlight %}

A number of other methods are also part of this release. The project is available at GitHub under MIT License for use and contributions.

**Example:** [http://jabran.me/sandbox/igapi/](http://jabran.me/sandbox/igapi/)

**GitHub:** [https://github.com/jabranr/instagram-api-php](https://github.com/jabranr/instagram-api-php)


[facebook-graph]: https://developers.facebook.com/docs/concepts/opengraph/
[twitter]: https://dev.twitter.com/docs/api
[instagram]: http://instagram.com/developer/
[spotify]: https://developer.spotify.com/technologies/web-api/
[beatport]: http://api.beatport.com/