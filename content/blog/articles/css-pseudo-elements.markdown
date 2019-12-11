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

```html
<div class="site">
  <ul class="site__nav">
    <li class="site__nav-item">Home</li>
    <li class="site__nav-item">Foo</li>
    <li class="site__nav-item">Bar</li>
    <li class="site__nav-item">Baz</li>
  </ul>
</div>
```

Here is the CSS that styles the above unordered list:

```css
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
```

Following CSS would add a bullet after each item as an `::after` pseudo element.

```css
.site__nav-item::after {
  position: absolute;
  display: inline-block;
  content: '\2022';
  color: #ddd;
  line-height: inherit;
  margin-left: 10px;
}
```

Now that bullet is added after each item in navigation, it looks a bit odd to have a bullet in front of last item. So we can remove it by following two methods:

#### By hiding it:

```css
.site__nav-item:last-child::after {
  display: none;
}
```

#### By setting empty content:

```css
.site__nav-item:last-child::after {
  content: ' ';
}
```

In both cases we have basically hid the element or it's content but the element itself still exists. Using `:not` CSS selector instead will not create the pseudo element in first place &ndash; eliminating the need of extra efforts to hide it. Here is an example using `:not` CSS selector:

```css
.site__nav-item:not(:last-child)::after {
  position: absolute;
  display: inline-block;
  content: '\2022';
  color: #ddd;
  line-height: inherit;
  margin-left: 10px;
}
```

I am not sure what impact it might have on performance as I have not tested it but nontheless it seems like a better option to go with.


