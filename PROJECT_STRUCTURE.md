# PROJECT_STRUCTURE.md --- Inclusive Interface

# 1. Purpose

This document defines the recommended repository and source-code
structure for the **Inclusive Interface** game.

The structure is designed for a two-person hackathon team using an AI
coding agent such as Anti-Gravity.

The main goals are:

-   Keep the project easy to understand.
-   Keep gameplay systems modular.
-   Separate content from logic.
-   Make parallel development easier.
-   Prevent duplicate systems.
-   Keep the MVP focused.
-   Make future characters and challenges easy to add.

------------------------------------------------------------------------

# 2. Repository Structure

The repository should broadly look like:

``` text
inclusive-interface/
│
├── AGENTS.md
├── PRD.md
├── GAME_DESIGN.md
├── MVP_SCOPE.md
├── GAMEPLAY_ALGORITHM.md
├── UI_UX_DESIGN.md
├── CONTENT.md
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
│
├── README.md
├── LICENSE
├── .gitignore
│
├── src/
├── content/
├── assets/
├── tests/
├── public/
└── scripts/
```

The exact top-level structure may change according to the selected
framework.

------------------------------------------------------------------------

# 3. Documentation Files

The root documentation files are the project's source of truth.

``` text
AGENTS.md
PRD.md
GAME_DESIGN.md
MVP_SCOPE.md
GAMEPLAY_ALGORITHM.md
UI_UX_DESIGN.md
CONTENT.md
ARCHITECTURE.md
PROJECT_STRUCTURE.md
```

## AGENTS.md

Contains rules for the AI coding agent.

It defines:

-   Project vision
-   Coding conventions
-   Design rules
-   Scope rules
-   Voice and communication style
-   Implementation priorities

------------------------------------------------------------------------

## PRD.md

Defines the product requirements.

Contains:

-   Product vision
-   Problem statement
-   Target users
-   Functional requirements
-   Non-functional requirements
-   Success criteria
-   MVP requirements

------------------------------------------------------------------------

## GAME_DESIGN.md

Defines the overall game experience.

Contains:

-   Game concept
-   Narrative structure
-   Core loop
-   Progression
-   Characters
-   Difficulty
-   Game identity

------------------------------------------------------------------------

## MVP_SCOPE.md

Defines what must be built for the hackathon MVP.

Use this document to prevent scope creep.

------------------------------------------------------------------------

## GAMEPLAY_ALGORITHM.md

Defines gameplay behavior and state transitions.

------------------------------------------------------------------------

## UI_UX_DESIGN.md

Defines visual and interaction design.

------------------------------------------------------------------------

## CONTENT.md

Contains player-facing narrative and educational content.

------------------------------------------------------------------------

## ARCHITECTURE.md

Defines technical architecture and system responsibilities.

------------------------------------------------------------------------

## PROJECT_STRUCTURE.md

This document.

Defines where implementation files belong.

------------------------------------------------------------------------

# 4. Source Directory

The main implementation should live inside:

``` text
src/
```

Recommended:

``` text
src/
├── core/
├── gameplay/
├── scenes/
├── ui/
├── data/
├── audio/
├── systems/
└── utils/
```

Not every directory needs to exist on day one.

Create directories when they become necessary.

------------------------------------------------------------------------

# 5. Core

``` text
src/core/
```

Contains systems shared by the entire game.

Recommended:

``` text
src/core/
├── GameStateManager
├── SceneManager
├── EventBus
├── InputManager
├── Config
└── Constants
```

------------------------------------------------------------------------

# 6. GameStateManager

Responsible for global gameplay state.

Possible responsibilities:

``` text
player profile
current scene
score
category scores
difficulty
completed challenges
unlocked locations
game completion
```

It should be the authoritative source for progression state.

------------------------------------------------------------------------

# 7. SceneManager

Responsible for major scene transitions.

Example:

``` text
loadScene("title")
loadScene("developer-room")
loadScene("appointment")
loadScene("city")
loadScene("ending")
```

Do not allow individual UI components to directly control the entire
application lifecycle.

