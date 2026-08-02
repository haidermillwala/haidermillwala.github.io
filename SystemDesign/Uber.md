---
title: Uber System Design
description: Ride matching, geospatial indexing, surge pricing, event streams, and operational reliability.
tags: [System Design, Geospatial, Kafka, Microservices, Consistency]
---

# Uber System Design

## Problem

Design a ride-hailing system that supports rider requests, driver availability, matching, trip lifecycle events, pricing, payments, and live location updates.

## Core Services

- Rider service for profiles, ride requests, trip history, and payment methods.
- Driver service for onboarding, availability, location, and trip assignment.
- Matching service for finding nearby eligible drivers.
- Pricing service for fare estimate, surge pricing, and discounts.
- Trip service for lifecycle state: requested, accepted, arrived, started, completed, cancelled.
- Notification service for push, SMS, and email events.

## Data and Messaging

- Use geospatial indexes for nearby driver lookup.
- Store current driver location in a low-latency location store with TTL.
- Publish trip state changes to an event stream for notifications, analytics, and billing.
- Use idempotency keys for ride requests, payment authorization, and trip state transitions.

## Tradeoffs

Strong consistency is useful for payments and trip state. Eventual consistency is acceptable for live map position, ETA adjustments, and analytics pipelines.
