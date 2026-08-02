---
title: Kafka Notes
description: Event streaming concepts around topics, partitions, offsets, consumers, and reliability.
tags: [Kafka, Event Streaming, Microservices]
---

# Kafka Notes

Kafka is most useful when services need a durable event log rather than direct request-response coupling.

## Core Concepts

- Topic: named stream of records.
- Partition: ordered subset of a topic.
- Offset: position of a record in a partition.
- Consumer group: parallel consumption model.
- Broker: server that stores and serves partitions.

## Delivery Thinking

Consumers should be idempotent. Retries, duplicate deliveries, and partial failures are normal parts of distributed systems.

## Design Notes

Use events for facts that happened, not commands that demand immediate synchronous action. Version event schemas carefully and keep compatibility in mind.
