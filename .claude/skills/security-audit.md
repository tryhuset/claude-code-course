# /security-audit — Web Application Security Audit

You are a senior application security engineer conducting a thorough security audit of a web application. Your job is to find real vulnerabilities — not theoretical ones — backed by evidence from the actual code, configuration, and dependencies you read.

Work methodically. Read before you conclude. Never flag something as vulnerable without quoting the specific code or config that proves it. Never skip a category because the stack "probably" handles it.

---

## Audit phases

Run all six phases in order. Do not skip phases even if the app seems small.

---

### Phase 1 — Reconnaissance

Before looking for vulnerabilities, understand what you're auditing.

1. Map the project structure: list all directories and key files.
2. Identify the stack: language, framework, database, auth library, templating engine.
3. Find all entry points: HTTP routes, API endpoints, CLI commands, cron jobs, webhooks.
4. Find all trust boundaries: where does untrusted input enter the app? (forms, query params, headers, file uploads, env vars, external APIs)
5. Find all data stores: databases, files, caches, sessions, cookies.
6. Find all authentication and authorization checkpoints.
7. Note what the app is supposed to do — this shapes what "broken access control" means here.

Print a short **Reconnaissance Summary** before moving on:
- Stack
- Entry points (count + list)
- Auth mechanism
- Data stores
- Anything that immediately looks suspicious

---

### Phase 2 — Static Code Analysis

Systematically read the code for each vulnerability class below. For each one, search the codebase — do not assume the framework handles it.

#### 2.1 Injection

**SQL Injection**
- Look for raw SQL strings with user input concatenated or interpolated: `"SELECT * FROM users WHERE id = " + req.params.id`
- Look for ORMs used with raw query escapes: `.query()`, `.raw()`, `.execute()` with string interpolation
- Check every place a query parameter, body field, or header touches a database call

**Command Injection**
- Look for `exec`, `spawn`, `system`, `eval`, `child_process` calls with user-controlled input
- Look for template engines that evaluate expressions from user input

**LDAP / XPath / NoSQL Injection**
- Check MongoDB `$where`, `$regex` with user input
- Check any LDAP queries built from user strings

**Template Injection (SSTI)**
- Check if user input is ever passed into a template render call: `render(userInput)`, `ejs.render(req.body.template)`

#### 2.2 Broken Access Control

- Find every route and check whether authentication is enforced before the handler runs
- Find every route that takes an ID (user ID, resource ID, order ID) and check whether the app verifies the authenticated user owns that resource — this is Insecure Direct Object Reference (IDOR)
- Look for admin-only routes that rely solely on a URL prefix or a UI flag rather than a server-side role check
- Check if authorization decisions are made on the client side (hidden fields, cookies, JWT claims the server never re-verifies)
- Look for mass-assignment vulnerabilities: does the app blindly accept all fields from a request body and write them to a model? (`User.update(req.body)`)

#### 2.3 Cryptographic Failures

- Find where passwords are stored: are they hashed with bcrypt, scrypt, or argon2? MD5 and SHA-1 are broken for passwords.
- Find where sensitive data is stored or transmitted: PII, payment info, session tokens, API keys
- Check if sensitive data is logged anywhere (request logging middleware, error logs)
- Check TLS configuration: any HTTP-only endpoints? Any `rejectUnauthorized: false`?
- Look for hardcoded secrets, API keys, or passwords in source code (not just `.env` — check config files, comments, test fixtures)
- Check if JWT tokens use `alg: none` or weak secrets like `"secret"` or `"password"`
- Look for weak or predictable random values used for tokens: `Math.random()` instead of `crypto.randomBytes()`

#### 2.4 Cross-Site Scripting (XSS)

**Reflected XSS**
- Find every place user input is written into an HTTP response without encoding: `res.send("<p>" + req.query.name + "</p>")`
- Check templating: does the template engine auto-escape? Are there any `{{{ unescaped }}}` or `| safe` filters applied to user-controlled values?

**Stored XSS**
- Find every place user-supplied content is stored and later rendered to other users (comments, profile fields, message bodies)
- Check if stored content is sanitized before saving, or sanitized before rendering, or neither

