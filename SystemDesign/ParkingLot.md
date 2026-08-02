---
title: Parking Lot System Design
description: Slot allocation, ticketing, payments, entry and exit gates, and occupancy tracking.
tags: [System Design, OOP, State Machine, Payments]
---

# Parking Lot System Design

## Problem

Design a parking lot system for vehicles, gates, tickets, slot assignment, payments, and real-time occupancy.

## Core Components

- Parking lot with floors, slots, gates, and pricing rules.
- Slot allocation service that maps vehicle type to eligible available slots.
- Ticket service that creates entry tickets and resolves exit tickets.
- Payment service that calculates fee and records settlement status.
- Display service that publishes available slot counts by floor and vehicle type.

## State Model

A ticket moves from `issued` to `active`, then `payment_pending`, then `paid`, then `closed`. Gate operations should be tied to valid state transitions.

## LLD Bridge

This is a good design to convert into object-oriented classes because entities, states, and strategy-based pricing rules are clear and bounded.
