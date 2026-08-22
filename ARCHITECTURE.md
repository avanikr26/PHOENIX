# ARCHITECTURE.md --- Inclusive Interface

# 1. Purpose

This document defines the technical architecture for **Inclusive
Interface**.

The architecture is designed for a **two-person hackathon team** and
prioritizes:

-   Fast development
-   Clear separation of responsibilities
-   Reusable systems
-   Data-driven content
-   Easy debugging
-   Stable MVP delivery
-   Simple integration
-   Future extensibility

The architecture should support the core game loop without
over-engineering the project.

------------------------------------------------------------------------

# 2. Architecture Philosophy

The project should follow this principle:

> **Build the smallest architecture that can reliably support the game
> experience.**

The MVP does not require:

-   Microservices
-   Complex backend infrastructure
-   Multiplayer servers
-   Real authentication
-   Large databases
-   Procedural world generation
-   Cloud infrastructure

The game can initially run as a client-side application with
local/static data.

------------------------------------------------------------------------

# 3. High-Level Architecture

``` text
                         GAME APPLICATION
                               │
                ┌──────────────┴──────────────┐
                │                             │
          PRESENTATION                    GAME LOGIC
                │                             │
        ┌───────┼────────┐          ┌─────────┼─────────┐
        │       │        │          │         │         │
       UI    Scenes   Dialogue   GameState  Challenges  Scoring
        │       │        │          │         │         │
        └───────┴────────┘          └─────────┼─────────┘
                                              │
                                        CONTENT DATA
                                              │
                              ┌───────────────┼───────────────┐
                              │               │               │
                          Characters      Challenges       Dialogue
                              │               │               │
                              └───────────────┼───────────────┘
                                              │
                                            Assets
```

------------------------------------------------------------------------

# 4. Recommended Layering

The project should conceptually contain five layers:

``` text
1. PRESENTATION
2. GAMEPLAY
3. GAME STATE
4. CONTENT DATA
5. ASSETS / PLATFORM
```

------------------------------------------------------------------------

# 5. Presentation Layer

The presentation layer handles what the player sees and interacts with.

Responsibilities:

-   Rendering
-   HUD
-   Dialogue UI
-   Menus
-   Challenge UI
-   Score display
-   Animations
-   Transitions
-   Visual effects
-   Audio playback

Examples:

``` text
HUD
DialogueBox
ChoicePanel
ChallengePanel
ScorePopup
TimerDisplay
PauseMenu
SettingsMenu
```

The presentation layer should not contain complex game rules.

For example:

### Avoid

``` text
DialogueBox decides when a challenge is completed.
```

### Prefer

``` text
DialogueManager announces dialogue completion.
GameStateManager decides what happens next.
```

------------------------------------------------------------------------

# 6. Gameplay Layer

The gameplay layer controls interactive behavior.

Responsibilities:

-   Player movement
-   NPC interaction
-   Dialogue progression
-   Challenge progression
-   Appointment simulation
-   Timer
-   Scene transitions
-   Quest/objective progression
-   Interface transformation

Recommended systems:

``` text
PlayerController
NPCInteractionSystem
DialogueManager
ChallengeManager
AppointmentChallenge
SceneManager
ObjectiveManager
AccessibilityManager
```

------------------------------------------------------------------------

# 7. Game State Layer

The game state represents the current state of the player and world.

Conceptual structure:

``` text
GameState
│
├── player
│   ├── name
│   └── username
│
├── currentScene
├── difficulty
├── score
│
├── categoryScores
│
├── completedChallenges
├── challengeAttempts
├── discoveredCharacters
├── unlockedLocations
│
└── gameCompleted
```

This should be the source of truth for important progression.

------------------------------------------------------------------------

# 8. Content Data Layer

Content should be separated from gameplay code wherever practical.

Store:

-   Character data
-   Dialogue
-   Challenge questions
-   Answer options
-   Correct answers
-   Explanations
-   Score values
-   Interface transformations
-   Objectives

This makes it possible to add new scenarios without rewriting game
systems.

------------------------------------------------------------------------

# 9. Asset Layer

Assets include:

``` text
characters/
environments/
ui/
icons/
audio/
music/
effects/
fonts/
```

The game should use consistent naming.

Example:

``` text
rahul_idle.png
rahul_portrait_neutral.png
rahul_portrait_smile.png

city_hospital.png
city_plaza.png

ui_dialogue_box.png
ui_choice_cursor.png
```

------------------------------------------------------------------------

# 10. Scene Architecture

