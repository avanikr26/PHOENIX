# API_SPEC.md --- Inclusive Interface

# 1. Purpose

This document defines the internal API contracts for **Inclusive
Interface**.

The game is primarily client-side, so these are **application/service
APIs**, not a requirement for a remote backend.

The API layer must support:

-   Data-driven characters
-   Dialogue
-   Multiple challenges per character
-   Multiple difficulty levels
-   Dynamic challenge selection
-   Answer evaluation
-   Scoring
-   Accessibility category tracking
-   Interface transformations
-   Character progression
-   Difficulty unlocks
-   Appointment simulation
-   Save/load state
-   Final evaluation

> **Important:** APIs must operate on IDs and structured data. Do not
> hardcode individual questions or character-specific question logic
> into API consumers.

------------------------------------------------------------------------

# 2. API Design Principles

1.  Keep APIs small and predictable.
2.  Pass stable IDs instead of display text.
3.  Separate content retrieval from gameplay state.
4.  Keep UI components free from business rules.
5.  Keep challenge selection inside `ChallengeManager`.
6.  Keep scoring inside `ScoreManager`.
7.  Keep unlock logic inside `ProgressionManager`.
8.  Keep interface changes inside `TransformationManager`.
9.  Validate all content references during development.
10. Make adding a new challenge possible without changing API contracts.

------------------------------------------------------------------------

# 3. Architecture

``` text
UI
 │
 ▼
Gameplay Services
 │
 ├── CharacterManager
 ├── DialogueManager
 ├── ChallengeManager
 ├── ScoreManager
 ├── ProgressionManager
 ├── TransformationManager
 └── AppointmentSimulation
 │
 ▼
GameStateManager
 │
 ▼
ContentLoader / ChallengeRegistry
 │
 ▼
Content Data
```

------------------------------------------------------------------------

# 4. Common ID Types

Use stable string IDs.

``` ts
type CharacterId = string;
type ChallengeId = string;
type DialogueId = string;
type OptionId = string;
type TransformationId = string;
type SceneId = string;
type CategoryId = string;
type DifficultyId = "easy" | "medium" | "hard";
```

Example:

``` text
characterId:
rahul

challengeId:
rahul-visual-easy-01

optionId:
b

transformationId:
add-descriptive-labels
```

Never use the visible question text as an identifier.

------------------------------------------------------------------------

# 5. Character API

## `getCharacter(characterId)`

Returns one character.

``` ts
getCharacter(characterId: CharacterId): Character | null
```

Example result:

``` json
{
  "id": "rahul",
  "name": "Rahul",
  "category": "visual",
  "dialogueId": "rahul-introduction",
  "challengePoolId": "rahul-challenges"
}
```

------------------------------------------------------------------------

## `getCharacters()`

Returns all available characters.

``` ts
getCharacters(): Character[]
```

------------------------------------------------------------------------

## `getCharacterProgress(characterId)`

Returns progress for one character.

``` ts
getCharacterProgress(characterId: CharacterId): CharacterProgress
```

Example:

``` json
{
  "characterId": "rahul",
  "easyCompleted": 3,
  "mediumCompleted": 1,
  "hardCompleted": 0,
  "completed": false
}
```

------------------------------------------------------------------------

# 6. Dialogue API

## `getDialogue(dialogueId)`

``` ts
getDialogue(dialogueId: DialogueId): DialogueNode | null
```

------------------------------------------------------------------------

## `startDialogue(dialogueId)`

``` ts
startDialogue(dialogueId: DialogueId): void
```

------------------------------------------------------------------------

## `advanceDialogue()`

``` ts
advanceDialogue(): DialogueNode | null
```

------------------------------------------------------------------------

## `selectDialogueChoice(choiceId)`

``` ts
selectDialogueChoice(choiceId: string): DialogueNode | null
```

Dialogue choices may trigger:

``` text
scene transition
challenge start
NPC state change
```

------------------------------------------------------------------------

## Dialogue completion event

``` text
DialogueCompleted
```

Payload:

``` json
{
  "dialogueId": "rahul-introduction",
  "characterId": "rahul"
}
```

------------------------------------------------------------------------

# 7. Challenge API

The challenge API is the most important API in the project.

It must support **multiple challenges per character**.

------------------------------------------------------------------------

## `getChallenges(characterId, difficulty)`

Returns all challenges for a character at a difficulty.

``` ts
getChallenges(
  characterId: CharacterId,
  difficulty: DifficultyId
): Challenge[]
```

