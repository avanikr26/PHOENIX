# API_SPEC.md --- Inclusive Interface

# 1. Purpose

This document defines the API and interface contracts for **Inclusive
Interface**.

Because the MVP is a client-side browser game, the project does **not
require a traditional backend API**.

The primary APIs in the MVP are therefore:

1.  Internal application services
2.  Content/data interfaces
3.  Game-state interfaces
4.  Event interfaces
5.  Optional browser persistence interfaces

The goal is to give Anti-Gravity and the development team clear
contracts so systems can communicate without tightly coupling the entire
game.

------------------------------------------------------------------------

# 2. API Philosophy

The MVP should follow:

> **No unnecessary backend.**

The game should work offline after the application assets are loaded.

Use internal APIs for:

``` text
Game State
Dialogue
Challenges
Scoring
Accessibility
NPCs
Scene transitions
Events
```

Do not create REST endpoints just to make the project look more complex.

------------------------------------------------------------------------

# 3. API Layers

``` text
                    GAME APPLICATION
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       GAME APIs        CONTENT APIs     EVENT APIs
          │                │                │
          └────────────────┼────────────────┘
                           │
                     GAME STATE
                           │
                    LOCAL STORAGE
```

------------------------------------------------------------------------

# 4. External API Policy

## MVP

``` text
External backend API: NOT REQUIRED
```

The game should not depend on:

-   Authentication APIs
-   Medical APIs
-   Payment APIs
-   Maps APIs
-   AI APIs
-   Analytics APIs
-   Multiplayer APIs

If the internet connection disappears during the demo, the core game
should still function after initial assets have loaded.

------------------------------------------------------------------------

# 5. Internal API Conventions

Use clear method names.

Prefer:

``` text
startChallenge()
completeChallenge()
addScore()
loadDialogue()
changeScene()
updateCategoryScore()
```

Avoid vague methods:

``` text
doThing()
process()
handleEverything()
run()
```

Methods should have one clear responsibility.

------------------------------------------------------------------------

# 6. GameState API

The `GameStateManager` is the primary interface for persistent gameplay
state.

## State Model

``` ts
interface GameState {
  playerName: string;
  username: string;
  currentScene: string;
  difficulty: Difficulty;
  score: number;
  categoryScores: Record<AccessibilityCategory, number>;
  completedChallenges: string[];
  challengeAttempts: Record<string, number>;
  discoveredCharacters: string[];
  unlockedLocations: string[];
  gameCompleted: boolean;
}
```

------------------------------------------------------------------------

# 7. GameState --- Get State

### Method

``` ts
getState(): GameState
```

### Purpose

Returns the current game state.

### Example

``` ts
const state = gameStateManager.getState();

console.log(state.score);
```

The returned state should be treated as read-only by consumers.

------------------------------------------------------------------------

# 8. GameState --- Set Player Profile

### Method

``` ts
setPlayerProfile(
  name: string,
  username: string
): void
```

### Preconditions

-   `name` is not empty.
-   `username` is not empty.

### Effects

Updates:

``` text
playerName
username
```

### Event

``` text
ProfileCreated
```

------------------------------------------------------------------------

# 9. GameState --- Change Scene

### Method

``` ts
setCurrentScene(sceneId: string): void
```

### Effects

Updates:

``` text
currentScene
```

### Event

``` text
SceneChanged
```

Scene loading itself should remain the responsibility of `SceneManager`.

------------------------------------------------------------------------

# 10. GameState --- Reset

### Method

``` ts
resetGame(): void
```

### Purpose

Starts a completely new game.

### Resets

``` text
score → 0
categoryScores → defaults
completedChallenges → []
challengeAttempts → {}
discoveredCharacters → []
unlockedLocations → initial locations
gameCompleted → false
```

Player profile may either be preserved or cleared depending on whether
the player selects:

``` text
Restart
```

or:

``` text
New Game
```

------------------------------------------------------------------------

# 11. Scene API

The `SceneManager` controls major game transitions.

## Method

``` ts
loadScene(sceneId: string): Promise<void> | void
```

### Example

``` ts
sceneManager.loadScene("city");
```

### Valid MVP scenes

``` text
boot
title
profile
intro
developer-room
grandma
appointment
realization
designer-intro
city
final-challenge
final-evaluation
ending
```

------------------------------------------------------------------------

# 12. Scene API --- Transition

### Method

``` ts
transitionTo(
  sceneId: string,
  options?: SceneTransitionOptions
): void
```

Conceptual type:

``` ts
interface SceneTransitionOptions {
  effect?: "fade" | "glitch" | "none";
  duration?: number;
}
```

