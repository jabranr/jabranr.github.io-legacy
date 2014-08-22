---
layout: post
title: 'Consuming multiple APIs asynchronously'
date: 2014-08-21 08:00:00
categories: articles
tags: 'Facebook, Graph, API, Google Maps, JavaScript, Asynchorounus, callback'
excerpt: 'Consuming multiple APIs parallel to each other can be very tricky. Here is a detailed case study to chain multiple APIs with each other using JavaScript’s asynchronous approach.'
permalink:
thumbnail: usa-outdoors-adventure.jpg
comment: false
private: true
---

Recently, I worked on few Facebook apps that utilized multiple Application Programming Interfaces (APIs) in addition to default [Facebook Graph API](https://developers.facebook.com/docs/graph-api/). Applications normally use provided Software Development Kits (SDKs) to consume an API. At front-end development, majority of developers, prefer to use JavaScript SDKs for such a purpose. Consuming multiple APIs can be tricky in single app sometime&mdash;especially when using their JavaScript SDKs.

There can be multiple reasons behind this tricky behaviour but an obvious one is not able to calculate the load time of an SDK. It can vary from app to app and even from page to page. Therefore, loading multiple SDKs and parallel consumption of their associated APIs, can lead to unexpected responses. For Facebook Graph API, most common examples are [early call warnings for FB methods](http://stackoverflow.com/search?q=fb.getloginstatus+called+before+fb.init).

> In an ideal world of APIs, their JavaScript SDKs will be loaded asynchronously &ndash; for almost 99.9% of the time &ndash; to make sure the priority loading of the app and a valid response is returned for any calls made to API.

[USA Outdoors Adventure](http://j.mp/1ohip3T) app recognises its users by using Facebook Graph API and then loads their up-to-date status by consuming Graph, Google Maps and its own Outdoors Adventure (OA) API. The process flow is as following:

* Check user status (Graph API)
* Confirm user registration (OA API)
* Check user status and get user data (OA API)
* Load user status (Google Maps API)

To stick with this cascading flow, API calls need to be chained accordingly to avoid errors, unexpected results or early call warnings. So APIs call flow goes as following:

* Call Graph API
* Call OA API as a callback to Graph API
* Call Google Maps API as a callback to OA API
* Setup front-end using final data in hand

Here I will go through all these steps explaining how it works best by chaining calls for multiple APIs. <sup>1</sup>

## Facebook Graph API

This app uses Facebook user ID in order to identify and keep track of user progress. Facebook JavaScript SDK has built-in methods of returning asynchronous calls that can defer custom steps until SDKs are fully loaded so the relevant functions are available to the app. Here is quick overview with default Facebook SDK initialization code:

``` javascript
window.fbAsyncInit = function() {
	FB.init({
		appId   : '1234567890',
		xfbml   : true,
		version : 'v2.0'
	});

	// Callback function goes here
	FB.getLoginStatus(myCallbackFunc);
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
```
Passing a custom function `myCallbackFunc` in `FB.getLoginStatus(...)` here, will have a deferred execution and will be served as callback. Now depending on your workflow, that may or may not be an optimal solution so I have a better solution by using [Socialmedia.js](http://jabran.me/projects/socialmedia-js). Making an exact similar call with `Socialmedia.js` could not be anymore simpler:

``` javascript
var myFbApp = new Socialmedia.Facebook({
  appid: '12345678',
  callback: myCallbackFunc
});
```
## Outdoors Adventure (OA) API

Now that we have Facebook SDK ready to use as well as user status from Graph API. We can use user status to determine if user is connected to the app as yet so we can make use of OA API for user registration or status and progress.

Since [jQuery](http://jquery.org) is default part of our Facebook app templates, a simple `jQuery.getJSON` call grabs user data from OA API. But first, we want user to authenticate the app by giving appropriate permissions so we know who this user is. Here is the breakdown of complete scenario:

``` javascript
function myCallbackFunc(response) {
	if ( isConnectedUser(response) ) {
		
		FB.api('/me', function(info)  {
			
			return
				$.getJSON('/api/user?uid=info.id&token=secretToken')
	
					.done(loadGoogleMapsFunc),
	
					.fail(function(jqxhr, textStatus, error)  {
						// handle failures/errors here
					});

		});

	}
	else {
		FB.login(myCallbackFunc, { scope: 'email' });
	}
}

function isConnectedUser(response) {
	return (response && response.status && response.status === 'connected') ? true : false;
}
```

## Google Maps API

Now that we have the user identity, status and progress data in JSON format, we can utilize this information for a personalised Google Maps layout. Here is the breakdown to load Google Maps functions.

``` javascript
function loadGoogleMapsFunc(json) {
	var map = null, 
	mapOptions = {
		center: new google.maps.LatLng(35.589439, -106.387605),
		zoom: 9,
		disableDefaultUI: false
	};

	map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

	/**
	 * Using built-in event listener of Google Maps API, we can 
	 * defer loading the data on map until map is fully loaded,
	 */

	google.maps.event.addListenerOnce(map, 'tiles_loaded', function() {
		return setupLocationData(map, json);
	}

}
```

Google Maps is loaded now and ready to use. It is time to load user data to display on map. Here we go:

``` javascript
function setupLocationData(map, json) {
	for ( var i=0; i < json.length; i++ ) {
		var info = json[i];
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(info.lat, info.lng),
			id: info.id,
			info: info,
			map: map
		});
	}
}
```

This process goes on as we add more and more interactivity into this. We can also display a loading status or animated progress cricle between calls so to provide a better user experience and so on.

So go ahead and [try<sup>2</sup> the USA Outdoors Adventure app](http://j.mp/1oVh3SD). Your feedback or any questions are always welcome!


<footer>

1. [Require.js](http://requirejs.org) can also be used to manage chained calls between multiple libraries.
2. Eligibility to enter into competition is explained in app terms.

</footer>