Example:

``` text
getChallenges("rahul", "easy")
```

may return:

``` text
rahul-visual-easy-01
rahul-visual-easy-02
rahul-visual-easy-03
rahul-visual-easy-04
```

The number of challenges is determined by content data.

------------------------------------------------------------------------

## `getAvailableChallenges(characterId, difficulty)`

Returns challenges that are not yet completed and whose prerequisites
are satisfied.

``` ts
getAvailableChallenges(
  characterId: CharacterId,
  difficulty: DifficultyId
): Challenge[]
```

------------------------------------------------------------------------

## `getNextChallenge(characterId, difficulty)`

Returns the next playable challenge.

``` ts
getNextChallenge(
  characterId: CharacterId,
  difficulty: DifficultyId
): Challenge | null
```

The implementation must:

``` text
filter by character
↓
filter by difficulty
↓
remove completed challenges
↓
check prerequisites
↓
select next challenge
```

------------------------------------------------------------------------

## `getChallenge(challengeId)`

``` ts
getChallenge(challengeId: ChallengeId): Challenge | null
```

------------------------------------------------------------------------

# 8. Challenge Data Contract

A challenge should have:

``` ts
interface Challenge {
  id: ChallengeId;
  characterId: CharacterId;
  difficulty: DifficultyId;
  category: CategoryId;
  scenario: string;
  question: string;
  options: ChallengeOption[];
  correctOption: OptionId;
  explanation: string;
  points: number;
  interfaceChanges?: TransformationId[];
}
```

Option:

``` ts
interface ChallengeOption {
  id: OptionId;
  text: string;
}
```

Example:

``` json
{
  "id": "rahul-visual-easy-01",
  "characterId": "rahul",
  "difficulty": "easy",
  "category": "visual",
  "scenario": "Rahul cannot easily identify what the icons do.",
  "question": "What is the best improvement?",
  "options": [
    {
      "id": "a",
      "text": "Make the icons more colorful."
    },
    {
      "id": "b",
      "text": "Add clear, descriptive labels."
    },
    {
      "id": "c",
      "text": "Add an animation."
    },
    {
      "id": "d",
      "text": "Make the icons smaller."
    }
  ],
  "correctOption": "b",
  "explanation": "Descriptive labels reduce ambiguity and do not rely only on visual recognition.",
  "points": 100,
  "interfaceChanges": [
    "add-descriptive-labels"
  ]
}
```

------------------------------------------------------------------------

# 9. Start Challenge

## `startChallenge(challengeId)`

``` ts
startChallenge(challengeId: ChallengeId): ChallengeSession
```

Returns:

``` json
{
  "challengeId": "rahul-visual-easy-01",
  "status": "active",
  "attempts": 0
}
```

Starting a challenge should update:

``` text
currentChallengeId
currentCharacterId
currentDifficulty
```

------------------------------------------------------------------------

# 10. Submit Answer

## `submitAnswer(challengeId, optionId)`

``` ts
submitAnswer(
  challengeId: ChallengeId,
  optionId: OptionId
): AnswerResult
```

Example:

``` json
{
  "correct": true,
  "challengeId": "rahul-visual-easy-01",
  "selectedOptionId": "b",
  "pointsEarned": 125,
  "explanation": "Descriptive labels reduce ambiguity.",
  "interfaceChanges": [
    "add-descriptive-labels"
  ]
}
```

The API compares IDs, not visible answer strings.

------------------------------------------------------------------------

# 11. Wrong Answer Result

Example:

``` json
{
  "correct": false,
  "challengeId": "rahul-visual-easy-01",
  "selectedOptionId": "a",
  "pointsEarned": 0,
  "retryAllowed": true,
  "explanation": "Think about whether the user can understand the icon without relying on visual recognition."
}
```

The challenge remains active.

------------------------------------------------------------------------

# 12. Correct Answer Result

Example:

``` json
{
  "correct": true,
  "challengeId": "rahul-visual-easy-01",
  "selectedOptionId": "b",
  "pointsEarned": 125,
  "retryAllowed": false,
  "completed": true,
  "interfaceChanges": [
    "add-descriptive-labels"
  ]
}
```

The result can trigger:

``` text
ScoreManager
TransformationManager
ProgressionManager
```

------------------------------------------------------------------------

# 13. Complete Challenge

## `completeChallenge(challengeId)`

``` ts
completeChallenge(challengeId: ChallengeId): ChallengeProgress
```

Example:

