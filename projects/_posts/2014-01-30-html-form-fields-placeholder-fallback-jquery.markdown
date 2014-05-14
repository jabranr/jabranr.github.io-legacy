---
layout: project
title: 'jQuery form fields placeholder fallback support'
date:   2014-01-30 08:00:00
categories: projects
client: "Personal"
excerpt: 'HTML Form fields placeholder fallback with jQuery'
code: https://github.com/jabranr/jquery.placeholderfallback.js
private: false
stage: stable
version: 1.0.0
---

HTML Form fields placeholders can be very useful in terms of providing accessibility as well as saving space on field labels. Unfortunately not all browsers support it &ndash; especially when providing a support for user coming from older versions of Microsoft Internet Explorer. To tackle this issue and automate the support, I created this small jQuery plugin that takes care of placeholders for form fields in incompatible browsers.

To use the plugin, simple follow the steps in following example.

* Add reference to `jQuery` and plugin files In `head` section of HTML document.

`<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>`

`<script src="src/jquery.placeholderfallback.js"></script>`

* Then call the `placeholderfallback()` plugin for form fields where falback support is required. You can link the form fields using any usual element identity attribute such as `id`, `class` or element itself.

`$('#firstNameField').placeholderfallback();`

`$('.first-name-field').placeholderfallback();`

`$('input[type=text]').placeholderfallback();`

Latter will provide fallback support to all `input` fields with `text` attribute. However, if you need to call the fallback support for multiple elements then you can pass multiple `id` and/or `class` like so.

`$('#firstNameField, #lastNameField, #emailField').placeholderfallback();`

Here is detailed example use:

``` html
<form>
    <input type="text" id="firstNameField" placeholder="First Name">
    <input type="text" id="lastNameField" placeholder="Last Name">
    <input type="email" id="emailField" placeholder="Email address">
</form>

<!--[if lt IE 10]>
    <script>
        (function() {
            $('#firstNameField, #lastNameField, #emailField').placeholderfallback();
        })();
    </script>
<![endif]-->

```

Finally, in this detailed example, we have wrapped the plugin call between [Internet Explorer conditional tags](http://msdn.microsoft.com/en-gb/library/ms537512\(v=vs.85\).aspx) so it only works when it actually is required. 