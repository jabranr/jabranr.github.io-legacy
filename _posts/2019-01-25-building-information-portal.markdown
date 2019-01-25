---
layout: post
title: Building an information portal
date: 2019-01-25 01:00:00
categories: articles
tags: [pakistan, information, services, platform, portal]
excerpt: Everything about building an information portal, from need; to idea; to implementation.
permalink:
thumbnail:
comment: true
private: false
---

# Building an information platform

## Background

Since 2005, while living in the UK, I have accessed different government services online for various reasons. The overall experience of interacting with these platforms has improved significantly over the time. 

As one would imagine that all these services used to have their own and different platform, therefore the varied experience. Since then [Gov.UK](https://www.gov.uk) tried and have changed this whole game by bringing all these services to one platform with a unified user experience and easy access to information. It was a massive project and I have witnessed it from ground up as a user and a spectator. Neil Williams with his team has done an amazing job there.

My visits to Pakistan during all these years have broaden the gap in expectations for me when suddenly you come cross a completely different (though familiar for me) practices as consumer of government services. In recent years, this gap has left me bit frustrated and angry at times when I tried accessing these services with an expectations of ease as I would do in the UK. You hope that one day some revolution will just change the whole scene but it is not the reality. The improvement process especially in government sectors is painfully slow.

## The idea

So after having an experience of providing helpful resources to the public already – hint, hint – Google Maps, I thought it might be a good idea to build another useful resource. I worked along amazing [individuals and organisations](https://maps.googleblog.com/2009/10/featured-map-makers-faraz-jabran.html) during 2008 floods and then [Hunza landslide disaster](https://maps.googleblog.com/2010/06/map-makers-respond-to-pakistan.html). We had few data portals running since then on [local.com.pk](http://www.local.com.pk) but domain had been unmaintained for so many years. So I thought about making some good use of this domain and after a very useful discussion with my wife [Ruby](https://www.hennabyruby.com), we decided to make this information portal. We went through quite a few brainstorming sessions to settle on few things about it. The idea is straightforward. Simple, clean and blazing fast website with useful rich information about government services at one place. 

## Why another site?

Now, if you Google some information about Pakistan, you will definitely come across many sites that will serve you good enough information. So why another one of those? The takeaway is to provide easy and open access, no cluttered user interface or user experience with a hope that information will remain the most up-to-date but that's where everyone plays their role by contributing. You might think that government should do something like that but hey, let's hope, one day that might happen too.


## Tech / Architecture

The portal is build with [GatsbyJS](https://www.gatsbyjs.com). GatsbyJS is great development tool to build static pages that less often change. GatsbyJS can source data from variety of data stores which makes it even better. I chose [Markdown](https://guides.github.com/features/mastering-markdown/) for data storage which is as simple as a text file that anyone can write. Since whole point of project is to provide useful information to everyone, it is best that this project lives in open-source so that it can be maintained, sourced and discussed by everyone. 

Also I would like to keep application and data separate so that it does not become a giant monolithic application only to give management nightmare. The platform will be hosted on GitHub Pages obviously, therefore there is no scope of server-side or back-end in it. Also there would be no cost to maintain the project apart from domain registration (very low) and the priceless time given by all of us. That means no ads!

The development – which happens during my some free time – started around first week of October 2018 and now it is going through final touches. Content are now the main focus of the project. Therefore I have created some public resources to kickoff some discussions and hopefully some contributions. I have created an [organisation on GitHub](https://www.github.com/localpk) that has content repository with very basic data to start with. Other repositories will be populated with their respective resources with time. All repositories have a README that should explain everything about their structure with guidelines on how to contribute.

I have also created following channels including a Facebook Page and a Facebook Page Group for discussions and updates. There is also a Twitter account for updates.

* GitHub Organisation – [https://www.github.com/localpk](https://www.github.com/localpk)
* Facebook Page – [https://www.facebook.com/localpakistan](https://www.facebook.com/localpakistan)
* Facebook Page Group – [https://www.facebook.com/groups/643030409449705](https://www.facebook.com/groups/643030409449705)
* Twitter – [https://www.twitter.com/localcompk](https://www.twitter.com/localcompk)

> Once we have good basic set of content, we launch!
