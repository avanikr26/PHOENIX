# SECURITY.md --- Inclusive Interface

# 1. Purpose

This document defines the security, privacy, data-handling, dependency,
deployment, and abuse-prevention guidelines for **Inclusive Interface**.

The security strategy is intentionally lightweight because the MVP is a
client-side educational game.

The primary goal is:

> **Keep the player safe, collect as little data as possible, and avoid
> unnecessary technical attack surfaces.**

------------------------------------------------------------------------

# 2. Security Philosophy

The MVP should follow:

``` text
MINIMAL DATA
+
MINIMAL DEPENDENCIES
+
NO UNNECESSARY BACKEND
+
NO REAL MEDICAL DATA
+
NO SECRETS IN CLIENT CODE
+
SAFE CONTENT HANDLING
```

Do not add infrastructure simply because it is technically possible.

------------------------------------------------------------------------

# 3. Security Scope

This document covers:

-   Player data
-   Local storage
-   Input handling
-   XSS prevention
-   Dependency security
-   Client-side secrets
-   Fake appointment data
-   External resources
-   Deployment
-   Content integrity
-   Error handling
-   GitHub security
-   AI coding-agent safety
-   Privacy
-   Future backend considerations

------------------------------------------------------------------------

# 4. Threat Model

The MVP is a browser-based game.

Potential threats include:

``` text
Malicious player
        ↓
Browser developer tools
        ↓
Modified game state
        ↓
Modified score / progress
```

Other threats:

``` text
Malicious input
        ↓
DOM injection / XSS
```

``` text
Compromised dependency
        ↓
Malicious code execution
```

``` text
Accidentally committed secret
        ↓
Public GitHub repository
        ↓
Credential abuse
```

The MVP does **not** need to defend against high-value financial or
medical attacks because it does not process real financial or medical
transactions.

------------------------------------------------------------------------

# 5. Data Classification

Use the following classification.

## Public

Safe to expose:

``` text
Game content
Character names
Fictional dialogue
Game assets
Public documentation
Game score during gameplay
```

## Internal

Development-related:

``` text
Build configuration
Debug logs
Development notes
Non-secret environment configuration
```

## Sensitive

Avoid collecting:

``` text
Real medical information
Real patient information
Real addresses
Government IDs
Passwords
Financial information
Precise personal location
```

The MVP should collect none of these.

------------------------------------------------------------------------

# 6. Player Registration

The game's:

``` text
SIGN UP TO EXPERIENCE
```

screen is **not real authentication**.

It should not request:

-   Password
-   Email unless genuinely required
-   Phone number
-   Address
-   Government ID
-   Medical information

Recommended:

``` text
Name
Username
```

Even these should be treated as optional gameplay identity rather than
verified identity.

------------------------------------------------------------------------

# 7. No Real Authentication

Do not implement:

``` text
OAuth
JWT authentication
Password storage
Session authentication
Email verification
```

unless a future version genuinely requires accounts.

The MVP should use local/session state.

------------------------------------------------------------------------

# 8. No Passwords

The game must never ask the player for a password.

If a password field appears in the prototype:

> Remove it.

The game does not need authentication to demonstrate its concept.

------------------------------------------------------------------------

# 9. Local Storage

If `localStorage` is used, store only the minimum game state.

Example:

``` json
{
  "version": 1,
  "playerName": "Alex",
  "username": "alex01",
  "score": 325,
  "completedChallenges": ["rahul-01"],
  "categoryScores": {
    "visual": 100
  }
}
```

Do not store:

``` text
passwords
tokens
medical information
payment details
private API keys
```

------------------------------------------------------------------------

# 10. Local Storage Is Not Secure Storage

Assume anything in browser storage can be inspected or modified.

Therefore:

> Never place secrets in `localStorage`.

Game score and progress are acceptable because they are not
security-sensitive.

------------------------------------------------------------------------

# 11. Client-Side Trust

The client is not trusted.

A player can potentially modify:

``` text
score
difficulty
completedChallenges
timer
gameState
```

This is acceptable for the MVP because:

-   There is no real-money reward.
-   There is no secure competition.
-   There is no sensitive server-side action.
-   The game is educational.

If online leaderboards are introduced later, scores must be validated
server-side.

------------------------------------------------------------------------

# 12. Input Validation

Validate all player-controlled input.

Examples:

