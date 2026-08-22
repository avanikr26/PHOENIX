# TECH_STACK.md --- Inclusive Interface

# 1. Purpose

This document defines the recommended technology stack for **Inclusive
Interface**.

The stack is optimized for:

-   A two-person hackathon team
-   Fast browser-based development
-   Pixel-art 2D gameplay
-   Narrative/dialogue systems
-   Interactive UI simulations
-   Easy deployment
-   GitHub collaboration
-   AI-assisted development through Anti-Gravity
-   Minimal infrastructure
-   A polished hackathon demo

------------------------------------------------------------------------

# 2. Recommended Stack

## Primary Stack

  Layer             Technology
  ----------------- ----------------------------------------
  Game framework    Phaser 3
  Language          TypeScript
  Build tool        Vite
  Styling           CSS
  UI                Phaser UI + HTML/CSS where appropriate
  Content data      TypeScript/JSON
  Graphics          Pixel-art PNG/WebP assets
  Audio             Web Audio / Phaser Audio
  Version control   Git + GitHub
  Package manager   npm
  Testing           Vitest
  Deployment        Vercel / Netlify / GitHub Pages
  Development       VS Code / Anti-Gravity

------------------------------------------------------------------------

# 3. Why Phaser 3?

The game is fundamentally a:

-   2D pixel-art game
-   Browser experience
-   Narrative RPG
-   Exploration game
-   Interactive UI simulation

Phaser is a strong fit because it provides:

-   2D rendering
-   Sprite handling
-   Scene management
-   Input handling
-   Animations
-   Audio
-   Tilemaps
-   Camera systems
-   Collision
-   Browser deployment

The team does not need to build a game engine from scratch.

------------------------------------------------------------------------

# 4. Why TypeScript?

Use TypeScript instead of plain JavaScript.

Reasons:

-   Better autocomplete
-   Easier debugging
-   Safer data structures
-   Better AI-generated code reliability
-   Easier refactoring
-   Clear interfaces for game data
-   Better separation between systems

Example:

``` ts
interface Challenge {
  id: string;
  characterId: string;
  category: AccessibilityCategory;
  question: string;
  options: ChallengeOption[];
  correctOption: string;
  points: number;
}
```

This is especially useful for a data-driven game.

------------------------------------------------------------------------

# 5. Why Vite?

Vite should handle:

-   Development server
-   TypeScript compilation
-   Asset processing
-   Production builds
-   Hot reload

Benefits:

``` text
Fast startup
Fast hot reload
Simple configuration
Easy deployment
```

Avoid adding a more complicated build system unless required.

------------------------------------------------------------------------

# 6. Project Initialization

Recommended starting setup:

``` bash
npm create vite@latest inclusive-interface -- --template vanilla-ts
cd inclusive-interface
npm install
npm install phaser
```

Development:

``` bash
npm run dev
```

Production build:

``` bash
npm run build
```

Preview:

``` bash
npm run preview
```

The exact commands can change depending on the final project scaffold.

------------------------------------------------------------------------

# 7. UI Strategy

The project should use a hybrid UI approach.

## Phaser UI

Use Phaser for:

-   In-game HUD
-   Dialogue boxes
-   Pixel-art menus
-   Challenge panels
-   Score displays
-   Game-world interactions
-   Retro interface elements

## HTML/CSS

Use HTML/CSS selectively for:

-   Initial profile form
-   Accessibility settings if easier
-   Complex text-heavy overlays
-   Browser-level metadata
-   Fallback UI

Do not build the entire game as a normal website.

The core experience should remain inside the game canvas.

------------------------------------------------------------------------

# 8. Rendering

Use Phaser's Canvas/WebGL rendering.

The game should prioritize:

-   Crisp pixel art
-   Stable frame rate
-   Small environments
-   Lightweight assets

Recommended approach:

``` text
Pixel Art
    ↓
Phaser Scene
    ↓
Camera
    ↓
Canvas
```

------------------------------------------------------------------------

# 9. Pixel-Art Rendering

Pixel art must remain sharp.

