---
layout: project
title: PHP library for Twitter API v1.1
date: 2013-10-09 08:00:00
categories: projects
excerpt: >
  PHP wrapper to fetch Tweets from Twitter API. This project has been deprecated and no longer maintained.
code: https://github.com/jabranr/twitter-api-v1.1
private: false
thumbnail:
featured:
---

> This project is deprecated and no more maintained.

Please use the new improved version of this project named as “Fetchwitter” and available at [https://github.com/jabranr/fetchwitter](https://github.com/jabranr/fetchwitter)

---

### How to use / How it works

#### Step 1: Create an application

First of you will need to register/login at [https://dev.twitter.com/apps](https://dev.twitter.com/apps) and create a new application. Fill out the required fields and it will generate the required credentials for you. The only credentials you need are `consumer key` and `consumer secret`.

#### Step 2: Exchange credentials for access token

Now you need to make a POST request to API’s oAuth endpoint to exchange above-mentioned credentials for an `access token`. The request made at this stage requires `Authorization headers`. This will result in a response with app level `bearer access token`. You might want to save/cache the acquired `access token` instead of making a request each time.

#### Step 3: Make request to get the required feed

Now that you have the `access token`, you can make requests to Twitter API endpoint and receive data in response. The request made at this stage also requires inclusion of `Authorization headers`.

Now since all these results are returned in plain text and so are the links, hashtags and mentions in the tweets. This issue can easily be solved by using `regex match and replace` methods, that is available in this example as `text2tweet()` function.

### License

Project is available under [MIT License](http://opensource.org/licenses/MIT)