Recommended effects:

``` text
Opening → glitch
Realization → glitch
Normal travel → fade
Final ending → fade
```

------------------------------------------------------------------------

# 13. Dialogue API

The `DialogueManager` controls narrative dialogue.

### Method

``` ts
startDialogue(dialogueId: string): void
```

Example:

``` ts
dialogueManager.startDialogue("rahul-intro");
```

------------------------------------------------------------------------

# 14. Dialogue Data Contract

``` ts
interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  portrait?: string;
  expression?: string;
  next?: string;
  choices?: DialogueChoice[];
  trigger?: DialogueTrigger;
}
```

------------------------------------------------------------------------

# 15. Dialogue Choice Contract

``` ts
interface DialogueChoice {
  id: string;
  text: string;
  next: string;
}
```

Example:

``` json
{
  "id": "ask-why",
  "text": "What do you mean?",
  "next": "rahul-explanation"
}
```

------------------------------------------------------------------------

# 16. Dialogue API --- Advance

### Method

``` ts
advanceDialogue(): void
```

### Behavior

If the current line is still typing:

``` text
complete current line
```

Otherwise:

``` text
move to next dialogue node
```

If no next node exists:

``` text
complete dialogue
```

------------------------------------------------------------------------

# 17. Dialogue API --- Stop

### Method

``` ts
endDialogue(): void
```

### Effects

-   Close dialogue UI.
-   Clear temporary dialogue state.
-   Emit `DialogueCompleted`.

This should be used when a dialogue reaches its terminal node.

------------------------------------------------------------------------

# 18. Dialogue Events

Emit:

``` text
DialogueStarted
DialogueAdvanced
DialogueChoiceSelected
DialogueCompleted
```

Example payload:

``` ts
interface DialogueCompletedEvent {
  dialogueId: string;
}
```

------------------------------------------------------------------------

# 19. Challenge API

The `ChallengeManager` controls accessibility design challenges.

### Start

``` ts
startChallenge(challengeId: string): void
```

### Submit

``` ts
submitAnswer(
  challengeId: string,
  optionId: string
): ChallengeResult
```

### Complete

``` ts
completeChallenge(
  challengeId: string
): void
```

------------------------------------------------------------------------

# 20. Challenge Data Contract

``` ts
interface Challenge {
  id: string;
  characterId: string;
  category: AccessibilityCategory;
  scenario: string;
  question: string;
  options: ChallengeOption[];
  correctOption: string;
  explanation: string;
  points: number;
  firstAttemptBonus?: number;
  interfaceChanges?: string[];
}
```

------------------------------------------------------------------------

# 21. Challenge Option Contract

``` ts
interface ChallengeOption {
  id: string;
  text: string;
}
```

Example:

``` json
{
  "id": "b",
  "text": "Add clear, descriptive labels."
}
```

------------------------------------------------------------------------

# 22. Challenge Result Contract

``` ts
interface ChallengeResult {
  challengeId: string;
  selectedOption: string;
  correct: boolean;
  attempts: number;
  pointsAwarded: number;
  explanation: string;
}
```

This result should be passed to the UI feedback layer.

------------------------------------------------------------------------

# 23. Answer Validation API

### Method

``` ts
validateAnswer(
  challenge: Challenge,
  selectedOption: string
): boolean
```

### Rule

``` text
selectedOption === challenge.correctOption
```

The UI must not implement this logic.

------------------------------------------------------------------------

# 24. Challenge Attempts API

### Method

``` ts
recordAttempt(
  challengeId: string
): number
```

### Returns

The updated number of attempts.

Example:

``` text
First answer → 1
Second answer → 2
Third answer → 3
```

------------------------------------------------------------------------

# 25. Challenge Completion API

### Method

``` ts
completeChallenge(
  challengeId: string
): void
```

### Effects

-   Mark challenge completed.
-   Update player progress.
-   Emit completion event.
-   Allow progression.

### Event

``` text
ChallengeCompleted
```

------------------------------------------------------------------------

# 26. Score API

The `ScoreManager` owns score calculations.

### Method

``` ts
addScore(points: number): void
```

### Method

``` ts
calculateChallengeScore(
  challenge: Challenge,
  attempts: number,
  speedBonus?: boolean
): number
```

------------------------------------------------------------------------

# 27. Score Calculation Contract

Recommended:

``` ts
const BASE_POINTS = 100;
const FIRST_ATTEMPT_BONUS = 25;
const SPEED_BONUS = 10;
```

Algorithm:

``` text
score = BASE_POINTS

if attempts === 1:
    score += FIRST_ATTEMPT_BONUS

if speedBonus:
    score += SPEED_BONUS
```