Use nearest-neighbor style scaling where supported.

Avoid blurry interpolation.

Conceptually:

``` text
pixelArt = true
antialias = false
```

The exact configuration depends on Phaser's renderer settings.

------------------------------------------------------------------------

# 10. Game Resolution

Use a logical internal resolution rather than designing around a single
physical monitor size.

Example:

``` text
1280 × 720
```

or a smaller pixel-art-friendly base resolution scaled to the browser.

The final resolution should be chosen during implementation based on:

-   Asset resolution
-   UI readability
-   Browser viewport
-   Performance

------------------------------------------------------------------------

# 11. Responsive Strategy

The game should support common desktop browser sizes.

Priority:

``` text
16:9 desktop
```

Then:

``` text
smaller desktop/laptop windows
```

The game should:

-   Preserve aspect ratio where appropriate.
-   Scale the canvas.
-   Keep critical UI visible.
-   Avoid cropping dialogue.
-   Avoid overlapping controls.

Mobile support is optional for the MVP.

------------------------------------------------------------------------

# 12. Game Scenes

Phaser scenes should correspond roughly to major gameplay contexts.

Recommended:

``` text
BootScene
TitleScene
ProfileScene
IntroScene
DeveloperRoomScene
GrandmaScene
AppointmentScene
RealizationScene
DesignerIntroScene
CityScene
FinalChallengeScene
FinalEvaluationScene
EndingScene
```

The exact number can be reduced if the team chooses to keep some scenes
as internal states.

------------------------------------------------------------------------

# 13. Core Systems

Recommended TypeScript systems:

``` text
GameStateManager
SceneManager
EventBus
InputManager
DialogueManager
ChallengeManager
ScoreManager
AccessibilityManager
NPCManager
AudioManager
```

Each should have one clear responsibility.

------------------------------------------------------------------------

# 14. Game State

Use a typed central state.

Example:

``` ts
interface GameState {
  playerName: string;
  username: string;
  currentScene: string;
  difficulty: Difficulty;
  score: number;
  categoryScores: Record<string, number>;
  completedChallenges: string[];
  discoveredCharacters: string[];
  gameCompleted: boolean;
}
```

Do not allow every component to mutate arbitrary state.

------------------------------------------------------------------------

# 15. Event System

A lightweight event bus is sufficient.

Example events:

``` ts
type GameEvent =
  | "dialogue-started"
  | "dialogue-completed"
  | "challenge-started"
  | "challenge-completed"
  | "score-changed"
  | "interface-changed"
  | "npc-completed"
  | "game-completed";
```

A full event framework is unnecessary.

------------------------------------------------------------------------

# 16. Dialogue System

Dialogue should be data-driven.

Recommended content:

``` text
content/dialogue/
```

Example:

``` json
{
  "id": "rahul-03",
  "speaker": "Rahul",
  "text": "I don't know what half of these buttons do.",
  "next": "rahul-challenge"
}
```

The `DialogueManager` reads the data and controls progression.

------------------------------------------------------------------------

# 17. Challenge System

Challenges should also be data-driven.

Example:

``` ts
interface Challenge {
  id: string;
  characterId: string;
  category: string;
  scenario: string;
  question: string;
  options: ChallengeOption[];
  correctOption: string;
  explanation: string;
  points: number;
  interfaceChanges: string[];
}
```

This makes adding new scenarios inexpensive.

------------------------------------------------------------------------

# 18. Content Format

Use JSON for large content collections where non-programmers may need to
edit content.

Possible structure:

``` text
content/
├── characters/
├── dialogue/
├── challenges/
├── objectives/
└── transformations/
```

Use TypeScript types/interfaces to validate the expected structure.

For very small static content, TypeScript objects are acceptable.

------------------------------------------------------------------------

# 19. Asset Format

Recommended:

### Pixel art

``` text
PNG
```

### Complex/optimized web assets

``` text
WebP
```

### Icons

``` text
SVG
```

Use SVG carefully for retro UI; pixel-art assets should remain raster
where appropriate.

------------------------------------------------------------------------

