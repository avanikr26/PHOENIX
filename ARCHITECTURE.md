# ARCHITECTURE.md --- Inclusive Interface

# 1. Purpose

This document defines the technical architecture for **Inclusive
Interface**.

The architecture is designed for:

-   A two-person hackathon team
-   A browser-based 2D pixel-art / 8-bit narrative RPG
-   Data-driven narrative and challenge content
-   Multiple characters
-   Multiple questions per character
-   Easy → Medium → Hard progression
-   Dynamic interface transformations
-   A maintainable MVP
-   AI-assisted development through Anti-Gravity

The most important architectural principle is:

> **Content is data. Gameplay logic is reusable. UI is presentation.**

Adding a new challenge should not require rewriting the challenge
engine.

------------------------------------------------------------------------

# 2. Architecture Goals

The architecture must:

1.  Keep gameplay modular.
2.  Separate content from logic.
3.  Support multiple challenges per character.
4.  Support multiple difficulty levels.
5.  Render questions dynamically.
6.  Apply reusable interface transformations.
7.  Keep the intentionally inaccessible appointment simulation isolated.
8.  Make progression state explicit.
9.  Prevent duplicate systems.
10. Be easy for two developers and an AI coding agent to understand.

------------------------------------------------------------------------

# 3. High-Level Architecture

``` text
                    ┌─────────────────────┐
                    │   CONTENT DATA      │
                    │                     │
                    │ Characters           │
                    │ Dialogue             │
                    │ Challenges           │
                    │ Transformations      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   CONTENT LOADER    │
                    │                     │
                    │ Load + validate      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ CHALLENGE REGISTRY  │
                    │                     │
                    │ Indexed content      │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┴─────────────────┐
             ▼                                   ▼
   ┌─────────────────────┐             ┌─────────────────────┐
   │   GAMEPLAY LAYER    │             │   GAME STATE        │
   │                     │             │                     │
   │ ChallengeManager    │◄───────────►│ GameStateManager    │
   │ DialogueManager     │             │ Progress            │
   │ ScoreManager        │             │ Unlocks             │
   │ CharacterManager    │             │ Attempts            │
   │ TransformationMgr   │             └─────────────────────┘
   └──────────┬──────────┘
              │
              ▼
   ┌─────────────────────┐
   │  PRESENTATION LAYER │
   │                     │
   │ ChallengePanel      │
   │ ChoiceList          │
   │ DialogueBox         │
   │ ScorePopup          │
   │ World / HUD         │
   └─────────────────────┘
```

------------------------------------------------------------------------

# 4. Architectural Layers

The project uses five main layers:

``` text
Presentation
     ↓
Gameplay
     ↓
State
     ↓
Content
     ↓
Assets / Platform
```

The layers should have clear responsibilities.

------------------------------------------------------------------------

# 5. Presentation Layer

The presentation layer controls what the player sees.

Responsibilities:

-   Rendering
-   HUD
-   Dialogue
-   Menus
-   Challenge UI
-   Choice rendering
-   Score display
-   Animations
-   Transitions
-   Pixel-art presentation
-   Audio playback
-   Visual effects

Examples:

``` text
HUD
DialogueBox
ChoiceList
ChallengePanel
ScorePopup
TimerDisplay
InteractionPrompt
SystemMessage
PauseMenu
```

The presentation layer must **not** decide:

-   Whether an answer is correct
-   How many challenges a character has
-   Whether a difficulty is unlocked
-   How many points to award
-   Whether a character is complete

Those decisions belong to gameplay/state systems.

------------------------------------------------------------------------

# 6. Gameplay Layer

The gameplay layer controls interactive behavior.

Recommended systems:

``` text
PlayerController
NPCInteractionSystem
DialogueManager
CharacterManager
ChallengeManager
ScoreManager
ProgressionManager
TransformationManager
AppointmentSimulation
ObjectiveManager
```

Responsibilities:

### `PlayerController`

-   Movement
-   Interaction input
-   Exploration

### `NPCInteractionSystem`

-   Detect nearby NPCs
-   Show interaction prompts
-   Start character interactions

### `DialogueManager`

-   Load dialogue
-   Advance dialogue nodes
-   Handle dialogue choices
-   Trigger gameplay events

### `CharacterManager`

-   Load character data
-   Track character progress
-   Determine whether a character is complete

