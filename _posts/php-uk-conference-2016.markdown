At [Rated People](http://ratedpeople.com), our front-end code base consists of few different technologies where PHP plays a major role. Therefore it makes sense for the front-end team to attend the relevant events regularly and they had been. Since I am fairly new to the team, I joined them this year for the first time to attend two days long [PHP Conference in London](http://phpconference.co.uk).

The event held at [The Brewery](http://thebrewery.co.uk). Being about 20 minutes late due to delayed train I arrived into opening keynote by Kayla Daniels titled "The Code Menifesto". She gave a powerful speech in regards to gender diversity in development world. In fact her speech may very well apply everywhere as she told stories from her experiences as developer, parent and job hunter. The sum up of her talk was to offer equal opportunities to everyone regardless of their gender, color and literally anything, and not to discriminate anyone base on judgment that evolves from different social norms that exist in one or other way in every society. She suggested that everyone should show their support by signing the [Code Menifesto](http://codemanifesto.com) that outlines these issues as well as potential solutions.

Now rest of the day had 5 sessions in total followed by closing keynote by Jordi Boggiano. These 5 sessions were 1 hour long and each of them had 3 different talks going on at the same time. This was a bit of sad situation for those wanted to be in two different talks happening at the same time.

Anyhow, I started with attending the talk by Lorna Jane Mitchell about "What to Expect from PHP 7". Lorna gave great insights into new features in PHP 7 such as typehinting for more data types, methods and new ways of handling the fatal, type and parse errors using special exceptions emerging as subclasses of Throwable. The most interesting one was the new tenrary operator. As of PHP 5, we have following way of using the tenrary operator:

*PHP 5:*
```
$foo = $bar ? $bar : 'bar';
# OR
$foo = $bar ?: 'bar';
```

In above example, it checks for value of `$bar` variable and if there is some then it is supposed to return it or return a string `bar`. In fact, above example will return an error about undefined `$bar` variable as we did not use `isset()` method.

Enter `??` into ternary operator in PHP 7 and this changes everything. It automatically checks for variable definition and return data accordingly. As in following example, it will return string `bar` as variable `$bar` was defined.

*PHP 7:*
```
$foo = $bar ?? $bar ?? 'bar';
```

The next talk was by Jakub Zalas titled "Eating spaghetti with Symfony". The talk was all about how for years PHP development had been making use of spaghetti code. This legacy code needs to be migrated to modern structured shape but without breaking anything. Jakub iterated with examples of tiny changes in legacy code making big difference one line at a time by incorporating the Symfony components. These steps involved keeping the platform healthy while migrating to modern code base. It was a wonderful talk to be in.

Next {Bastian} demonstrated the use of Phake library. Phake is a mock library to use in Unit testing. Based on similar techniques as PHPUnit's mock testing suite but more convenient to use. Phake provides a great API for Unit testing where tests can be ordered, verified, asserted and much more.

During next talk, we learned about building and maintaining cloud type of service for a project. {Hofmann} explained how they deal with bunch of various languages, technologies that make up their network of hundards of servers. He explained how they manage the deployment process by keeping it automated.

Last talk of the day was about use of Docker for PHP apps. Possibly one of the most busiest talk of the day, attendees learned about installing, setting up and using the Docker for PHP apps.

The closing keynote by Jordi about "Behind the scenes of maintaining Open Source project" covered the issues that OSS developers/maintainers have to face. This included criticism, abuses, appreciations and unexpected requests that just contribute to waste of time.

Overall it was a great day and I thoroughly enjoyed it.


> [PHP Conference UK &ndash; Day 2]({{ site.url }}/php-conference-uk-2016-day-2)