------------------------------------------------------------------------

# 8. EventBus

Contains shared game events.

Examples:

``` text
DialogueStarted
DialogueCompleted
ChallengeStarted
ChallengeCompleted
ScoreChanged
InterfaceChanged
NPCCompleted
SceneChanged
GameCompleted
```

The exact implementation depends on the chosen framework.

------------------------------------------------------------------------

# 9. InputManager

Centralizes input mapping.

Example:

``` text
MOVE_UP
MOVE_DOWN
MOVE_LEFT
MOVE_RIGHT
INTERACT
CONFIRM
BACK
PAUSE
```

This prevents gameplay systems from depending directly on hardcoded
keyboard checks everywhere.

------------------------------------------------------------------------

# 10. Constants

Keep reusable constants in one location.

Examples:

``` text
BASE_CHALLENGE_POINTS
FIRST_ATTEMPT_BONUS
DEFAULT_TIMER
PLAYER_SPEED
INTERACTION_DISTANCE
```

Do not scatter important balancing values throughout unrelated files.

------------------------------------------------------------------------

# 11. Gameplay

``` text
src/gameplay/
```

Contains player-facing game behavior.

Recommended:

``` text
src/gameplay/
├── player/
├── npc/
├── dialogue/
├── challenges/
├── appointment/
├── scoring/
├── accessibility/
└── objectives/
```

------------------------------------------------------------------------

# 12. Player

``` text
src/gameplay/player/
```

Recommended:

``` text
PlayerController
PlayerState
PlayerInteraction
PlayerAnimation
```

Responsibilities:

-   Movement
-   Direction
-   Animation state
-   Interaction detection

Do not put dialogue or scoring logic inside `PlayerController`.

------------------------------------------------------------------------

# 13. NPC

``` text
src/gameplay/npc/
```

Recommended:

``` text
NPCController
NPCInteraction
NPCRegistry
```

Responsibilities:

-   NPC interaction
-   NPC availability
-   NPC completion state
-   Interaction prompts

NPC-specific dialogue should remain in content data.

------------------------------------------------------------------------

# 14. Dialogue

``` text
src/gameplay/dialogue/
```

Recommended:

``` text
DialogueManager
DialogueState
DialogueRunner
DialogueChoiceHandler
```

Responsibilities:

-   Load dialogue
-   Display dialogue
-   Advance dialogue
-   Handle choices
-   Trigger events

Dialogue text should not be hardcoded throughout gameplay classes.

------------------------------------------------------------------------

# 15. Challenges

``` text
src/gameplay/challenges/
```

Recommended:

``` text
ChallengeManager
ChallengeRunner
AnswerValidator
ChallengeState
FeedbackManager
```

Responsibilities:

-   Start challenge
-   Load challenge data
-   Display challenge
-   Validate answer
-   Track attempts
-   Trigger feedback
-   Complete challenge

------------------------------------------------------------------------

# 16. Appointment Simulation

``` text
src/gameplay/appointment/
```

Recommended:

``` text
AppointmentManager
AppointmentState
AppointmentTimer
AppointmentValidation
```

Optional components:

``` text
DoctorSelector
DateSelector
TimeSelector
PatientForm
Captcha
```

The simulated website should remain isolated from the main game systems.

------------------------------------------------------------------------

# 17. Scoring

``` text
src/gameplay/scoring/
```

Recommended:

``` text
ScoreManager
CategoryScoreManager
ScoreCalculator
```

Responsibilities:

-   Award points
-   Track attempts
-   Calculate bonuses
-   Track accessibility categories
-   Calculate final score

------------------------------------------------------------------------

# 18. Accessibility

``` text
src/gameplay/accessibility/
```

Recommended:

``` text
AccessibilityManager
CategoryTracker
InterfaceTransformationManager
FinalReportCalculator
```

Categories may include:

``` text
visual
hearing
motor
cognitive
color
language
```

Only categories implemented in the game should be shown in the final
report.

------------------------------------------------------------------------

# 19. Objectives