### `ChallengeManager`

-   Find available challenges
-   Filter by character/difficulty
-   Start challenges
-   Evaluate answers
-   Mark challenges complete

### `ScoreManager`

-   Award points
-   Track category scores
-   Calculate final score

### `ProgressionManager`

-   Unlock difficulty
-   Unlock characters/locations
-   Determine final challenge eligibility

### `TransformationManager`

-   Apply reusable interface changes

### `AppointmentSimulation`

-   Run the deliberately inaccessible appointment experience
-   Manage its timer and task state

------------------------------------------------------------------------

# 7. Game State Layer

`GameStateManager` owns important runtime progression.

Conceptually:

``` text
GameState
│
├── player
│   ├── name
│   └── username
│
├── currentScene
├── currentCharacterId
├── currentChallengeId
├── currentDifficulty
│
├── score
├── categoryScores
│
├── completedChallenges[]
├── challengeAttempts{}
├── characterProgress{}
├── unlockedDifficulties[]
├── discoveredCharacters[]
│
└── gameCompleted
```

This is the source of truth for progression.

UI should read state rather than maintain duplicate progression state.

------------------------------------------------------------------------

# 8. Character Progress Model

Characters must support multiple challenges.

Example:

``` text
Rahul
│
├── Easy
│   ├── completed
│   ├── completed
│   └── completed
│
├── Medium
│   ├── completed
│   ├── completed
│   └── incomplete
│
└── Hard
    ├── locked
    ├── locked
    └── locked
```

Conceptual data:

``` json
{
  "rahul": {
    "easyCompleted": 3,
    "mediumCompleted": 2,
    "hardCompleted": 0
  }
}
```

The architecture must never assume one question per character.

------------------------------------------------------------------------

# 9. Content Data Layer

Content lives outside gameplay code.

Recommended content domains:

``` text
content/
├── characters/
├── dialogue/
├── challenges/
├── transformations/
└── objectives/
```

Content includes:

### Characters

``` text
id
name
category
personality
dialogueId
challengePoolId
```

### Dialogue

``` text
id
speaker
text
portrait
expression
next
choice
trigger
```

### Challenges

``` text
id
characterId
difficulty
category
scenario
question
options[]
correctOption
explanation
points
interfaceChanges[]
```

### Transformations

``` text
id
type
target
parameters
```

------------------------------------------------------------------------

# 10. Content Loader

The `ContentLoader` loads and validates content before gameplay uses it.

Responsibilities:

``` text
loadCharacters()
loadDialogue()
loadChallenges()
loadTransformations()
loadObjectives()
validateContent()
```

Conceptual flow:

``` text
Raw Content
    ↓
Parse
    ↓
Validate
    ↓
Normalize
    ↓
Challenge Registry
    ↓
Runtime
```

------------------------------------------------------------------------

# 11. Challenge Registry

The `ChallengeRegistry` provides indexed access to challenge data.

Conceptually:

``` text
ChallengeRegistry
│
├── byId
├── byCharacter
├── byDifficulty
└── byCategory
```

Example:

``` text
byCharacter["rahul"]
        ↓
all Rahul challenges
```

Then:

``` text
filter(difficulty = "medium")
        ↓
Rahul medium challenges
```

This prevents repeated full-data searches and keeps `ChallengeManager`
simple.

------------------------------------------------------------------------

# 12. Challenge Manager

`ChallengeManager` is the main runtime controller for the dynamic
challenge system.

Responsibilities:

``` text
getNextChallenge()
startChallenge()
submitAnswer()
retryChallenge()
completeChallenge()
getAvailableChallenges()
```

It should use:

``` text
characterId
difficulty
completedChallenges
prerequisites
```

to determine what the player should see next.

It must **not** contain authored question text.

------------------------------------------------------------------------

# 13. Dynamic Challenge Selection

The architecture supports:

``` text
Character
   ↓
Challenge Registry
   ↓
Difficulty Filter
   ↓
Remove Completed
   ↓
Check Prerequisites
   ↓
Select Next
```

Example:

``` ts
getNextChallenge("rahul", "easy")
```

can return:

``` text
rahul-visual-easy-02
```

without the UI knowing how that challenge was selected.

------------------------------------------------------------------------

# 14. Adding a New Challenge

Adding:

``` text
rahul-visual-easy-04
```

should require adding content data.

It should **not** require modifying:

``` text
ChallengeManager
ChallengePanel
ChoiceList
GameStateManager
```

unless the new challenge introduces a genuinely new mechanic.

This is a core scalability requirement.

------------------------------------------------------------------------

# 15. Dynamic Challenge UI

The UI uses one reusable challenge presentation system.

``` text
ChallengePanel
│
├── CharacterContext
├── ScenarioText
├── QuestionText
├── ChoiceList
├── FeedbackPanel
├── ScorePopup
└── ContinueButton
```

Data flow:

``` text
ChallengeManager
      ↓
Challenge data
      ↓
ChallengePanel
      ↓
render scenario/question/options
```

The UI should not contain:

``` text
RahulQuestion1
RahulQuestion2
FatimaQuestion1
```

as separate components.

------------------------------------------------------------------------

# 16. Choice List

`ChoiceList` is purely presentational.

Responsibilities:

-   Render options dynamically
-   Highlight selected option
-   Support keyboard/controller navigation
-   Emit selected option ID

It does not:

-   Determine correctness
-   Award points
-   Change difficulty
-   Complete the challenge

Example:

``` text
ChoiceList
    ↓
selectedOptionId = "b"
    ↓
ChallengeManager.submitAnswer("b")
```

------------------------------------------------------------------------

# 17. Answer Evaluation

The architecture separates:

``` text
UI selection
```

from:

``` text
answer evaluation
```

Flow:

``` text
Player selects option
        ↓
ChoiceList emits optionId
        ↓
ChallengeManager
        ↓
compare optionId with correctOption
        ↓
correct / incorrect
```

Correct answers must come from content data.

------------------------------------------------------------------------

# 18. Score Architecture

`ScoreManager` receives challenge results.

Example:

``` text
ChallengeResult
│
├── challengeId
├── characterId
├── category
├── correct
├── attempts
└── points
```

Then:

``` text
ScoreManager
    ↓
global score
    +
category score
```

------------------------------------------------------------------------

# 19. Accessibility Manager

`AccessibilityManager` tracks category-level performance.

Categories:

``` text
visual
hearing
motor
cognitive
color
language
```

Responsibilities:

``` text
addCategoryScore()
getCategoryScore()
getOverallScore()
getReport()
```

Only implemented categories should appear in the final report.

------------------------------------------------------------------------

# 20. Progression Manager

`ProgressionManager` controls unlocks.

Responsibilities:

``` text
checkDifficultyUnlock()
unlockDifficulty()
checkCharacterCompletion()
unlockCharacter()
canStartFinalChallenge()
```

Example:

``` text
Easy required challenges complete
        ↓
Medium unlocked
        ↓
Medium required challenges complete
        ↓
Hard unlocked
```

Thresholds should be configurable.

------------------------------------------------------------------------

# 21. Interface Transformation System

Successful design decisions can trigger visible interface changes.

Examples:

``` text
add-descriptive-labels
increase-target-size
add-text-status
add-captions
add-visual-alert
add-error-description
improve-reading-order
add-progress-indicator
```

The transformation is referenced by ID:

``` json
{
  "interfaceChanges": [
    "add-descriptive-labels"
  ]
}
```

`TransformationManager` resolves the ID and applies the appropriate
reusable transformation.

------------------------------------------------------------------------

# 22. Transformation Architecture

Prefer reusable transformations:

``` text
TransformationManager
│
├── LabelTransformation
├── TargetSizeTransformation
├── ContrastTransformation
├── CaptionTransformation
├── StatusTextTransformation
├── ErrorMessageTransformation
└── ReadingOrderTransformation
```

Avoid creating a unique transformation class for every question.

------------------------------------------------------------------------

# 23. Challenge-to-Transformation Flow

``` text
Correct Answer
      ↓
ChallengeResult
      ↓
Transformation IDs
      ↓
TransformationManager
      ↓
Apply visual change
      ↓
Animation / feedback
      ↓
Return to gameplay
```

This keeps the learning consequence visible.

------------------------------------------------------------------------

# 24. Appointment Simulation Architecture

The deliberately inaccessible appointment website is a separate
subsystem.

``` text
AppointmentSimulation
│
├── AppointmentState
├── AppointmentTimer
├── DoctorSelector
├── DateSelector
├── TimeSelector
├── PatientForm
├── Captcha
└── Confirmation
```