Do not make speed more important than correct accessibility reasoning.

------------------------------------------------------------------------

# 28. Score Events

When score changes:

``` text
ScoreChanged
```

Payload:

``` ts
interface ScoreChangedEvent {
  previousScore: number;
  newScore: number;
  delta: number;
  reason: string;
}
```

Example:

``` json
{
  "previousScore": 325,
  "newScore": 450,
  "delta": 125,
  "reason": "rahul-01"
}
```

------------------------------------------------------------------------

# 29. Accessibility API

The `AccessibilityManager` tracks progress by category.

### Supported categories

``` ts
type AccessibilityCategory =
  | "visual"
  | "hearing"
  | "motor"
  | "cognitive"
  | "color"
  | "language";
```

Only implemented categories should appear in the final MVP report.

------------------------------------------------------------------------

# 30. Accessibility Score API

### Add points

``` ts
addCategoryScore(
  category: AccessibilityCategory,
  points: number
): void
```

### Get score

``` ts
getCategoryScore(
  category: AccessibilityCategory
): number
```

### Get percentage

``` ts
getCategoryPercentage(
  category: AccessibilityCategory
): number
```

------------------------------------------------------------------------

# 31. Final Accessibility Report API

### Method

``` ts
getAccessibilityReport(): AccessibilityReport
```

Contract:

``` ts
interface AccessibilityReport {
  categories: Record<string, number>;
  overall: number;
}
```

Example:

``` json
{
  "categories": {
    "visual": 92,
    "hearing": 88,
    "color": 100
  },
  "overall": 93
}
```

------------------------------------------------------------------------

# 32. Interface Transformation API

The `InterfaceTransformationManager` applies the result of a correct
design decision.

### Method

``` ts
applyTransformation(
  transformationId: string
): void
```

### Multiple transformations

``` ts
applyTransformations(
  transformationIds: string[]
): void
```

------------------------------------------------------------------------

# 33. Transformation Types

Recommended reusable transformations:

``` text
add-label
increase-target-size
improve-contrast
add-caption
add-icon
add-text-alternative
simplify-layout
add-progress-indicator
reduce-motion
```

------------------------------------------------------------------------

# 34. Transformation Data Contract

``` ts
interface InterfaceTransformation {
  id: string;
  type: string;
  target?: string;
  beforeState?: unknown;
  afterState?: unknown;
}
```

The exact representation depends on how the simulated interface is
implemented.

------------------------------------------------------------------------

# 35. NPC API

The `NPCManager` controls NPC discovery and completion.

### Method

``` ts
getNPC(npcId: string): NPC | undefined
```

### Method

``` ts
discoverNPC(npcId: string): void
```

### Method

``` ts
completeNPC(npcId: string): void
```

------------------------------------------------------------------------

# 36. NPC Data Contract

``` ts
interface NPC {
  id: string;
  name: string;
  personality: string[];
  accessibilityCategory: AccessibilityCategory;
  location: string;
  dialogueId: string;
  challengeIds: string[];
  completed: boolean;
}
```

------------------------------------------------------------------------

# 37. NPC Events

Emit:

``` text
NPCDiscovered
NPCInteractionStarted
NPCCompleted
```

Example payload:

``` ts
interface NPCDiscoveredEvent {
  npcId: string;
}
```

------------------------------------------------------------------------

# 38. Objective API

### Method

``` ts
setObjective(objectiveId: string): void
```

### Method

``` ts
completeObjective(objectiveId: string): void
```

### Method

``` ts
getCurrentObjective(): Objective | null
```

Contract:

``` ts
interface Objective {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
```

------------------------------------------------------------------------

# 39. Appointment API

The appointment simulation is intentionally fictional.

### Start

``` ts
startAppointmentTask(): void
```

### Select Doctor

``` ts
selectDoctor(doctorId: string): void
```

### Select Date

``` ts
selectDate(dateId: string): void
```

### Select Time

``` ts
selectTime(timeId: string): void
```

### Submit Details

``` ts
submitPatientDetails(
  details: PatientDetails
): void
```

### CAPTCHA

``` ts
submitCaptcha(
  answer: string
): boolean
```

### Confirm

``` ts
confirmAppointment(): AppointmentResult
```

------------------------------------------------------------------------

# 40. Appointment Data Contract

``` ts
interface AppointmentState {
  doctorId: string | null;
  dateId: string | null;
  timeId: string | null;
  patientDetailsValid: boolean;
  captchaCompleted: boolean;
  completed: boolean;
  timeRemaining: number;
}
```

