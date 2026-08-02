---
title: HashMap Internals
description: Practical notes on hashing, buckets, collision handling, resizing, and Java HashMap behavior.
tags: [Java, Data Structures, HashMap]
---

# HashMap Internals

HashMap looks simple from the outside: put a key in, get a value out. The interesting part is how it keeps those operations close to O(1) under normal conditions.

## Mental Model

- A hash function turns a key into an integer.
- The map uses that hash to choose a bucket.
- If multiple keys land in the same bucket, collision handling decides how to store them.
- When the load factor crosses a threshold, the table resizes.

## Java Notes

Modern Java HashMap stores collisions as linked lists initially and can treeify a bucket when collisions become too dense. Good `equals` and `hashCode` implementations are still the foundation.

## Production Advice

Treat mutable keys carefully. If an object changes after being used as a key and the hash changes, lookup behavior becomes unreliable.
