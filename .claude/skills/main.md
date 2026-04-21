# Images Deployment

When asked to deploy new images (or run "images_deployment"), follow these steps exactly. Send a progress message to the user before each step.

> **Session prerequisite:** Gmail and AWS require re-authentication at the start of every new session. Before doing anything else, verify both are accessible — if not, prompt the user to authenticate (`gcloud auth` / `aws configure` or equivalent) before continuing.

---

## Step 1 — Fetch images from email
- Tell the user: "📬 Fetching latest email from your inbox..."
- Search for the latest email from `nirellorwaizner@gmail.com`
- Read the email and retrieve its attachments
- Confirm there are **exactly 2 attachments**
- If not exactly 2, stop and tell the user: "❌ Expected 2 image attachments but found X. Please send an email with exactly 2 image files (fg and bg) and try again."
- Show the user both attachment names and ask which is **foreground (fg)** and which is **background (bg)** before continuing

---

## Step 2 — Create a new git branch
- Tell the user: "🌿 Creating a new git branch..."
- Ask the user for a branch name, or suggest one based on the email subject/date (e.g. `images/2026-04-09`)
- Create the branch from `main`: `git checkout main && git pull && git checkout -b <branch-name>`
- If the branch already exists, stop and tell the user: "❌ Branch `<branch-name>` already exists. Please choose a different name."
- Verify that `.claude/skills/` is present on the new branch (it should be, since the branch is created from `main`). If it is missing for any reason, copy it from `main`: `git checkout main -- .claude/skills/`

---

## Step 3 — Replace gallery images
- Tell the user: "🖼️ Replacing gallery images..."
- Download both attachments to `gallery/` inside the project root (`C:/Users/Nir/WebstormProjects/Colors_Editor_V2/gallery/`)
- Rename them, keeping the original filenames:
  - The **foreground** image → `fgGallery.jpg.png`
  - The **background** image → `bgGallery.jpg.png`
- Overwrite the existing files

---

## Step 3.5 — Increment version in title
- Read the current `<title>` element in `index.html`
- Extract the version number (e.g. `colors v4` → `4`)
- Increment it by 1
- Update the `<title>` element with the new version (e.g. `colors v5`)
- Tell the user: "🔢 Version bumped to colors vX"

## Step 4 — Verify sync with HTML and JS
- Tell the user: "🔍 Verifying HTML and JS are in sync..."
- Check `index.html` for references to `fgGallery.jpg.png` and `bgGallery.jpg.png`
- Check the JS bundle for the same references
- If any reference differs, update the code to match the filenames
- If everything is in sync, confirm: "✅ HTML and JS are in sync."

---

## Step 5 — Commit
- Tell the user: "💾 Committing changes..."
- Stage the gallery files: `git add gallery/`
- Commit with a clean, descriptive message, e.g.: `Update gallery images: fgGallery and bgGallery replaced`
- Push the branch to GitHub: `git push -u origin <branch-name>`
- If the push fails, stop and tell the user the error and suggest: "Check your GitHub credentials or remote URL with `git remote -v`."

---

## Step 6 — Create Amplify branch and trigger deployment
- Tell the user: "☁️ Creating Amplify branch and connecting to GitHub..."
- Create the branch in Amplify:
  - Command: `aws amplify create-branch --app-id drl128l7bfm5z --branch-name <branch-name> --region us-east-2`
  - If the branch already exists in Amplify, skip creation and proceed
  - If creation fails for another reason, stop and tell the user the error with the raw AWS message
- Trigger the build/deploy by starting a release job:
  - Command: `aws amplify start-job --app-id drl128l7bfm5z --branch-name <branch-name> --job-type RELEASE --region us-east-2`
  - This connects the GitHub branch to Amplify and kicks off the deployment

---

## Step 7 — Wait for deployment and report
- Tell the user: "🚀 Deployment started! Waiting for it to complete..."
- Poll the deployment status every 30 seconds using:
  `aws amplify list-jobs --app-id drl128l7bfm5z --branch-name <branch-name> --region us-east-2`
- Wait until status is `SUCCEED` or `FAILED`
- If `SUCCEED`:
  - Tell the user: "✅ Deployment successful! Your branch is live at: `https://<branch-name>.drl128l7bfm5z.amplifyapp.com`"
- If `FAILED`:
  - Fetch the job details for more info
  - Tell the user: "❌ Deployment failed. Here's what went wrong: <error details>"
  - Suggest fixes based on the error (e.g. build command issues, missing files, env vars)
