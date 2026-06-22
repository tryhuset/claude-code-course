# /start — Claude Code Course Onboarding

Welcome a new participant to the **Claude Code, hands-on** workshop, assign them a unique project idea, and scaffold their project folder so they're ready to build from minute one.

---

## Step 1 — Greet and collect info

Introduce yourself briefly. Then ask the participant **two questions** (ask both at once, not one at a time):

1. **What's your name?** (first name is fine)
2. **Do you have any code style preferences or team conventions you'd like Claude to follow throughout the course?** Examples: "we use TypeScript strict mode", "we prefer functional style", "no semicolons". Press Enter to skip.

Wait for their answers before continuing.

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

Create this folder structure in `projects/<name-lowercased>/` relative to the current working directory:

```
projects/<name>/
├── CLAUDE.md
├── README.md
├── src/
│   └── main.ts
├── data/
│   └── .gitkeep
└── package.json
```

### `CLAUDE.md` content

```markdown
# <App Name>

<Two-sentence description of what the app does and who it's for.>

## Stack

- Runtime: Node.js with TypeScript
- Storage: Local JSON files in `data/`
- Interface: Interactive CLI (terminal prompts)

## Conventions

- Named exports only
- TypeScript strict mode (`"strict": true`)
- Prefer functions over classes unless managing complex state
- Keep files under 200 lines; extract when they grow
- Use descriptive variable names — no single-letter names outside loop counters
- No comments that restate what the code does; only comment *why* when non-obvious

<If the participant provided code style preferences, add a `## Team Style` section here and reproduce their guidelines faithfully.>

## Feature Backlog

_Empty — we'll fill this in together during the course._
```

### `README.md` content

```markdown
# <App Name>

<Same two-sentence description as CLAUDE.md.>

## Getting started

```bash
npm install
npm start
```

## Project layout

| Path | Purpose |
|------|---------|
| `src/main.ts` | Entry point |
| `data/` | Persisted JSON data |
```

### `src/main.ts` content

A minimal TypeScript stub that prints the app name and a "not implemented yet" message. No business logic.

### `package.json` content

Minimal: name (kebab-case of app name), version `"0.1.0"`, scripts `{ "start": "ts-node src/main.ts", "build": "tsc" }`, dependencies `{ "ts-node": "^10.9.0", "typescript": "^5.0.0" }`.

---

## Step 4 — Show the summary

After creating all files, display this summary (fill in the placeholders):

```
Your project is ready.

  App:    <App Name>
  Idea:   <one-liner>
  Folder: projects/<name>/

Files created:
  CLAUDE.md       project rules and context for Claude
  README.md       human-readable intro
  src/main.ts     entry point stub
  data/           where your app will persist data
  package.json    run with: npm start

What to do next (the course will walk you through each):
  1. Ask Claude to explain the scaffold — "what does each file do?"
  2. Pick your first feature and run: /plan
  3. Build it, then have Claude verify it works in the browser
  4. Publish as an artifact with: /share
```

---

## Notes for instructors

- This skill is idempotent: re-running it with the same name produces the same project folder (same idea, same structure). Safe to run again if something went wrong.
- The deterministic idea assignment means instructors can predict each participant's project in advance.
- If a participant genuinely dislikes their assigned app, allow them to pick any other from the list — consistency matters less than motivation.
