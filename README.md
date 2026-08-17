# Day Dial

Budget your 24 hours: allocate tasks on a dial, see what stays free, tick things off.

## Just using it

Open `index.html` in any browser. Everything works — the dial, plans, drag-to-reorder,
the checklist. Your data is stored by the browser and stays on your device.

## Putting it on a phone home screen

Home-screen install needs the files served over `https://`, not opened as a local file.
Any static host works, and all of them are free for something this small:

1. Put this whole folder online — drag it onto [netlify.com/drop](https://app.netlify.com/drop),
   or push it to a GitHub repo and turn on GitHub Pages, or drop it in any web host's folder.
2. Open the resulting URL on your phone.
3. **iPhone (Safari):** Share → *Add to Home Screen*.
   **Android (Chrome):** menu → *Install app* / *Add to Home screen*.

It then opens full-screen with no browser chrome, and works with no signal —
the service worker caches the app on first visit.

## Where your data lives

Plans, tasks, checklist items, and ticks are saved in the browser's local storage on
that device. Nothing is uploaded anywhere. Consequences worth knowing:

- The phone copy and the laptop copy are **separate**. They do not sync.
- Clearing site data for the host wipes the plans.
- Use **Export** to write a JSON backup, and **Import** to load it elsewhere.

On iOS, a home-screen app's storage can be evicted after long periods of disuse.
If a plan matters, export it occasionally.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app — markup, styles, and logic |
| `manifest.webmanifest` | Name, colours, and icons for installation |
| `sw.js` | Service worker for offline use |
| `icon-192.png`, `icon-512.png` | App icons |
| `icon-maskable-512.png` | Android adaptive icon |
| `apple-touch-icon.png` | iOS home screen icon |
| `favicon-32.png` | Browser tab icon |
| `logo.png` | Mark shown in the page header |

Editing `index.html` after installing? Bump `CACHE` in `sw.js` (e.g. `day-dial-v2`)
so the old cached copy is replaced.