The simulation may intentionally contain bad UX.

However:

> The actual game interface must remain accessible.

The simulation must not contaminate shared UI components with
inaccessible behavior.

------------------------------------------------------------------------

# 25. Appointment State

Conceptual:

``` text
AppointmentState
│
├── selectedDoctor
├── selectedDate
├── selectedTime
├── patientDetails
├── captchaCompleted
├── appointmentCompleted
└── timeRemaining
```

------------------------------------------------------------------------

# 26. Appointment Timer

The timer is isolated from form logic.

Responsibilities:

``` text
start()
stop()
reset()
getRemainingTime()
```

The timer should use elapsed time rather than assuming each update
equals exactly one second.

When the task ends:

``` text
timer.stop()
```

It must never continue after leaving the appointment scene.

------------------------------------------------------------------------

# 27. Scene Architecture

Recommended major scenes:

``` text
Boot
Title
Profile
Intro
DeveloperRoom
GrandmaScene
AppointmentSimulation
Realization
DesignerIntro
City
FinalChallenge
FinalEvaluation
Ending
```

NPC dialogue and challenges do not need separate scenes for every
character/question.

They can be runtime content inside the city/challenge systems.

------------------------------------------------------------------------

# 28. Scene Manager

`SceneManager` controls major scene transitions.

Conceptual:

``` text
loadScene(sceneId)
```

Responsibilities:

-   Exit current scene
-   Clean temporary scene state
-   Load next scene
-   Initialize required systems
-   Emit transition events

------------------------------------------------------------------------

# 29. Event Bus

Use an event bus for loose coupling.

Possible events:

``` text
SceneChanged
DialogueStarted
DialogueCompleted
ChallengeStarted
AnswerSubmitted
ChallengeCompleted
ScoreChanged
DifficultyUnlocked
CharacterCompleted
TransformationApplied
TimerStarted
TimerExpired
GameCompleted
```

Example:

``` text
ChallengeManager
      ↓
ChallengeCompleted
      ↓
ProgressionManager
ScoreManager
TransformationManager
UI
```

This avoids tightly coupling every system.

------------------------------------------------------------------------

# 30. Input Architecture

Centralize input mapping.

``` text
InputManager
│
├── MOVE_UP
├── MOVE_DOWN
├── MOVE_LEFT
├── MOVE_RIGHT
├── INTERACT
├── CONFIRM
├── BACK
└── PAUSE
```

This allows controls to change without rewriting gameplay logic.

------------------------------------------------------------------------

# 31. Audio Architecture

Use an `AudioManager`.

Responsibilities:

``` text
playMusic()
playSFX()
stopMusic()
setMusicVolume()
setSFXVolume()
```

Audio should support:

-   Pixel-art RPG atmosphere
-   Dialogue feedback
-   UI interactions
-   Glitch transitions
-   Challenge feedback

------------------------------------------------------------------------

# 32. Settings Architecture

Centralize settings.

Possible values:

``` text
textSize
subtitlesEnabled
masterVolume
musicVolume
sfxVolume
reducedMotion
controlScheme
```

The game should read these settings when rendering relevant UI.

------------------------------------------------------------------------

# 33. Save Architecture

For the MVP, local/session saving is sufficient.

Potential:

``` text
SaveData
│
├── player
├── score
├── categoryScores
├── completedChallenges
├── challengeAttempts
├── characterProgress
├── unlockedDifficulties
├── difficulty
└── currentScene
```

Do not build a cloud backend unless explicitly required.

No sensitive personal data should be stored.

------------------------------------------------------------------------

# 34. Dependency Direction

Preferred:

``` text
Presentation
      ↓
Gameplay
      ↓
Game State
      ↓
Content
```

Assets/platform services can be consumed by the relevant layer.

Avoid:

``` text
Content → UI
```

and avoid systems directly depending on every other system.

------------------------------------------------------------------------

# 35. Circular Dependency Rule

Avoid:

``` text
DialogueManager → ChallengeUI
ChallengeUI → DialogueManager
```

Prefer:

``` text
DialogueManager
      ↓
EventBus
      ↓
Game/Scene Controller
      ↓
ChallengeManager
```

or another coordinator that keeps responsibilities clear.

