# Bergen Cruise Crowd Tracker — Deployment Guide

A static web app showing per-day cruise passenger counts for Bergen, Norway during the 2026 season. Source data is from [cruisetimetables.com](https://www.cruisetimetables.com/bergen-norway-cruise-ship-schedule-2026.html); each day links to [bergenhavn.no](https://www.bergenhavn.no/en/arrivals) for day-of confirmation.

The site is a single self-contained page with offline support (service worker) and PWA manifest, so it installs cleanly to an iPhone home screen.

---

## Part 1 — Publish to GitHub Pages

You only have to do this once. Takes about 5 minutes.

### 1. Create the GitHub repository

1. Sign in at https://github.com (free account is fine).
2. Click the **+** in the top-right, then **New repository**.
3. Set:
   - **Repository name:** `bergen-cruise` (or anything you like).
   - **Public** (required for free GitHub Pages).
   - Leave "Add a README" **unchecked** — we already have one.
4. Click **Create repository**.

### 2. Upload these files

On the new repo page, click **uploading an existing file** (it's a link in the empty-repo message), then drag all of these into the browser:

- `index.html`
- `manifest.json`
- `sw.js`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`
- `favicon-64.png`
- `.nojekyll`  (important — without it, GitHub may rewrite the site)
- `README.md`  (optional)

Scroll down and click **Commit changes**.

> Note: `.nojekyll` is a hidden file. If your file picker hides it, on macOS press `⌘ + Shift + .` in Finder to reveal hidden files, then drag it in.

### 3. Turn on GitHub Pages

1. In the repo, click **Settings** (top nav).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, pick `main` and `/ (root)`. Click **Save**.
5. Wait 1–2 minutes. Reload the Pages settings page; you'll see a green box with your URL, something like:

   `https://YOUR-USERNAME.github.io/bergen-cruise/`

That URL is your live site. Open it in any browser.

---

## Part 2 — Add to iPhone home screen

1. Open the URL above in **Safari** on your iPhone (not Chrome — only Safari can add PWAs to the home screen).
2. Tap the **Share** button (square with up-arrow at the bottom).
3. Scroll down and tap **Add to Home Screen**.
4. The name "Bergen Cruise" is pre-filled. Tap **Add**.

You'll now see a Bergen Cruise icon on your home screen. Tap it — it opens full-screen, no Safari address bar, and works offline once you've loaded it once.

---

## Part 3 — Updating the data

The schedule is baked into `index.html` as of the day this was generated. If you want to refresh:

- Easiest: ask Claude (in Cowork) to "regenerate the Bergen cruise dashboard from the latest cruisetimetables data" and re-upload the new `index.html` to the same GitHub repo.
- After uploading, bump the service worker cache version: open `sw.js` and change `bergen-cruise-v1` to `bergen-cruise-v2` (then `v3`, etc.). This forces the iPhone-installed app to fetch the new data.

---

## File reference

| File | What it does |
|---|---|
| `index.html` | The whole app — chart, table, filters, data. |
| `manifest.json` | PWA metadata — name, icons, theme color. |
| `sw.js` | Service worker — caches assets for offline use. |
| `icon-192.png`, `icon-512.png` | Android / desktop install icons. |
| `apple-touch-icon.png` | iOS home-screen icon (180×180). |
| `favicon-64.png` | Browser tab icon. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

## Sources

- Schedule: https://www.cruisetimetables.com/bergen-norway-cruise-ship-schedule-2026.html
- Day-of confirmation: https://www.bergenhavn.no/en/arrivals
- Port capacity rules: 4 ships / 8,000 passengers per day
