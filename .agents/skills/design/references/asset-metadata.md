# Image Content Sidecars

Use an adjacent JSON sidecar to make a selected raster image's visual content
quickly understandable during visual preflight and later edits. This is a
**content card**, not an asset-management record.

## Scope and location

When a newly acquired or prepared raster image is selected for a deck and kept
in `src/media/images/`, create a same-basename sidecar next to it:

```text
src/media/images/croissant-baking-01--16x9.jpg
src/media/images/croissant-baking-01--16x9.meta.json
```

Do not create sidecars for temporary search candidates. Existing images do not
need retroactive sidecars unless they are selected or materially reworked.

The sidecar describes only what is visually present in the image. It must not
be treated as the source of truth for provenance, licensing, slide usage,
asset lifecycle, crop/resize history, file dimensions, or local paths. Keep
required source, credit, license, and asset references in the established
Stage 06 / `.deck` / slide-comment records. Do not add a fifth `.deck/` file.

## Content schema

`description` is required. All other fields are optional and should be omitted
when they add no useful, image-grounded information.

```json
{
  "description": "Freshly baked golden croissants on a tray in warm bakery light.",
  "subjects": ["croissants", "baking tray", "pastry"],
  "scene": "bakery",
  "style": ["warm", "artisan", "food photography"],
  "colorMood": {
    "dominant": ["C89452", "5E3821"],
    "brightness": "mostly-mid",
    "saturation": "medium"
  },
  "composition": {
    "subjectPlacement": "center",
    "copySpace": "limited",
    "framing": "Croissants fill most of the frame around the central tray."
  }
}
```

Allowed fields:

| Field         | Meaning                                                                                |
| ------------- | -------------------------------------------------------------------------------------- |
| `description` | Concise, literal description of the visible image.                                     |
| `subjects`    | Key visible people, objects, products, or places.                                      |
| `scene`       | Visible setting when it is clear.                                                      |
| `style`       | Visual treatment or mood, such as `warm`, `editorial`, or `high-key`.                  |
| `colorMood`   | Descriptive dominant colors and overall brightness/saturation.                         |
| `composition` | **Optional** factual observation of subject placement, visible copy space, or framing. |

Do **not** add `source`, `creator`, `license`, `usage`, `status`, `assetId`,
`path`, dimensions, crop/resize history, download date, or slide IDs. Those
are not image content.

## How to derive the fields

1. Inspect the final prepared file, not only a stock-site thumbnail or the
   pre-crop source:

   ```bash
   npx tsx scripts/image-tool.ts \
     --image src/media/images/croissant-baking-01--16x9.jpg
   ```

2. Use the tool's sampled dominant colors and brightness/saturation distribution
   as evidence for `colorMood`. These values describe the image only; they do
   **not** authorize new slide color tokens or replace `color-tool.ts`.

3. Review the actual image before adding `description`, `subjects`, `style`, or
   `composition`. Stock APIs may provide alt text, tags, dimensions, or a
   platform color, but they do not reliably provide focal area, copy space, or
   a presentation-safe text placement.

4. Add `composition` only when the observed framing will help select or place
   the image. It is optional, must be grounded in the downloaded image, and is
   revisited after a material crop.

## Relationship to Stage 06

Use this sidecar only after the page's visual purpose and slot ratio are locked.
It helps an agent decide whether the prepared asset remains suitable for that
slot; it does not replace the visual decision, required provenance, final crop
review, or final text-on-image readability check.
