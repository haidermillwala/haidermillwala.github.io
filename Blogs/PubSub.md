---
title: Google Cloud Pub/Sub Notes
description: Pub/Sub basics for asynchronous communication, subscriptions, retries, and dead-letter handling.
tags: [GCP, Pub/Sub, Event-Driven Architecture]
---

# Google Cloud Pub/Sub Notes

Pub/Sub is a managed messaging service for asynchronous communication between services.

## Core Concepts

- Topic: where publishers send messages.
- Subscription: where consumers receive messages.
- Ack deadline: time a subscriber has to acknowledge processing.
- Dead-letter topic: destination for messages that repeatedly fail.

## Reliability Notes

Message handlers should be idempotent because redelivery can happen. Use correlation IDs to trace a message across services and logs.

## Practical Pattern

Publish domain events after durable state changes. Subscribers can then update read models, trigger notifications, or start downstream workflows without coupling services directly.
