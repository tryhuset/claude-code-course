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

## Step 3 — Create the README

Create a single file at `projects/<name-lowercased>/README.md`. No other files.

```markdown
# <App Name>

<Two-sentence description of what the app does and who it's for.>

## What it should do

<3–5 bullet points describing the core features, written as user-facing capabilities.
Example: "- Log when you last watered each plant">

<If the participant provided code style preferences, add a `## Style preferences` section here and reproduce their guidelines faithfully.>
```

That's it. The participant will plan and build the rest themselves during the course.

---

## Step 4 — Show the summary

After creating the file, display this:

```
Your project is ready.

  App:    <App Name>
  Idea:   <one-liner>
  Folder: projects/<name>/

What's in there:
  README.md   describes your app and its core features

Next up: open the folder in Claude Code and use plan mode to
figure out how to build it. The course will walk you through each step.
```

---

## Notes for instructors

- This skill is idempotent: re-running it with the same name produces the same project folder (same idea, same structure). Safe to run again if something went wrong.
- The deterministic idea assignment means instructors can predict each participant's project in advance.
- If a participant genuinely dislikes their assigned app, allow them to pick any other from the list — consistency matters less than motivation.