``` text
src/gameplay/objectives/
```

Recommended:

``` text
ObjectiveManager
ObjectiveState
ObjectiveTracker
```

Examples:

``` text
Explore the city.
Talk to Rahul.
Understand Rahul's problem.
Improve the interface.
Find another user.
```

Keep objective logic separate from dialogue.

------------------------------------------------------------------------

# 20. Scenes

``` text
src/scenes/
```

Recommended:

``` text
src/scenes/
├── boot/
├── title/
├── profile/
├── intro/
├── developer-room/
├── grandma/
├── appointment/
├── realization/
├── designer-intro/
├── city/
├── final-challenge/
├── final-evaluation/
└── ending/
```

The exact structure depends on whether the chosen technology uses actual
scene files or route/component-based screens.

------------------------------------------------------------------------

# 21. Scene Responsibilities

Each scene should have a clear responsibility.

## Boot

Initialize the application.

## Title

Opening sequence.

## Profile

Player registration.

## Intro

Narrative introduction.

## Developer Room

First playable environment.

## Grandma

Story interaction.

## Appointment

Inaccessible website simulation.

## Realization

Emotional transition.

## Designer Intro

Introduce the main game role.

## City

Main exploration hub.

## Final Challenge

Final design test.

## Final Evaluation

Accessibility report.

## Ending

Final narrative message.

------------------------------------------------------------------------

# 22. UI

``` text
src/ui/
```

Recommended:

``` text
src/ui/
├── common/
├── hud/
├── dialogue/
├── challenges/
├── menus/
├── feedback/
└── accessibility/
```

------------------------------------------------------------------------

# 23. Common UI

``` text
src/ui/common/
```

Reusable components:

``` text
Button
Panel
Icon
Text
Modal
Cursor
Tooltip
LoadingIndicator
```

Use the framework's native components where appropriate instead of
rebuilding standard functionality unnecessarily.

------------------------------------------------------------------------

# 24. HUD

``` text
src/ui/hud/
```

Recommended:

``` text
GameHUD
ScoreDisplay
ObjectiveDisplay
InteractionPrompt
LocationLabel
```

The HUD should remain minimal during exploration.

------------------------------------------------------------------------

# 25. Dialogue UI

``` text
src/ui/dialogue/
```

Recommended:

``` text
DialogueBox
DialogueText
CharacterName
CharacterPortrait
DialogueChoice
DialogueContinueIndicator
```

These components should handle presentation only.

------------------------------------------------------------------------

# 26. Challenge UI

``` text
src/ui/challenges/
```

Recommended:

``` text
ChallengePanel
QuestionText
ChoiceList
ChoiceItem
ChallengeFeedback
InterfaceBeforeAfter
```

The challenge UI should not calculate scores.

------------------------------------------------------------------------

# 27. Menu UI

``` text
src/ui/menus/
```

Recommended:

``` text
TitleMenu
ProfileMenu
PauseMenu
SettingsMenu
```

------------------------------------------------------------------------

# 28. Feedback UI

``` text
src/ui/feedback/
```

Recommended:

``` text
SystemMessage
ScorePopup
SuccessMessage
ErrorMessage
GlitchTransition
```

------------------------------------------------------------------------

# 29. Accessibility UI

``` text
src/ui/accessibility/
```

Recommended:

``` text
AccessibilityReport
CategoryScore
ProgressBar
AccessibilitySetting
```

------------------------------------------------------------------------

# 30. Data Directory

``` text
src/data/
```

or, preferably for larger content:

``` text
content/
```

Gameplay data should be separated from implementation.

Recommended content structure:

``` text
content/
├── characters/
├── dialogue/
├── challenges/
├── objectives/
├── transformations/
└── settings/
```

------------------------------------------------------------------------

# 31. Character Data

``` text
content/characters/
```

Example:

``` text
rahul.json
fatima.json
color-user.json
```

Conceptual structure:

``` text
id
name
personality
accessibilityCategory
portrait
sprite
dialogueId
challengeIds
```

------------------------------------------------------------------------

