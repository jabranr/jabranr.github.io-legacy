---
layout: post
title: 'Using Special Integers with Bitwise Operators for PHP RBAC'
date: 2013-10-11 07:00:00
categories: blog
tags: 'Binary, Bitwise Operators, CMS, GitHub, PHP, RBAC, Role-Based Access Control'
excerpt: 'Ever wondered how different type of roles and permissions in a system are handled? Well, using bitwise operators can be one method of it. But this article is more about getting a list of required integers that would make Bitwise operator work properly.'
permalink: using-special-integers-with-bitwise-operators-for-php-rbac
private: false
---

Recently, while working on a project that incorporates a custom Content Management System (CMS), I came across building the complex system of [Role-Based Access Control (RBAC)](http://en.wikipedia.org/wiki/RBAC). The core base of these Roles were the permissions of various types i.e. create, modify, remove, read-only etc.

The very first method that came to my mind to build this system was from a book I read a couple of years ago titled as [PHP and MySQL Create Modify Reuse](http://www.wrox.com/WileyCDA/WroxTitle/productCd-0470192429.html) published by Wrox Press. This method included the clever use of [Bitwise Operations](http://en.wikipedia.org/wiki/Bitwise_operation) to assign one or more permissions to a Role. This was probably the first time when I was interested in Binary system of computing.

Since I had more than 12 types of permissions to assign to various Roles, I thought it would be useful to have a list of special integers in hand. So I made following small PHP function and ran it through browser to get the list of special integers.

{% highlight php %}
/**
 * Converts the integer to binary and outputs list of integers that are power of 2
 * @param: Integer
 * @return: String
 */

function get_special_binary( $decimal ) {
  $binaries = '';
  for ( $i = 1; $i < $decimal; $i++ ) {
  	$special_num = pow(2, $i);
  	$value = str_pad(base_convert($special_num, 10, 2), 8, '0', STR_PAD_LEFT);
	$binaries .= $special_num . " = " . substr($value, 0, 4) . " " . substr($value, 4) . '<br>';
  }
  return $binaries;
}
{% endhighlight %}

I thought it might also be helpful for anyone else so I have put it on [Github Gist](https://gist.github.com/jabranr/7406258). Please feel free to use it to do wonders.

### So What Exactly are Special Integers?

Special integers are special in way because they are power of 2 i.e. `2, 4, 8, 16` and so on. These special integers return amazing outcome due to their Binary structure when they are used with Bitwise operators. By analysing the following list of integers you can see that these integers (1, 2, 4, 8, 16) have only one digit “1” in their structure when converted to Binary.

```
 1 – 0000 0001
 2 – 0000 0010
 3 – 0000 0011
 4 – 0000 0100
 5 – 0000 0101
 6 – 0000 0110
 7 – 0000 0111
 8 – 0000 1000
 9 – 0000 1001
10 – 0000 1010
11 – 0000 1011
12 – 0000 1100
13 – 0000 1101
14 – 0000 1110
15 – 0000 1111
16 – 0001 0000
```
So basically when used with Bitwise AND and OR operators, they provide very unique results. For example:

```
0000 0001 — 1 
AND
0000 0010 — 2

results

0000 0000 = 0
```

while:

```
0000 0001 — 1
OR
0000 0010 — 2

results

0000 0011 = 3
```

Pretty interesting! Hope this was informative. Happy programming!