# 20. Sprite Organization

Example:

``` text
assets/characters/rahul/
├── idle.png
├── walk.png
├── portrait-neutral.png
├── portrait-confused.png
└── portrait-smile.png
```

Keep sprite dimensions consistent within a character set.

------------------------------------------------------------------------

# 21. Tilemaps

For the city and room environments, use tilemaps if the environment
becomes large enough to benefit from them.

Recommended format:

``` text
Tiled JSON
```

or Phaser-compatible tilemap data.

For a very small MVP room, manually placed sprites are acceptable.

Do not introduce Tiled unless the map actually benefits from it.

------------------------------------------------------------------------

# 22. Animation

Use Phaser animations for:

-   Walking
-   Idle
-   NPC movement
-   UI transitions
-   Small environmental effects

Keep animations lightweight.

The MVP does not require skeletal animation.

------------------------------------------------------------------------

# 23. Audio

Use Phaser's audio system.

Recommended formats:

``` text
OGG
MP3
WAV
```

Prefer compressed formats for larger music files.

Use WAV for very short sound effects when appropriate.

------------------------------------------------------------------------

# 24. Audio Structure

``` text
assets/audio/
├── music/
│   ├── title.ogg
│   ├── room.ogg
│   ├── city.ogg
│   └── ending.ogg
│
└── sfx/
    ├── ui-select.wav
    ├── ui-confirm.wav
    ├── dialogue.wav
    ├── correct.wav
    ├── incorrect.wav
    ├── glitch.wav
    └── timer.wav
```

------------------------------------------------------------------------

# 25. Fonts

Use web-compatible font files.

Recommended:

``` text
WOFF2
```

Use:

-   One display font for titles.
-   One highly readable font for dialogue/body text.

The actual font choice should match the game's final visual direction
and licensing.

------------------------------------------------------------------------

# 26. Styling

Use CSS for browser-level styling.

Recommended:

``` text
src/styles/
├── global.css
├── variables.css
├── accessibility.css
└── forms.css
```

Avoid creating dozens of CSS files for small components if the game is
primarily rendered through Phaser.

------------------------------------------------------------------------

# 27. CSS Variables

Define shared values:

``` css
:root {
  --bg: #08090d;
  --surface: #11131a;
  --text: #f5f5f5;
  --muted: #b7bac5;
  --accent: #5ee7ff;
  --focus: #ffd75e;
}
```

The exact colors can be changed during visual polish.

------------------------------------------------------------------------

# 28. Accessibility Technology

The actual game should support accessibility where practical.

Recommended:

-   Keyboard navigation
-   Visible focus states
-   Captions
-   Text alternatives
-   Sufficient contrast
-   Reduced motion
-   Adjustable text size
-   Non-color-only indicators

Important:

The simulated appointment website intentionally violates accessibility
principles, but the game surrounding it should not.

------------------------------------------------------------------------

# 29. Accessibility Implementation

For HTML UI:

Use semantic HTML:

``` html
<button>
<input>
<label>
<main>
<nav>
```

For Phaser UI:

Implement explicit:

-   Focus state
-   Selection state
-   Keyboard navigation
-   Text labels
-   Non-color indicators

Do not rely on visual position alone.

------------------------------------------------------------------------

# 30. Keyboard Controls

Recommended defaults:

``` text
W / A / S / D → movement
Arrow Keys → movement / menus
E → interact
Space → continue
Enter → confirm
Escape → pause/back
```

Allow remapping later if time permits.

------------------------------------------------------------------------

# 31. Timer Implementation

Use Phaser's timing system or the browser's timing APIs.

The timer must:

-   Start when the appointment challenge starts.
-   Update once per second visually.
-   Stop on success.
-   Stop on failure.
-   Reset on restart.
-   Never continue after leaving the scene.

------------------------------------------------------------------------

# 32. Appointment Simulation

The appointment website should be implemented as a controlled
simulation.

Do not create a real healthcare backend.

Required internal state:

``` text
doctor
date
time
patientDetails
captcha
completed
timeRemaining
```