# 32. Dialogue Data

``` text
content/dialogue/
```

Possible files:

``` text
opening.json
grandma.json
rahul.json
fatima.json
color-user.json
ending.json
```

Dialogue should reference characters and challenges by ID.

------------------------------------------------------------------------

# 33. Challenge Data

``` text
content/challenges/
```

Possible files:

``` text
rahul-01.json
fatima-01.json
color-01.json
motor-01.json
cognitive-01.json
```

Each challenge should contain:

``` text
id
characterId
category
scenario
question
options
correctOption
explanation
points
interfaceChanges
```

------------------------------------------------------------------------

# 34. Transformation Data

``` text
content/transformations/
```

Examples:

``` text
labels.json
captions.json
color-alternative.json
target-size.json
contrast.json
layout-simplification.json
```

The challenge can reference reusable transformation IDs.

------------------------------------------------------------------------

# 35. Assets

Use:

``` text
assets/
```

Recommended:

``` text
assets/
├── characters/
├── environments/
├── ui/
├── icons/
├── fonts/
├── audio/
├── music/
└── effects/
```

------------------------------------------------------------------------

# 36. Character Assets

``` text
assets/characters/
```

Example:

``` text
rahul/
├── rahul-idle.png
├── rahul-walk.png
├── rahul-portrait-neutral.png
├── rahul-portrait-smile.png
└── rahul-portrait-confused.png
```

Use a consistent naming scheme.

------------------------------------------------------------------------

# 37. Environment Assets

``` text
assets/environments/
```

Example:

``` text
city/
├── plaza/
├── hospital/
├── street/
└── design-office/

developer-room/
├── room.png
├── desk.png
├── laptop.png
└── bed.png
```

------------------------------------------------------------------------

# 38. UI Assets

``` text
assets/ui/
```

Example:

``` text
dialogue-box.png
panel.png
cursor.png
button.png
timer-frame.png
score-icon.png
```

------------------------------------------------------------------------

# 39. Audio Assets

``` text
assets/audio/
├── music/
├── sfx/
└── dialogue/
```

Recommended sounds:

``` text
ui-select
ui-confirm
ui-back
dialogue-advance
correct
incorrect
glitch
timer-warning
interaction
```

Voice acting is optional for the MVP.

------------------------------------------------------------------------

# 40. Fonts

``` text
assets/fonts/
```

Use:

-   One display font for titles.
-   One highly readable font for body text.

Do not use decorative pixel fonts for long dialogue if readability
suffers.

------------------------------------------------------------------------

# 41. Public Directory

If using a web framework:

``` text
public/
```

can contain static files that do not need to be processed by the build
system.

Examples:

``` text
favicon
manifest
static background
public metadata
```

Do not duplicate assets between `public/` and `assets/` without a
reason.

------------------------------------------------------------------------

# 42. Tests

``` text
tests/
```

Recommended:

``` text
tests/
├── core/
├── gameplay/
├── scoring/
├── challenges/
├── accessibility/
└── integration/
```

Priority tests:

``` text
score calculation
answer validation
timer
state transitions
challenge completion
final score
```

------------------------------------------------------------------------

# 43. Scripts

``` text
scripts/
```

Optional utilities:

``` text
validate-content
check-assets
build
generate-data
```

Do not add scripts unless they solve an actual development problem.

------------------------------------------------------------------------

# 44. Recommended Final Tree

A practical MVP repository can look like:

