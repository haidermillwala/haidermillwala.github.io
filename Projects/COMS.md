---
title: Automated Document Composition Platform
description: Large-scale customer communication platform for banking documents and personalized communications.
tags: [Banking, GCP, Pub/Sub, GKE, Terraform, Microservices]
---

# Automated Document Composition Platform

**Client:** Major UK-based banking enterprise  
**Organization:** Publicis Sapient

Built a large-scale automated customer communication platform responsible for generating personalized banking documents and communications.

## Scope

- Architected backend microservices for document orchestration, template processing, metadata management, and communication workflows.
- Implemented asynchronous event processing with Google Cloud Pub/Sub.
- Designed cloud-native deployment architecture on Google Kubernetes Engine.
- Automated infrastructure and deployment workflows using Terraform and Jenkins.
- Improved scalability, resiliency, and deployment reliability for high-volume banking communication systems.

## Architecture Notes

The platform follows event-driven orchestration. Services own specific capabilities, publish state transitions, and avoid tight coupling between template processing, metadata, storage, and communication delivery.

## Tech Stack

*Java* *Spring Boot* *Spring Cloud* *gRPC* *GCP* *GKE* *Kubernetes* *Docker* *Helm* *Terraform* *Pub/Sub* *Jenkins*