The simulation exists solely to create the game's first accessibility
experience.

------------------------------------------------------------------------

# 33. Fake Data Only

Use fictional information.

Example:

``` text
CITYCARE
Dr. Maya Rao
Dr. Arjun Sen
Dr. Neha Kapoor
```

Do not connect the game to real hospitals, medical systems, or patient
databases.

------------------------------------------------------------------------

# 34. Data Persistence

For MVP:

``` text
localStorage
```

is sufficient if persistence is required.

Store only:

``` text
player profile
score
completed challenges
category scores
difficulty
```

Do not collect unnecessary personal information.

------------------------------------------------------------------------

# 35. Backend

## MVP

**No backend required.**

The game should be playable entirely client-side.

Reasons:

-   Faster development
-   Easier deployment
-   Fewer failure points
-   Better hackathon reliability

------------------------------------------------------------------------

# 36. Authentication

## MVP

Do not implement real authentication.

The sign-up screen is part of the narrative experience.

Use local/session state.

------------------------------------------------------------------------

# 37. Database

## MVP

No database required.

Use:

``` text
JSON
TypeScript objects
localStorage
```

A database may be considered later for:

-   Player analytics
-   Online accounts
-   Leaderboards
-   Cloud saves

These are outside MVP scope.

------------------------------------------------------------------------

# 38. AI/LLM Usage

The game does not require an AI model for its core gameplay.

Do not introduce an LLM just because the project is an AI-related
hackathon.

The educational experience should remain deterministic.

Possible future use:

-   Dynamic NPC dialogue
-   Personalized feedback
-   Adaptive difficulty
-   Scenario generation

These are post-MVP features.

------------------------------------------------------------------------

# 39. External APIs

The MVP should minimize external API dependencies.

Avoid APIs for:

-   Authentication
-   Medical data
-   Maps
-   AI
-   Analytics

unless they become necessary.

Every external dependency creates another potential hackathon failure
point.

------------------------------------------------------------------------

# 40. Package Dependencies

Keep dependencies minimal.

Core:

``` text
phaser
typescript
vite
```

Development/testing:

``` text
vitest
eslint
prettier
```

Only install another package when it solves a concrete problem.

------------------------------------------------------------------------

# 41. Recommended Development Tools

## Editor

``` text
VS Code
```

or:

``` text
Anti-Gravity
```

## Version Control

``` text
Git
GitHub
```

## Asset Creation

Possible tools:

``` text
Aseprite
LibreSprite
Piskel
Photoshop
Figma
```

Use whichever tools the team already knows.

------------------------------------------------------------------------

# 42. AI Coding Workflow

Anti-Gravity should be used as a coding assistant, not as an
uncontrolled project generator.

Before implementation:

``` text
Read AGENTS.md
Read relevant specification
Inspect existing files
Plan changes
Implement
Test
```

For example:

### Request

> Implement Rahul's accessibility challenge.

Agent should read:

``` text
AGENTS.md
CONTENT.md
GAMEPLAY_ALGORITHM.md
ARCHITECTURE.md
PROJECT_STRUCTURE.md
```

Then inspect the existing challenge system before writing code.

------------------------------------------------------------------------

# 43. Development Environment

Recommended:

``` text
Node.js LTS
npm
Git
Modern Chromium-based browser
```

Recommended browsers for testing:

-   Chrome
-   Edge
-   Firefox

The hackathon demo should have one primary tested browser.

------------------------------------------------------------------------

# 44. Browser Support

Target:

``` text
Modern desktop browsers
```

Priority:

1.  Chrome
2.  Edge
3.  Firefox

Do not spend MVP time supporting obsolete browsers.

------------------------------------------------------------------------

# 45. Deployment

Recommended deployment options:

## Vercel

Good for:

-   Fast deployment
-   GitHub integration
-   Automatic builds

## Netlify

Good for:

-   Static web deployment
-   Git integration
-   Simple configuration

## GitHub Pages

Good for:

-   Simple static hosting
-   GitHub-based projects

Choose one.

Do not maintain multiple deployment systems during the hackathon unless
required.

