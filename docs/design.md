# Design direction

**Quiet editorial**, chosen by George. Warm white, dark ink, restrained green. Literata for expressive headlines, DM Sans for navigation and reading. Both fonts are self-hosted. The visual hierarchy should feel like a considered personal publication.

## The first visit

The primary reader is someone considering George for a forward deployed engineering role. Within the first screen they should understand:

- who he is: an AI engineer with a research background;
- what he brings: problem understanding, product thinking, and technical delivery;
- where to go next: selected work, writing, or contact.

The homepage progresses through identity → evidence → working approach → writing → personal context → contact. Navigation uses the direct labels Work, Writing, and About. No carousels, hidden navigation, splash screen, decorative charts, or interactive skill meters.

## Evidence and positioning

Three work notes appear newest first: production-governed building ML at Honeywell, real-time speech on a 100 mW processor at Xperi, and AV Align doctoral research at Trinity College Dublin. Industry accounts use the supplied October 2026 CV; the research account also links to the original papers and code. The evidence and contemporary comparisons are recorded in `research/av-align.md`. FDE is presented as the intended next direction, while the existing title remains Senior AI Engineer.

Industry wording and source boundaries are documented in `research/industry-work.md`. Use specific first-person accounts and concrete constraints. Prefer “governed endpoint” to a broad “production” claim, and keep processor power and decoding latency attached to the reported speech workload. Avoid generic portfolio slogans and invented personal anecdotes. The homepage should explain the work in plain language before asking readers to explore it.

The original blog's reading lists, running journal, reflections, publications, and portrait keep the site personal. Technical writing can grow naturally as George adds real notes; the site does not fabricate a backlog of engineering articles.

## Reading and accessibility

Articles have a narrow reading measure, distinct heading levels, visible focus states, restrained link styling, and a table of contents for long entries. Navigation and reading work without JavaScript. Search and topic filtering progressively enhance the writing index. Mobile layouts, reduced motion, print styles, and image alternatives are part of the shared stylesheet.

## Books and running

Books are grouped into year and subject shelves. Covers appear in a consistent responsive grid, with title and author beneath. A search finds titles or authors within the current shelf. Long saved passages get a dedicated reading page with a link back to the exact book card. This keeps the shelf scannable and avoids opening a very long quotation inside a narrow grid column. A book without notes remains a simple catalogue entry.

The running journal groups events by year, with direct year links and compact photo cards. Each card puts the date, event, and written result together. The lead photograph uses containment so portrait shots and group photographs are not cropped to fit the frame. Extra photographs use native expandable galleries. Old event anchors remain available.

Astro templates, CSS Grid, links, and native `details` controls cover these interactions. No carousel, lightbox, or catalogue library is required. The source model is one Markdown file per book or event, making agent-assisted edits small and reviewable.

## Sources

- Supplied CV: `cv/CV_George_Sterpu_Oct2026.pdf` (local reference only).
- Original blog checkout: `legacy/`; exact source commit recorded in `migration.json`.
- Public-facing copy is editable and should be reviewed by George before the first release, particularly the new professional positioning and work notes.
