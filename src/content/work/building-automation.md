---
title: 'Modelling buildings with graph neural networks'
description: 'A framework for representing building topology, developed locally and deployed to a governed endpoint on Azure Databricks.'
company: 'Honeywell'
period: '2025 — present'
category: 'Applied AI'
order: 1
proof: 'Governed endpoint'
tags: ['Graph neural networks', 'Azure Databricks', 'Building automation']
---

## Representing the building

At Honeywell, I work on applied machine learning for building automation. One part of that work is representing building topology: the structure of the building's systems and the relationships between them.

That context matters. A data point becomes more useful when we know which equipment it belongs to and how it relates to the rest of the system. Honeywell's [building connectivity guide](https://buildings.honeywell.com/content/dam/hbtbt/en/documents/downloads/hon-ba-building-connectivity-guide.pdf) describes this broader data-modelling problem.

## My work

I designed a graph neural network framework to model building topology and took it from local development to a governed endpoint on Azure Databricks. This made the approach available to internal teams working with structural building data.

The work brought together two concerns: choosing a useful representation of the building, and making the method available outside my local development environment. The framework received a trade secret award.

## Related work

I also work on deep learning methods for site onboarding and on fault detection and diagnosis for heating, ventilation and air conditioning (HVAC) systems. The onboarding work led to two invention disclosure submissions.

This is a high-level account of my contribution; the implementation is proprietary.
