---
layout: post
title: 'Using DRY concept in Symfony2 Entities'
date: 2016-07-25 07:00:00
categories: articles
tags: [Symfony, Symfon2, Doctrine, ORM, Entities, HasLifecycleCallbacks]
excerpt: 'This is an effort to make Symfony2 workflow (bit more) DRY where Entities are mapped with Doctrine ORM.'
permalink:
thumbnail:
comment: true
private: false
---

<p class="lead">This is an effort to make Symfony2 workflow (bit more) DRY where Entities are mapped with Doctrine ORM.</p>

Such mapped entities sometime share same attributes between them i.e. id, timestamps etc. In order to make it DRY, we can create a base entity and then every new entity can extend it to share the attributes. Let's start from beginning.

Assuming we have two Entities named User and Address. They are structured as following:

{% highlight php %}
<?php namespace Foo\Bar\Entity;
  
  use Doctrine\ORM\Mapping as ORM;
  
  /**
   * @ORM\Entity
   * @ORM\Table(name="app_user")
   */
  class User {
    
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
    /**
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;
    
    /**
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;
        
    /**
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;
    
    /**
     * @ORM\Column(name="updatedAt", type="datetime")
     */
    private $updatedAt;

    ...
    // getter setters
  }
{% endhighlight %}

> An Entity is a simple PHP class.

{% highlight php %}
<?php namespace Foo\Bar\Entity;
  
  use Doctrine\ORM\Mapping as ORM;
  
  /**
   * @ORM\Entity
   * @ORM\Table(name="app_address")
   */
  class Address {
    
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
    /**
     * @ORM\Column(name="property", type="string", length=255)
     */
    private $property;
    
    /**
     * @ORM\Column(name="street", type="string", length=255)
     */
    private $street;
        
    /**
     * @ORM\Column(name="town", type="string", length=255)
     */
    private $town;
        
    /**
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;
    
    /**
     * @ORM\Column(name="updatedAt", type="datetime")
     */
    private $updatedAt;

    ...
    // getter setters
  }
{% endhighlight %}

As you can see that we have `id`, `createdAt` and `updatedAt` attributes that are being shared in both entities. To implement a DRY concept here we need a new base entity which can have the shared attributes and can be extended by any other entities. 

Let's create a base entity by moving the shared values to a new Entity called `BaseEntity`.

{% highlight php %}
<?php namespace Foo\Bar\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\MappedSuperclass
 */
class BaseEntity {

    /**
     * @ORM\Id
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */
    private $updatedAt;
    
    ...
    // getters setters
{% endhighlight %}

Note a new annotation `@ORM\MappedSuperclass` at top of the `BaseEntity` that makes sure that attributes in this entity are properly extended into those extending it. Now we can remove these attributes from `User` and `Address` entities and extend the `BaseEntity` class into these. Our entities are already started to look cleaner.

{% highlight php %}
<?php namespace Foo\Bar\Entity;
  
  use Doctrine\ORM\Mapping as ORM;
  
  /**
   * @ORM\Entity
   * @ORM\Table(name="app_user")
   */
  class User extends BaseEntity {
    
    /**
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;
    
    /**
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    ...
    // getter setters
  }
{% endhighlight %}

{% highlight php %}
<?php namespace Foo\Bar\Entity;
  
  use Doctrine\ORM\Mapping as ORM;
  
  /**
   * @ORM\Entity
   * @ORM\Table(name="app_address")
   */
  class Address extends BaseEntity {
    
    /**
     * @ORM\Column(name="property", type="string", length=255)
     */
    private $property;
    
    /**
     * @ORM\Column(name="street", type="string", length=255)
     */
    private $street;
        
    /**
     * @ORM\Column(name="town", type="string", length=255)
     */
    private $town;

    ...
    // getter setters
  }
{% endhighlight %}

Now since we have some shared attributes in one entity, we can add further enhancements to it as required. Let's make sure that both timestamps `createdAt` and `updatedAt` are properly and automatically set before we persist or update the records to our database. For that we will use `@ORM\PrePersist` and `@ORM\PreUpdate` annotations in custom methods. We also need an additional annotation `@ORM\HasLifecycleCallbacks` at class root.

{% highlight php %}
<?php namespace Foo\Bar\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\HasLifecycleCallbacks
 * @ORM\MappedSuperclass
 */
class BaseEntity {
    ...

    /**
     * @ORM\PrePersist
     */
    public function setTimestamps() {
      $this->createdAt = new \DateTime();
      $this->updatedAt = new \DateTime();
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdatedTimestamp() {
      $this->updatedAt = new \DateTime();
    }

    ...
{% endhighlight %}

Now we have two additional custom methods, `setTimestamps` and `setUpdatedTimestamp`. The names for these methods do not really matter so we can name those as we want. First method sets the values for `createdAt` and `updatedAt` attributes just before we persist a new record to database. We set the values as `DateTime` object and Symfony2/Doctrine will automatically convert those to required format for database entry. Second method only updates the `updatedAt` value when a record in database is updated.

Now we can simply extend the `BaseEntity` to any entity and need not worry about generating a primary key attribute (`id`) and timestamps.

We can have as many as enhancement we like to the `BaseEntity` and those will be automatically extended to sub-entities. For example we can have a `save` method to persist the record by keeping all logic in `BaseEntity` instead of a controller. In current situation if we are creating a user we will use following steps inside a controller:

{% highlight php %}
<?php
  ...

  $user = new User();
  $user->setName('Foo');
  $user->setEmail('foo@bar.co');

  $em = $this->getDoctrine()->getEntityManager();
  $em->persist($user);
  $em->flush();

  ...
{% endhighlight %}

By adding following helper method into our `BaseEntity` we can shorten it from 3 lines to 1.:

{% highlight php %}
<?php namespace Foo\Bar\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\HasLifecycleCallbacks
 * @ORM\MappedSuperclass
 */
class BaseEntity {
    ...

    /**
     * Helper method
     * 
     * @param Doctrine\ORM\EntityManager $em
     * @throws \RunTimeException
     * @return void
     */
    protected function save(EntityManager $em) {
      if (!$em instanceof EntityManager) {
        throw new \RunTimeException(
          sprintf('Expected an instance of  Doctrine\ORM\EntityManager but got "%s"', gettype($em)), 400
        );
      }

      $em->persist($this);
      $em->flush();
    }

    ...
{% endhighlight %}

Now we can simple use:

{% highlight php %}
<?php
  ...

  $user = new User();
  $user->setName('Foo');
  $user->setEmail('foo@bar.co');

  $user->save();


  $addr = new Address();
  $addr->setProperty('123');
  $addr->setStreet('Foo Road');
  $addr->setTown('Fondon');

  $addr->save();

  ...
{% endhighlight %}

Here is the complete [BaseEntity class as Gist](https://gist.github.com/jabranr/e74b80958a997ffc62b8f8173b7a1e3e).
