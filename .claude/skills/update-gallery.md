# Update Gallery from Email

When asked to update the gallery (or "sync gallery from email"), follow these steps exactly:

## Step 1 — Fetch latest email from own Gmail
- Search for the latest email from `nirellorwaizner@gmail.com`
- Read the email to retrieve its attachments

## Step 2 — Validate attachments
- Confirm there are **exactly 2 attachments**
- If there are not exactly 2, stop and inform the user — do not continue
- Show the user both attachment names and ask them to confirm which is the **foreground (fg)** and which is the **background (bg)** before proceeding

## Step 3 — Download to gallery folder
- Download both attachments to `gallery/` inside the project root (`C:/Users/Nir/WebstormProjects/Colors_Editor_V2/gallery/`)
- Rename them:
  - The **foreground** image → `fgGallery.jpg.png`
  - The **background** image → `bgGallery.jpg.png`

## Step 4 — Verify sync with HTML and JS
- Check `index.html` for `<img src="/gallery/fgGallery.jpg.png">` and `<img src="/gallery/bgGallery.jpg.png">`
- Check the JS bundle references if needed
- If the filenames in code differ, update the code to match

## Step 5 — Commit and push
- Stage the gallery files: `git add gallery/`
- Commit with a clear message describing the new images (e.g. `Update gallery images: <attachment names>`)
- Push the branch to GitHub: `git push -u origin <branch-name>`
