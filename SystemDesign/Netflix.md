---
title: Netflix System Design
description: Video catalog, personalization, streaming delivery, CDN strategy, and observability.
tags: [System Design, CDN, Streaming, Recommendations, Observability]
---

# Netflix System Design

## Problem

Design a video streaming platform that supports catalog browsing, recommendations, playback, watch history, and high-throughput media delivery.

## Core Services

- Catalog service for titles, metadata, genres, availability, and search.
- Recommendation service for personalized rows and ranking.
- Playback service for entitlement checks, playback sessions, and resume points.
- Encoding pipeline for transcoding source media into adaptive bitrate formats.
- Analytics service for events such as play, pause, seek, buffering, and completion.

## Media Delivery

Static media should be served through a CDN. The application backend should issue playback manifests and signed URLs while keeping heavy video traffic away from core services.

## Reliability Notes

Playback must degrade gracefully. If recommendations are slow, users can still browse popular rows. If analytics ingestion is delayed, playback should continue unaffected.
