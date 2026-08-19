# Dini Vumijojo — Portfolio

A single-page portfolio built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## Files
- `index.html` — page structure and content
- `styles.css` — the "ops terminal" design system (ink navy + amber/teal accents)
- `script.js` — role-typing effect, nav behaviour, project filters, scroll reveal
- `images/` — put your photo here

## Running it
1. Open the `portfolio` folder in VS Code.
2. Install the **Live Server** extension (or similar), right-click `index.html` → **Open with Live Server**.
   - Or just double-click `index.html` to open it directly in a browser — everything works without a server.

## Adding your photo
1. Save your photo as `profile.jpg` inside the `images/` folder (`images/profile.jpg`).
2. Refresh the page — it swaps in automatically. Until then, a placeholder with your initials ("DV") is shown.
3. Recommended: a square photo, at least 500×500px, so it crops nicely into the circular frame.

## Things you'll likely want to personalise
- **Email**: currently set to `vumijojodini@gmail.com` in the contact section and the "Get in Touch" mailto link — swap in your preferred one if needed (one of your CVs uses `dinilamakholwa@gmail.com`).
- **Role rotator** (`script.js`, `roles` array): edit the four rotating job titles in the hero section.
- **Projects**: each `.project-card` in `index.html` has a `data-tags` attribute (`security`, `cloud`, `infrastructure`, `ai`) that powers the filter buttons — update these if you add or change projects.
- **Certifications**: the AWS Cloud Practitioner card is marked "Planned" — update its status once you've booked or passed the exam.

## Deploying
This is a static site, so any of these work with zero configuration:
- **GitHub Pages** (fits nicely since your projects already live on GitHub): push this folder to a repo, enable Pages in repo settings.
- **Netlify** or **Vercel**: drag-and-drop the folder for an instant live link.
