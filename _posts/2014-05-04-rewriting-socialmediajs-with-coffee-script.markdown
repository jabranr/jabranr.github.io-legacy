---
layout: post
title: 'Rewriting Socialmedia.js with CoffeeScript'
date: 2014-05-04 07:00:00
categories: blog
tags: 'Social media, Facebook, Twitter, Google+, Pinterest'
excerpt: 'custom excerpt goes here...'
permalink: 
private: true
---

Socialmedia.js enables JavaScript SDKs and associated social media functions in web pages and apps. This library helps to replace the tedious routine of retrieving the SDK codes from developers sections, read the instructions and then having same block of code in each page of your website. The simple methods to initialize Socialmedia.js library give you complete control over what particular social media service you want to use but also ends the worries of having the SDK code duplicated in your pages which may result in unexpected errors.

From version 1.4.1, the library is rewritten completely from scratch. I also went on learning [CoffeeScript](http://coffeescript.org) for first time while rewriting the library and experience was awesome. The complete base code for the library is available at Github that also includes the development part in both CoffeeScript and JavaScript. If you may find any inconsistencies, errors or bugs – you can report them in [repo’s issues](https://github.com/jabranr/socialmedia.js/issues). If you would like to take part in development then please use the usual Github fork and pull request methods.

I have written a [detailed documentation](https://git.io/socialmedia.js#documentation) on how to use the library and its methods associated with different social media services. To give you an idea on how easy it is to use – here is an example of using Google+ Share function.


Initialize the Google+ class and create a new instance.

`var gplus = new Socialmedia.GooglePlus();`

Let’s bind the `Google+ Share` action to a button’s click event.

```
var gplusButton = document.querySelector('.google-plus-button');
gplusButton.addEventListener('click', function(event) {
	event.preventDefault();
	gplus.Share({
		link: 'http://example.com',
		lang: 'ur'
	});
}, false);
```

The `link` parameter takes in any link you like to share and `lang` parameter sets the Google+ interface language. If you do not provide any parameters then default value for `link` would be current page URL and for `lang` it would be `en` (English). Since this action is now bound with button click event, this will trigger a Google+ Share dialog with relevant data. That’s all it takes to setup the Google+ Share function.

<img src="/img/google-plus-share-dialog-example.png" alt="" class="img-responsive">
<p class="help-block">An example of Google+ Share dialog on action call</p>