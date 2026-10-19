---
title: 'AV Align: learning to see speech'
description: 'Cross-modal attention for speech recognition, developed during my PhD to learn how sound and lip movement fit together.'
company: 'Trinity College Dublin'
period: '2016 — 2020'
category: 'Multimodal research'
order: 3
proof: 'Encode → align → decode'
tags: ['Cross-modal attention', 'Speech recognition', 'Open research']
---

## The problem

A camera and microphone capture different parts of speech. Mouth movements can help when sound is noisy, but matching the two streams requires more than combining frames with the same timestamp.

## My contribution

During my doctoral research at Trinity College Dublin, I proposed **AV Align**, working with Christian Saam and Naomi Harte. The architecture puts audio–visual alignment inside the encoder, before speech is decoded into text.

At each audio step, attention selects a weighted combination of visual representations. This lets the model learn useful correspondences between sound and mouth movement, including streams with different frame rates. Training uses transcriptions without requiring frame-by-frame alignment labels. We introduced the approach at [ICMI 2018](https://arxiv.org/abs/1809.01728).

## Making both inputs count

Adding a visual stream did not guarantee the network would use it. Our initial model improved recognition on TCD-TIMIT, but brought no meaningful gain on the more challenging LRS2 dataset.

In our [2020 journal study](https://arxiv.org/abs/2004.08250), we investigated the failed alignments and introduced an auxiliary task: predicting lip-related facial Action Units. Targets estimated with OpenFace gave the visual encoder a stronger training signal. This helped the model learn useful visual representations and improve recognition on LRS2.

## Evidence and follow-on work

- **Recognition under noise.** The original TCD-TIMIT speaker-dependent experiment reduced character error rate from 46.52% to 32.68% with cafeteria noise at −5 dB: about 30% relative reduction against our audio-only baseline. [2018 paper, Appendix A](https://arxiv.org/pdf/1809.01728).
- **A Transformer implementation.** Our [Interspeech 2020 paper](https://arxiv.org/abs/2005.09297) carried the encode–align–decode design into Transformers. The visual learning difficulty persisted, and the auxiliary loss remained useful.
- **Towards online recognition.** [AV Taris](https://arxiv.org/abs/2012.07467) later restricted cross-modal attention to a local window, trading access to the full utterance for online decoding.
- **Open implementations.** The [original research system](https://github.com/georgesterpu/avsr-tf1) and [Transformer implementation in Taris](https://github.com/georgesterpu/Taris) make the work inspectable.

## Where it fits today

I see AV Align as an early encoder-side cross-attention approach to audio–visual speech fusion. Two questions it explored remain relevant: how to connect the modalities, and how to ensure training uses both.

Later work addresses these questions with different tools. [AV-HuBERT](https://arxiv.org/abs/2201.02184) learns representations through masked multimodal prediction; [GILA](https://www.ijcai.org/proceedings/2023/0564.pdf) combines global interaction with local alignment. [Whisper-Flamingo](https://arxiv.org/abs/2406.10082) instead adds visual cross-attention to a pretrained speech decoder, while its [multilingual extension](https://arxiv.org/abs/2502.01547) uses modality dropout to improve integration.

More recently, a [2026 preprint on optimal-transport alignment](https://arxiv.org/abs/2607.09001) aligns audio and visual features with an LLM’s linguistic space before fusion. That is a broader semantic alignment objective. These examples show how the problem has developed across different architectures, training data, and evaluation setups.

This work taught me to check what each input actually contributes. Adding a second stream and an attention layer is useful only if the model learns to use them.