``` json
{
  "challengeId": "rahul-visual-easy-01",
  "completed": true,
  "attempts": 1,
  "bestScore": 125
}
```

A challenge must only be marked complete after a correct answer.

------------------------------------------------------------------------

# 14. Retry Challenge

## `retryChallenge(challengeId)`

``` ts
retryChallenge(challengeId: ChallengeId): ChallengeSession
```

Increases the attempt count.

The challenge remains eligible until completed.

------------------------------------------------------------------------

# 15. Challenge Progress API

## `getChallengeProgress(challengeId)`

``` ts
getChallengeProgress(
  challengeId: ChallengeId
): ChallengeProgress
```

------------------------------------------------------------------------

## `getCompletedChallenges()`

``` ts
getCompletedChallenges(): ChallengeId[]
```

------------------------------------------------------------------------

# 16. Progression API

## `isDifficultyUnlocked(difficulty)`

``` ts
isDifficultyUnlocked(
  characterId: CharacterId,
  difficulty: DifficultyId
): boolean
```

------------------------------------------------------------------------

## `checkDifficultyUnlock(characterId)`

``` ts
checkDifficultyUnlock(
  characterId: CharacterId
): UnlockResult[]
```

Example:

``` json
[
  {
    "difficulty": "medium",
    "unlocked": true
  }
]
```

------------------------------------------------------------------------

## `unlockDifficulty(characterId, difficulty)`

``` ts
unlockDifficulty(
  characterId: CharacterId,
  difficulty: DifficultyId
): void
```

------------------------------------------------------------------------

# 17. Character Completion API

## `isCharacterComplete(characterId)`

``` ts
isCharacterComplete(characterId: CharacterId): boolean
```

A character becomes complete when the required challenge progression has
been satisfied.

------------------------------------------------------------------------

## `completeCharacter(characterId)`

``` ts
completeCharacter(characterId: CharacterId): void
```

This should only be called after completion requirements are met.

------------------------------------------------------------------------

# 18. Score API

## `addScore(points)`

``` ts
addScore(points: number): void
```

------------------------------------------------------------------------

## `getScore()`

``` ts
getScore(): number
```

------------------------------------------------------------------------

## `addCategoryScore(category, points)`

``` ts
addCategoryScore(
  category: CategoryId,
  points: number
): void
```

------------------------------------------------------------------------

## `getCategoryScore(category)`

``` ts
getCategoryScore(
  category: CategoryId
): number
```

------------------------------------------------------------------------

## `getOverallScore()`

``` ts
getOverallScore(): number
```

------------------------------------------------------------------------

## `getScoreReport()`

``` ts
getScoreReport(): ScoreReport
```

Example:

``` json
{
  "visual": 92,
  "hearing": 88,
  "color": 100,
  "overall": 93
}
```

------------------------------------------------------------------------

# 19. Transformation API

## `getTransformation(transformationId)`

``` ts
getTransformation(
  transformationId: TransformationId
): Transformation | null
```

------------------------------------------------------------------------

## `applyTransformation(transformationId)`

``` ts
applyTransformation(
  transformationId: TransformationId
): void
```

------------------------------------------------------------------------

## `applyChallengeTransformations(challengeId)`

``` ts
applyChallengeTransformations(
  challengeId: ChallengeId
): void
```

This reads:

``` text
challenge.interfaceChanges[]
```

and applies each transformation.

------------------------------------------------------------------------

# 20. Transformation Data Contract

``` ts
interface Transformation {
  id: TransformationId;
  type: string;
  target: string;
  parameters?: Record<string, unknown>;
}
```

Example:

``` json
{
  "id": "increase-target-size",
  "type": "target-size",
  "target": "appointment.primaryButton",
  "parameters": {
    "scale": 1.5
  }
}
```

------------------------------------------------------------------------

# 21. Character Progress API

## `getAllCharacterProgress()`

``` ts
getAllCharacterProgress(): CharacterProgress[]
```

------------------------------------------------------------------------

## `updateCharacterProgress(characterId)`

``` ts
updateCharacterProgress(
  characterId: CharacterId
): CharacterProgress
```

This recalculates:

``` text
Easy completion
Medium completion
Hard completion
Overall character completion
```

------------------------------------------------------------------------

# 22. Game State API

## `getGameState()`

``` ts
getGameState(): GameState
```

------------------------------------------------------------------------

## `setCurrentScene(sceneId)`

``` ts
setCurrentScene(sceneId: SceneId): void
```

------------------------------------------------------------------------

## `setCurrentCharacter(characterId)`

