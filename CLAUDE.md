# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks and no build step: files are opened directly in a browser.

## Project Structure

- `README.md` – project readme
- `CLAUDE.md` – this file
- `index.html` – portal homepage
- `css/style.css` – shared styles and theme colours
- `js/theme.js` – light/dark theme toggle, used by every page
- `tools/` – one page per tool (`tool-1.html` is a placeholder)

Add new folders and files here as they are created.

## Key Requirements

1. Every page must be responsive and work on desktop, tablet and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess.

## Feature Plan

A portal where students try small tools for car and motorcycle maintenance.

### Portal structure

- **Homepage** (`index.html`): header with the theme toggle, a one-line intro, and a grid of tool cards.
- **Opening a tool:** the visitor clicks a tool card, which opens that tool's own page (e.g. `tools/maintenance.html`).
- **Getting back:** every tool page has a "Back to all tools" link to the homepage.
- **Adding a tool later:** create a new page in `tools/`, then add one card for it on the homepage. Shared styles and theme code are reused.

### Phases

1. **Phase 1:** the portal plus its first tool, the Preventive Maintenance Scheduler.
   - [x] Portal homepage with a placeholder tool card that opens and returns (done)
   - [ ] Build the Preventive Maintenance Scheduler
   - In: vehicle name, type (car or motorcycle), last maintenance date, frequency in days.
   - Out: next due date, days remaining, status (OK / Due soon / Overdue).
2. **Phase 2:** more tools, added one at a time.
3. **Phase 3:** polish and extras (to be decided).