``` text
name
username
dialogue choices
form fields
appointment selections
CAPTCHA input
```

Validation should include:

-   Type checking
-   Length limits
-   Expected value checks
-   Null/empty checks

------------------------------------------------------------------------

# 13. Name Validation

Recommended:

``` text
Minimum: 1 character
Maximum: 30 characters
```

Trim whitespace.

Example:

``` ts
const cleanName = name.trim();

if (!cleanName) {
  throw new Error("Name is required.");
}

if (cleanName.length > 30) {
  throw new Error("Name is too long.");
}
```

------------------------------------------------------------------------

# 14. Username Validation

Recommended:

``` text
Minimum: 3 characters
Maximum: 20 characters
```

Allow only a simple safe character set.

Example:

``` text
letters
numbers
underscore
hyphen
```

Avoid accepting arbitrary HTML.

------------------------------------------------------------------------

# 15. XSS Prevention

If user input is displayed in HTML:

> Never insert it directly as raw HTML.

Avoid:

``` js
element.innerHTML = playerName;
```

Prefer:

``` js
element.textContent = playerName;
```

If the UI is rendered entirely through Phaser text objects, still treat
player input as untrusted data.

------------------------------------------------------------------------

# 16. HTML Rendering

If dynamic HTML is absolutely necessary:

-   Escape user-controlled text.
-   Avoid arbitrary HTML.
-   Avoid inline script execution.
-   Avoid injecting unsanitized attributes.
-   Use trusted templates.

Do not use `eval()`.

------------------------------------------------------------------------

# 17. JavaScript Safety

Never use:

``` js
eval()
```

or:

``` js
new Function(...)
```

for gameplay data.

Content files should be parsed as data, not executed as code.

------------------------------------------------------------------------

# 18. Content Safety

Dialogue and challenge data may contain text.

Treat content as data.

Example:

``` json
{
  "speaker": "Rahul",
  "text": "I can't tell what these buttons do."
}
```

Do not dynamically execute content.

------------------------------------------------------------------------

# 19. Challenge Data Integrity

Challenge data should be validated at development/build time.

Check:

``` text
challenge ID
character ID
category
question
options
correct option
explanation
```

The `correctOption` must refer to an existing option.

------------------------------------------------------------------------

# 20. Content Validation Example

Invalid:

``` json
{
  "correctOption": "z",
  "options": [
    {"id": "a", "text": "..."},
    {"id": "b", "text": "..."}
  ]
}
```

The build/content validator should report:

``` text
Challenge rahul-01:
correctOption "z" does not exist.
```

------------------------------------------------------------------------

# 21. Fake Appointment Website

The appointment website is intentionally fictional.

Use fictional:

``` text
hospital
doctors
patient IDs
appointment IDs
locations
dates
```

Never use real patient records.

------------------------------------------------------------------------

# 22. Medical Privacy

The game is about healthcare accessibility, but it is **not a healthcare
application**.

Therefore:

> Do not collect or store real health information.

The player should never be asked:

``` text
medical diagnosis
blood group
medical history
prescription
insurance number
Aadhaar
PAN
real patient ID
```

------------------------------------------------------------------------

# 23. Fake Doctor Data

Use clearly fictional data.

Example:

``` text
CITYCARE

Dr. Maya Rao
Dr. Arjun Sen
Dr. Neha Kapoor
```

These names should be treated as fictional game content.

------------------------------------------------------------------------

# 24. Fake Appointment IDs

Appointment IDs should not resemble real healthcare records.

Example:

``` text
DEMO-4821
```

or:

``` text
CITY-TEST-001
```

Avoid accidentally exposing real-looking sensitive identifiers.

------------------------------------------------------------------------

# 25. CAPTCHA

The CAPTCHA is part of the accessibility simulation.

It should not connect to:

``` text
Google reCAPTCHA
Cloudflare Turnstile
hCaptcha
```

There is no reason to use a real anti-bot service.

Use a local fictional CAPTCHA.

------------------------------------------------------------------------

# 26. External APIs

The MVP should have:

``` text
NO REQUIRED EXTERNAL API
```

This reduces:

-   Credential exposure
-   Network failures
-   Third-party tracking
-   Dependency risk
-   Demo instability

------------------------------------------------------------------------

# 27. API Keys

Never commit API keys to GitHub.

Never place secrets directly inside:

