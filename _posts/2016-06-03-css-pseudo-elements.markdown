---
layout: post
title: 'CSS pseudo elements'
date: 2016-06-03 07:00:00
categories: articles
tags: [CSS, CSS3, pseudo elements]
excerpt: 'Comparing two different use cases for CSS pseudo elements'
permalink:
thumbnail:
comment: true
private: false
---

Recently while writing CSS for a site's navigation I needed to add separation between navigation items. Basically a bullet between each item of navigation. The most common method would be to use the CSS pseudo elements "after/before" for this so I went ahead and set it up. Here is the markup for navigation that is basically a simple unordered list:

{% highlight html %}
<div class="site">
  <ul class="site__nav">
    <li class="site__nav-item">Home</li>
    <li class="site__nav-item">Foo</li>
    <li class="site__nav-item">Bar</li>
    <li class="site__nav-item">Baz</li>
  </ul>
</div>
{% endhighlight %}

Here is the CSS that styles the above unordered list:

{% highlight css %}
.site__nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.site__nav-item {
  display: inline-block;
  position: relative;
  margin-left: 10px;
}
{% endhighlight %}

Following CSS would add a bullet after each item as an `::after` pseudo element.

{% highlight css %}
.site__nav-item::after {
  position: absolute;
  display: inline-block;
  content: '\2022';
  color: #ddd;
  line-height: inherit;
  margin-left: 10px;
}
{% endhighlight %}

Now that bullet is added after each item in navigation, it looks a bit odd to have a bullet in front of last item. So we can remove it by following two methods:

#### By hiding it:

{% highlight css %}
.site__nav-item:last-child::after {
  display: none;
}
{% endhighlight %}

#### By setting empty content:

{% highlight css %}
.site__nav-item:last-child::after {
  content: ' ';
}
{% endhighlight %}

