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
mkdir -p ~/.claude/skills/start && curl -fsSL https://raw.githubusercontent.com/tryhuset/claude-code-course/main/.claude/skills/start/SKILL.md -o ~/.claude/skills/start/SKILL.md
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

Claude will ask for your name, then assign you a project and scaffold the folder. Takes about a minute.

---

## What `/start` does

1. Asks for your name
2. Assigns you a unique app idea (deterministic — same name always gets the same project)
3. Creates a folder named after your app (e.g. `recipe-box/`) with just two files:
   - `README.md` — the spec: what your app should do and its core features
   - `CLAUDE.md` — standing instructions for Claude, plus one parked "future feature"

You'll plan and build the rest yourself during the course — plain HTML, CSS, and vanilla JS, no build step. This project is your canvas for every exercise.