``` text
.ts
.js
.json
.html
.md
```

Examples of secrets:

``` text
API_KEY
SECRET_KEY
DATABASE_PASSWORD
JWT_SECRET
PRIVATE_TOKEN
```

------------------------------------------------------------------------

# 28. Environment Variables

If a future feature requires an API key:

Use:

``` text
.env
```

and add it to:

``` text
.gitignore
```

Example:

``` text
.env
.env.local
.env.*.local
```

Only expose variables to the browser if they are explicitly intended to
be public.

------------------------------------------------------------------------

# 29. Important Vite Warning

Variables prefixed with:

``` text
VITE_
```

can be included in the client bundle.

Therefore:

> **Do not put secrets in `VITE_*` variables.**

If a secret must remain secret, it belongs on a backend/server-side
environment.

------------------------------------------------------------------------

# 30. Dependency Security

Keep dependencies minimal.

Recommended core dependencies:

``` text
phaser
typescript
vite
```

Development:

``` text
vitest
eslint
prettier
```

Do not install packages without a clear reason.

------------------------------------------------------------------------

# 31. Dependency Auditing

Run periodically:

``` bash
npm audit
```

Review serious/high vulnerabilities.

Also keep:

``` bash
npm outdated
```

in mind during development.

Do not blindly update every package immediately before the hackathon.

------------------------------------------------------------------------

# 32. Lockfile

Commit the package manager lockfile:

``` text
package-lock.json
```

This ensures the team installs consistent dependency versions.

Do not add lockfiles from multiple package managers unless necessary.

------------------------------------------------------------------------

# 33. Supply Chain Safety

Before adding a dependency:

Ask:

``` text
Do we actually need it?
Is it maintained?
Is it widely used?
Does it introduce many dependencies?
```

Prefer established packages.

------------------------------------------------------------------------

# 34. Third-Party Assets

Only use assets that the team has permission to use.

Check:

-   License
-   Attribution requirements
-   Commercial-use restrictions
-   Redistribution restrictions

This matters especially for:

``` text
fonts
music
sound effects
pixel-art sprites
textures
icons
```

Do not simply download copyrighted game assets from another game.

------------------------------------------------------------------------

# 35. Pinterest References

Pinterest references can be used for visual inspiration.

Do not directly copy:

``` text
Roblox assets
commercial game sprites
copyrighted characters
music
UI artwork
```

Instead:

> Recreate the desired visual language using original or properly
> licensed assets.

------------------------------------------------------------------------

# 36. Browser Security

The production deployment should use:

``` text
HTTPS
```

when hosted on a platform such as:

``` text
Vercel
Netlify
GitHub Pages
```

Do not deploy the final public demo over plain HTTP if HTTPS is
available.

------------------------------------------------------------------------

# 37. Security Headers

For a production deployment, consider:

``` text
Content-Security-Policy
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
```

However, do not introduce a restrictive CSP that breaks the game.

Test the final build after applying security headers.

------------------------------------------------------------------------

# 38. Content Security Policy

A future production CSP should allow only required sources.

Conceptually:

``` text
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
media-src 'self';
connect-src 'self';
```

The exact CSP must be adjusted to the final deployment and framework.

Do not copy this blindly into production.

------------------------------------------------------------------------

# 39. External Fonts

Prefer self-hosting fonts.

Instead of:

``` text
Google Fonts CDN
```

consider:

``` text
assets/fonts/
```

This reduces external requests and third-party dependencies.

------------------------------------------------------------------------

# 40. Analytics

Analytics are **not required for the MVP**.

Avoid adding:

``` text
Google Analytics
tracking pixels
advertising trackers
session recording
```

unless there is a clear reason and appropriate disclosure.

------------------------------------------------------------------------

# 41. Privacy

The game should follow a data-minimization principle.

Collect:

``` text
only what is necessary for gameplay
```

Prefer:

``` text
local game state
```

over:

``` text
centralized personal profiles
```

------------------------------------------------------------------------

# 42. Privacy Notice

If the game is deployed publicly and collects any information beyond
local gameplay, provide a simple privacy notice.

For the MVP, if no personal data leaves the browser:

``` text
No personal information is transmitted to a server.
```

This should only be stated if technically true.

------------------------------------------------------------------------

# 43. Error Messages

Player-facing errors should not reveal sensitive implementation details.