------------------------------------------------------------------------

# 41. Appointment Result

``` ts
interface AppointmentResult {
  success: boolean;
  reason:
    | "confirmed"
    | "timeout"
    | "invalid-details"
    | "invalid-selection"
    | "captcha-failed";
}
```

------------------------------------------------------------------------

# 42. Appointment Timer API

### Start

``` ts
startTimer(seconds: number): void
```

### Stop

``` ts
stopTimer(): void
```

### Reset

``` ts
resetTimer(seconds: number): void
```

### Get Remaining Time

``` ts
getTimeRemaining(): number
```

### Events

``` text
TimerStarted
TimerTick
TimerExpired
TimerStopped
```

Default:

``` text
30 seconds
```

------------------------------------------------------------------------

# 43. Appointment Completion Rule

The appointment succeeds only when:

``` text
doctor selected
AND correct date selected
AND correct time selected
AND patient details valid
AND CAPTCHA completed
AND confirmation submitted
```

If:

``` text
timeRemaining === 0
```

before completion:

``` text
appointment fails
```

------------------------------------------------------------------------

# 44. Persistence API

MVP persistence may use browser `localStorage`.

### Save

``` ts
saveGame(): void
```

### Load

``` ts
loadGame(): GameState | null
```

### Delete

``` ts
clearSave(): void
```

------------------------------------------------------------------------

# 45. Save Key

Use one predictable key:

``` text
inclusive-interface-save
```

Do not store sensitive information.

------------------------------------------------------------------------

# 46. Save Data Contract

``` ts
interface SaveData {
  version: number;
  savedAt: string;
  gameState: GameState;
}
```

Example:

``` json
{
  "version": 1,
  "savedAt": "2026-08-22T10:30:00Z",
  "gameState": {
    "playerName": "Alex",
    "username": "alex01",
    "currentScene": "city",
    "difficulty": "easy",
    "score": 325,
    "completedChallenges": ["rahul-01"]
  }
}
```

------------------------------------------------------------------------

# 47. Content Loading API

Content should be loaded through a central content service.

### Methods

``` ts
getCharacter(id: string): Character
getDialogue(id: string): DialogueNode[]
getChallenge(id: string): Challenge
getObjective(id: string): Objective
getTransformation(id: string): InterfaceTransformation
```

This prevents gameplay systems from knowing exactly where files are
stored.

------------------------------------------------------------------------

# 48. Content Validation API

During development:

``` ts
validateContent(): ValidationResult
```

Contract:

``` ts
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

Validate:

-   Missing IDs
-   Broken references
-   Invalid categories
-   Missing correct answers
-   Missing dialogue nodes
-   Missing challenge references

------------------------------------------------------------------------

# 49. Event Bus API

### Subscribe

``` ts
on<T>(
  event: string,
  listener: (payload: T) => void
): void
```

### Unsubscribe

``` ts
off<T>(
  event: string,
  listener: (payload: T) => void
): void
```

### Emit

``` ts
emit<T>(
  event: string,
  payload: T
): void
```

------------------------------------------------------------------------

# 50. Event Examples

## Challenge Completed

``` ts
eventBus.emit("ChallengeCompleted", {
  challengeId: "rahul-01",
  category: "visual"
});
```

## Score Changed

``` ts
eventBus.emit("ScoreChanged", {
  previousScore: 325,
  newScore: 450,
  delta: 125,
  reason: "rahul-01"
});
```

## Interface Changed

``` ts
eventBus.emit("InterfaceChanged", {
  transformationIds: [
    "add-label"
  ]
});
```

------------------------------------------------------------------------

# 51. UI API Boundary

UI components should receive data and emit user actions.

Example:

``` ts
choiceList.setOptions(options);
choiceList.onSelect(optionId);
```

The UI should not:

``` text
calculate score
validate accessibility logic
modify GameState directly
load scenes
```

Those belong to the relevant gameplay systems.

------------------------------------------------------------------------

# 52. Example: Rahul Challenge API Flow

``` text
NPC Interaction
      ↓
dialogueManager.startDialogue("rahul-intro")
      ↓
DialogueCompleted
      ↓
challengeManager.startChallenge("rahul-01")
      ↓
Player selects "B"
      ↓
challengeManager.submitAnswer("rahul-01", "b")
      ↓
AnswerValidator
      ↓
CORRECT
      ↓
scoreManager.addScore(125)
      ↓
accessibilityManager.addCategoryScore("visual", ...)
      ↓
interfaceTransformationManager.applyTransformation("add-label")
      ↓
ChallengeCompleted
      ↓
