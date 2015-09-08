---
layout: post
title: Test your geo skills with Guess Where? app
date: 2015-09-07 8:00:00
categories: articles
tags: [Google Maps, Mapping, Geography, Quiz, Education, World Capitals]
excerpt: 'Test your geo skills with Guess Where? app. Guess name of the unmarked capital from given options. You can also choose a region or play quiz for whole world.'
permalink:
thumbnail: guess_where_quiz_app.png
comment: true
private: false
---

A week ago I came across an interesting [geo quiz by The Independent](http://www.telegraph.co.uk/travel/citybreaks/11825481/Quiz-Can-you-identify-these-cities.html). The quiz that used 15 static unmarked map views of famous capitals from around the world - requires you to guess the name of those capitals - ultimately challenging your geographical skills. Despite being maps enthusiast, I could only guess 6 correctly out of 15. I would blame it on playing it straight after waking up in the morning.

Nevertheless, I immediately thought, how great it would be to have a live, interactive and dynamic version of it. Well, I also thought why not build it. So here it is at [http://jabran.me/guess-where/](http://jabran.me/guess-where/) Go ahead and give it a go!

### Technical side:
The app is based on following technologies:

* FontAwesome - for awesome font based icons
* Bootstrap - for overall styling
* JavaScript - for general purpose and interactions
* Google Maps API - for wonderful enriched dynamic maps
* jQuery - for DOM manipulation

To keep the development, deployment and maintenance at ease, I have also incorporated following technologies:

* Git - for version control
* Github - for convenient collaboration and hosting
* Sass - for customizing the Bootstrap Sass and custom CSS
* Bower - for front-end resource management
* Grunt/NPM - for automatic workflow, builds and deployment

Well, that looks like a long list and probably an overkill for a one page app but it is pretty much a default setup I would use for any such app.

### Collaboration:
The code of app is open source and [available at Github](https://github.com/jabranr/guess-where/) to fork, collaborate or just view under MIT license. You will need followings pre-installed to get going with it:

* Node
* Sass
* Grunt
* Bower

Fork the repository using `git clone https://github.com/jabranr/guess-where.git`. Once ready, use `grunt` for development workflow and `grunt build` for production build. If you have something to fix or add, then please do not make a production build but open a pull request with only development changes.

Happy guessing!