``` text
inclusive-interface/
│
├── AGENTS.md
├── PRD.md
├── GAME_DESIGN.md
├── MVP_SCOPE.md
├── GAMEPLAY_ALGORITHM.md
├── UI_UX_DESIGN.md
├── CONTENT.md
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
├── README.md
├── package.json
├── .gitignore
│
├── src/
│   ├── core/
│   │   ├── GameStateManager.*
│   │   ├── SceneManager.*
│   │   ├── EventBus.*
│   │   ├── InputManager.*
│   │   └── Constants.*
│   │
│   ├── gameplay/
│   │   ├── player/
│   │   ├── npc/
│   │   ├── dialogue/
│   │   ├── challenges/
│   │   ├── appointment/
│   │   ├── scoring/
│   │   ├── accessibility/
│   │   └── objectives/
│   │
│   ├── scenes/
│   │   ├── boot/
│   │   ├── title/
│   │   ├── profile/
│   │   ├── intro/
│   │   ├── developer-room/
│   │   ├── grandma/
│   │   ├── appointment/
│   │   ├── realization/
│   │   ├── designer-intro/
│   │   ├── city/
│   │   ├── final-challenge/
│   │   ├── final-evaluation/
│   │   └── ending/
│   │
│   ├── ui/
│   │   ├── common/
│   │   ├── hud/
│   │   ├── dialogue/
│   │   ├── challenges/
│   │   ├── menus/
│   │   ├── feedback/
│   │   └── accessibility/
│   │
│   └── data/
│
├── content/
│   ├── characters/
│   ├── dialogue/
│   ├── challenges/
│   ├── objectives/
│   └── transformations/
│
├── assets/
│   ├── characters/
│   ├── environments/
│   ├── ui/
│   ├── icons/
│   ├── fonts/
│   ├── audio/
│   └── effects/
│
├── tests/
│   ├── core/
│   ├── gameplay/
│   ├── scoring/
│   ├── challenges/
│   ├── accessibility/
│   └── integration/
│
├── public/
└── scripts/
```

`*` means the actual file extension depends on the framework.

------------------------------------------------------------------------

# 45. Two-Person Team Ownership

The repository should support parallel work.

## Developer A --- World + Narrative

Primary areas:

``` text
src/core/
src/gameplay/player/
src/gameplay/npc/
src/gameplay/dialogue/
src/scenes/
content/characters/
content/dialogue/
assets/characters/
assets/environments/
```

Focus:

-   Player
-   City
-   NPCs
-   Dialogue
-   Scene flow
-   Narrative

------------------------------------------------------------------------

## Developer B --- Accessibility + UI

Primary areas:

``` text
src/gameplay/challenges/
src/gameplay/appointment/
src/gameplay/scoring/
src/gameplay/accessibility/
src/ui/
content/challenges/
content/transformations/
assets/ui/
```

Focus:

-   Appointment simulation
-   Accessibility challenges
-   UI
-   Scoring
-   Interface transformations

------------------------------------------------------------------------

# 46. Shared Areas

Both developers may modify:

``` text
GameStateManager
EventBus
CONTENT.md
AGENTS.md
README.md
```

Coordinate changes before editing shared core files.

Avoid simultaneous large rewrites of the same file.

------------------------------------------------------------------------

# 47. File Naming Convention

Use predictable names.

For code:

``` text
PascalCase
```

Example:

``` text
DialogueManager
ChallengeManager
ScoreManager
```

For content:

``` text
kebab-case
```

Example:

``` text
rahul-01.json
fatima-01.json
color-01.json
```

For assets:

``` text
kebab-case
```

Example:

``` text
rahul-portrait-neutral.png
dialogue-box.png
ui-select.wav
```

Follow the conventions of the chosen framework when they differ.

------------------------------------------------------------------------

# 48. Avoid These Structures

Do not create:

``` text
src/everything.js
```

containing the entire game.

Avoid:

``` text
src/utils/random-files/
```

where unrelated functionality accumulates.

Avoid duplicate systems:

``` text
DialogueManager.js
DialogueSystem.js
DialogueController.js
```

unless each has a clearly different responsibility.

Choose one architecture and keep responsibilities clear.

------------------------------------------------------------------------

# 49. Avoid Premature Abstraction

Do not create a generic framework for hypothetical future features.

For example, do not build:

``` text
UniversalNPCBehaviorFactory
AdvancedQuestPipeline
DynamicAccessibilityOntology
```

for an MVP that only needs three NPCs.

Build the simple version first.

Refactor when repeated patterns actually appear.

------------------------------------------------------------------------

# 50. AI Coding Agent Rules

