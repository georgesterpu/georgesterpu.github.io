---
title: 'Speech recognition on a 100 mW processor'
description: 'An end-to-end speech recognition engine for the Ergo edge processor, decoding in real time with a fixed one-second delay.'
company: 'Xperi'
period: '2021 — 2024'
category: 'Edge AI'
order: 2
proof: '100 mW / 1 s latency'
tags: ['Speech recognition', 'Edge inference', 'Model compression']
---

## Speech recognition on the device

At Xperi, I worked on speech recognition for the Ergo edge inference processor. The challenge was to keep up with incoming speech while working within the processor's power constraints.

Ergo was developed by Perceive, then a subsidiary of Xperi. Its [original launch announcement](https://investor.xperi.com/news/news-details/2020/Perceive-Corporation-Launches-to-Deliver-Data-Center-Class-Accuracy-and-Performance-at-Ultra-Low-Power-for-Consumer-Devices/default.aspx) describes the hardware and its support for neural-network inference, including speech recognition.

## My work

I developed an end-to-end automatic speech recognition engine that decoded speech in real time with a constant one-second latency on Ergo, operating at 100 mW. The power figure describes the processor running this workload, rather than the total consumption of a finished device.

Keeping pace with speech and limiting the delay are related requirements. Here, real time meant the engine could process speech as it arrived, with the one-second delay still part of the system's behaviour.

## Speech synthesis and compression

My work also included two text-to-speech synthesis engines using GAN and diffusion approaches. Alongside this, I explored neural-network compression through quantisation and pruning.

For background on my earlier work on online decoding, [Taris](https://github.com/georgesterpu/Taris) is an open-source project from my doctoral research. The [publications page](/publications/) has the accompanying papers.