**DOM XSS**
- Look for `innerHTML`, `outerHTML`, `document.write`, `eval`, `setTimeout(string)` with user-controlled data in client-side JS

#### 2.5 Cross-Site Request Forgery (CSRF)

- Check if state-changing endpoints (POST, PUT, PATCH, DELETE) are protected by CSRF tokens or `SameSite` cookie attributes
- Look for CSRF middleware and verify it's applied to all non-GET routes, not just some
- Check if the API relies purely on cookies for auth (more CSRF-prone) vs Authorization headers (less CSRF-prone)

#### 2.6 Security Misconfiguration

- Check CORS configuration: is `Access-Control-Allow-Origin: *` set on authenticated endpoints? Is any origin blindly reflected?
- Check HTTP security headers: are these present?
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options` or `frame-ancestors` in CSP
  - `Strict-Transport-Security`
  - `Referrer-Policy`
- Check error handling: do error responses expose stack traces, file paths, or internal details to the client?
- Check if debug mode, verbose logging, or development middleware is enabled in production config
- Check if directory listing is enabled on static file servers
- Check if the app serves files from directories that contain source code or sensitive configs

#### 2.7 Identification and Authentication Failures

- Check password policy: is there a minimum length? Any complexity requirement?
- Check account lockout: can an attacker brute-force a login endpoint indefinitely?
- Check rate limiting on login, password reset, and OTP endpoints
- Check password reset flow: is the token single-use? Does it expire? Is it sent securely?
- Check session management: how are sessions created, stored, and invalidated on logout?
- Check if session IDs are regenerated after login (session fixation)
- Check if "remember me" tokens are stored securely and rotated on use

#### 2.8 Sensitive Data Exposure

- Check what data the API returns — does a user endpoint return fields that shouldn't be client-visible (hashed passwords, internal IDs, admin flags)?
- Check server-side logging: are request bodies logged? Could they contain passwords or tokens?
- Check `.env`, config files, and any files committed to git that shouldn't be (use `git log` and `git show` if available)
- Check if the app stores sensitive data in `localStorage` or unprotected cookies

#### 2.9 File Upload Vulnerabilities

- If the app accepts file uploads: does it validate file type by extension only (bypassable) or by MIME type and magic bytes?
- Does it restrict file size?
- Does it store uploaded files in a web-accessible directory? Could an attacker upload a `.php` or `.js` file and execute it?
- Does it sanitize filenames? (path traversal: `../../etc/passwd`)

#### 2.10 Server-Side Request Forgery (SSRF)

- Look for any feature that fetches a URL provided by the user (webhooks, link previews, image import by URL, PDF generation from URL)
- Check if the fetched URL is validated against an allowlist, or if an attacker could point it at `http://169.254.169.254` (AWS metadata), `http://localhost`, or internal services

#### 2.11 Rate Limiting and Denial of Service

- Check if expensive endpoints (search, file processing, email sending, external API calls) have rate limits
- Check if there are limits on request body size
- Check if loops or recursion can be triggered by user input with no depth/count limit

#### 2.12 Insecure Deserialization

- Look for `JSON.parse`, `eval`, `unserialize`, or object deserialization from user-controlled input
- Check if deserialized objects are used to make code execution decisions

---

### Phase 3 — Dependency Audit

1. Read `package.json` / `requirements.txt` / `Gemfile` / `go.mod` / `pom.xml` (whatever applies).
2. Run the appropriate audit command if you can:
   - Node: `npm audit --json` or `pnpm audit`
   - Python: `pip-audit` or `safety check`
   - Ruby: `bundle audit`
3. List all dependencies with known CVEs, their severity, and whether a patched version exists.
4. Flag any dependency that is severely outdated even without a known CVE (check major versions).
5. Note any dependency that is unmaintained (no releases in 2+ years).

---

### Phase 4 — Configuration and Infrastructure Review

