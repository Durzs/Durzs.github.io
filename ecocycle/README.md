# EcoCycle — collector system demo video

An animated explainer of how the EcoCycle used-cooking-oil (UCO) collection system works, built
from the *EcoCycle Final Proposal* (Pavuna–Meriti basin, Rio de Janeiro). English, 5:04, 1920×1080.

- **Watch it in the browser:** [`index.html`](./index.html) — a self-contained page (no network
  needed, fonts embedded). Plays automatically; has play/pause, a scrubber and chapter buttons.
- **Video file:** `EcoCycle_Collector_System.mp4` (H.264, 1080p, 30 fps, no audio track).
- **Narration:** [`NARRATION.md`](./NARRATION.md) is the full spoken script with timecodes;
  `EcoCycle_Collector_System.srt` is the same text as subtitles, ready to drop on the MP4 or to
  use as a voice-over script.

## What the video covers

| Time | Section |
|------|---------|
| 0:00 | Title |
| 0:09 | The problem — oil down the drain, fatbergs in the pipes |
| 0:33 | The flood — blocked drainage during the rainy season |
| 0:48 | The value gap — cardboard R$0.15–0.40/kg vs UCO R$0.80–2.50/L |
| 1:07 | The missing layer — why a collector system is the intervention |
| 1:26 | **Step 1** — the establishment registers, gets a coded PET bottle |
| 1:50 | **Step 2** — the catador collects at the door and scans the QR |
| 2:18 | **Step 3** — pooled at the neighbourhood hub, tested, reconciled |
| 2:46 | **Step 4** — sold under contract to several processors (the PROVE lesson) |
| 3:10 | **Step 5** — revenue split 40 / 20 / 20 / 20 |
| 3:40 | **Step 6** — the data loop: forecasting, routing, retention, dashboards |
| 4:10 | The whole cycle, end to end |
| 4:30 | Pilot results — 75,678 L/yr, BCR 1.08, SROI 1.27, ~91 t CO₂e |
| 4:51 | Close |

Every figure shown comes from the proposal (Jardim América pilot, moderate 25% collection scenario).

## Design system

One semantic colour code is taught early and held throughout:

| Colour | Meaning |
|--------|---------|
| Amber `#DE9226` | the oil — the material itself |
| Teal `#0E5A63` | the collector system: routes, hub, platform |
| Green `#1F7A4D` | money and value flowing back to people |
| Blue `#3E6BB5` | water, river, drainage |
| Coral `#C8452F` | harm: fatbergs, floods, single-point failure |

Act 1 (the problem) plays on a dark ground and the page brightens as the system is introduced.
Type: Bricolage Grotesque (display), Public Sans (narration), IBM Plex Mono (data and labels),
all embedded as base64 so the page works offline.

## Rebuilding

The page is generated from `src/` so the copy in this folder stays a single self-contained file.

```bash
cd src
python3 build.py                 # writes ../index.html
node   render.js                 # writes ../EcoCycle_Collector_System.mp4 (needs playwright + ffmpeg)
```

`src/` layout:

- `shell.html` — page chrome, CSS tokens, controls (`/*FONTS*/` and `/*APP*/` are splice markers)
- `fonts.css` — the three typefaces, base64-inlined
- `app-core.js` — timeline helpers plus the icon library (shop, catador, bottle, drum, plant, …)
- `app-scenes-a.js` … `app-scenes-d.js` — the fourteen scenes
- `app-player.js` — the transport: `render(t)` is a pure function of time, which is what makes
  frame-exact MP4 capture possible
- `build.py`, `render.js`

To change wording, edit the `cues` array of a scene (`[start, duration, 'text']`, seconds relative
to the scene) and rebuild. To change a scene's length, edit its `dur`; everything after it shifts
automatically.

## Adding a voice-over

The video ships silent, with the narration on screen. To add a recorded voice track:

```bash
ffmpeg -i EcoCycle_Collector_System.mp4 -i voiceover.wav \
       -c:v copy -c:a aac -b:a 192k -shortest EcoCycle_Collector_System_narrated.mp4
```

`NARRATION.md` gives the timecode each line has to land on.