The game should be divided into logical scenes/states.

Recommended:

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

The exact implementation depends on the chosen engine/framework.

------------------------------------------------------------------------

# 11. Scene Manager

A centralized scene manager should control transitions.

Conceptual API:

``` text
loadScene(sceneId)
```

Examples:

``` text
loadScene("developer_room")
loadScene("appointment_simulation")
loadScene("city")
```

The scene manager should:

-   End the current scene.
-   Clean up temporary state.
-   Load the next scene.
-   Trigger scene initialization.
-   Notify relevant systems.

------------------------------------------------------------------------

# 12. Scene Transition Flow

Opening:

``` text
BOOT
 ↓
TITLE
 ↓
PROFILE
 ↓
INTRO
 ↓
DEVELOPER_ROOM
```

First challenge:

``` text
DEVELOPER_ROOM
 ↓
GRANDMA_SCENE
 ↓
APPOINTMENT_SIMULATION
 ↓
REALIZATION
```

Main game:

``` text
REALIZATION
 ↓
DESIGNER_INTRO
 ↓
CITY
 ↓
NPC_DIALOGUE
 ↓
CHALLENGE
 ↓
CITY
```

Ending:

``` text
FINAL_CHALLENGE
 ↓
FINAL_EVALUATION
 ↓
ENDING
```

------------------------------------------------------------------------

# 13. Event Architecture

Use events to reduce direct coupling between systems.

Important events:

``` text
GameStarted
ProfileCreated
DialogueStarted
DialogueCompleted
TaskStarted
TimerStarted
TimerExpired
AppointmentCompleted
ChallengeStarted
AnswerSelected
ChallengeCompleted
ScoreChanged
InterfaceChanged
NPCCompleted
LocationUnlocked
FinalChallengeUnlocked
GameCompleted
```

------------------------------------------------------------------------

# 14. Example Event Flow

When Rahul's challenge is completed:

``` text
ChallengeManager
      ↓
ChallengeCompleted
      ↓
ScoreManager
      ↓
ScoreChanged
      ↓
AccessibilityManager
      ↓
CategoryScoreChanged
      ↓
UIManager
      ↓
ScorePopup
```

The challenge system does not need to directly manipulate every UI
component.

------------------------------------------------------------------------

# 15. Game State Manager

The `GameStateManager` should manage persistent gameplay state.

Responsibilities:

-   Player profile
-   Current scene
-   Score
-   Category scores
-   Challenge completion
-   Difficulty
-   Unlocks
-   Completion status

It should expose controlled methods rather than allowing every component
to freely modify state.

Conceptually:

``` text
getState()
setScene()
addScore()
completeChallenge()
updateCategoryScore()
unlockLocation()
resetGame()
```

------------------------------------------------------------------------

# 16. Player Controller

Responsibilities:

-   Movement
-   Direction
-   Animation state
-   Interaction detection

The player controller should not directly implement dialogue or
challenge logic.

Example:

``` text
PlayerController
      ↓
InteractionDetector
      ↓
NPCInteractionSystem
      ↓
DialogueManager
```

------------------------------------------------------------------------

# 17. NPC Architecture

Each NPC should be data-driven.

Conceptual structure:

``` text
NPC
│
├── id
├── name
├── personality
├── sprite
├── portrait
├── location
├── dialogueId
├── challengeId
├── category
└── completed
```

This makes adding a new NPC straightforward.

------------------------------------------------------------------------

# 18. NPC Interaction System

The interaction system should:

1.  Detect nearby interactable objects.
2.  Determine the highest-priority interaction.
3.  Show the interaction prompt.
4.  Wait for player input.
5.  Trigger the appropriate action.

Example:

``` text
Player enters Rahul's interaction radius
        ↓
Show [E] TALK
        ↓
Player presses E
        ↓
Start Rahul dialogue
```

------------------------------------------------------------------------

# 19. Dialogue Architecture

Dialogue should be data-driven.

Conceptual structure:

``` text
DialogueNode
│
├── id
├── speaker
├── text
├── portrait
├── expression
├── next
├── choices
└── trigger
```

Example:

``` text
{
    id: "rahul_03",
    speaker: "Rahul",
    text: "I don't know what half of these buttons do.",
    next: "rahul_challenge"
}
```

The actual syntax should match the chosen technology.

------------------------------------------------------------------------

# 20. Dialogue Manager

Responsibilities:

-   Load dialogue data.
-   Display speaker.
-   Display portrait.
-   Animate text.
-   Handle input.
-   Advance nodes.
-   Trigger choices.
-   Fire completion events.

