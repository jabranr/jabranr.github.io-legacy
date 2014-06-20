---
layout: post
title: 'How Google Maps work?'
date: 2014-06-20 08:00:00
categories: articles
tags: 'Google, Maps, StreetView, Earth, Live satellite images'
excerpt: 'Informational article explaining Google mapping products and how they work. Also covers the relevant Google products who are directly or indirectly involved.'
permalink:
thumbnail: google-maps-logo.jpg
comment: true
private: false
---

Perhaps not as you might have been thinking. Few years ago, I amazed my father by showing sattelite images of our home using [Google Maps](https://maps.google.com). The very first question was – are these live real time images, showing current state of this place? The answer was obvisouly no but I did explain how it works so to feed their curiosity. Similarly, majority of people using such products always wonder how this all stuff actually works. There are many who will go ahead and make their own perceptions over such things – taking not enough explanations are out there.

This informational article is based on my experience with Google Mapping products for last ~5+ years and covers major points on how these things work. This is also in relations to recent [terrorists attack at Karachi airport](http://www.bbc.co.uk/news/world-asia-27758032) especially after what it seems to be some people sharing the [screenshots of sattelite images taken from Google Maps](https://twitter.com/jabranr/status/475750198036402176) thinking if they were live images. So let’s start with what are Google Maps &amp; Google Earth.

### Google Maps &amp; Google Earth

Google Maps is a free web based service with geographical information and can be accessed by variety of methods and devices. The most interesting part of it is it’s static true color sattelite images of [Earth](http://google.com/maps), [Moon](http://google.com/moon), [Sky](http://google.com/sky) and [Mars](http://google.com/mars), interactive 360&deg; panoramas of Earth ([StreetView](http://google.com/maps/views)) and so on. Google Maps is also [available for mobile devices](https://www.google.com/mobile/maps/) – as well as in form of installable software known as [Google Earth](http://earth.google.com). There is also another platform called [Google Map Maker](http://mapmaker.google.com) where anyone can register to contribute to add or update the map data. Nevertheless, all these products are linked to each other in one or more ways.

### How Google gets sattelite images?

The sattelite images on these products actually are not captured by Google itself (mostly) but partners who own commercial sattelites. Some of the famous satellite images providers are [DigitalGlobe](http://digitalglobe.com), GeoEye (part of DigitalGlobe now), [NASA](http://earthobservatory.nasa.gov) and so on. The list is huge and for every satellite image it is always credited in bottom right copyright information on Google Maps.

These images are taken from time to time, analyzed, processed and then made available to the products. Some of the possible important things to consider here are:

+ bright sun light
+ no clouds
+ no long shadows
+ less traffic on roads
+ less human activity on streets
+ less air traffic activity

and list probably continues. For example, you will also note that images in Google StreetView are mostly taken on a weekend or at time of the day with less activities as you can see most businesses are shut normally. *hint*

> There are no live sattelite images on Google mapping products – at least not yet! 

There are no specific times to capture the sattelite images. Actually satellites are taking pictures continuously but not all of them are usable for that matter. Normally satellite images on Google products can be as old as 6-7 years old or fresh like 1 week old – depending on situations.

Whenever Google updates its imagery, it updates it on [Google LatLng Blog](http://google-latlong.blogspot.com). Google also provides a [Google Earth file](http://mw1.google.com/mw-earth-vectordb/Imagery_Updates/imagery_updates.kml) that contains all places with updated imagery marked with red rectangles<sup>1</sup>. Normally, such an update only appears in Google Earth initially and then eventually it is synchronized to Google Maps, Google Maps Mobile and Google Map Maker.

### How Google Earth is different?

Google Earth on other hand is an extended version of Google Maps in a software form that can only be explored in sattelite or hybrid mode. It also includes layers from various sources including Google itself as well as a [community layer](https://productforums.google.com/forum/#!forum/gec) where anyone can publish their contributions. However these contributions do not become a part of Google data layers in mapping products unlike contributions coming from Google Map Maker (detailed explanation below). Google Earth also provides ability to create custom layers, maps, tours and much more.

### What is Google StreetView?

StreetView is basically street level 360&deg; panoramas stitched together. Google uses [cars, trekkers, trolleys, snowmobiles and trikes](http://www.google.co.uk/intl/en-GB/maps/about/behind-the-scenes/streetview/#devices) to captures these images. Originally it started from streets (hence the product name) but it is not limited to streets only any more as Google StreetView goes [under oceans](https://www.google.com/maps/views/streetview/oceans), [inside museums & historical landmarks](https://www.google.com/maps/views/streetview/art-project), ski resorts and much more.

People can also [create their own StreetViews using a camera](http://google-latlong.blogspot.com/2013/12/create-your-own-street-view.html?m=1) and submit to [Google Maps Views](https://google.com/maps/views) gallery from where it eventually appears in Google Maps as part of [StreetView coverage layer](http://www.google.co.uk/intl/en-GB/maps/about/behind-the-scenes/streetview/#where). 

### How Google Maps gets traffic information?

Probably one of the most useful features is up-to-dated traffic situation. Traffic data comes through [Google Transit](http://maps.google.co.uk/intl/en/landing/transit/) a separate product to Google Maps where all this data is provided by third parties. Mostly these sources are local transport agencies or government departments who provide information in specific formats to Google. Like StreetView, traffic data is also available in certain countries only.

### Where does all map data comes from?

Google has a huge list of data providers from each country that includes partners such as local government departments and companies like Yellow Pages etc. However, for a part of world it was still very difficult to get such data especially countries with certain restrictions and limitations on providing public data.

Since 2008 Google started sourcing data for such destinations from its product called Google Map Maker. Map Maker is a web based cartography platform where registered users can add, edit and in some cases remove data. Any kind of contribution is reviewed by other contributors acting as reviewers. Contributors also gain or loose trust levels based on their good or bad contributions.

This product saw a vast input from kind of destinations mentioned above. For example, whatever data you see for [Pakistan on Google Maps](https://maps.google.com?q=Pakistan) today, has come from [individuals' contributions at Google Map Maker](http://j.mp/pk-mappers) and there are [many many more examples](http://google-latlong.blogspot.com) like Pakistan.

Map data synchronization works opposite to how it is mentioned above for sattelite imagery. Reviewed and approved data from Google Map Maker goes to Google Maps, Google Maps Mobile and eventually to Google Earth.

> Others products that have indirect attachments to Google Maps are [Google Business](https://www.google.com/business/) (previously Places) and [Panoramio](http://www.panoramio.com/).


If you think that I have missed something in this article, let me know in comments below and I'll try to answer.

Enjoy beautiful universe!


<footer>

1. Latest satellite imagery update was on 27 February 2014. It seems that Google has not updated this file since then although satellite imagery have updated at various places in world since this update.
2. Google Maps Logo copyrights to Google Inc. All products mentioned in this article are registered tradmarks of Google. This article does not reflect Google viewpoints and support.

</footer>