------------------------------------------------------------------------

# 36. Content Validation

Development-time validation should check:

``` text
Missing character IDs
Missing dialogue IDs
Missing challenge IDs
Duplicate challenge IDs
Invalid correct-option references
Invalid difficulty values
Invalid category values
Invalid transformation IDs
Broken prerequisites
Broken scene references
Missing assets
```

Validation errors must be explicit.

Do not silently skip broken content.

------------------------------------------------------------------------

# 37. Architecture for Content Scaling

The architecture must support:

``` text
3 characters
×
3 difficulty levels
×
multiple questions
```

and later:

``` text
10+ characters
multiple categories
multiple scenarios
multiple cities
expert challenges
```

without replacing the core challenge system.

------------------------------------------------------------------------

# 38. No Hardcoded Character Challenge Logic

Never implement:

``` ts
if (character === "rahul") {
    showQuestion1();
}
```

or:

``` ts
if (questionNumber === 2) {
    unlockMedium();
}
```

Use data and progression state:

``` ts
characterId
challengeId
difficulty
completedChallenges
characterProgress
```

This is mandatory for the dynamic content architecture.

------------------------------------------------------------------------

# 39. Project Structure

Recommended conceptual structure:

``` text
inclusive-interface/
│
├── AGENTS.md
├── README.md
├── PRD.md
├── GAME_DESIGN.md
├── MVP_SCOPE.md
├── GAMEPLAY_ALGORITHM.md
├── UI_UX_DESIGN.md
├── CONTENT.md
├── CHALLENGE_CONTENT_STRUCTURE.md
├── ARCHITECTURE.md
├── PROJECT_STRUCTURE.md
├── TECH_STACK.md
├── API_SPEC.md
├── SECURITY.md
├── PERFORMANCE.md
│
├── src/
│   ├── core/
│   │   ├── GameStateManager
│   │   ├── SceneManager
│   │   ├── EventBus
│   │   ├── InputManager
│   │   └── Config
│   │
│   ├── gameplay/
│   │   ├── PlayerController
│   │   ├── NPCInteractionSystem
│   │   ├── DialogueManager
│   │   ├── CharacterManager
│   │   ├── ChallengeManager
│   │   ├── ScoreManager
│   │   ├── ProgressionManager
│   │   ├── TransformationManager
│   │   ├── AccessibilityManager
│   │   └── AppointmentSimulation
│   │
│   ├── scenes/
│   │   ├── Boot
│   │   ├── Title
│   │   ├── Profile
│   │   ├── DeveloperRoom
│   │   ├── Appointment
│   │   ├── Realization
│   │   ├── DesignerIntro
│   │   ├── City
│   │   ├── FinalChallenge
│   │   ├── FinalEvaluation
│   │   └── Ending
│   │
│   ├── ui/
│   │   ├── DialogueBox
│   │   ├── ChoiceList
│   │   ├── ChallengePanel
│   │   ├── HUD
│   │   ├── Timer
│   │   ├── Score
│   │   └── SystemMessage
│   │
│   ├── data/
│   │   ├── ContentLoader
│   │   ├── ChallengeRegistry
│   │   └── validators
│   │
│   └── utils/
│
├── content/
│   ├── characters/
│   ├── dialogue/
│   ├── challenges/
│   ├── transformations/
│   └── objectives/
│
├── assets/
│   ├── characters/
│   ├── environments/
│   ├── ui/
│   ├── icons/
│   ├── audio/
│   ├── fonts/
│   └── effects/
│
└── tests/
    ├── unit/
    ├── integration/
    └── gameplay/
```

The exact folders may be adapted to the selected framework.

------------------------------------------------------------------------

# 40. Testing Architecture

## Unit Tests

Test:

``` text
Challenge selection
Answer validation
Score calculation
Category scoring
Difficulty unlocks
Character completion
Transformation resolution
Timer behavior
Content validation
State transitions
```

## Integration Tests

Test:

``` text
Dialogue → challenge
Challenge → answer
Answer → score
Answer → transformation
Challenge → progression
Character → next character
Final challenge → evaluation
```

## Playtest Tests

Test:

``` text
Complete opening
Complete appointment
Explore city
Meet NPC
Complete multiple challenges
Unlock Medium
Unlock Hard
Complete multiple characters
Complete final challenge
Finish ending
```

