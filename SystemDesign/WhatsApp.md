---
title: WhatsApp System Design
description: Messaging, delivery receipts, offline sync, media handling, and group fanout.
tags: [System Design, Messaging, WebSocket, Fanout, Storage]
---

# WhatsApp System Design

## Problem

Design a chat system for one-to-one and group messaging with online delivery, offline sync, message ordering, receipts, and media sharing.

## Core Services

- Auth service for identity, device registration, and sessions.
- Connection service for WebSocket connections and presence.
- Message service for message persistence, ordering, and delivery.
- Group service for membership, permissions, and fanout policy.
- Media service for upload, metadata, scanning, and signed download URLs.

## Delivery Model

- Use persistent WebSocket connections for online users.
- Store messages before acknowledging sender success.
- Queue undelivered messages per recipient device for offline sync.
- Emit delivery and read receipts as separate state events.

## Design Decisions

Ordering can be maintained per conversation using sequence numbers. Large groups need fanout controls, batching, and background delivery workers to avoid overloading hot conversations.