``` ts
setCurrentCharacter(
  characterId: CharacterId
): void
```

------------------------------------------------------------------------

## `setCurrentChallenge(challengeId)`

``` ts
setCurrentChallenge(
  challengeId: ChallengeId
): void
```

------------------------------------------------------------------------

## `resetGame()`

``` ts
resetGame(): void
```

This clears gameplay progress.

------------------------------------------------------------------------

# 23. Save API

## `saveGame()`

``` ts
saveGame(): void
```

------------------------------------------------------------------------

## `loadGame()`

``` ts
loadGame(): GameState | null
```

------------------------------------------------------------------------

## `hasSave()`

``` ts
hasSave(): boolean
```

For MVP, local/session storage is sufficient.

------------------------------------------------------------------------

# 24. Content API

## `loadContent()`

``` ts
loadContent(): Promise<ContentBundle>
```

------------------------------------------------------------------------

## `validateContent()`

``` ts
validateContent(
  content: ContentBundle
): ValidationResult
```

------------------------------------------------------------------------

# 25. Content Bundle

``` ts
interface ContentBundle {
  characters: Character[];
  dialogue: DialogueNode[];
  challenges: Challenge[];
  transformations: Transformation[];
  objectives: Objective[];
}
```

------------------------------------------------------------------------

# 26. Content Validation API

Validation must detect:

``` text
duplicate IDs
missing character references
missing dialogue references
missing challenge references
invalid correctOption
invalid difficulty
invalid category
invalid transformation
broken prerequisites
```

Example:

``` ts
validateContent(content)
```

returns:

``` json
{
  "valid": false,
  "errors": [
    {
      "type": "INVALID_CORRECT_OPTION",
      "challengeId": "rahul-visual-easy-04",
      "message": "correctOption 'e' does not exist."
    }
  ]
}
```

------------------------------------------------------------------------

# 27. Appointment Simulation API

The appointment simulation is isolated from the main challenge API.

## `startAppointment()`

``` ts
startAppointment(): AppointmentState
```

------------------------------------------------------------------------

## `selectDoctor(doctorId)`

``` ts
selectDoctor(doctorId: string): void
```

------------------------------------------------------------------------

## `selectDate(date)`

``` ts
selectDate(date: string): void
```

------------------------------------------------------------------------

## `selectTime(time)`

``` ts
selectTime(time: string): void
```

------------------------------------------------------------------------

## `submitPatientDetails(details)`

``` ts
submitPatientDetails(
  details: PatientDetails
): void
```

The details are fictional and should not contain real medical
information.

------------------------------------------------------------------------

## `completeCaptcha()`

``` ts
completeCaptcha(): void
```

------------------------------------------------------------------------

## `confirmAppointment()`

``` ts
confirmAppointment(): AppointmentResult
```

------------------------------------------------------------------------

# 28. Appointment Timer API

## `startTimer()`

``` ts
startTimer(): void
```

------------------------------------------------------------------------

## `stopTimer()`

``` ts
stopTimer(): void
```

------------------------------------------------------------------------

## `getRemainingTime()`

``` ts
getRemainingTime(): number
```

------------------------------------------------------------------------

## `resetTimer()`

``` ts
resetTimer(): void
```

The MVP duration is:

``` text
30 seconds
```

Timer calculations should use elapsed time.

------------------------------------------------------------------------

# 29. Appointment Result

Success:

``` json
{
  "completed": true,
  "reason": "success"
}
```

Failure:

``` json
{
  "completed": false,
  "reason": "timeout"
}
```

Both outcomes transition into the realization scene.

------------------------------------------------------------------------

# 30. Dialogue Trigger API

Dialogue can trigger gameplay actions.

Conceptually:

``` ts
executeDialogueTrigger(trigger): void
```

Supported trigger types may include:

``` text
START_CHALLENGE
CHANGE_SCENE
DISCOVER_CHARACTER
UNLOCK_LOCATION
SHOW_MESSAGE
```

Example:

``` json
{
  "type": "START_CHALLENGE",
  "characterId": "rahul"
}
```

The exact implementation may use an event bus instead.

------------------------------------------------------------------------

# 31. Event Contracts

Important events:

``` text
SceneChanged
DialogueStarted
DialogueCompleted
ChallengeStarted
AnswerSubmitted
ChallengeCompleted
ScoreChanged
TransformationApplied
DifficultyUnlocked
CharacterCompleted
TimerStarted
TimerExpired
GameCompleted
```

Example:

``` json
{
  "event": "ChallengeCompleted",
  "challengeId": "rahul-visual-easy-01",
  "characterId": "rahul",
  "points": 125
}
```

------------------------------------------------------------------------

# 32. API Error Handling

APIs should return predictable errors.

Possible error types:

``` text
CONTENT_NOT_LOADED
CHARACTER_NOT_FOUND
CHALLENGE_NOT_FOUND
CHALLENGE_LOCKED
CHALLENGE_ALREADY_COMPLETED
INVALID_OPTION
INVALID_DIFFICULTY
INVALID_TRANSFORMATION
INVALID_STATE
SAVE_FAILED
```

Do not silently ignore invalid requests.

------------------------------------------------------------------------

# 33. Example Full Challenge Flow

``` text
getNextChallenge("rahul", "easy")
        ↓
rahul-visual-easy-01
        ↓
startChallenge("rahul-visual-easy-01")
        ↓
UI renders question/options
        ↓
submitAnswer("rahul-visual-easy-01", "b")
        ↓
correct = true
        ↓
completeChallenge()
        ↓
addScore()
        ↓
addCategoryScore("visual")
        ↓
applyChallengeTransformations()
        ↓
checkDifficultyUnlock()
        ↓
getNextChallenge("rahul", "easy")
```

------------------------------------------------------------------------

# 34. Example Multi-Challenge Flow

``` text
Rahul Easy
│
├── getNextChallenge()
│      ↓
│   easy-01
│
├── complete
│
├── getNextChallenge()
│      ↓
│   easy-02
│
├── complete
│
├── getNextChallenge()
│      ↓
│   easy-03
│
├── complete
│
└── no remaining Easy challenges
       ↓
   checkDifficultyUnlock()
       ↓
   Medium unlocked
       ↓
   getNextChallenge("rahul", "medium")
```

This is the required behavior.

------------------------------------------------------------------------

# 35. API and UI Boundary

The UI may call:

``` text
getNextChallenge()
startChallenge()
submitAnswer()
getScore()
getCharacterProgress()
```

The UI must not directly modify:

``` text
completedChallenges
score
difficulty
correctOption
```

Those are owned by gameplay/state services.

------------------------------------------------------------------------

# 36. API and Content Boundary

Content defines:

``` text
what the challenge says
what options exist
which option is correct
what transformation occurs
```

API/services define:

``` text
how the challenge is loaded
how it is selected
how it is evaluated
how progress changes
```

This separation is mandatory.

------------------------------------------------------------------------

# 37. API and Security Boundary

Because this is a client-side game:

``` text
No secret API keys
No real medical data
No real appointment service
No external authentication required for MVP
```

Profile data should be minimal.

If local storage is used, treat it as user-controlled data.

------------------------------------------------------------------------

# 38. API Expansion

Future APIs may support:

``` text
analytics
cloud saves
leaderboards
multiplayer
remote content updates
localization
```

These are outside the MVP.

The current API design should not require them.

------------------------------------------------------------------------

# 39. Definition of Done

The API layer is correctly implemented when:

``` text
[ ] Characters can be retrieved by ID.
[ ] Dialogue can be retrieved and advanced.
[ ] Multiple challenges can exist per character.
[ ] Challenges can be filtered by difficulty.
[ ] Completed challenges are excluded from normal selection.
[ ] Questions/options are loaded from content data.
[ ] Answers are evaluated using stable option IDs.
[ ] Wrong answers can be retried.
[ ] Correct answers complete challenges.
[ ] Scores update through ScoreManager.
[ ] Category scores update.
[ ] Transformations are applied through IDs.
[ ] Character progress updates.
[ ] Difficulty unlocks work.
[ ] Game state can be saved/reset.
[ ] Appointment simulation is isolated.
[ ] Content validation catches broken references.
[ ] Adding a new challenge does not require a new API.
```

------------------------------------------------------------------------

# 40. Final API Principle

The API should make this possible:

``` text
ADD NEW QUESTION
       ↓
ADD CONTENT
       ↓
GAME LOADS IT
       ↓
CHALLENGE MANAGER FINDS IT
       ↓
UI RENDERS IT
       ↓
PLAYER ANSWERS IT
       ↓
GAME SCORES IT
       ↓
TRANSFORMATION APPLIES
```

without:

``` text
rewriting the UI
rewriting the challenge engine
rewriting the progression system
rewriting the character system
```

That is the required API architecture for the dynamic, multi-question,
multi-level accessibility-learning game.