Bad:

``` text
TypeError: Cannot read properties of undefined
```

Better:

``` text
Something went wrong. Please try again.
```

Developer console logs can contain more technical detail.

------------------------------------------------------------------------

# 44. Logging

Development logs may include:

``` text
scene changes
challenge IDs
state transitions
content errors
```

Do not log:

``` text
passwords
tokens
sensitive player information
```

The MVP should not have any such sensitive data in the first place.

------------------------------------------------------------------------

# 45. Error Recovery

A recoverable game error should not permanently trap the player.

Possible strategy:

``` text
Error
 ↓
Log diagnostic information
 ↓
Show simple message
 ↓
Offer retry
```

For example:

``` text
Unable to load this challenge.

[ TRY AGAIN ]
[ RETURN TO CITY ]
```

------------------------------------------------------------------------

# 46. Game State Corruption

If saved state is invalid:

``` text
detect invalid save
      ↓
discard corrupted state
      ↓
start fresh game
```

Do not crash the entire application.

------------------------------------------------------------------------

# 47. Save Data Validation

When loading:

Check:

``` text
version
score type
category scores
challenge IDs
scene ID
difficulty
```

If invalid:

``` text
reject save
```

and safely start a new game.

------------------------------------------------------------------------

# 48. Anti-Cheat

## MVP

No serious anti-cheat system is required.

The score is not security-sensitive.

If an online leaderboard is added later:

``` text
client score
      ↓
server validation
      ↓
server score
      ↓
leaderboard
```

Never trust a client-submitted score blindly.

------------------------------------------------------------------------

# 49. Browser Permissions

The game should not request unnecessary browser permissions.

Avoid requesting:

``` text
camera
microphone
location
contacts
notifications
```

unless a future feature genuinely requires them.

For the MVP:

> No special browser permissions should be required.

------------------------------------------------------------------------

# 50. Audio Privacy

If voice/audio is added:

Do not request microphone access unless the feature explicitly requires
it.

The game's dialogue and sound effects should use preloaded audio files.

------------------------------------------------------------------------

# 51. Accessibility and Security

Accessibility should not be sacrificed for security.

Examples:

-   Keyboard navigation remains available.
-   Text alternatives remain available.
-   Captions remain available.
-   Focus indicators remain visible.

Security mechanisms should not make the actual game unnecessarily
difficult to use.

------------------------------------------------------------------------

# 52. Simulated Accessibility Failures

The inaccessible website inside the game is a controlled simulation.

Its bad design should be implemented intentionally but safely.

Examples:

``` text
tiny click targets
poor contrast
ambiguous labels
bad CAPTCHA
color-only information
```

Do not let those intentional failures affect:

``` text
main game UI
pause menu
settings
developer tools
browser security
```

------------------------------------------------------------------------

# 53. Security Boundary

The simulated website should be isolated conceptually:

``` text
REAL GAME
│
├── Accessible UI
├── Game systems
├── Settings
└── Navigation
       │
       ▼
SIMULATED WEBSITE
       │
       ├── Intentional UX barriers
       └── Fake appointment data
```

Never execute arbitrary code from the simulated website.

------------------------------------------------------------------------

# 54. Content Injection

Do not allow challenge content to become executable.

For example, this content:

``` text
<script>alert('hello')</script>
```

must render as text if ever present in a test case.

It must never execute.

------------------------------------------------------------------------

# 55. URL Handling

If the game ever accepts URLs in future content:

-   Validate the protocol.
-   Allow only expected protocols.
-   Avoid `javascript:` URLs.
-   Avoid opening arbitrary external URLs automatically.

For the MVP:

> No external navigation is required.

------------------------------------------------------------------------

# 56. GitHub Security

The GitHub repository should:

-   Be free of secrets.
-   Use `.gitignore`.
-   Commit lockfiles.
-   Review pull requests where possible.
-   Avoid committing local environment files.
-   Avoid committing large unnecessary binaries.

------------------------------------------------------------------------

# 57. Recommended `.gitignore`

At minimum:

``` text
node_modules/
dist/
.env
.env.local
.env.*.local
.DS_Store
*.log
.vscode/
```

If the team uses other local tools, add their generated files as needed.

------------------------------------------------------------------------

# 58. Secret Scanning

Before pushing publicly:

Search for common secret patterns:

``` text
API_KEY
SECRET
TOKEN
PASSWORD
PRIVATE_KEY
```

Also review:

``` text
.env
config files
source code
README
test files
```

A secret accidentally committed to GitHub should be considered
compromised.

------------------------------------------------------------------------

# 59. If a Secret Is Accidentally Committed

Do not simply delete the line and assume the secret is safe.

Immediately:

``` text
1. Revoke the secret.
2. Generate a replacement.
3. Remove it from the repository history if necessary.
4. Update local configuration.
5. Check GitHub history.
```

The most important step is:

> **Revoke first.**

------------------------------------------------------------------------

# 60. AI Coding Agent Security

Anti-Gravity should not be allowed to:

-   Invent API keys.
-   Add hidden network calls.
-   Upload player data.
-   Install suspicious dependencies.
-   Add tracking scripts without approval.
-   Disable security checks.
-   Remove `.gitignore`.
-   Store secrets in source code.

Before accepting an AI-generated dependency:

``` text
Inspect package
Check purpose
Check usage
Check package source
```

------------------------------------------------------------------------

# 61. AI Prompt Safety

When asking an AI coding agent to implement a feature:

Prefer:

> "Implement this feature using the existing architecture. Do not add
> external services unless required."

Avoid:

> "Build anything necessary to make this work."

The second instruction can cause unnecessary dependencies and
infrastructure.

------------------------------------------------------------------------

# 62. No Hidden Telemetry

The game should not secretly send:

``` text
player actions
usernames
IP information
browser information
gameplay analytics
```

to an external service.

If telemetry is ever introduced:

-   Make it explicit.
-   Minimize the data.
-   Document it.
-   Provide appropriate consent/disclosure.

------------------------------------------------------------------------

# 63. Deployment Checklist

Before publishing:

``` text
[ ] HTTPS enabled
[ ] No API keys in bundle
[ ] No .env files deployed
[ ] No debug secrets
[ ] No real medical data
[ ] No unnecessary tracking
[ ] Dependencies audited
[ ] Build succeeds
[ ] Production game tested
[ ] Save/load tested
[ ] Browser console reviewed
[ ] Error paths tested
```

------------------------------------------------------------------------

# 64. Hackathon Demo Security Checklist

Before presenting:

``` text
[ ] Game works without external API dependencies.
[ ] Demo account does not use real credentials.
[ ] Appointment data is fictional.
[ ] No real medical information exists.
[ ] No secret appears in DevTools.
[ ] No unexpected network requests.
[ ] Game works in the selected browser.
[ ] Refresh behavior is understood.
[ ] Save state can be reset.
```

------------------------------------------------------------------------

# 65. Security Definition of Done

Security is considered sufficient for the MVP when:

-   No real authentication exists.
-   No passwords are collected.
-   No real medical data is collected.
-   No unnecessary personal information is collected.
-   No secrets are committed.
-   User input is validated.
-   User text is safely rendered.
-   Content is treated as data.
-   Local saves contain only gameplay state.
-   Dependencies are minimal.
-   The game does not depend on external APIs.
-   The simulated website is isolated from the real game UI.
-   Production deployment uses HTTPS.
-   The repository has a safe `.gitignore`.
-   The team has reviewed the final build for accidental data leakage.

------------------------------------------------------------------------

# 66. Future Security Requirements

If the project later introduces:

``` text
accounts
online leaderboards
cloud saves
AI APIs
analytics
multiplayer
```

then this document must be expanded to cover:

-   Server-side authentication
-   Authorization
-   Rate limiting
-   API validation
-   Database security
-   Secure sessions
-   CSRF protection where applicable
-   CORS policy
-   Server-side score validation
-   Privacy policy
-   Data retention
-   Account deletion
-   Monitoring
-   Incident response

Do not implement these systems prematurely.

------------------------------------------------------------------------

# 67. Final Security Principle

> **The safest hackathon architecture is the architecture that has the
> fewest unnecessary things to secure.**

For Inclusive Interface:

``` text
NO REAL ACCOUNTS
        +
NO REAL MEDICAL DATA
        +
NO BACKEND
        +
NO SECRET API KEYS
        +
MINIMAL STORAGE
        +
SAFE INPUT
        +
SAFE CONTENT
        =
LOW-RISK MVP
```

Security should protect the experience without becoming another barrier.