Return to City
```

------------------------------------------------------------------------

# 53. Example: Wrong Answer API Flow

``` text
Player selects option
      ↓
submitAnswer()
      ↓
validateAnswer()
      ↓
FALSE
      ↓
recordAttempt()
      ↓
FeedbackManager
      ↓
Show explanation
      ↓
Retry
```

No score should be awarded for an incorrect answer.

The player should not lose excessive points for learning.

------------------------------------------------------------------------

# 54. API Error Handling

Internal APIs should return predictable errors.

Example:

``` ts
type APIErrorCode =
  | "NOT_FOUND"
  | "INVALID_INPUT"
  | "INVALID_STATE"
  | "ALREADY_COMPLETED"
  | "MISSING_CONTENT"
  | "UNKNOWN_ERROR";
```

Conceptual result:

``` ts
interface APIResult<T> {
  success: boolean;
  data?: T;
  error?: {
    code: APIErrorCode;
    message: string;
  };
}
```

For very simple internal methods, throwing an error may be acceptable,
but error behavior should be consistent within each subsystem.

------------------------------------------------------------------------

# 55. Error Examples

Invalid challenge:

``` text
Challenge not found: rahul-01
```

Invalid answer:

``` text
Option "z" does not exist for challenge "rahul-01".
```

Invalid scene:

``` text
Scene not registered: unknown-scene
```

These errors should be useful during development.

------------------------------------------------------------------------

# 56. API Security

Because the MVP is client-side:

> **Never treat client-side game logic as secure server-side
> validation.**

A player can inspect or modify client code.

That is acceptable because:

-   The game is educational.
-   Scores are not real currency.
-   There are no competitive server-side rankings in MVP.
-   No sensitive information is stored.

------------------------------------------------------------------------

# 57. No Medical Data API

The appointment system is fictional.

Do not connect it to:

``` text
real hospitals
real doctors
real patient records
real appointment services
```

The names and data should remain fictional.

------------------------------------------------------------------------

# 58. Optional Future REST API

A backend can be introduced later if the project requires:

``` text
player accounts
cloud saves
leaderboards
analytics
content management
```

Possible future API:

``` text
POST /api/auth
GET  /api/profile
POST /api/progress
GET  /api/progress
POST /api/score
GET  /api/leaderboard
```

This is explicitly **out of MVP scope**.

------------------------------------------------------------------------

# 59. Optional Future AI API

If AI is introduced later, isolate it behind a service.

Example:

``` ts
interface AIService {
  generateDialogue(context: DialogueContext): Promise<string>;
  generateFeedback(context: ChallengeContext): Promise<string>;
}
```

The game should continue to function if the AI service is unavailable.

Never make the core gameplay dependent on an external LLM.

------------------------------------------------------------------------

# 60. Versioning

Content and save data should have versions.

Example:

``` ts
const SAVE_VERSION = 1;
const CONTENT_VERSION = 1;
```

If save structure changes:

``` text
version 1
→ migration
→ version 2
```

For the MVP, migration may not be necessary, but versioning should be
included if persistence is implemented.

------------------------------------------------------------------------

# 61. API Testing

At minimum, test:

### Game State

``` text
set profile
change scene
reset game
```

### Challenges

``` text
valid answer
invalid answer
attempt count
completion
```

### Score

``` text
base points
first attempt bonus
category score
```

### Appointment

``` text
correct completion
timeout
timer stop
reset
```

### Content

``` text
valid references
missing references
invalid challenge IDs
```

------------------------------------------------------------------------

# 62. API Definition of Done

The API layer is complete when:

-   Major gameplay systems expose clear methods.
-   Game state has one source of truth.
-   Dialogue is accessed through a dialogue service.
-   Challenges are accessed through a challenge service.
-   Scores are calculated by one score service.
-   Accessibility categories are tracked centrally.
-   Interface transformations are reusable.
-   Scene changes are centralized.
-   Important events use a consistent event mechanism.
-   Content can be added without rewriting core gameplay.
-   No unnecessary external API is required.
-   The full MVP flow works using these interfaces.

------------------------------------------------------------------------

# 63. Final API Principle

The most important rule is:

> **The API should make systems communicate clearly without making them
> depend on each other's implementation details.**

The desired architecture is:

``` text
UI
 ↓
GAMEPLAY SERVICES
 ↓
GAME STATE
 ↓
CONTENT
```

with events connecting independent systems:

``` text
Dialogue
   ↓
Event
   ↓
Challenge
   ↓
Event
   ↓
Score
   ↓
Event
   ↓
UI
```

For the hackathon, **simple internal APIs are better than a complicated
backend**.