------------------------------------------------------------------------

# 41. Critical Integration Scenario

At minimum, the following must work:

``` text
Start game
 ↓
Complete profile
 ↓
Reach appointment
 ↓
Experience 30-second simulation
 ↓
Reach realization
 ↓
Enter city
 ↓
Meet Rahul
 ↓
Complete Rahul Easy Challenge 1
 ↓
Return / continue
 ↓
Load Rahul Easy Challenge 2
 ↓
Complete remaining Easy challenges
 ↓
Unlock Medium
 ↓
Load Rahul Medium Challenge 1
 ↓
Continue progression
```

This specifically verifies that the game is not implemented as a
one-question-per-NPC flow.

------------------------------------------------------------------------

# 42. Performance Architecture

Avoid unnecessary runtime work.

Prefer:

``` text
load content once
index content
reuse UI
reuse transformations
destroy unused scene resources
```

Do not reload all challenge content every time the player meets an NPC.

------------------------------------------------------------------------

# 43. Error Boundary Principle

A broken optional content item should not crash the entire game.

Example:

``` text
Challenge A invalid
      ↓
development error
      ↓
skip / fallback
      ↓
game remains recoverable
```

However, required MVP content must be validated before the demo build.

------------------------------------------------------------------------

# 44. Security Boundary

The application is primarily client-side.

Therefore:

-   No real medical data
-   No real appointments
-   No passwords
-   No API secrets in client code
-   No unnecessary personal data
-   Validate player-entered profile fields
-   Treat local/session storage as untrusted

The appointment system is fictional.

------------------------------------------------------------------------

# 45. Accessibility Boundary

The intentionally inaccessible website is a **controlled simulation**.

It is the only part intentionally designed with barriers such as:

``` text
tiny text
poor contrast
tiny targets
confusing hierarchy
bad CAPTCHA
```

The actual game UI should provide:

``` text
keyboard support
readable text
captions
clear focus
appropriate controls
reduced motion support
pause when needed
```

This distinction is architecturally important.

------------------------------------------------------------------------

# 46. AI Coding-Agent Boundary

Anti-Gravity must treat the documentation files as the project
specification.

When implementing:

``` text
Read relevant documentation
        ↓
Inspect existing architecture
        ↓
Reuse existing systems
        ↓
Add the smallest necessary change
        ↓
Test
        ↓
Build
```

It must not invent a separate question system when `ChallengeManager`
already exists.

------------------------------------------------------------------------

# 47. Architecture Decision Summary

The project uses:

``` text
Data-driven content
        +
Reusable gameplay systems
        +
Central game state
        +
Event-driven communication
        +
Reusable UI
        +
Reusable transformations
        +
Isolated appointment simulation
```

This gives the game enough structure to scale without becoming
unnecessarily complex.

------------------------------------------------------------------------

# 48. Definition of Done

Architecture is considered correctly implemented when:

``` text
[ ] Content is separated from gameplay logic.
[ ] Challenge data can be loaded dynamically.
[ ] Multiple challenges per character work.
[ ] Multiple difficulty levels work.
[ ] Challenge UI is reusable.
[ ] Character progress is independent.
[ ] Difficulty unlocks are data/state-driven.
[ ] Answer evaluation is separated from UI.
[ ] Score calculation is separated from UI.
[ ] Transformations are reusable.
[ ] Appointment simulation is isolated.
[ ] Game state is centralized.
[ ] Systems communicate through clear boundaries/events.
[ ] Adding a new challenge does not require rewriting the engine.
[ ] Adding a new character does not require creating a new challenge engine.
[ ] Content validation catches broken references.
[ ] The actual game UI remains accessible.
```

------------------------------------------------------------------------

# 49. Final Architectural Principle

The game should behave like:

``` text
CONTENT
  ↓
SYSTEMS
  ↓
STATE
  ↓
UI
  ↓
PLAYER EXPERIENCE
```

not:

``` text
ONE HUGE SCRIPT
  ↓
HARDCODED QUESTIONS
  ↓
HARDCODED NPCS
  ↓
HARDCODED SCREENS
```

The architecture exists to preserve the game's core identity:

> **An 8-bit/pixel-art narrative RPG where the player learns inclusive
> digital design through repeated, increasingly difficult, dynamic
> design challenges.**
