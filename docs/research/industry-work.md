# Honeywell and Xperi: sources and wording

Reviewed 19 October 2026. This is an editing reference for the work pages and profile. It is not published as a blog post.

## Evidence boundaries

The supplied October 2026 CV is the source for George's responsibilities and results. Public company material establishes product and domain context. It does not independently verify his particular implementation, its measurements, customer adoption, or commercial impact.

Searches for George's name alongside Honeywell, Xperi and patents did not establish an attributable public technical description of these internal projects. This is a limit of this review, not proof that no public record exists. Avoid filling the gap with plausible architecture details or nearby company announcements.

## Honeywell

### Supported personal contribution

The CV describes a GNN-based framework for building topology, taken from local development to a production-governed endpoint on Azure Databricks for internal teams. It records a trade secret award, two invention disclosure submissions associated with onboarding work, and work on HVAC fault detection and diagnosis.

The page now says “governed endpoint,” rather than using “prototype → production” as a broad proof label. It describes the internal availability of the method. It does not claim a customer rollout, live autonomous control, a count of buildings, measured energy savings, or a reduction in onboarding time.

### Public context reviewed

- Honeywell, [Connectivity Guide to Elevate Building Performance](https://buildings.honeywell.com/content/dam/hbtbt/en/documents/downloads/hon-ba-building-connectivity-guide.pdf), page 3: connected data points must be contextualised and mapped to equipment. This supports explaining why building structure matters. It does not identify George's GNN implementation or establish that he built the application in the guide.
- Microsoft, [Deploy models using Model Serving — Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/machine-learning/model-serving/): describes deployment, governance and querying of models through serving endpoints. This clarifies the platform terminology; it does not establish which registry, access controls, serving mode, monitoring, or infrastructure the project used.
- Honeywell's [January 2024 building-controls announcement](https://buildings.honeywell.com/us/en/news-events/press-releases/2024/01/honeywell-transforms-building-management-with-first-of-its-kind-technology) predates George's June 2025 start. Do not present its product release, customer outcomes or hardware partnerships as his work.

### Wording decisions

“Modelling buildings” refers to topology and relationships, rather than geometry, architectural design, or a complete digital twin. “Designed” replaces “conceptualised and architected.” Keep “trade secret award” distinct from a granted patent, and “invention disclosure submissions” distinct from patent applications or granted rights. Omit the CV's internal first-of-its-kind claim: its scope is hard to explain publicly and it adds little to understanding the work.

## Xperi

### Supported personal contribution

The CV records an end-to-end speech recognition engine decoding in real time with constant one-second latency on Ergo at 100 mW, two TTS engines using GAN and diffusion approaches, and exploration of quantisation and pruning.

The site keeps the power and latency figures attached to that system. It does not turn them into chip-wide specifications or whole-device consumption, or invent an accuracy, language set, model size, test corpus, decoding architecture, measurement protocol, or shipped customer product. “Explored” compression does not become a claim that a particular compression method shipped in the recogniser.

### Public context reviewed

- Xperi / Perceive, [Ergo launch announcement, 31 March 2020](https://investor.xperi.com/news/news-details/2020/Perceive-Corporation-Launches-to-Deliver-Data-Center-Class-Accuracy-and-Performance-at-Ultra-Low-Power-for-Consumer-Devices/default.aspx): identifies Perceive as then majority-owned by Xperi and Ergo as an edge inference processor supporting speech recognition and other networks. Its 20 mW example is a vision workload, not George's ASR result. It predates his employment and supplies hardware context only.
- Perceive's [Ergo 2 announcement, January 2023](https://www.edge-ai-vision.com/2023/01/perceive-launches-ergo-2-ai-processor-with-unmatched-combination-of-performance-and-power-efficiency/), reproduced under the company's name by the Edge AI and Vision Alliance: establishes a separate product generation. The CV says Ergo. Do not silently relabel the project Ergo 2 or attach the later chip's architecture and benchmarks to it.
- [Taris repository](https://github.com/georgesterpu/Taris): useful background on George's earlier online speech research. It does not establish that Xperi's internal recogniser used Taris. The page now labels the link as doctoral research.

### Wording decisions

Use “real time” for keeping pace with incoming speech and keep the one-second latency visible. Avoid phrases suggesting instantaneous transcription. The CV does not specify latency endpoints or the power measurement boundary in detail; if a future technical article needs an exact benchmark claim, get those details from George. Do not extrapolate battery life, cloud-service equivalence, privacy guarantees or operating cost from processor power alone.

## Voice

George's older personal posts and public LinkedIn writing favour concrete examples, curiosity, people, learning, and reflecting on what worked. Use that direction without imitating every sentence or inventing anecdotes. Short first-person accounts fit better than generic lessons, dramatic slogans, or repeated “problem / contribution / result” sections saying the same thing.

The whole-site pass also removes vague homepage claims, makes the route from work summaries to evidence clearer, and keeps the FDE interest as a future direction. It preserves original reading passages, running results and personal reflections, apart from obvious typos and heading hierarchy corrections.
