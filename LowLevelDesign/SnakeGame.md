---
title: Snake Game Low Level Design
description: Grid-based game design with snake movement, collision checks, food generation, and game state.
tags: [LLD, Game Loop, Queue, Set, Java]
---

# Snake Game Low Level Design

## Key Objects

- `Board` with width, height, and occupied cells.
- `Snake` with direction, body queue, and head position.
- `FoodGenerator` that places food on free cells.
- `Game` that owns score, state, movement loop, and collision checks.

## Data Structures

Use a queue or deque for snake body order. Use a set for occupied cells so collision checks remain O(1).

## Movement Flow

1. Compute next head based on current direction.
2. Check wall collision.
3. Check self collision, allowing tail movement if food is not consumed.
4. Add new head.
5. Remove tail unless food was eaten.
6. Generate new food if needed.

## Edge Cases

- Direction reversal in one tick.
- Board full after food consumption.
- Collision with tail cell that is about to move.