When Anti-Gravity works on the project:

### Before coding

Read:

``` text
AGENTS.md
```

Then read the relevant specification.

Examples:

``` text
UI task → UI_UX_DESIGN.md
gameplay task → GAMEPLAY_ALGORITHM.md
content task → CONTENT.md
architecture task → ARCHITECTURE.md
scope decision → MVP_SCOPE.md
```

### Before creating a file

Check whether the required system already exists.

### Before changing architecture

Check:

``` text
ARCHITECTURE.md
PROJECT_STRUCTURE.md
```

### After coding

Verify:

-   Imports/references
-   Runtime behavior
-   Relevant tests
-   Full MVP flow if the change affects shared systems

------------------------------------------------------------------------

# 51. Adding a New NPC

A new NPC should ideally require only:

``` text
1. Character data
2. Dialogue data
3. Challenge data
4. Sprite/portrait assets
5. Optional transformation data
```

Core gameplay code should not need to change.

------------------------------------------------------------------------

# 52. Adding a New Challenge

A new challenge should require:

``` text
challenge data
+
optional transformation
+
optional assets
```

The existing `ChallengeManager` should handle it automatically.

------------------------------------------------------------------------

# 53. Adding a New Accessibility Category

If a future category is added:

``` text
motor
```

or:

``` text
cognitive
```

the change should primarily involve:

-   Category data
-   Challenge data
-   Score configuration
-   Final report configuration

Avoid rewriting the challenge engine.

------------------------------------------------------------------------

# 54. Development Order Based on Structure

Create the repository in this order:

## Step 1

Documentation.

``` text
AGENTS.md
PRD.md
GAME_DESIGN.md
MVP_SCOPE.md
GAMEPLAY_ALGORITHM.md
UI_UX_DESIGN.md
CONTENT.md
ARCHITECTURE.md
PROJECT_STRUCTURE.md
```

## Step 2

Project scaffold.

## Step 3

Core systems.

``` text
GameState
SceneManager
InputManager
EventBus
```

## Step 4

Player + first scene.

## Step 5

Opening narrative.

## Step 6

Appointment simulation.

## Step 7

City + NPCs.

## Step 8

Dialogue.

## Step 9

Challenges.

## Step 10

Scoring + transformations.

## Step 11

Final evaluation.

## Step 12

Polish.

------------------------------------------------------------------------

# 55. MVP Minimal Tree

If hackathon time becomes extremely limited, reduce the project to:

``` text
inclusive-interface/
│
├── AGENTS.md
├── PRD.md
├── GAME_DESIGN.md
├── MVP_SCOPE.md
├── GAMEPLAY_ALGORITHM.md
├── UI_UX_DESIGN.md
├── CONTENT.md
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
│
├── src/
│   ├── core/
│   ├── gameplay/
│   ├── scenes/
│   └── ui/
│
├── content/
│   ├── characters/
│   ├── dialogue/
│   └── challenges/
│
└── assets/
    ├── characters/
    ├── environments/
    └── ui/
```

This is enough for the vertical slice.

------------------------------------------------------------------------

# 56. Definition of Done

The project structure is considered healthy when:

-   Every major system has a clear location.
-   Content is separated from gameplay logic.
-   UI is separated from game rules.
-   Shared state has one source of truth.
-   Duplicate managers do not exist.
-   New NPCs can be added mostly through data.
-   New challenges can be added mostly through data.
-   Both developers can work in parallel.
-   An AI coding agent can identify where a feature belongs.
-   The repository remains understandable to a new contributor.

------------------------------------------------------------------------

# 57. Final Principle

The repository should make this question easy to answer:

> **"Where does this code belong?"**

If the answer is unclear, the architecture is becoming too complicated.

For the hackathon, prefer:

``` text
CLEAR
+
MODULAR
+
DATA-DRIVEN
+
SIMPLE
```

over:

``` text
COMPLEX
+
ABSTRACT
+
OVER-ENGINEERED
```

The project structure exists to help the team **finish the game**, not
to impress the codebase.