The manager should not contain every dialogue line directly in code.

------------------------------------------------------------------------

# 21. Challenge Architecture

Challenges should be represented as data.

Conceptual structure:

``` text
Challenge
│
├── id
├── characterId
├── category
├── scenario
├── question
├── options[]
├── correctOption
├── explanation
├── basePoints
├── firstAttemptBonus
└── interfaceChanges[]
```

------------------------------------------------------------------------

# 22. Challenge Manager

Responsibilities:

-   Load challenge.
-   Display question.
-   Display options.
-   Track attempts.
-   Validate answer.
-   Calculate result.
-   Trigger feedback.
-   Apply interface changes.
-   Complete challenge.

Conceptual flow:

``` text
startChallenge(id)
      ↓
load data
      ↓
show challenge
      ↓
wait for selection
      ↓
validate
      ↓
correct / incorrect
```

------------------------------------------------------------------------

# 23. Answer Validation

The challenge manager should compare the selected option against the
challenge's correct option.

Example:

``` text
selectedOption == challenge.correctOption
```

If correct:

``` text
handleCorrectAnswer()
```

Otherwise:

``` text
handleIncorrectAnswer()
```

Do not place answer validation inside the UI component.

------------------------------------------------------------------------

# 24. Score Manager

The score manager is responsible for all score calculations.

Recommended constants:

``` text
BASE_CORRECT_POINTS = 100
FIRST_ATTEMPT_BONUS = 25
SPEED_BONUS = 10
```

Conceptual method:

``` text
awardChallengePoints(challenge, attempts, speed)
```

The score manager should emit:

``` text
ScoreChanged
```

after updating the score.

------------------------------------------------------------------------

# 25. Accessibility Manager

The `AccessibilityManager` tracks category-specific progress.

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

-   Add category points.
-   Calculate category percentages.
-   Calculate overall score.
-   Provide final report data.

Conceptual API:

``` text
addCategoryScore(category, value)
getCategoryScore(category)
getOverallScore()
getReport()
```

------------------------------------------------------------------------

# 26. Interface Transformation System

This system converts a successful accessibility decision into a visible
UI change.

Example transformation types:

``` text
increaseTextSize
increaseTargetSize
improveContrast
addLabel
addCaption
addIcon
addTextAlternative
simplifyLayout
reduceMotion
```

A challenge may contain:

``` text
interfaceChanges:
    - addLabel
    - increaseTargetSize
```

The system applies those changes.

------------------------------------------------------------------------

# 27. Important Architecture Rule

Do not hardcode every transformation as a unique one-off implementation.

Prefer reusable transformation components.

Example:

``` text
ButtonLabelTransformation
ContrastTransformation
CaptionTransformation
TargetSizeTransformation
```

Then challenges can combine them.

------------------------------------------------------------------------

# 28. Appointment Simulation Architecture

The appointment website should be isolated from the main game UI.

Recommended components:

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

The simulation can intentionally implement bad UX behaviors without
contaminating the actual game interface.

------------------------------------------------------------------------

# 29. Appointment State

Conceptual state:

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

# 30. Appointment Timer

The timer should be isolated from appointment form logic.

Responsibilities:

-   Start
-   Tick
-   Stop
-   Reset
-   Notify expiration

Events:

``` text
TimerStarted
TimerTick
TimerExpired
```

The appointment simulation listens to timer expiration.

------------------------------------------------------------------------

# 31. Timer Safety

When the appointment is completed:

``` text
timer.stop()
```

When the timer reaches zero:

``` text
timer.stop()
```

The timer must never continue running after leaving the appointment
scene.

------------------------------------------------------------------------

# 32. UI Architecture

Use reusable components.

Suggested components:

``` text
Button
Panel
DialogueBox
Portrait
ChoiceList
InteractionPrompt
ScorePopup
Timer
SystemMessage
ProgressBar
Modal
```

The exact component names may change.

------------------------------------------------------------------------

# 33. UI Component Rule

Reusable components should be responsible for presentation.

For example:

### `ChoiceList`

Responsible for:

-   Rendering choices
-   Showing selected option
-   Handling navigation

Not responsible for:

-   Determining whether an answer is correct
-   Awarding score
-   Updating game progression

Those belong to gameplay systems.

------------------------------------------------------------------------

# 34. Input Architecture

Centralize input mapping.

Example:

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

This allows keyboard/controller mappings to be changed without rewriting
gameplay code.

