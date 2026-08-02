# Workflow 06 — Visual Decisions, Assets, and Provenance

This workflow is invoked **inside stage 05 before visual-dependent coordinates
are finalized**. Its file number is a stable reference, not permission to add
imagery after composition.

## Contract

**Inputs:** outline page, core message, sources, approved style/palette, candidate
layout.
**Decision:** visual type, source, purpose, slot ratio, provenance, and asset
readiness.
**Output:** updated outline/spec mapping, prepared asset when needed, slide
comment fields.
**Gate:** changing a global style/layout rule reopens stage 04; ordinary
per-page asset choice does not.
**Validation:** ratio, resolution, license/policy/provenance, accessibility, and
path all pass.
**Resume:** read spec §7/§8 and slide `visual`/`asset` fields.

## 1. Decision tree

```text
Does this page need a visual to communicate its one idea?
├─ No → visual: none; use a text-led layout.
├─ Quantitative data → code-native Chart/Table; editable and source-linked.
├─ System, relationship, or sequence → code-native diagram/flow when practical.
├─ Real person/place/product/interface → user asset first; then licensed stock
│  or verified screenshot with permission/context.
├─ Abstract metaphor or illustration → generated or licensed illustration,
│  subject to policy/provenance review.
└─ Ambience only → restrict to Cover/Section/Closing unless justified.
```

A visual must clarify, prove, orient, or create an intentional moment. Remove
visuals that only fill empty space.

## 2. Record the decision before geometry

Update the page's plan with:

| Field             | Example                                                   |
| ----------------- | --------------------------------------------------------- |
| Purpose           | show trend, compare options, identify product             |
| Type              | `chart/bar`, `image/photo`, `diagram/flow`, `none`        |
| Source            | `F-3`, `user-material:product-shot`, stock URL, generator |
| Slot ratio        | `16:9`, `4:3`, `1:1`, or exact `w:h`                      |
| Asset status      | planned, ready, not-needed                                |
| Credit/provenance | owner/license/tool/model/date/prompt record               |

Store the preliminary intent in `outline.md`, final mapping in spec §7, and
exceptions/provenance in spec §8. Do not add another `.deck/` file.

## 3. Chart and table choice

- bar: compare categories;
- line: trend over ordered time;
- scatter: relationship/distribution;
- table: exact values or mixed text/data;
- pie/donut: only a simple part-to-whole with few categories.

Prefer one chart plus one takeaway. Preserve source IDs and units. Do not
convert an editable chart into a screenshot without a documented reason.

## 4. User, stock, and generated assets

Priority:

1. user-provided, approved asset;
2. authoritative/official screenshot or media with permitted use;
3. licensed stock asset;
4. generated illustration for suitable abstract/non-factual subjects.

Generated assets may reduce stock-search friction, but they do **not** guarantee
copyright clearance. Verify model terms, client policy, provenance, likeness,
trademark, sensitive-content, and jurisdictional restrictions. Never present a
generated person/place/product as documentary evidence.

For generated assets, record at least:

- tool/provider and model/version;
- generation date;
- prompt or prompt reference;
- reviewer/status;
- known restrictions.

Avoid generated text; add editable captions with pptxgenjsx.

## 5. Slot first, asset second

Lock the slot ratio before acquiring/generating an asset. Check metadata:

```bash
npx tsx scripts/image-tool.ts --image src/media/images/photo.png
```

If source and slot ratios differ, crop then resize:

```bash
npx tsx scripts/image-tool.ts --image photo.png --crop 16:9 \
  --resize 624x351 --output photo-ready.png
```

Never stretch to fit. Generate/download larger than the required pixel size and
resize down. Keep prepared assets in `src/media/images/` with stable names.

## 6. Background images and readability

Use image backgrounds mainly for Cover, Section, Closing, or a justified Moment.
Place text on a tested solid surface/overlay and verify contrast with the final
composite. Do not put body copy directly on a busy image.

Use palette values in prompts when helpful, but token rules apply to slide code;
prompt text is not a substitute for registered runtime tokens.

## 7. Caption, credit, and accessibility

- Add required credit/license captions in the approved caption token.
- Add a concise source or explanatory caption when the visual could be
  misinterpreted.
- Do not rely on color alone in charts; combine color with labels/shapes.
- Ensure critical chart labels and image details remain legible from the back
  of the room.

## Completion condition

Before stage 05 finalizes the page, the visual decision is `none/not-needed` or
all required asset, provenance, ratio, and credit checks are complete.
