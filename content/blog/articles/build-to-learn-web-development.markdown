---
layout: post
title: "Build to Learn – socialmedia.js – Case Study"
date: 2015-04-13 08:00:00
categories: articles
tags: [social media, Facebook, Twitter, Google+, Pinterest, API, SDKs]
excerpt: "The journey of learning web development by building some library, framework or merely a wrapper. Here is quick summary from building and maintaining of socialmedia.js and learning through this process."
permalink:
thumbnail: socialmedia-js.png
comment: true
private: false
---

`socialmedia.js` (Socialmedia) is a very small framework or a wrapper built around Software Development Kits (SDKs) of various famous social media platforms – making a developer's job easier – to use any required SDKs and it's native methods. There were following few reasons to build Socialmedia:

1. Shorter and clean code to use multiple social media SDKs in web apps
2. Based on reusable code for a daily workflow
3. Learn by building a framework, library or wrapper.

Imagine the clutter of code just to make the Facebook SDK available for a web app and other chunks that are required to use various methods of the SDK everywhere in the app. Using Socialmedia, it is cleaner and easier to embed all this into a web app and is even convenient to use in any front-end development work flow.

One of the many things that I have learned during development and maintenance of Socialmedia is the CoffeeScript. I liked it so much that in fact, since then, I have set development base for this framework in CoffeeScript. Other interesting stuff that I learned along were, better workflow setup using Grunt, Bower and of course Node/NPM, and most of all, JavaScript testing.

In addition to that, I had a chance to learn JavaScript itself in depth and understand the core of it. The intersting topics of objects, prototypes, closures, debugging and modules had all of my attention during that time. I am glad today to see Socialmedia going further strong with every new release as well as myself in learning new things.

So how actually Socialmedia can benefit a project? I will give a brief introduction here by going through it's installation and setup—to demonstrate the (potential) benefits by comparing the native and Socialmedia way of doing it.