------------------------------------------------------------------------

# 46. Build Pipeline

Conceptually:

``` text
Git Push
   ↓
Install Dependencies
   ↓
TypeScript Build
   ↓
Vite Build
   ↓
Production Assets
   ↓
Deploy
```

The production build should be tested before the final presentation.

------------------------------------------------------------------------

# 47. Environment Variables

The MVP should require as few environment variables as possible.

If needed:

``` text
VITE_APP_NAME
VITE_ENVIRONMENT
```

Do not store secrets in frontend environment variables.

Remember:

> Anything shipped to the browser is potentially visible to the user.

------------------------------------------------------------------------

# 48. Security

The game is mostly client-side, so security requirements are limited.

Still:

-   Do not collect real medical data.
-   Do not collect sensitive user information.
-   Do not expose API secrets.
-   Sanitize any HTML-rendered player input.
-   Avoid unnecessary third-party scripts.

------------------------------------------------------------------------

# 49. Performance Targets

Aim for:

``` text
60 FPS
```

on a typical modern student laptop.

The MVP should prioritize:

-   Stable rendering
-   Fast startup
-   Small bundle
-   Lightweight assets

Do not chase graphical complexity.

------------------------------------------------------------------------

# 50. Performance Guidelines

Avoid:

-   Thousands of active game objects
-   Huge uncompressed images
-   Continuous expensive calculations
-   Excessive particles
-   Large audio files
-   Unnecessary DOM updates

Prefer:

-   Sprite reuse
-   Small maps
-   Asset compression
-   Event-driven updates
-   Scene cleanup

------------------------------------------------------------------------

# 51. Asset Loading

Use a loading scene.

Example:

``` text
LOADING CITY...
```

Load only the assets required for the next scene where practical.

For the MVP, preloading a small asset set is also acceptable.

------------------------------------------------------------------------

# 52. Error Logging

Development errors should be clear.

Example:

``` text
[ChallengeManager]
Challenge "rahul-01" not found.
```

Avoid generic:

``` text
Something went wrong.
```

during development.

Production player-facing errors should remain simple and non-technical.

------------------------------------------------------------------------

# 53. Testing Stack

Recommended:

``` text
Vitest
```

Test:

-   Score calculations
-   Challenge validation
-   Timer logic
-   Category scoring
-   Game state
-   Data validation

Browser/gameplay testing remains essential because many Phaser issues
are visual/runtime issues.

------------------------------------------------------------------------

# 54. Linting and Formatting

Recommended:

``` text
ESLint
Prettier
```

Use them to maintain consistent code.

Do not spend excessive hackathon time configuring complex lint rules.

A basic setup is enough.

------------------------------------------------------------------------

# 55. Git

Use:

``` text
Git
GitHub
```

Recommended branch names:

``` text
feature/player
feature/dialogue
feature/appointment
feature/challenges
feature/ui
fix/timer
fix/dialogue
```

Commit frequently.

------------------------------------------------------------------------

# 56. Commit Convention

Prefer:

``` text
feat: add player controller
feat: implement dialogue manager
feat: add appointment simulation
feat: add accessibility challenge
feat: add scoring
fix: stop timer on appointment completion
fix: repair NPC interaction
style: polish dialogue UI
refactor: simplify challenge state
```

Avoid:

``` text
final final
new
changes
stuff
working
```

------------------------------------------------------------------------

# 57. GitHub Repository Requirements

The repository should contain:

``` text
README.md
AGENTS.md
PRD.md
GAME_DESIGN.md
MVP_SCOPE.md
GAMEPLAY_ALGORITHM.md
UI_UX_DESIGN.md
CONTENT.md
ARCHITECTURE.md
PROJECT_STRUCTURE.md
TECH_STACK.md
```

plus the actual source code.

------------------------------------------------------------------------

# 58. README Requirements

The README should eventually include:

-   Project name
-   One-line description
-   Problem statement
-   Game concept
-   Features
-   Screenshots/GIF
-   Tech stack
-   Installation
-   Run commands
-   Team members
-   Hackathon information
-   Demo link
-   Future scope

