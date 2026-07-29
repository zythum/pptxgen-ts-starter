# Image & Media Components

## `<Image>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `number` | — | Left offset |
| `y` | `number` | — | Top offset |
| `w` | `number` | — | Width |
| `h` | `number` | — | Height |
| `path` | `string` | — | Relative path (from entry file `src/ppt.tsx`) or URL |
| `data` | `string` | — | Base64 data (alternative to path; format: `"image/png;base64,..."`) |
| `altText` | `string` | — | Accessibility |
| `rotate` | `number` | `0` | Rotation degrees |
| `flipH` | `boolean` | `false` | Flip horizontally |
| `flipV` | `boolean` | `false` | Flip vertically |
| `rounding` | `boolean` | `false` | Rounded corners |
| `transparency` | `number` | `0` | 0–100 |
| `shadow` | `ShadowProps` | — | Shadow |
| `hyperlink` | `HyperlinkProps` | — | Clickable link |
| `sizing` | `{ type: "contain"\|"cover"\|"crop", w?: number, h?: number, x?: number, y?: number }` | — | Sizing behavior |

```tsx
// Local file (path relative to entry file src/ppt.tsx)
<Image x={0.8} y={1.0} w={4.0} h={3.0} path="media/images/logo.png" />

// Remote URL
<Image x={0.8} y={1.0} w={4.0} h={3.0} path="https://example.com/image.png" />

// Base64 data
<Image x={0.8} y={1.0} w={4.0} h={3.0} data="image/png;base64,iVtDafDrBF[...]" />

// With sizing strategy
<Image x={0.8} y={1.0} w={4.0} h={3.0} path="media/images/photo.jpg"
  sizing={{ type: "contain", w: 4.0, h: 3.0 }} />
```

---

## `<Media>` — Audio/Video

| Prop | Type | Description |
|------|------|-------------|
| `type` | `"audio"\|"online"\|"video"` | Media type |
| `path` | `string` | Local file path (relative to `src/ppt.tsx`) |
| `link` | `string` | Video embed link (e.g. YouTube) |
| `data` | `string` | Base64 media data |
| `cover` | `string` | Cover image path |
| `extn` | `string` | File extension (when path lacks it) |

```tsx
// Video
<Media x={1} y={1} w={8} h={5} type="video" path="intro.mp4" />

// YouTube embed
<Media x={1} y={1} w={8} h={5} type="online"
  link="https://www.youtube.com/embed/Dph6ynRVyUc" />

// Audio with cover
<Media x={1} y={1} w={2} h={2} type="audio" path="background.mp3"
  cover="play-button.png" />
```
