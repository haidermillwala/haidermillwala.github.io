---
title: Car Rental Low Level Design
description: OOP design for vehicles, reservations, branches, pricing strategies, and payment flows.
tags: [LLD, OOP, Strategy Pattern, Java]
---

# Car Rental Low Level Design

## Key Objects

- `Vehicle` with registration number, type, status, branch, and pricing profile.
- `Branch` with inventory and location.
- `Reservation` with user, vehicle, pickup, drop, schedule, and status.
- `PricingStrategy` for hourly, daily, weekend, and surge rules.
- `Payment` for authorization, capture, refund, and failure handling.

## Important Enums

- `VehicleType`: hatchback, sedan, SUV, luxury.
- `VehicleStatus`: available, reserved, rented, maintenance.
- `ReservationStatus`: created, confirmed, active, completed, cancelled.

## Design Patterns

Use Strategy for pricing and availability rules. Use Factory when creating vehicle-specific pricing profiles. Use state transitions to keep reservation changes predictable.

## Edge Cases

- Overlapping reservations for the same vehicle.
- Vehicle returned late.
- Payment success after temporary gateway timeout.
- Branch inventory changes during reservation confirmation.
