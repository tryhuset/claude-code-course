---
name: start
description: Get a project to build for the Claude Code workshop — you'll be assigned an app idea and get a ready-to-go project folder with a README spec and a CLAUDE.md, so you can start building right away.
---

# /start — Claude Code Course Onboarding

Welcome a new participant to the **Claude Code, hands-on** workshop, assign them a unique project idea, and scaffold their project folder so they're ready to build from minute one.

---

## Step 1 — Greet and collect info

Introduce yourself briefly. Then ask the participant **one question**:

1. **What's your name?** (first name is fine)

Wait for their answer before continuing.

---

## Step 2 — Assign a project idea

Use the participant's name to pick their project deterministically:
compute `(sum of char codes of lowercased name) mod 20`, then pick from this list (0-indexed):

| # | App | One-liner |
|---|-----|-----------|
| 0 | **Plant Watering Tracker** | Log when you last watered each plant and get reminders when they're due. |
| 1 | **Reading Log** | Track books you've read, are reading, and want to read — with ratings and notes. |
| 2 | **Lunch Roulette** | Spin to pick where to eat from your saved list of restaurants. |
| 3 | **Habit Streak Counter** | Track daily habits and visualize your streaks over time. |
| 4 | **Meeting Note Taker** | Paste an agenda, get a structured notes template. Save and search past meetings. |
| 5 | **Recipe Box** | Save recipes with ingredients and steps, then generate a shopping list. |
| 6 | **Travel Packing List** | Build smart packing lists based on destination and trip length. |
| 7 | **Movie Night Picker** | Add movies to a watchlist and pick one randomly for movie night. |
| 8 | **Workout Logger** | Log exercises, sets, reps, and weights. Track personal records. |
| 9 | **Daily Standup Helper** | Log yesterday / today / blockers and see a weekly summary. |
| 10 | **Birthday Reminder** | Add friends' birthdays, get reminders, and brainstorm gift ideas. |
| 11 | **Coffee Journal** | Rate coffees and roasters. Spot patterns in what you love. |
| 12 | **Vocabulary Builder** | Save new words with definitions. Quiz yourself. |
| 13 | **Code Snippet Library** | Save and search reusable code snippets by tag and language. |
| 14 | **Sleep Tracker** | Log sleep and wake times. Spot patterns in your sleep quality. |
| 15 | **Pet Health Log** | Track vet visits, medications, and milestones for your pets. |
| 16 | **Gratitude Journal** | Write three things you're grateful for each day. Look back over time. |
| 17 | **Budget Snapshot** | Log daily spending by category. See a monthly summary. |
| 18 | **Freelance Time Logger** | Track time per project and client. Generate invoice summaries. |
| 19 | **Language Learning Flashcards** | Create decks, flip cards, track mastery per word. |

Tell the participant which app they got and why it suits them (be brief and warm, not sycophantic).

---

## Step 3 — Scaffold the project

Create **one folder** named after the assigned app (kebab-case, e.g. `recipe-box`) directly in the current repo root, and put **two files** inside it — and only these two. Don't nest any further subfolders.

### `README.md` — the spec (what to build)

The human-facing description of the app and its features.

Keep every feature simple enough to build in plain HTML · CSS · vanilla JS with `localStorage` for persistence. **No third-party integrations, no backend, no accounts, no real notifications/email/SMS, no external APIs.** If the app's one-liner mentions "reminders," interpret that as an in-page list of what's due — not push notifications.

```markdown
# <App Name>

<Two-sentence description of what the app does and who it's for.>

## What it should do

<3–5 bullet points describing the core features, written as user-facing capabilities.
Example: "- Log when you last watered each plant">
```

### `CLAUDE.md` — standing instructions for Claude

How Claude should work in this repo (read into context every session). This is **not** the app spec — keep the feature description in the README. Put the working rules and one parked feature here.

```markdown
# <App Name>

Project context for Claude Code sessions in this repo.

## Rules
- Keep features small and focused.
- Build only one thing at a time — token cost is real.
- Plain HTML · CSS · vanilla JS. No build step.

<!-- FUTURE FEATURE (not yet) -->
<!-- <One parked feature that extends the app — do NOT build it now.
     We turn this into an artifact and build it with goal mode in Block 2.>
     Keep it buildable in vanilla JS + localStorage, no third-party services.
     Good fits: a simple stats/summary view, a search or filter, sorting,
     a "due today" list, or export to a downloadable file. -->
```

That's it. The participant will plan and build the rest themselves during the course.

---

## Step 4 — Show the summary

After creating the files, display this:

```
Your project is ready.

  App:    <App Name>
  Idea:   <one-liner>
  Folder: <app-name-kebab>/

What's in there:
  README.md    describes your app and its core features
  CLAUDE.md    standing instructions + a parked "future feature"

Next up: drop into plan mode right here and figure out how to
build it. The course will walk you through each step.
```

---

## Notes for instructors

- This skill is idempotent: re-running it with the same name produces the same idea and the same folder with the same two files. Safe to run again if something went wrong.
- The deterministic idea assignment means instructors can predict each participant's project in advance.
- If a participant genuinely dislikes their assigned app, allow them to pick any other from the list — consistency matters less than motivation.
