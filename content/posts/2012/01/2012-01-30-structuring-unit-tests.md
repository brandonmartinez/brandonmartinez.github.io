---
coverImageUri: ""
title: "Structuring Unit Tests"
datetime: "2012-01-30T13:00:18.000Z"
categories: "technology"
tags: ".net,c#,unit testing"
---

One of the most troubling parts of unit testing, to me, is keeping things organized. For the past year, I've been managing my tests like this:

- Every class has a tester class; for example, _MyClass_ would have _MyClassTests_
- In _MyClassTests_, multiple test methods would be setup to test each of the methods in _MyClass_
- Test names would be in this format: _MethodName_\__Scenario_\__ReturnValue_

Tests for large classes would get out of control! There could be several test methods for a single method on the original class. Imagine a tester class if the original class had 20 methods.

However, thanks to this excellent tip from [Phil Haack](http://www.haacked.com/), this situation can be cleaned up and put into an easier to manage form.

By structuring your unit test classes to contain nested classes, each designated to test a single function, you can have a set of tests look like this:

[![](http://assets.brandonmartinez.com/brandonmartinez/2012/01/unittests-spec_thumb.png "unittests-spec_thumb")](http://assets.brandonmartinez.com/brandonmartinez/2012/01/unittests-spec_thumb.png)

For a further explanation, I would highly recommend reading Phil's post: [Structuring Unit Tests](http://haacked.com/archive/2012/01/02/structuring-unit-tests.aspx). I'm going to be trying this out with my testing environment (I use [nunit](http://www.nunit.org/)) over the next few weeks.