At the time of writing, Socialmedia [supports](https://github.com/jabranr/socialmedia/wiki/API-Reference) following four social platforms:

- Facebook
- Twitter
- Google+
- Pinterest

The idea is to write minimum code to setup an SDK – and wherever possible – to provide an API that has less options to configure and is more human readable. Let's start with some comparison between native way of consuming SDKs and with Socialmedia to see the potential benefits.

## Facebook SDK

In order to use the Facebook SDKs into your web app, you will normally need following chunk of code from [Facebook developers docs](https://developers.facebook.com/docs/javascript/quickstart/v2.3).

{% highlight html %}

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'your-app-id',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

{% endhighlight %}

Here is how it is done with Socialmedia.

{% highlight html %}

<script src="path/to/socialmedia.min.js" type="text/javascript"></script>
<script>
	var facebook = new Socialmedia.Facebook({
		appid: 'your-app-id'
	});
</script>

{% endhighlight %}

At this stage – once all setup – web app will not only have all native objects and methods of SDK i.e. FB object but also additional easy-to-use helper methods built around some of most popular native methods. Here are some methods ([compelete API reference](https://github.com/jabranr/socialmedia/wiki/Facebook)) of the additional API that Socialmedia exposes in this case:

{% highlight javascript %}
facebook.AddToPage()
facebook.Invite(...)
facebook.Share(...)
facebook.ShareOpenGraph(...)
facebook.Send(...)
facebook.Pay(...)
facebook.Feed(...)
{% endhighlight %}

### Examples:

This website already uses Socialmedia therefore I can just go ahead and setup some live examples right here. Here are two examples to demonstrate the convenience of Socialmedia:

##### Example 1:

- Following button lets you invite your Facebook friends to read this article&mdash;provided your are already logged into Facebook otherwise it will ask you to login first.

<button class="btn btn-sm btn-primary" type="button" id="inviteFriends">Invite friends to read article</button>

The code used for this example is as following:

{% highlight html %}
<button class="btn btn-sm btn-primary" type="button" id="inviteFriends">Invite friends to read article</button>

<script type="text/javascript">
	var inviteFriends = document.querySelector('#inviteFriends');
	if ( inviteFriends ) {
		inviteFriends.addEventListener('click', function(e){
			facebook.Invite({
				title: 'Invited friends to read this article',
				message: document.title
			});
		}, false);
	}
</script>

{% endhighlight %}

##### Example 2:

- Following button will get your Facebook basic information and display underneath&mdash;provided you are logged into Facebook already and given permissions (upon request) otherwise it will ask you to login first and to allow this app to get data from Facebook on your behalf.

<button class="btn btn-sm btn-primary" type="button" id="getInfo">Get basic info from Facebook</button>

<textarea name="infoBox" id="infoBox" class="form-control" rows="5" style="resize: none;" placeholder="Info will appear here" disabled></textarea>

> None of your information is collected or saved. All requests and responses are live. However, you will NOT be asked for data permissions by Facebook again after you have allowed it once already. If you need to remove the app permissions then you will need to manually remove the app from your [Facebook app settings](https://facebook.com/settings?tab=applications).

The code used for this example is as following:

{% highlight html %}
<button class="btn btn-sm btn-primary" type="button" id="getInfo">Get basic info from Facebook</button>
<textarea name="infoBox" id="infoBox" class="form-control" rows="5" style="resize: none;" placeholder="Info will appear here" disabled></textarea>

<script>
	var getInfo = document.querySelector('#getInfo');

	if ( getInfo ) {
		getInfo.addEventListener('click', function(e){
			FB.getLoginStatus(function(response)	{
				if ( response && response.status === 'connected' ) {
					FB.api('/me', getUserInfo);
					getInfo.style.display = 'none';
				}
				else {
					FB.login(function(response)	{
						if ( response && response.status === 'connected' ) {
							FB.api('/me', getUserInfo);
							getInfo.style.display = 'none';
						}
					});
				}
			});
		}, false);

		function getUserInfo(info) {
			var infoBox = document.querySelector('#infoBox');
			infoBox.innerHTML = JSON.stringify(info, null, 2);
		}
	}
</script>

{% endhighlight %}

<script src="{{ '/vendors/socialmedia/dist/socialmedia.min.js' | prepend: site.baseurl }}">
<script type="text/javascript">
	window.jabranr = window.jabranr || {};

	jabranr.facebook = new Socialmedia.Facebook({
		appid: '{{ site.facebook.app_id }}'
	});

	var inviteFriends = document.querySelector('#inviteFriends');
	var getInfo = document.querySelector('#getInfo');
	if ( inviteFriends ) {
		inviteFriends.addEventListener('click', function(e){
			jabranr.facebook.Invite({
				title: 'Invited friends to read this article',
				message: document.title
			});
		}, false);
	}

	if ( getInfo ) {
		getInfo.addEventListener('click', function(e){
			FB.getLoginStatus(function(response)	{
				if ( response && response.status === 'connected' ) {
					FB.api('/me', getUserInfo);
					getInfo.style.display = 'none';
				}
				else {
					FB.login(function(response)	{
						if ( response && response.status === 'connected' ) {
							FB.api('/me', getUserInfo);
							getInfo.style.display = 'none';
						}
					});
				}
			});
		}, false);

		function getUserInfo(info) {
			var infoBox = document.querySelector('#infoBox');
			infoBox.innerHTML = JSON.stringify(info, null, 2);
		}
	}
</script>

Socialmedia works similarly for other supported social media platforms too. Here is quick overview through all these.

## Twitter SDK

For Twitter, it would be as following and few of the API methods ([complete API reference](https://github.com/jabranr/socialmedia/wiki/Twitter)):

{% highlight html %}

<script src="path/to/socialmedia.min.js" type="text/javascript"></script>
<script>
	var twitter = new Socialmedia.Twitter();
</script>

// Exposes following API to use with Twitter SDK:
twitter.Tweet()
twitter.Hashtag()
twitter.Mention()
{% endhighlight %}

## Google+ SDK

For Google+, it would be as following and few of the API methods ([complete API reference](https://github.com/jabranr/socialmedia/wiki/Google-Plus)):

{% highlight html %}

<script src="path/to/socialmedia.min.js" type="text/javascript"></script>
<script>
	var gplus = new Socialmedia.GooglePlus();
</script>

// Exposes following API to use with Google+ SDK:
gplus.Share()
{% endhighlight %}

## Pinterest SDK

For Pinterest, it would be as following and few of the API methods ([complete API reference](https://github.com/jabranr/socialmedia/wiki/Pinterest)):

{% highlight html %}

<script src="path/to/socialmedia.min.js" type="text/javascript"></script>
<script>
	var pinterest = new Socialmedia.Pinterest();
</script>

// Exposes following API to use withPinterest SDK:
pinterest.Pinit()
{% endhighlight %}

Socialmedia is very stable for the purposes it is built – all thanks to it's Test Driven Development (TDD) – yet it's intensive use in basic to complex (in production) projects has further strengthened its stability.

During these risky steps, I have seen it failed at various points that I might not had even thought of. It was great because it's every failure helped me learn new things and made sure of it's further stability. Some users may still come across any [bugs or failing points](https://github.com/jabranr/socialmedia/issues) and I [look forward](https://github.com/jabranr/socialmedia/wiki/Contribute) to those and their potential solutions. After all that is the whole point of open-source—collaboration!

Socialmedia has a [comprehensive documentation](https://github.com/jabranr/socialmedia/wiki) in a wiki format that covers everything in complete details from [installation](https://github.com/jabranr/socialmedia/wiki/Installation), [setup](https://github.com/jabranr/socialmedia/wiki/Setup) to [API reference](https://github.com/jabranr/socialmedia/wiki/API-Reference). Again, the whole point of having the documentation in a wiki format is to make it available for easy collaboration.

So, what are you going to build?
