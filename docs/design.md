# Design direction

**Warm personal editorial**, approved by George after local desktop/mobile review in November 2026. Warm paper, dark ink, restrained green. Literata for expressive headlines, DM Sans for navigation and reading. Both fonts are self-hosted. Keep the genuine portrait in colour. The site is an engineer's personal notebook, with professional evidence available a layer deeper.

## The first visit

Within the first screen a reader should understand:

- who George is: an AI engineer living in Bray, Ireland;
- what is here: writing, books, running, and a short introduction to his work;
- where to start reading.

The homepage progresses through introduction → curated writing and reading → a concise work summary → running/books → contact. Navigation uses Writing, Work, and About. The work summary connects research, engineering and business problems, with a quiet link to earlier work. Avoid a homepage project showcase or credentials strip: George wants his approach to current problems to carry more weight than a list of past achievements. No carousels, hidden navigation, splash screen, decorative charts, or interactive skill meters.

## Evidence and positioning

Three historical work notes remain on `/work/`, newest first: production-governed building ML at Honeywell, real-time speech on a 100 mW processor at Xperi, and AV Align doctoral research at Trinity College Dublin. Industry accounts use the supplied October 2026 CV; the research account also links to the original papers and code. The evidence and contemporary comparisons are recorded in `research/av-align.md`. FDE is an intended next direction, not a title already held.

Industry wording and source boundaries are documented in `research/industry-work.md`. Use specific first-person accounts and concrete constraints. Prefer “governed endpoint” to a broad “production” claim, and keep processor power and decoding latency attached to the reported speech workload. Avoid generic portfolio slogans and invented personal anecdotes. Keep patents, invention disclosures and trade secret awards distinct; do not turn them into a homepage credentials list.

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
- The redesign brief records the earlier candidate proposal. George's subsequent review replaces its two homepage project previews with the brief work summary described above. Public-facing changes still require his approval before publication.
