# Redesign handoff: George Sterpu's engineer's notebook

> **Status (15 November 2026): APPROVED DIRECTION, NOT AN APPROVED IMPLEMENTATION.**
> This is a planning and execution brief for Codex working in a checkout of [georgesterpu/georgesterpu.github.io](https://github.com/georgesterpu/georgesterpu.github.io), ideally on George's Omarchy Linux laptop. The current redesign was **not** implemented, compiled, screenshot-tested, or deployed by the assistant preparing this document. The only authorised GitHub write in this conversation is this Markdown handoff.
>
> **Instructions for the next agent:** First inspect the *current* repository state and `AGENTS.md`; this document reflects an audit performed on 15 November 2026 and may become stale. Work iteratively. Build a real local preview, show screenshots and request editorial/visual approval **before pushing, merging, or deploying a redesign**. Do not interpret this brief's presence on `main` as permission to publish.

## 1. Objective and editorial positioning

**Build an engineer's personal notebook**, rather than a résumé landing page, a corporate personal brand, or an AI-generated template.

A visitor should meet a recognisable person: curious, warm, thoughtful, technically capable, precise, occasionally funny, and happy to admit uncertainty. They should immediately find worthwhile writing, see evidence of real engineering work, and discover books, running and interests outside work. Keep contact and professional credentials available, but do not turn every page into a recruitment funnel.

George's own feedback in this conversation:

- The current site tries too hard to appear impressive and professional.
- It reads like a CV with a blog attached.
- Some copy has the generic, over-polished quality associated with unedited AI writing.
- The very prominent banner claiming “100% AI-generated at this stage. Work in progress.” erodes visitors' trust.
- A reader may reasonably ask: if the owner didn't review the generated material, why should anyone else spend time reading it?
- He wants the site to be **his**—an engineer's personal notebook with writing, real technical projects, and personal interests.
- He wants a future agent to develop the design on his Omarchy laptop, show actual screenshots, and refine it with him before publication.

**North star:** A memorable personal site should feel like the person who owns it, not like a demonstration of what AI can generate.

The role of AI is rapid execution and prototyping. Editorial decisions, factual ownership, taste, credibility, and publication approval remain George's.

## 2. Primary sources and precedence

Read these resources before changing any code:

1. **This handoff** — the consolidated requested direction, evidence and starting copy.
2. **[Lacey-derived design brief](https://github.com/georgesterpu/shoehoo-jobs/blob/main/docs/designing-with-personality.md)** — “A personal site with a point of view”, written 15 November 2026. This document was read in full during preparation. Its lessons and constraints are integrated below; refer to the original for detail and citations.
3. **[Design Review video](https://www.youtube.com/watch?v=eojywvxqoLc)** — interview with Shopify design lead Marvin Schwebold and design critiques of viewer websites. George supplied its transcript. Timestamped takeaways below are based on that transcript; this is not a claim that the next agent watched the video.
4. **[Blog AGENTS.md](../AGENTS.md)** — technical constraints, provenance, work claims, build and deployment instructions.
5. **[Existing design notes](design.md)** — documents the *previous* “quiet editorial” design and work-first positioning. Its technical and evidence protections are useful, but its prior career-first homepage priority is superseded by George's newer brief.
6. **[Editing guide](editing.md)**, `docs/migration.json`, `docs/research/`, source and actual published posts — URLs, content conventions, and evidence boundaries.
7. **[Live site](https://georgesterpu.github.io/)** — inspect actual behaviour and screenshots, not just source.
8. **[Lacey](https://lacey.january.ie/)** — product-specific inspiration for friendly, readable, confident interactions, **not** a visual template to copy.

**Precedence:** Current explicit direction from George > newer redesign brief (this document and Lacey-derived brief) > previous career-first aesthetic brief. Preserve existing URL, provenance, source, attribution, accessibility, build and publishing safeguards unless George explicitly authorises changing them.

## 3. Lessons from Lacey / Shoehoo development

The linked Lacey brief records observations and George's own feedback during a running-shoe lookout project. These are **project observations, not controlled UX research**.

- Initial design felt **generic, impersonal**.
- Excessive green wash and weak text contrast hurt readability; that is not a universal prohibition on green, and Lacey's later purple palette is not automatically right for this blog.
- Too much explanation, subtext and secondary navigation creates work for readers. Use short, plain labels.
- Distinguish things correctly: ambiguous labels such as “fit” confused shopping departments. On the blog, distinguish writing, books, running and work with literal navigation rather than clever jargon.
- A small smile on an ordinary Lidl receipt inspired the observation that modest human touches can be memorable. A natural aside, friendly footer, or occasional smile is sufficient; **do not impose a mascot, emoji, slogan or joke on every page**.
- A catchy brand and restrained colour treatment helped Lacey feel like a distinct product, but the blog already has a real person's name and voice. No new brand name is required.
- A beautiful confirmation screen still fails if someone cannot tell whether an email was sent or an alert activated. For the blog, link destinations, dates, navigation, RSS and any interactions must behave truthfully and obviously.
- One relevant item can beat repeated cards. Every excerpt, badge, image and metadata field must earn its place.
- Make reading legible for a wide audience, including on mobile. Contrast and basic usability outrank decoration.
- A product should support fast task completion; a personal blog also invites slow, thoughtful reading. Reduce *interface* friction without flattening the writing.

Working voice, adapted from the brief: **curious, warm, precise, lightly mischievous**. It is a **design goal**, not a quotation from George. Do not fabricate an anecdote, race result, scientific impact, favourite place, quotation, opinion or customer outcome to manufacture personality.

Let tone depend on context: technical case studies should be exacting, running captions can be informal, and a serious reflection or poem should be allowed to be quiet.

## 4. Lessons from the Y Combinator / Design Review video

Source: [Design Review with Marvin Schwebold](https://www.youtube.com/watch?v=eojywvxqoLc), transcript supplied by George. The timestamps below allow the next agent to revisit the relevant segments.

| Video section | Design lesson | Specific application to George's site |
|---|---|---|
| [~01:40](https://www.youtube.com/watch?v=eojywvxqoLc&t=100s) — human direction of AI | AI can do heavy lifting, but the human must select, edit and exercise taste. | Stop publishing plausible-sounding copy just because it reads smoothly. Ask whether it reveals anything true and distinctive. |
| [~08:26](https://www.youtube.com/watch?v=eojywvxqoLc&t=506s) — progressive disclosure | Make the site feel exploratory rather than demanding attention; put detail a layer deeper. | Keep homepage concise; give substantial essays and work evidence dedicated destinations. |
| [~14:19](https://www.youtube.com/watch?v=eojywvxqoLc&t=859s) — working prototypes | A usable prototype reveals more than a lengthy specification. | Render actual Astro locally and inspect on the phone/desktop. Iterate after screenshots. |
| [~20:04](https://www.youtube.com/watch?v=eojywvxqoLc&t=1204s) — interaction critique | An animation may look correct yet feel wrong if it blocks interruption or response. | Prefer predictable, native interactions over ornamental transitions. |
| [~24:56](https://www.youtube.com/watch?v=eojywvxqoLc&t=1496s) — exposing variables | Rapid iteration improves when designers can inspect what underlies a visual result. | Use clear CSS tokens and a small set of adjustable type/spacing/colour settings rather than opaque magic numbers. |
| [~32:17](https://www.youtube.com/watch?v=eojywvxqoLc&t=1937s) — Endstack hierarchy | Overloaded screens don't establish what the viewer should look at first. | The first viewport needs a clear personal introduction and obvious path into writing. |
| [~33:17](https://www.youtube.com/watch?v=eojywvxqoLc&t=1997s) — one primary goal | One dominant purpose on a page is more effective than competing calls to action. | The homepage's first job is to invite reading/exploration, not to sell an FDE job candidacy. |
| [~36:48](https://www.youtube.com/watch?v=eojywvxqoLc&t=2208s) — SkillSync and tabs | Too many detailed feature descriptions and hidden tabs obscure what matters. | Curate a few clear sections and let readers scroll; don't bury content behind unwarranted controls. |
| [~38:29](https://www.youtube.com/watch?v=eojywvxqoLc&t=2309s) — AI illustrations | Generated graphics and animation can distract without explaining anything. | Prefer George's own photos, real diagrams, book covers, tangible results. Remove decorative imagery that conveys nothing. |
| [~46:17](https://www.youtube.com/watch?v=eojywvxqoLc&t=2777s) — Mintlify | Professionalism often comes from reducing a page to the elements it needs. | Strip résumé metrics, repetitive credential badges, generic mission statements and competing CTA styling. |
| [~49:37](https://www.youtube.com/watch?v=eojywvxqoLc&t=2977s) — homepage as chapters | Each homepage section previews a deeper destination, in descending importance. | Writing → real projects → running/books → ordinary contact, with direct links to full pages. |
| [~54:08](https://www.youtube.com/watch?v=eojywvxqoLc&t=3248s) — exploring work | Make genuine examples easy to open; a visitor should be able to inspect the work itself. | Clear, entire-row links to articles and substantial case studies, not labels describing expertise. |
| [~56:07](https://www.youtube.com/watch?v=eojywvxqoLc&t=3367s) — scroll manipulation | Scroll-jacking interferes with the reader's control. | Keep native scroll, sensible reduced motion, no scroll-based hijinks. |

**Do not copy the video’s elaborate carousels/shaders as decoration.** Those are examples of craft in service of a particular use case. For this blog, a restrained editorial hierarchy and good writing are more valuable than technical flash.

## 5. Repo audit: what was actually found

Audited 15 November 2026, on `main` at `e51beb116ad38891b4751ed183e3e2c818f87930`. Verify the head and files afresh before edits.

- Astro 7, TypeScript 7, Bun, Markdown, fully static GitHub Pages site.
- Self-hosted **Literata** headings and **DM Sans** body, warm off-white paper and dark ink, restrained green accent. Worth keeping unless an actual visual comparison justifies change.
- Existing homepage in `src/pages/index.astro`: professional hero, portrait, a **9+ years / PhD / customer software** credentials strip, three work cases, career-focused “How I like to work”/FDE positioning, recent posts, running/books, and job-oriented contact.
- `src/layouts/SiteLayout.astro` currently places a site-wide banner **“100% AI-generated at this stage. Work in progress.”** *above the header*, and displays `George Sterpu, PhD` in the wordmark. Navigation: Work / Writing / About.
- `src/data/profile.json` headline: **“Building useful AI systems.”** Intro describes work on speech/multimodal AI and building automation, but ends with a generic statement about understanding constraints and building useful things.
- Homepage currently selects the **latest three posts by date**, not editorially meaningful pieces. On audit that meant two poems from October 2026 and the 2025 reading list.
- Work list currently presents three cases with company/category/period, tags and proof snippets: Honeywell GNN building topology, Xperi low-power speech, and AV Align at Trinity.
- Writing index already supports search, tag filters and result count, which may be excessive for its small catalogue. Avoid adding further UI complexity.
- The existing real portrait is `/img/profile_pic.jpg`. Existing genuine running image is `/img/running/glenmore.jpg`. **Use real assets, not stock images or generated replacements.**
- Existing published writing includes `src/content/posts/ferris_questions.md`, the `reading-list-2025` shelf, and `running.md`. Do not rewrite original authored writing just to harmonise it with a new visual style.

### Editorial assessment (subjective, not measured usability data)

**What feels impersonal:** “Building useful AI systems”; an immediate metrics/credentials strip; “Understand the problem. Work with the people”; an FDE-oriented conclusion; descriptive claims about professional strengths that could appear on hundreds of portfolios.

**What feels personally revealing:** George's answers in `ferris_questions.md` about social connection, indecision, what running changed for him, and exploring small towns. These ideas are concrete and imperfect in a good way. Prefer real observations over any generic “thought leadership” language.

**Credibility problem:** The global AI banner draws attention to authorship before presenting any actual work. However, **do not silently erase provenance**. The new Lacey brief expressly says to audit what is generated, assisted, authored or unreviewed first. Retain an accurate disclosure until that audit is complete; then decide whether clear piece-level attribution or a smaller truthful site-level note is appropriate. Do not pass machine-generated poems or essays off as personally authored.

## 6. Chosen editorial and visual direction

Two options were considered:

1. **Engineer's field notebook** — numbered entries, utilitarian rules and marginal annotations. Distinctive, but risks becoming another “designed concept” that advertises its own design.
2. **Warm personal editorial site** — an approachable first-person intro, well-curated pieces, real photos, readable type and restrained visual identity.

**Choose option 2**, with at most a hint of the field notebook in spacing, small annotations, chapter-style section headings or a recurring rule. Avoid the currently popular AI-site recipe of oversized claims, repetitive badges, massive cards, fake grain and gradient overload.

Design starting points:
- Keep or thoughtfully compare the existing Literata / DM Sans pairing.
- Quiet background, darker readable body copy, one restrained accent informed by the actual photos and book covers; no default purple simply because Lacey uses purple.
- Legible text at approximately 18–20px for long-form articles, line height 1.55–1.75, measure around 60–75 characters. Test rather than blindly applying.
- Use metadata sparingly; sensible title/summary/date/topic hierarchy.
- No carousel, scroll-jacking, unnecessary animation package, analytics, CMS, new JS framework, modal subscription funnel or fabricated testimonials.
- A little warmth in a footer or line of copy is welcome where it genuinely fits; don't force humour into navigation or technical evidence.

## 7. Exact homepage proposal: content and order

**The following is candidate copy for George to review, not already-published content or a claim of personal authorship.**

**Header:** `George Sterpu` (without “, PhD”) with links **Writing / Work / About**. Keep existing URLs. A secondary contact route stays available but don't add a prominent extra CTA competing with the headline.

**Hero, ahead of the content:**

- Small context line: **AI engineer · Bray, Ireland**
- Headline: **Hi, I'm George.**
- Intro:
  > I'm an AI engineer living in Bray, Ireland. I write about things I've worked on, books I've read, and questions I've been trying to answer. There's a running journal here too.
- Primary link: **Read the notebook** → `#writing`.
- Secondary text link: **See what I've built** → `#projects`.
- Retain the existing genuine portrait, without decorative job-role/status claim beneath it.

**Remove** the three-column qualifications strip entirely from the homepage. Preserve credentials in `/about/` and `/cv/`.

**Section 1 — Writing & reading** (first major section):

- Heading: **From the notebook.**
- Intro: **A few things I've written down, from changing my mind to keeping track of books.**
- Curate **actual entries**, not the newest three automatically:
  1. [Tribe of Mentors questions](/posts/ferris_questions/) — “Reflections on learning, community, and what matters.”
  2. [2025 Reading List](/posts/reading-list-2025/) — “Books on products, communication, AI and other ideas.”
- Link **All writing** → `/writing/`.
- Editorial caveat: verify the selected entries reflect George's preferred public representation; a shelf is different from an essay and should be styled honestly. Do not quietly change their published body copy or date.

**Section 2 — Engineering**:

- Heading: **Things I've built.**
- Intro: **Two projects I can discuss in public. The interesting parts were the constraints.**
- Link to [Speech recognition on a 100 mW processor](/work/edge-speech/):
  > An end-to-end speech recognition engine that could keep up with live audio, with a fixed one-second delay on the Ergo processor.
  Keep the 100 mW figure clearly scoped to the processor running that workload (not a finished consumer device), and the one-second delay accurately characterised.
- Link to [AV Align: learning to see speech](/work/av-align/):
  > Research into combining sound and lip movements for speech recognition—and what happened when the model struggled to use both.
  Keep collaborator credits, paper links, datasets, and limitations in the destination case study.
- Link **More projects** → `/work/`. Honeywell's proprietary building-automation account remains available there; it is not deleted or downplayed as false.
- Drop prominent company/category/tag/proof *clutter* from these two homepage previews. Keep a little credible detail where needed.

**Remove the current homepage “How I like to work” / forward-deployed engineering pitch.** Professional focus may remain on About/CV or an appropriate dedicated career section.

**Section 3 — Outside work**:

- Heading: **Running and reading.**
- Body:
  > I've kept a photo journal of races and runs, and a bookshelf of reading lists and notes. They're both here if you'd like a look.
- Existing Glenmore Marathon photo, appropriately cropped or contained with a truthful caption; check the actual asset and metadata.
- Links **Running journal** → `/posts/running/` and **Bookshelf** → `/books/`.

**Section 4 — Contact**:

- Heading: **Say hello.**
- Body:
  > Have a question, a correction, or a good book recommendation? Send me a note.
- Links **Email me** (existing `profile.email`) and **LinkedIn** (existing `profile.linkedin`). Don't write fabricated inbox or form confirmation messages.

**Proposed default SEO description** in `src/data/profile.json`:
> George Sterpu's notebook: writing, machine-learning projects, books and running, from Bray, Ireland.

**Proposed profile headline data** (adapt existing shape rather than adding parallel state):

~~~json
{
  "headline": {
    "lead": "Hi, I'm",
    "emphasis": "George."
  }
}
~~~

**Do not change** personal biographical facts, employer claims, research results, awards, dates, article bodies, URLs, or underlying experience data as part of this first visual pass.

## 8. Exact file-level change map

| Priority | File | Intended change |
|---|---|---|
| P0 | `src/layouts/SiteLayout.astro` | Reorder nav Writing/Work/About, simplify wordmark, reduce competing header CTA; address global AI disclosure **only after a provenance review**. |
| P0 | `src/data/profile.json` | Replace homepage headline, intro, and SEO description using §7; keep existing professional data intact. |
| P0 | `src/pages/index.astro` | Implement section hierarchy and exact candidate copy in §7, remove credentials strip/working-note career pitch, curate featured posts and two work projects. |
| P1 | `src/styles/global.css` | Adapt existing CSS for the new hierarchy; remove dead homepage styles where safe, tune type/spacing/portrait and mobile behavior without affecting other pages. |
| P1 | `public/social-card.png` | Headline changes: regenerate with project script and **inspect** output before including; do not invent text overlay. |
| P2 | `src/pages/about.astro` | Later: rewrite as a clear personal narrative with links to evidence and CV, not a second résumé; keep existing factual experience. |
| P2 | `src/pages/writing.astro` | Later: consider reducing search/filter affordances for a small catalogue; preserve direct links and progressive enhancement. |
| P2 | `src/components/PostList.astro` / `WorkList.astro` | Reuse where possible; only change shared patterns if the design requires it, and inspect their effects on other routes. |
| P3 | `docs/design.md` | Once a new direction is approved, update old career-first rationale so future agents don't inadvertently revert the redesign. |

There was an **uncommitted, untested ~166-line Astro proposal** prepared in the previous ChatGPT conversation. It proposed precisely the hero, curated post IDs (`ferris_questions`, `reading-list-2025`), two project rows, running/reading block and contact wording described above. This document deliberately contains the full content specification so the next agent does **not** require access to that conversation or its private temporary attachments. Use current source and this brief as the authority; reconstruct cleanly rather than assuming the prior snippet was build-verified.

## 9. AI provenance and publication policy

This is an independent editorial task, not a cosmetic trick:

1. Inventory published content and its known authorship / generation status; **do not guess** a piece's origin from its writing style.
2. Ask George about any ambiguous creative work or claims.
3. Distinguish **personally authored**, **AI-assisted and reviewed**, and **substantially AI-generated** work when material.
4. Retain accurate disclosure until a decision is made. Replace blanket “100% AI-generated” messaging only when an honest alternative has been approved.
5. Evaluate whether generated creative content merits publication, revision, clear attribution, or archival; do not remove or silently rewrite poems and essays without permission.
6. Keep first-person speech natural. Polish grammar without erasing authentic rhythm; reject empty slogans. A useful editorial test: **Could this sentence appear unchanged on 500 other personal websites?** If yes, it may be filler.

Avoid the trap of removing a “generated by AI” badge while leaving the underlying generic or unreviewed writing unchanged.

## 10. Implementation workflow for Codex on Omarchy Linux

**Environment:** George intends to work with Codex on an Omarchy (Arch-based) laptop. The repository's older `AGENTS.md` contains a Windows-specific checkout path and local `.tools/bun.exe` commands from the original workstation. On Omarchy, use the actual authorised checkout location and Linux-native Bun; do not assume `D:\work\new_blog` exists. Preserve the repository's other safety and publishing rules. Don't change global tooling or OS settings merely for the redesign.

Suggested sequence for the **future** Codex agent *when George asks for implementation*:

1. Open the repo in the local Codex working directory; `git status`, `git branch --show-current`, `git log -1`. Protect existing uncommitted user edits. Read `AGENTS.md`, this brief, `docs/design.md`, `docs/editing.md`, relevant research memo(s), actual pages/posts, and source.
2. Propose a short implementation plan with scope and visual hypotheses. Reconcile contradictory previous design requirements explicitly.
3. Work locally in a reviewable branch or checkout **when George authorises that workflow**. Do not force a branch/push contrary to repo/user instructions.
4. Use Bun and the existing lockfile. Example Linux-local commands when Bun is available:

   ~~~bash
   bun install --frozen-lockfile
   bun run dev
   # in another terminal, after implementing the changes:
   bun run verify
   ~~~

   The app uses Astro static output; do not replace its runtime or add a frontend framework. Run `bun run social:card` if modifying the headline, subject to the browser prerequisite described in `AGENTS.md`.
5. Start the actual development/preview server and visually inspect the homepage and representative linked pages. Do not treat green CI or a successful build as proof of appealing or accessible design.
6. Generate **representative screenshots** for George to inspect easily:
   - Desktop homepage **1440 × 900** — first viewport and full page.
   - Mobile homepage **390 × 844** — first viewport and full page (important for Pixel 8 usage).
   - Tablet / narrow desktop **768 × 1024** if layout ambiguity arises.
   - Writing index and one substantial article; one technical work page; the books and running layouts, at least at mobile and desktop.
   - If available, an annotated before/after screenshot comparison using the same viewport and content.
   - Store output in a clearly named local review directory (for example `.tools/redesign-review/`); **don't commit generated screenshots unless George asks**.
7. Evaluate 200% text enlargement, keyboard focus, reduced motion, long titles and words, actual image loading, Unicode, functional RSS and link/anchor integrity, browser navigation and mobile touch targets.
8. Present the screenshots and a concise decision log: what changed, what was intentionally left alone, uncertain content/provenance, any test failures, and concrete next iterations.
9. **Wait for explicit approval of final publishing**. Do not push, merge, or deploy the redesign based solely on this document.

### Why screenshots are important

George wants to talk through changes and review them on his phone. The first iteration should be *actual rendered UI* on real content, not a generic mock-up, an unrelated stock photo, or a textual claim that it “looks professional.” Differences in hierarchy, type scale, image crops and mobile wrap only become clear in screenshots.

## 11. Acceptance criteria

The redesign is ready for George's approval when:

- A first-time visitor can say, within a glance, **who George is and why this site exists**.
- **Writing is discoverable in or immediately after the first viewport**; there is no credentials wall before it.
- Homepage previews point to actual published writing and genuine inspectable engineering evidence.
- A visitor who wants the CV or professional case studies can still reach them easily.
- Copy sounds concrete, first-person and personal; the design is not trying to impress through buzzwords or decorative metrics.
- Running and books feel genuinely part of the site rather than generic “outside work” branding.
- The palette and typography support comfortable reading and adequately contrast (WCAG AA ordinary text 4.5:1, qualifying large text 3:1); test relevant muted text as well.
- On mobile there is no clipped navigation, illegible small text, broken photo crop, scroll hijacking or sideways page overflow.
- Published Markdown files, legacy URLs, citation links, assets, RSS and professional evidence remain intact.
- AI-provenance disclosure is accurate or explicitly held as an unresolved editorial decision.
- `bun run verify` passes, the changed homepage is manually inspected, and the social card is checked where required.
- George has seen desktop/mobile screenshots and explicitly approved the resulting site **before** production deployment.

## 12. What is explicitly *not* requested

- Do not redesign the blog merely by changing the accent to purple or copying Lacey's product UI.
- Do not add a mascot, fake illustrations, AI-generated personality, client testimonials, activity counters, complex carousels, decorative shaders, extensive animation or scroll-jacking.
- Do not invent new projects, impact metrics, CV facts, customer stories, race results or reflective essays.
- Do not migrate away from Astro, introduce a CMS/React app, add analytics or restructure the whole content system without a separate reason.
- Do not silently edit published poetry, notebooks, book passages or research evidence.
- Do not expose unpublished private CV material merely because an assistant has access to it.
- Do not make production changes from this handoff alone.

## 13. Final instruction / prompt for the next agent

> You are working on George Sterpu's personal blog, `georgesterpu/georgesterpu.github.io`, on an Omarchy Linux laptop.
>
> Read `AGENTS.md`, `docs/engineers-notebook-redesign-brief.md`, the current site's files and representative original content.
>
> Implement a coherent **engineer's personal notebook** redesign based on this brief. It should be welcoming, calm, specific and recognisably George's, with writing first, genuine engineering projects, and running/books in supporting chapters. Keep the site simple, readable, accessible and honest. Reuse Astro, Bun and existing data/Markdown rather than adding a new framework.
>
> Use the §7 homepage copy as a **candidate**, not an unquestionable quotation from George. Make sensible editorial suggestions but do not invent biography or results. Audit the global AI disclaimer rather than deleting it without provenance review.
>
> Run the repository's verification commands. Produce actual **desktop and mobile screenshots** of the implementation, including before/after comparisons if available. Explain your reasoning, limitations and issues. **Show George the results before any push, merge or deployment.** Do not modify production or erase source history without his explicit approval.

---

*This is the single consolidated handoff requested on 15 November 2026, combining the user's feedback, the Lacey-derived design document, the Design Review video transcript, the blog source audit and the candidate homepage proposal. No redesign is claimed to have been implemented.*