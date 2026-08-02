---
title: Splitwise Low Level Design
description: Expense sharing model with groups, splits, balances, simplification, and settlement.
tags: [LLD, Graph, Java, Design Patterns]
---

# Splitwise Low Level Design

## Key Objects

- `User` with identity, contact, and wallet metadata.
- `Group` with members and group-level expense history.
- `Expense` with payer, amount, currency, category, and splits.
- `Split` with user, amount, percentage, or share count.
- `Ledger` that stores user-to-user balances.

## Split Types

- Equal split.
- Exact amount split.
- Percentage split.
- Share-based split.

## Balance Simplification

Model balances as a graph where edges represent money owed. Simplification can be done by separating creditors and debtors, then greedily settling smallest outstanding amounts.

## Edge Cases

- Expense edited after settlement.
- User removed from a group.
- Currency conversion.
- Rounding for percentage splits.