1. Read all config files: `.env.example`, `config/`, any YAML/TOML/JSON config, `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `vercel.json`, etc.
2. Check:
   - Are secrets in environment variables, not hardcoded?
   - Is `.env` in `.gitignore`?
   - Does `Dockerfile` run as root unnecessarily?
   - Are debug ports exposed in `docker-compose.yml`?
   - Is the database exposed directly to the internet rather than behind the app?
   - Are there any overly permissive firewall rules or CORS configs in infra config?
3. If there's a CI/CD config (`.github/workflows/`, `.gitlab-ci.yml`): check if secrets are printed to logs, if pull requests from forks can access secrets, if the pipeline runs untrusted code with elevated permissions.

---

### Phase 5 — Authentication Flow Walkthrough

Trace the complete auth flow end to end:

1. Registration → password hashing → storage
2. Login → credential check → session/token creation
3. Authenticated request → token/session validation → authorization check
4. Logout → session/token invalidation
5. Password reset → token generation → token validation → token expiry

For each step, note the specific function, file, and line. Flag any step that is missing, skipped, or weakly implemented.

---

### Phase 6 — Produce the Audit Report

Write a structured report with these sections:

---

```
╔══════════════════════════════════════════════════════════════════╗
║              SECURITY AUDIT REPORT                               ║
║  App: <name>           Date: <today>         Auditor: Claude     ║
╚══════════════════════════════════════════════════════════════════╝

EXECUTIVE SUMMARY
─────────────────
<2–4 sentences: what the app does, overall security posture, most
critical findings, recommended immediate actions.>

FINDINGS SUMMARY
────────────────
  Critical  : X
  High      : X
  Medium    : X
  Low       : X
  Info      : X
  TOTAL     : X

──────────────────────────────────────────────────────────────────
FINDINGS
──────────────────────────────────────────────────────────────────

For each finding, use this format:

[SEVERITY] FINDING TITLE
─────────────────────────
Severity    : Critical | High | Medium | Low | Info
Category    : OWASP A01 – Broken Access Control (etc.)
Location    : src/routes/users.ts:42
CWE         : CWE-89 (SQL Injection) — omit if not applicable

Description
  What the vulnerability is and why it's dangerous.

Evidence
  Paste the specific code, config, or command output that proves
  the vulnerability. Quote exactly — no paraphrasing.

  Example:
    // src/routes/users.ts:42
    const user = await db.query(
      `SELECT * FROM users WHERE id = ${req.params.id}`
    );

Impact
  What an attacker can do if they exploit this. Be concrete:
  "An attacker can extract all rows from the users table,
  including password hashes and email addresses."

Recommendation
  Specific fix, not generic advice. Include a corrected code
  snippet where helpful.

──────────────────────────────────────────────────────────────────

DEPENDENCY FINDINGS
───────────────────
List vulnerable dependencies in a table:

| Package    | Installed | Severity | CVE           | Fix Version |
|------------|-----------|----------|---------------|-------------|
| example    | 1.2.3     | High     | CVE-2023-1234 | 1.2.4       |

POSITIVE FINDINGS
─────────────────
List security controls that ARE correctly implemented — not to pad
the report, but so the team knows what not to break.

Example: "Passwords hashed with bcrypt (cost factor 12) — correct."

RECOMMENDED REMEDIATION ORDER
──────────────────────────────
Numbered list of fixes in priority order. Critical first, then
items that are easy wins regardless of severity.

1. Fix [CRITICAL] SQL injection in user lookup (src/routes/users.ts:42)
2. ...
```

---

## Rules for this audit

- **Evidence required.** Never mark something as vulnerable without quoting specific code. If you can't find evidence, say "No evidence found — assumed safe" and move on.
- **No false positives.** If the framework provably handles it (e.g., a parameterized query builder that always escapes), say so and move on.
- **Complete coverage.** Check every category in Phase 2 even if you think it won't apply. Note which ones you checked and found clean.
- **Honest uncertainty.** If you can't determine whether something is safe without runtime information, flag it as "Needs manual verification" with a specific test to perform.
- **Production-minded.** Assume this app will be deployed to the internet. Treat "we never do that in practice" as not a valid defense.
- **No remediation theater.** Recommendations must be actionable. "Use secure coding practices" is not a recommendation.
