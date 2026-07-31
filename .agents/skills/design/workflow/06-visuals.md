# Workflow 06 — Visuals: Charts, Stock Images, AI-Generated Images

**Goal:** decide per page whether it needs a visual, and where the visual comes
from: data chart (code), user-provided asset, stock library, or AI image
generation. Every image must match its slot's aspect ratio BEFORE placement.

Record per-page visual choices in the slide-top comment (see `05-compose` §8);
update `.deck/outline.md` / `.deck/spec.md` if a visual decision changes the
page structure or the locked design.

## 1. Decision tree per page

```
Does the page need a visual?
├─ No → text-only layout (Statement, Quote, Closing). Fine — many good decks are
│        mostly text with strong typography.
├─ Data to show → use pptxgenjsx <Chart> / <Table> (code-native, editable).
│        Chart choice: bar=compare, line=trend, pie/donut=share, scatter=correlation.
├─ Real-world subject (person, place, product, screenshot) →
│        user-provided asset first; else stock library (real photo).
└─ Abstract concept (metaphor, illustration, mood) →
│        AI image generation (stylistically consistent, no copyright issue).
└─ Background ambience → only for Cover/Section/Closing; keep text readable.
```

## 2. Stock vs AI-generated

| Criterion         | Stock (library)          | AI-generated                       |
| ----------------- | ------------------------ | ---------------------------------- |
| Needs to be real  | ✅ photos of real things | ❌ risk of fake details            |
| Style consistency | ❌ mixed styles          | ✅ same prompt style, consistent   |
| Cost / copyright  | license needed           | ✅ generally clean (verify policy) |
| Specific/abstract | ❌ hard to find          | ✅ describe exactly what you want  |

## 3. AI image generation rules

- **Decide the slot first** (w × h in inches), then generate at a close ratio:
  a 16:9 slot is 6.5 × 3.656 in; generate 1792×1024 or 1536×1024 px and
  crop/resize to the exact slot ratio with `image-tool.ts` (never place a
  mismatched ratio).
- Include the deck's palette/style in the prompt: "flat illustration, muted
  background #FAFAFA, one accent #7C3AED, no text".
- Avoid text in generated images — AI text renders poorly; add captions as
  pptxgenjsx `<Text>` instead.
- Generate at high resolution; the image tool resizes down, not up.

## 4. Fit images to slots (never stretch)

Always check aspect ratio before placing an `<Image>`:

```
npx tsx scripts/image-tool.ts --image src/media/images/photo.png
```

Compare native width/height to the slot w/h. If they don't match, **crop or
resize the asset first** (never let pptxgenjs stretch):

```
# crop to 16:9 then resize to 624×351 px (~6.5in × 3.656in @96dpi)
npx tsx scripts/image-tool.ts --image photo.png --crop 16:9 --resize 624x351 --output photo-ready.png
```

Then reference `photo-ready.png` in the slide. Same rule applies to stock and
AI-generated images.

## 5. Background images

- Only Cover / Section / Closing, or pages needing mood.
- Keep text readable: darken the image (transparency overlay) or place text on a
  solid surface block.
- Never put body text directly on a busy photo.

## 6. Captions & credits

- Every image gets a purpose; decorative-only images should be removed in QA.
- For stock photos, add a small credit/source caption where required
  (caption style, muted, 10 pt).
