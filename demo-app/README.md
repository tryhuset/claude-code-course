# Notely — Demo App

A deliberately vulnerable note-taking API used as the target for the `/security-audit` skill demo in the Claude Code course.

**Do not deploy this to production.** It contains intentional security vulnerabilities for educational purposes.

## Running locally

```bash
npm install
npm start
```

The API runs on `http://localhost:3000`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Log in, receive JWT |
| POST | `/auth/register` | Register a new account |
| GET | `/notes` | List your notes |
| POST | `/notes` | Create a note |
| GET | `/notes/:id/render` | Render note as HTML |
| DELETE | `/notes/:id` | Delete a note |
| GET | `/users/search?q=` | Search users |
| PUT | `/users/:id` | Update a user profile |
| POST | `/preview/url` | Fetch a URL for link preview |
| POST | `/files/upload` | Upload a file |
| GET | `/files/read?path=` | Read a file from the server |
| GET | `/admin/users` | List all users (admin) |
| POST | `/admin/backup` | Backup the database (admin) |
| POST | `/admin/run` | Run a shell command (admin) |

## Seeded accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | admin |
| alice | hunter2 | user |