------------------------------------------------------------------------

# 35. Audio Architecture

Use an `AudioManager`.

Responsibilities:

-   Music
-   Sound effects
-   Volume
-   Scene music
-   Transition sounds

Conceptual methods:

``` text
playMusic(track)
playSFX(sound)
stopMusic()
setMusicVolume(value)
setSFXVolume(value)
```

------------------------------------------------------------------------

# 36. Settings Architecture

Settings should be centralized.

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

# 37. Save Architecture

For MVP, local/session saving is sufficient.

Potential save object:

``` text
SaveData
│
├── player
├── score
├── categoryScores
├── completedChallenges
├── unlockedLocations
├── difficulty
└── currentScene
```

Do not build a cloud backend unless explicitly required.

------------------------------------------------------------------------

# 38. Content Architecture

Content should live outside core gameplay code.

Recommended:

``` text
content/
├── characters/
├── dialogue/
├── challenges/
├── objectives/
└── transformations/
```

Possible formats:

``` text
JSON
YAML
TypeScript objects
JavaScript modules
```

Use whichever format fits the selected framework.

------------------------------------------------------------------------

# 39. Content Loading

At startup:

``` text
load character data
load dialogue data
load challenge data
load transformation data
```

Validate the data.

If invalid:

``` text
log clear development error
```

Do not silently fail.

------------------------------------------------------------------------

# 40. Validation

Add development-time validation for:

-   Missing character IDs
-   Missing dialogue IDs
-   Missing challenge IDs
-   Invalid correct-answer references
-   Missing assets
-   Invalid category names
-   Broken scene references

This prevents runtime failures during the hackathon demo.

------------------------------------------------------------------------

# 41. Project Structure

A framework-agnostic structure can be:

``` text
project/
│
├── AGENTS.md
├── GAME_DESIGN.md
├── PRD.md
├── MVP_SCOPE.md
├── GAMEPLAY_ALGORITHM.md
├── UI_UX_DESIGN.md
├── CONTENT.md
├── ARCHITECTURE.md
│
├── src/
│   ├── core/
│   │   ├── GameStateManager
│   │   ├── SceneManager
│   │   ├── EventBus
│   │   └── InputManager
│   │
│   ├── gameplay/
│   │   ├── PlayerController
│   │   ├── NPCInteractionSystem
│   │   ├── DialogueManager
│   │   ├── ChallengeManager
│   │   ├── ScoreManager
│   │   └── AccessibilityManager
│   │
│   ├── scenes/
│   │   ├── Boot
│   │   ├── Title
│   │   ├── Profile
│   │   ├── DeveloperRoom
│   │   ├── Appointment
│   │   ├── City
│   │   └── Ending
│   │
│   ├── ui/
│   │   ├── DialogueBox
│   │   ├── ChoiceList
│   │   ├── HUD
│   │   ├── Timer
│   │   └── Score
│   │
│   └── data/
│       ├── characters
│       ├── dialogue
│       ├── challenges
│       └── transformations
│
├── assets/
│   ├── characters/
│   ├── environments/
│   ├── ui/
│   ├── audio/
│   ├── fonts/
│   └── effects/
│
└── tests/
```

This is a conceptual structure. Adapt it to the actual framework.

------------------------------------------------------------------------

# 42. Dependency Direction

Prefer this dependency direction:

``` text
UI
 ↓
Gameplay
 ↓
Game State
 ↓
Content Data
```

Avoid:

``` text
Content Data
 ↓
UI
```

or tightly coupling every system to every other system.

------------------------------------------------------------------------

# 43. Circular Dependency Rule

Avoid circular dependencies.

Bad:

``` text
DialogueManager → UI
UI → DialogueManager
```

Better:

``` text
DialogueManager → EventBus
UI → EventBus
```

or use a controller that coordinates both.

------------------------------------------------------------------------

# 44. Testing Architecture

Test systems independently where practical.

## Unit-level

Test:

-   Score calculations
-   Answer validation
-   Category score calculation
-   Timer behavior
-   State transitions
-   Data validation

## Integration-level

Test:

-   Dialogue → challenge
-   Challenge → score
-   Challenge → interface transformation
-   NPC completion → progression
-   Final challenge → evaluation

## Playtest-level

Test:

-   Complete game flow
-   Controls
-   Readability
-   Navigation
-   Demo stability

------------------------------------------------------------------------

# 45. Critical Integration Test

The most important test is:

``` text
START
 ↓
PROFILE
 ↓
DEVELOPER ROOM
 ↓
GRANDMA
 ↓
APPOINTMENT
 ↓
REALIZATION
 ↓
CITY
 ↓
RAHUL
 ↓
CHALLENGE
 ↓
CORRECT ANSWER
 ↓
INTERFACE CHANGE
 ↓
SCORE
 ↓
NEXT NPC
 ↓
FINAL
```

This entire path must work before adding optional features.

------------------------------------------------------------------------

# 46. Error Boundaries

Each major subsystem should fail safely.

For example:

``` text
Dialogue failure
→ fallback message

Asset failure
→ placeholder asset

Challenge data failure
→ development error

Audio failure
→ continue gameplay silently
```

Audio should never prevent the game from running.

------------------------------------------------------------------------

# 47. Performance Architecture

For the MVP:

-   Keep environments small.
-   Avoid unnecessarily large textures.
-   Use sprite atlases where appropriate.
-   Avoid expensive continuous effects.
-   Load only necessary scene assets.
-   Reuse common UI assets.
-   Avoid unnecessary background processes.

The target is a stable hackathon demo, not maximum graphical complexity.

------------------------------------------------------------------------

# 48. Scalability

The architecture should make these future additions possible:

``` text
New NPC
New dialogue
New challenge
New accessibility category
New city location
New interface transformation
New difficulty
```

without rewriting the entire game.

For example, adding a new NPC should ideally require:

``` text
character data
+
dialogue data
+
challenge data
+
assets
```

rather than modifying several core systems.

------------------------------------------------------------------------

# 49. Two-Person Development Architecture

The architecture should support parallel work.

## Developer A

Can primarily work on:

``` text
core/
scenes/
player/
city/
NPC/
dialogue/
```

## Developer B

Can primarily work on:

``` text
appointment/
challenge/
UI/
scoring/
accessibility/
```

Both integrate through:

``` text
GameState
EventBus
Content Data
```

This minimizes merge conflicts.

------------------------------------------------------------------------

# 50. Git Collaboration Rules

Use small commits.

Recommended commit examples:

``` text
feat: add player movement
feat: add dialogue system
feat: add appointment simulation
feat: add challenge manager
feat: add scoring system
feat: add Rahul scenario
fix: repair timer cleanup
fix: correct dialogue transition
style: improve dialogue UI
```

Avoid huge commits containing unrelated systems.

------------------------------------------------------------------------

# 51. Branching Strategy

For a two-person team:

``` text
main
 ├── feature/player
 ├── feature/dialogue
 ├── feature/appointment
 ├── feature/challenges
 └── feature/ui
```

Merge only tested features into `main`.

The exact Git workflow can be simplified if the team prefers direct
commits during the hackathon, but the main branch should always remain
runnable.

------------------------------------------------------------------------

# 52. Architecture Rules for Anti-Gravity

When an AI coding agent works on the project:

1.  Read `AGENTS.md`.
2.  Read the relevant product/design document.
3.  Inspect the existing code before creating new architecture.
4.  Reuse existing systems.
5.  Do not create duplicate managers.
6.  Do not rewrite working systems unnecessarily.
7.  Keep content separate from logic.
8.  Test the affected flow after implementation.
9.  Preserve the existing narrative and UI direction.
10. Do not introduce large dependencies without a reason.
11. Keep the MVP scope under control.

------------------------------------------------------------------------

# 53. Change Management

Before making a major architectural change, ask:

``` text
Does the current architecture prevent the required feature?
```

If no:

> Prefer the existing architecture.

If yes:

> Make the smallest change that solves the problem.

Avoid rewriting the entire project because of one feature.

------------------------------------------------------------------------

# 54. Architecture Decision Priority

When making technical decisions:

``` text
1. Player experience
2. Stability
3. Simplicity
4. Maintainability
5. Accessibility
6. Performance
7. Extensibility
```

For the hackathon, a simple reliable implementation is preferred over an
elegant but unfinished system.

------------------------------------------------------------------------

# 55. Final Architecture Principle

The architecture should make the game's core loop easy to implement:

``` text
MEET USER
    ↓
UNDERSTAND PROBLEM
    ↓
MAKE DESIGN DECISION
    ↓
CHANGE INTERFACE
    ↓
SEE RESULT
    ↓
UPDATE SCORE
```

Everything in the architecture should support that loop.

The goal is not to build the most sophisticated game engine.

The goal is to build a **stable, modular system that lets the team
deliver the Inclusive Interface experience quickly and convincingly.**
