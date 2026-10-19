# AV Align: research and positioning

Researched 19 October 2026. This note records the evidence behind `src/content/work/av-align.md` and gives future editors a starting point for deeper technical writing. It is a selective comparison of research directions, not a systematic review or a current leaderboard.

## Recommended positioning

**An early encoder-side cross-attention approach to audio–visual speech fusion, with follow-up work on the dominant-modality training problem.**

This is an editorial assessment of the papers below. The defensible contribution is specific: learning useful correspondences between sound and mouth movement before transcription. Modern multimodal systems still face correspondence, fusion, and modality-use problems, but often use much larger pretrained components and different objectives. Similarity of problems or mechanisms does not establish direct intellectual descent.

Selected work is intentionally newest first: Honeywell (2025–present), Xperi (2021–2024), doctoral AV Align work (2016–2020). This replaces the Herbst selected-work feature; the employment record remains in the profile data.

## Original research trail

### 2018: initial method

Sterpu, Saam and Harte, [Attention-based Audio-Visual Fusion for Robust Automatic Speech Recognition](https://arxiv.org/abs/1809.01728), ICMI 2018, [DOI](https://doi.org/10.1145/3242969.3243014).

The public work page explains the architecture and reports one scoped result. Appendix A of the [paper](https://arxiv.org/pdf/1809.01728) provides the numerical source. CER means character error rate; the relative reduction is distinct from the difference in percentage points. The speaker-dependent TCD-TIMIT result does not establish generalisation to unseen speakers.

### 2020: investigating visual learning failure

Sterpu, Saam and Harte, [How to Teach DNNs to Pay Attention to the Visual Modality in Speech Recognition](https://arxiv.org/abs/2004.08250), IEEE/ACM TASLP, volume 28, pages 1052–1064, [DOI](https://doi.org/10.1109/TASLP.2020.2980436).

Additional details beyond the public summary: the auxiliary targets are AU25 (Lips Part) and AU26 (Jaw Drop), estimated externally rather than manually annotated. Generally monotonic attention patterns emerge; the architecture does not impose a strict monotonic constraint. Section IV also investigates speaker independence, fusion alternatives, controls without informative video, and transfer of the auxiliary loss to WLAS. Attention maps are useful diagnostics, not proof of causal explanations. The study reports five random initialisations and uncertainty; its speaker-independent TCD-TIMIT findings are inconclusive.

### 2020: Transformer variant

Sterpu, Saam and Harte, [Should we hard-code the recurrence concept or learn it instead? Exploring the Transformer architecture for Audio-Visual Speech Recognition](https://arxiv.org/abs/2005.09297), Interspeech 2020.

The Align stack uses audio queries and visual keys/values, adding the visual context through a residual connection. Table 2 reports CER, not WER. The paper explicitly says the Transformer and LSTM comparison is not a parameter-efficiency study: model sizes differ. Its text and Table 2 do not give exactly matching relative improvements in all conditions, so the site avoids repeating the percentage range. The useful conclusion is architectural portability alongside a persistent optimisation difficulty, rather than a universal Transformer speed or accuracy claim.

### 2020 preprint and subsequent online work

Sterpu and Harte, [AV Taris: Online Audio-Visual Speech Recognition](https://arxiv.org/abs/2012.07467).

This extends Taris with locally windowed cross-modal attention. It reports an accuracy cost relative to offline AV Align and stronger visual benefits under higher noise. Local cross-modal attention alone is insufficient to make a whole model stream: the encoder and decoder context also matter. Keep publication dates separate from the dates of doctoral employment; the related journal article appeared in _Computer Speech & Language_ in 2022, as recorded on the site's publications page.

### Implementations and thesis

- [avsr-tf1](https://github.com/georgesterpu/avsr-tf1), the target of the older Sigmedia-AVSR link: Python / TensorFlow 1.13 research code, including audio-only, visual-only, WLAS and AV Align experiments. This supports reproducibility and inspectability, not a claim of production readiness or current dependency compatibility.
- [Taris](https://github.com/georgesterpu/Taris): TensorFlow 2 implementation retaining Transformer AV Align. The README documents the audio–visual experiment and `--au_loss` flag, and cautions that its changed data-preparation path has experimental support.
- Thesis title from the original publications page: _Deep Cross-Modal Alignment in Audio-Visual Speech Recognition_. The [Trinity repository link](https://www.tara.tcd.ie/handle/2262/96649) could not be retrieved in this session, so the thesis full text was not used as evidence. The research papers are the basis of this entry.

## Relation to subsequent research

These are comparisons of objectives and architectures, not claims that later authors adopted AV Align. Each row links to the underlying authors' work.

| Direction and source                                                                                                                                          | What it addresses                                                                                                                                                   | Relationship to AV Align                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [AlignNet, WACV 2020](https://openaccess.thecvf.com/content_WACV_2020/papers/Wang_AlignNet_A_Unifying_Approach_to_Audio-Visual_Alignment_WACV_2020_paper.pdf) | Dense correspondences and warping to synchronise recordings with irregular temporal distortions.                                                                    | Explicit stream synchronisation is a different output from task-driven latent fusion for transcription.                                                                                                      |
| [AV-HuBERT, 2022](https://arxiv.org/abs/2201.02184)                                                                                                           | Self-supervised masked prediction of iteratively refined multimodal clusters, followed by downstream fine-tuning. Modality dropout counters over-reliance on audio. | Advances representation learning and label efficiency. Its frame-rate-matched feature fusion differs from AV Align's explicit cross-stream attention.                                                        |
| [GILA, IJCAI 2023](https://www.ijcai.org/proceedings/2023/0564.pdf)                                                                                           | Attention-based global interaction plus contrastive local temporal alignment, including relationships across layers.                                                | A useful comparison for the continued importance of explicit cross-modal interactions; the objectives and fusion design differ.                                                                              |
| [Unified Cross-Modal Attention, TASLP 2024](https://doi.org/10.1109/TASLP.2024.3375641)                                                                       | Temporally concatenated modality sequences in a shared Conformer, with explicit corruption training and an asynchronisation-aware loss.                             | Extends the evaluation concerns to missing/corrupted modalities and out-of-sync inputs. Do not assume natural articulatory timing alone covers these failures.                                               |
| [Whisper-Flamingo, Interspeech 2024](https://arxiv.org/abs/2406.10082)                                                                                        | Adapts pretrained Whisper with gated decoder cross-attention to AV-HuBERT visual features; supports recognition and translation.                                    | A different fusion location from AV Align. Highlights the modern shift towards reusing large pretrained components rather than training a complete small system from scratch.                                |
| [AlignVSR, October 2024 preprint](https://arxiv.org/abs/2410.16438)                                                                                           | Video-to-audio-unit-bank cross-attention and local alignment supervision for lipreading.                                                                            | Audio is an auxiliary training source; inference is visual speech recognition. Its scores should not be treated as the same task as joint audio–visual recognition.                                          |
| [mWhisper-Flamingo, IEEE SPL 2025](https://arxiv.org/abs/2502.01547)                                                                                          | Multilingual AVSR with decoder modality dropout; ablations show the importance of video-only training examples.                                                     | Strong evidence that ensuring visual contribution remains an engineering problem in pretrained systems. Its remedy differs from Action Unit regression.                                                      |
| [MoHAVE, ICML 2025](https://proceedings.mlr.press/v267/kim25i.html)                                                                                           | Sparse hierarchical expert routing to adapt modality-specific computation to input context.                                                                         | Primarily conditional capacity, robustness and modality selection, rather than a replacement definition of temporal correspondence.                                                                          |
| [Qwen2.5-Omni technical report, 2025](https://arxiv.org/abs/2503.20215)                                                                                       | Time-interleaved audio/video tokens and time-aligned multimodal positional encodings.                                                                               | Shared timestamp coordinates provide temporal structure; this is distinct from learning articulatory correspondences. A representative general multimodal design, not a claim about the latest Qwen release. |
| [Optimal Transport-based Semantic Alignment for LLM-based AVSR, 2026 preprint](https://arxiv.org/abs/2607.09001)                                              | OT-derived soft couplings align Whisper and AV-HuBERT representations to LLaMA's linguistic embedding space before fusion, also guiding contrastive learning.       | A current example of alignment as bridging semantic representation spaces. First submitted 10 July 2026, revised 13 August; treat its benchmark claims as authors' preprint results.                         |

## Naming and comparison pitfalls

The term “alignment” can mean learned temporal correspondence, stream synchronisation, semantic representation matching, or positional encoding. Always state which meaning applies.

There is also an unrelated **AV-Align evaluation metric** used in sounding-video generation. The [official SVG Challenge 2024 rules](https://www.aicrowd.com/challenges/sounding-video-generation-svg-challenge-2024/challenge_rules) credit Guy Yariv and colleagues and describe audio-onset / optical-flow timing comparisons. Search results using that metric are not evidence of uptake of George's speech architecture.

Do not combine CER with WER, relative with absolute gains, or speaker-dependent with speaker-independent results. Matching dataset names alone is insufficient: training subsets, pretraining data, noise sources, SNRs, decoders and model sizes can differ. Whisper-Flamingo's own comparison explicitly cautions that noisy scores with different noise files are not directly comparable.

Avoid “invented cross-attention,” “the first multimodal alignment model,” “the basis of today's multimodal LLMs,” an unverified citation count, or a present-day state-of-the-art claim. The original papers discuss prior attention systems. No rerun of the research experiments or independent benchmark validation was performed for this site update.

## Editorial use

Lead with the problem, the mechanism, the observed failure and the response. Link the original evidence, credit the collaborators, and keep historical results scoped. This demonstrates research judgment and implementation work relevant to applied engineering without inventing a customer deployment or commercial impact.

Keep the public entry concise. This memo holds the broader comparison and caveats; future changes to the entry should preserve its source links and refresh time-sensitive comparisons.
