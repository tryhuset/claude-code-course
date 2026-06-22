# Claude Code, hands-on — Course Materials

Workshop materials for the **Claude Code, hands-on** 4-hour morning session.

---

## Pre-work

Before the course, make sure you have:

- **Claude Code** installed — [installation guide](https://docs.anthropic.com/claude-code)
- **Enterprise login** completed (`claude login`)
- A terminal you're comfortable in (VS Code terminal works fine)

That's it. The rest happens during the session.

---

## Installing the `/start` skill

This is done together at the start of the course. Two options — the instructor will guide you:

### Option A — one-liner (recommended)

```bash
mkdir -p ~/.claude/skills && curl -fsSL https://raw.githubusercontent.com/tryhuset/claude-code-course/main/.claude/skills/start.md -o ~/.claude/skills/start.md
```

### Option B — clone the repo

```bash
git clone https://github.com/tryhuset/claude-code-course.git
cd claude-code-course
```

---

## Running the skill

Once installed, open Claude Code and type:

```
/start
```

Claude will ask for your name and any code style preferences, then generate your personal project and scaffold the folder structure. Takes about a minute.

---

## What `/start` does

1. Asks for your name and optional code style preferences
2. Assigns you a unique app idea (deterministic — same name always gets the same project)
3. Creates `projects/<your-name>/` with:
   - `CLAUDE.md` — project context and conventions Claude will follow
   - `README.md` — human-readable intro
   - `src/main.ts` — entry point stub
   - `data/` — where your app will persist data
   - `package.json` — run with `npm start`

You'll use this project as your canvas for every exercise in the course.

---

## Course outline

| Time | Section |
|------|---------|
| 09:00–10:00 | Foundations & First Contact |
| 10:10–11:00 | The Core Workflow |
| 11:15–12:05 | Make it Yours: Config & Context |
| 12:15–12:30 | More Power |
| 12:30–13:00 | Claude in a Team |

Full outline: [d.try.no/claude-code-kurs-outline](https://d.try.no/claude-code-kurs-outline)
