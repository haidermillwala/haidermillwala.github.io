---
title: Kubernetes Notes
description: Backend engineer notes on pods, deployments, services, probes, config, secrets, and rollout safety.
tags: [Kubernetes, GKE, Docker, DevOps]
---

# Kubernetes Notes

Kubernetes becomes approachable when you think of it as a control plane that keeps declared application state true.

## Core Objects

- Pod: smallest deployable unit.
- Deployment: manages replicas and rollouts.
- Service: stable network access for pods.
- ConfigMap: non-secret configuration.
- Secret: sensitive configuration.
- Ingress: external HTTP routing.

## Readiness and Liveness

Readiness decides whether a pod should receive traffic. Liveness decides whether a pod should be restarted. Mixing them up can create outage patterns during deploys.

## Backend Checklist

- Set CPU and memory requests.
- Define readiness probes based on real dependency readiness.
- Keep graceful shutdown aligned with load balancer draining.
- Emit structured logs and useful health metrics.