Do not write the README before the core project behavior is stable if
doing so slows development.

------------------------------------------------------------------------

# 59. MVP Technology Rule

If a technology choice increases setup time significantly, reconsider
it.

The preferred question is:

> "Does this technology help us build the actual game faster?"

If not:

> Do not add it.

------------------------------------------------------------------------

# 60. What NOT to Use for MVP

Avoid unless absolutely necessary:

-   React for the entire game
-   Next.js
-   Express backend
-   MongoDB
-   PostgreSQL
-   Firebase authentication
-   Socket.io
-   Kubernetes
-   Docker infrastructure
-   Microservices
-   Large AI frameworks
-   Real medical APIs

These technologies are not inherently bad.

They are simply unnecessary for this MVP.

------------------------------------------------------------------------

# 61. Why Not Build It as a Normal React Website?

The product's main value comes from:

-   Exploration
-   Character movement
-   Pixel-art environment
-   Game-like interactions
-   Narrative transitions
-   RPG-style encounters

A normal React website would make these systems unnecessarily awkward.

React can still be used selectively for external/HTML UI if there is a
strong reason, but Phaser should own the game world.

------------------------------------------------------------------------

# 62. Why Not Use Unity?

Unity is capable of building the game.

However, for this specific hackathon MVP:

-   Browser deployment is more straightforward with Phaser.
-   The game is 2D.
-   The UI-heavy interaction can be handled directly in web technology.
-   The team can iterate quickly with TypeScript.
-   GitHub deployment is simple.
-   No large game-engine project is required.

Unity remains a possible alternative if the team already has strong
Unity experience.

------------------------------------------------------------------------

# 63. Alternative Stack

If the team is significantly more comfortable with another technology,
alternatives include:

### Option B

``` text
Godot
GDScript
Web export
GitHub
```

### Option C

``` text
Unity
C#
WebGL
GitHub
```

However, do not switch stacks after significant development has started
without a compelling reason.

------------------------------------------------------------------------

# 64. Recommended Final Decision

For this project:

# Phaser 3 + TypeScript + Vite

with:

``` text
GitHub
   +
JSON/TypeScript content
   +
local state
   +
Vercel/Netlify deployment
```

is the recommended MVP stack.

------------------------------------------------------------------------

# 65. Final Tech Stack Diagram

``` text
                    GITHUB
                       │
                       ▼
                 TYPESCRIPT
                       │
                       ▼
                    VITE
                       │
                       ▼
                  PHASER 3
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     SCENES          GAMEPLAY         UI
        │              │              │
        │        ┌─────┼─────┐        │
        │        │     │     │        │
        │      NPC   CHALLENGE SCORE  │
        │              │              │
        │         ACCESSIBILITY       │
        │              │              │
        └──────────────┼──────────────┘
                       │
                  CONTENT DATA
                       │
             ┌─────────┴─────────┐
             │                   │
          DIALOGUE           CHALLENGES
             │                   │
             └─────────┬─────────┘
                       │
                     ASSETS
                       │
                ┌──────┼──────┐
                │      │      │
             SPRITES  AUDIO   UI
```

------------------------------------------------------------------------

# 66. Definition of Done

The technology stack is considered correctly implemented when:

-   The game runs locally.
-   `npm run dev` starts the application.
-   `npm run build` creates a production build.
-   Phaser renders the game.
-   TypeScript compiles without critical errors.
-   Assets load correctly.
-   Scenes transition correctly.
-   Game state persists during the session.
-   Dialogue works.
-   Challenges work.
-   Scoring works.
-   Appointment simulation works.
-   The game can be deployed as a static web application.
-   No unnecessary backend is required.
-   The team can continue development without changing the stack.

------------------------------------------------------------------------

# 67. Final Technology Principle

> **The technology should disappear behind the experience.**

Judges should remember:

> "I experienced the accessibility problem."

not:

> "They used a complicated technology stack."

For the hackathon, the best stack is the one that lets the team build,
test, polish, and demonstrate the game reliably.
