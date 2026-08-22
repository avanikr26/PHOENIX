# GAMEPLAY_ALGORITHM.md --- Inclusive Interface

# 1. Purpose

This document defines the runtime gameplay logic for **Inclusive
Interface**.

It is the authoritative specification for:

-   Scene progression
-   Player state
-   Dialogue
-   NPC encounters
-   Multiple accessibility challenges
-   Difficulty progression
-   Dynamic challenge selection
-   Answer evaluation
-   Interface transformations
-   Scoring
-   Unlocks
-   Final evaluation
-   Save/reset behavior

The implementation must remain **data-driven**.

> **Never hardcode one question per character.**

Rahul, Fatima, Mira, and future characters must support multiple
challenges across multiple difficulty levels.

------------------------------------------------------------------------

# 2. Core Gameplay Flow

``` text
BOOT
 ↓
TITLE
 ↓
PROFILE
 ↓
INTRO
 ↓
DEVELOPER ROOM
 ↓
GRANDMA DIALOGUE
 ↓
30-SECOND APPOINTMENT EXPERIENCE
 ↓
REALIZATION
 ↓
DESIGNER INTRO
 ↓
CITY
 ↓
NPC DISCOVERY
 ↓
CHARACTER DIALOGUE
 ↓
CHALLENGE SELECTION
 ↓
DYNAMIC CHALLENGE UI
 ↓
PLAYER DECISION
 ↓
ANSWER EVALUATION
 ├── WRONG → FEEDBACK → RETRY
 └── CORRECT
       ↓
   SCORE UPDATE
       ↓
   INTERFACE TRANSFORMATION
       ↓
   CHALLENGE COMPLETE
       ↓
   NEXT CHALLENGE / CITY
 ↓
LEVEL UNLOCKS
 ↓
FINAL DESIGN CHALLENGE
 ↓
FINAL EVALUATION
 ↓
ENDING
```

------------------------------------------------------------------------

# 3. Fundamental Gameplay Rule

The game is **not**:

``` text
Meet Rahul
 ↓
Answer one MCQ
 ↓
Rahul complete
```

It is:

``` text
Meet Rahul
 ↓
Unlock Rahul's challenge set
 ↓
Multiple Easy challenges
 ↓
Multiple Medium challenges
 ↓
Multiple Hard challenges
 ↓
Rahul storyline complete
```

The same model applies to every character.

------------------------------------------------------------------------

# 4. Data-Driven Challenge Architecture

Challenge content must exist outside gameplay logic.

Conceptually:

``` text
CONTENT
  ↓
ContentLoader
  ↓
ChallengeRegistry
  ↓
ChallengeManager
  ↓
DynamicChallengeUI
```

The gameplay code should not contain the actual wording of questions.

For example, do **not** write:

``` ts
if (character === "rahul") {
    question = "What is the best improvement?";
}
```

Instead:

``` ts
const challenge = challengeManager.getNextChallenge(
    characterId,
    difficulty
);
```

The challenge data supplies:

``` text
question
options
correctOption
explanation
points
interfaceChanges
```

------------------------------------------------------------------------

# 5. Challenge Data Model

Conceptually:

``` text
Challenge
│
├── id
├── characterId
├── difficulty
├── category
├── scenario
├── question
├── options[]
├── correctOption
├── explanation
├── points
├── interfaceChanges[]
└── optional metadata
```

Example:

``` json
{
  "id": "rahul-visual-easy-01",
  "characterId": "rahul",
  "difficulty": "easy",
  "category": "visual",
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
  "points": 100
}
```

The exact storage format can be JSON or TypeScript data according to the
final implementation.

------------------------------------------------------------------------

# 6. Challenge Organization

Challenges are grouped by:

``` text
Character
    ↓
Accessibility Category
    ↓
Difficulty
    ↓
Challenge List
```

Example:

``` text
Rahul
 └── Visual
      ├── Easy
      │    ├── challenge 01
      │    ├── challenge 02
      │    └── challenge 03
      │
      ├── Medium
      │    ├── challenge 01
      │    ├── challenge 02
      │    └── challenge 03
      │
      └── Hard
           ├── challenge 01
           ├── challenge 02
           └── challenge 03
```

------------------------------------------------------------------------

# 7. Character Data

Each NPC should contain:

``` text
characterId
name
location
accessibilityCategories[]
dialogueId
challengePoolId
completed
```

Important:

``` text
challengePoolId
```

must refer to a **collection**, not one challenge.

Do not use:

``` text
challengeId
```

as the only challenge reference for a character.

------------------------------------------------------------------------

# 8. Global Game State

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

------------------------------------------------------------------------

# 9. Character Progress

Each character should track progress independently.

Example:

``` json
{
  "rahul": {
    "easyCompleted": 3,
    "mediumCompleted": 1,
    "hardCompleted": 0
  }
}
```

This allows Rahul's progress to exist independently from Fatima's.

------------------------------------------------------------------------

# 10. Difficulty Levels

Minimum:

``` text
EASY
MEDIUM
HARD
```

Optional future:

``` text
EXPERT
```

Difficulty belongs to the **challenge**, not the character.

Therefore:

``` text
Rahul ≠ Easy
Fatima ≠ Medium
```

Instead:

``` text
Rahul → Easy + Medium + Hard
Fatima → Easy + Medium + Hard
Mira → Easy + Medium + Hard
```

------------------------------------------------------------------------

# 11. Easy Difficulty

Easy challenges should contain:

``` text
One major barrier
Clear scenario
Strong best answer
Simple transformation
```

Example:

``` text
Unlabeled buttons
        ↓
Add descriptive labels
```

The purpose is to teach fundamental accessibility principles.

------------------------------------------------------------------------

# 12. Medium Difficulty

Medium challenges should contain:

``` text
Less obvious barrier
Multiple plausible solutions
Contextual reasoning
More realistic interface
```

The player should need to understand the user's problem rather than
recognize a keyword.

------------------------------------------------------------------------

# 13. Hard Difficulty

Hard challenges should contain:

``` text
Multiple barriers
Multiple plausible solutions
Prioritization
Trade-offs
Potentially multiple accessibility categories
```

The player should think like a product designer.

------------------------------------------------------------------------

# 14. Challenge Unlock Algorithm

Recommended progression:

``` text
EASY
 ↓
required Easy challenges completed
 ↓
MEDIUM unlocked
 ↓
required Medium challenges completed
 ↓
HARD unlocked
 ↓
required Hard challenges completed
 ↓
character/storyline complete
```

Example:

``` ts
if (easyCompleted >= easyRequired) {
    unlock("medium");
}

if (mediumCompleted >= mediumRequired) {
    unlock("hard");
}
```

Thresholds must be configurable.

------------------------------------------------------------------------

# 15. Challenge Selection Algorithm

When a challenge begins:

``` text
1. Identify current character.
2. Identify current difficulty.
3. Load that character's challenge pool.
4. Filter challenges by difficulty.
5. Remove completed challenges.
6. Select the next available challenge.
7. Store currentChallengeId.
8. Render the challenge.
```

Conceptually:

``` ts
const available = challenges.filter(
    challenge =>
        challenge.characterId === currentCharacterId &&
        challenge.difficulty === currentDifficulty &&
        !gameState.completedChallenges.includes(challenge.id)
);

const nextChallenge = selectNext(available);
```

------------------------------------------------------------------------

# 16. Challenge Selection Must Be Dynamic

Do not write:

``` text
Rahul:
  first question = rahul-01
  second question = rahul-02
  third question = rahul-03
```

into gameplay logic.

Instead:

``` text
ChallengeRegistry
       ↓
available challenges
       ↓
selection rules
       ↓
next incomplete challenge
```

This allows the content team to add:

``` text
rahul-visual-easy-04
rahul-visual-easy-05
rahul-visual-easy-06
```

without rewriting gameplay code.

------------------------------------------------------------------------

# 17. Question Ordering

Default:

``` text
challenge order from content data
```

Optional future:

``` text
randomized order
```

If randomized, preserve difficulty and prerequisite rules.

For the MVP, deterministic ordering is recommended because it makes
testing easier.

------------------------------------------------------------------------

# 18. Challenge Start

When a challenge starts:

``` text
currentChallengeId = selectedChallenge.id
challengeState = ACTIVE
attempts = existingAttempts || 0
```

Then:

``` text
show scenario
show question
show options
```

The UI is populated entirely from challenge data.

------------------------------------------------------------------------

# 19. Dynamic Question UI

The UI must support variable question content.

Conceptually:

``` text
ChallengeScreen
│
├── Character Context
├── Scenario
├── Question
├── Options[]
├── Submit/Select
├── Feedback
└── Continue
```

Do not hardcode:

``` text
Question 1 UI
Question 2 UI
Question 3 UI
```

One reusable challenge component should render all challenges.

------------------------------------------------------------------------

# 20. Variable Option Count

The system should not assume exactly four options.

The data model should support:

``` text
2 options
3 options
4 options
5 options
```

The MVP can standardize on four where convenient.

------------------------------------------------------------------------

# 21. Answer Submission

When the player chooses an answer:

``` text
selectedOptionId
        ↓
ChallengeManager
        ↓
compare with correctOption
```

Do not compare visible answer text.

Use stable IDs.

Example:

``` text
selected = "b"
correct = "b"
```

------------------------------------------------------------------------

# 22. Wrong Answer

If incorrect:

``` text
attempts += 1
show feedback
keep challenge active
```

The game should not shame the player.

Example:

> Not quite.

> Think about what information the user is actually missing.

Then:

``` text
TRY AGAIN
```

------------------------------------------------------------------------

# 23. Correct Answer

If correct:

``` text
calculate score
apply score
show feedback
apply interface transformation
mark challenge complete
update progress
check unlocks
```

Conceptually:

``` text
CORRECT
  ↓
SCORE
  ↓
TRANSFORMATION
  ↓
COMPLETE
  ↓
PROGRESSION
```

------------------------------------------------------------------------

# 24. Retry Behavior

Recommended:

``` text
Wrong
 ↓
Explanation
 ↓
Retry
 ↓
Correct
 ↓
Complete
```

Do not permanently block progression after one wrong answer.

The game is educational.

------------------------------------------------------------------------

# 25. Attempt Tracking

Track:

``` text
challengeId
attemptCount
completed
bestScore
```

Example:

``` json
{
  "rahul-visual-medium-02": {
    "attempts": 2,
    "completed": true,
    "bestScore": 100
  }
}
```

------------------------------------------------------------------------

# 26. Scoring Algorithm

Recommended:

``` text
Base correctness points
+
First-attempt bonus
+
Optional efficiency bonus
```

Example:

``` text
Correct = +100
First attempt = +25
Efficiency = +10
```

Maximum:

``` text
135
```

Exact values are configurable.

------------------------------------------------------------------------

# 27. Score by Accessibility Category

Each challenge contributes to one or more categories.

Example:

``` text
Rahul
 → Visual

Fatima
 → Hearing

Mira
 → Color
```

Hard challenges can use:

``` text
Visual + Cognitive
```

or another combination.

------------------------------------------------------------------------

# 28. Interface Transformation

A correct design decision may trigger a visual transformation.

Example:

``` text
BAD:
[ 🔍 ]

PLAYER CHOOSES:
Add descriptive label

AFTER:
[ 🔍 Search ]
```

The transformation must be referenced by data.

Example:

``` json
{
  "interfaceChanges": [
    "add-descriptive-labels"
  ]
}
```

The transformation manager then applies it.

------------------------------------------------------------------------

# 29. Transformation Algorithm

``` text
challenge completed
        ↓
read interfaceChanges[]
        ↓
for each transformation
        ↓
apply transformation
        ↓
play transition/animation
        ↓
show improved interface
```

Do not hardcode:

``` text
if Rahul question 1:
    change button
```

Use:

``` text
transformationId
```

instead.

------------------------------------------------------------------------

# 30. Transformation Types

Possible IDs:

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

These can be expanded as the game grows.

------------------------------------------------------------------------

# 31. Previous Transformations

Previous transformations do **not** have to remain visible in every
challenge.

Default:

``` text
Each challenge loads its relevant interface state.
```

Optional hard-mode behavior:

``` text
Previous improvements remain
+
new barrier introduced
```

This should be controlled by challenge data.

------------------------------------------------------------------------

# 32. Character Completion

A character is complete when the required challenges have been
completed.

Example:

``` text
Rahul
 Easy   3/3
 Medium 3/3
 Hard   3/3
```

Then:

``` text
character.completed = true
```

The player may then unlock:

``` text
new character
new location
new challenge set
```

depending on progression rules.

------------------------------------------------------------------------

# 33. City Return

After completing a challenge:

``` text
CHALLENGE
   ↓
FEEDBACK
   ↓
TRANSFORMATION
   ↓
SCORE
   ↓
PROGRESS CHECK
   ↓
CITY
```

The player should not be forced to replay completed challenges unless
explicitly selected.

------------------------------------------------------------------------

# 34. Next Challenge Logic

After a challenge:

``` text
if currentDifficulty has remaining challenges:
    offer next challenge

else if next difficulty is unlocked:
    unlock next difficulty

else if character has remaining required challenges:
    continue character progression

else:
    mark character complete
```

The player can then return to exploration.

------------------------------------------------------------------------

# 35. Multiple Characters

The challenge system must be reusable.

Example:

``` text
Rahul
 → visual challenges

Fatima
 → hearing challenges

Mira
 → color challenges
```

Future:

``` text
Arjun
 → motor challenges

Nisha
 → cognitive challenges
```

No new challenge engine should be required for each character.

------------------------------------------------------------------------

# 36. NPC Encounter Algorithm

``` text
PLAYER ENTERS NPC AREA
        ↓
SHOW INTERACTION PROMPT
        ↓
PLAYER INTERACTS
        ↓
LOAD CHARACTER DIALOGUE
        ↓
DIALOGUE COMPLETES
        ↓
CHECK CHARACTER PROGRESS
        ↓
LOAD NEXT AVAILABLE CHALLENGE
```

If the character has no remaining challenges:

``` text
show completion dialogue
```

instead.

------------------------------------------------------------------------

# 37. Dialogue Algorithm

Dialogue must also be data-driven.

Conceptually:

``` text
dialogueNode = startingNode

while dialogueNode exists:
    show speaker
    show portrait
    show expression
    show text
    wait for input
    follow next/choice/trigger
```

Dialogue data should come from content files.

------------------------------------------------------------------------

# 38. Dialogue-to-Challenge Trigger

A dialogue node can contain:

``` text
trigger:
    startChallenge(characterId)
```

This keeps story and gameplay connected without hardcoding
scene-specific question logic.

------------------------------------------------------------------------

# 39. Final Challenge Unlock

The final challenge unlocks when the required challenge progression is
complete.

Conceptually:

``` ts
if (requiredChallengesCompleted >= requiredChallengeCount) {
    unlockFinalChallenge();
}
```

The exact requirement should be configurable.

------------------------------------------------------------------------

# 40. Final Challenge

The final challenge combines multiple accessibility needs.

Possible categories:

``` text
VISUAL
HEARING
MOTOR
COGNITIVE
COLOR
LANGUAGE
```

The player makes multiple design decisions.

Each decision contributes to the final score.

------------------------------------------------------------------------

# 41. Final Challenge Algorithm

``` text
FINAL CHALLENGE
      ↓
LOAD DESIGN SCENARIO
      ↓
LOAD DECISION SET
      ↓
PLAYER MAKES DECISION 1
      ↓
APPLY RESULT
      ↓
PLAYER MAKES DECISION 2
      ↓
APPLY RESULT
      ↓
...
      ↓
CALCULATE FINAL SCORE
```

The final challenge should use the same dynamic decision infrastructure
where possible.

------------------------------------------------------------------------

# 42. Final Score

Conceptually:

``` text
overallScore =
sum(implementedCategoryScores)
/
numberOfUsedCategories
```

Do not display categories that were never implemented.

Example:

``` text
VISUAL    92%
HEARING   88%
COLOR     100%

OVERALL   93%
```

------------------------------------------------------------------------

# 43. Final Evaluation

Display:

``` text
DESIGN REVIEW COMPLETE
```

Then category scores.

Then:

``` text
WHO DID YOU DESIGN FOR?
```

Pause.

``` text
EVERYONE.
```

Then transition to the ending.

------------------------------------------------------------------------

# 44. Opening Appointment Algorithm

The first accessibility simulation is separate from the later challenge
system.

It exists to create the player's initial realization.

Flow:

``` text
GRANDMA
 ↓
BOOK APPOINTMENT
 ↓
30-SECOND TIMER
 ↓
INTENTIONALLY INACCESSIBLE WEBSITE
 ↓
SUCCESS OR FAILURE
 ↓
REALIZATION
```

------------------------------------------------------------------------

# 45. Appointment Task

Required information:

``` text
TASK = BOOK_DOCTOR_APPOINTMENT
DATE = TOMORROW
TIME = 4:00 PM
```

------------------------------------------------------------------------

# 46. Appointment Timer

The timer must use elapsed time rather than assuming one update equals
one second.

Conceptually:

``` text
startTime = currentTime()

remaining =
    duration -
    (currentTime() - startTime)
```

Duration:

``` text
30 seconds
```

This prevents timer drift.

------------------------------------------------------------------------

# 47. Appointment Steps

Example:

``` text
SELECT DOCTOR
      ↓
SELECT DATE
      ↓
SELECT TIME
      ↓
ENTER DETAILS
      ↓
COMPLETE CAPTCHA
      ↓
CONFIRM
```

The exact number of steps may be simplified for the MVP.

------------------------------------------------------------------------

# 48. Intentional Barriers

The simulated website can contain:

``` text
SMALL_TEXT
LOW_CONTRAST
TINY_TARGET
UNCLEAR_LABEL
CONFUSING_HIERARCHY
BAD_CAPTCHA
COLOR_ONLY_STATUS
```

These are intentional gameplay mechanics.

They must not affect the accessibility of the actual game UI.

------------------------------------------------------------------------

# 49. Appointment Success

When all required fields are correct:

``` text
appointmentCompleted = true
stopTimer()
```

Then:

``` text
APPOINTMENT_SUCCESS
 ↓
REALIZATION
```

------------------------------------------------------------------------

# 50. Appointment Failure

If:

``` text
remaining <= 0
AND appointmentCompleted == false
```

then:

``` text
stopTimer()
APPOINTMENT_FAILURE
 ↓
REALIZATION
```

The player must not be blamed.

------------------------------------------------------------------------

# 51. Success/Failure Convergence

Both paths converge:

``` text
SUCCESS ─────┐
             ↓
        REALIZATION
             ↑
FAILURE ─────┘
```

Then:

``` text
DESIGNER_INTRO
 ↓
CITY
```

This keeps the narrative consistent.

------------------------------------------------------------------------

# 52. Pause Behavior

Normal exploration:

``` text
pause allowed
```

The 30-second appointment challenge may restrict pause behavior.

However:

> Accessibility takes priority over artificial difficulty.

If pausing is necessary for an accessibility requirement, allow the
timer to pause.

------------------------------------------------------------------------

# 53. Input Handling

Desktop defaults:

``` text
W / A / S / D
ARROW KEYS
```

Interaction:

``` text
E
```

Dialogue:

``` text
ENTER / SPACE
```

Choices:

``` text
ARROW KEYS
ENTER
```

The implementation may adapt controls to the final framework.

------------------------------------------------------------------------

# 54. Save State

Minimum useful state:

``` text
playerName
currentScene
score
categoryScores
completedChallenges
challengeAttempts
characterProgress
unlockedDifficulties
difficulty
```

For the hackathon, session-only state is acceptable if persistent saving
slows development.

------------------------------------------------------------------------

# 55. Reset Behavior

Starting a new game should reset:

``` text
score = 0
completedChallenges = []
challengeAttempts = {}
characterProgress = {}
categoryScores = {}
unlockedDifficulties = initial
currentScene = TITLE
```

No old challenge progress should leak into a new game.

------------------------------------------------------------------------

# 56. Error Recovery

If challenge content fails to load:

``` text
log error
 ↓
show development fallback
```

Example:

``` text
[Challenge unavailable]
```

The final demo should contain no missing content.

If a single optional challenge fails, the game should avoid becoming
permanently stuck.

------------------------------------------------------------------------

# 57. Runtime Event Flow

Typical encounter:

``` text
PLAYER ENTERS NPC AREA
        ↓
SHOW [TALK]
        ↓
PLAYER INTERACTS
        ↓
LOAD DIALOGUE
        ↓
DIALOGUE COMPLETES
        ↓
GET NEXT AVAILABLE CHALLENGE
        ↓
SHOW CHALLENGE
        ↓
PLAYER SELECTS ANSWER
        ↓
VALIDATE
     ↙       ↘
WRONG       CORRECT
  ↓            ↓
FEEDBACK     SCORE
  ↓            ↓
RETRY        TRANSFORM
               ↓
           COMPLETE
               ↓
         PROGRESS CHECK
               ↓
        NEXT CHALLENGE /
        CITY / UNLOCK
```

------------------------------------------------------------------------

# 58. Complete Runtime Algorithm

``` text
START
 ↓
BOOT
 ↓
TITLE
 ↓
PROFILE
 ↓
INTRO
 ↓
DEVELOPER ROOM
 ↓
GRANDMA
 ↓
APPOINTMENT
 ↓
30s SIMULATION
 ↓
SUCCESS / FAILURE
 ↓
REALIZATION
 ↓
DESIGNER INTRO
 ↓
CITY
 ↓
DISCOVER CHARACTER
 ↓
DIALOGUE
 ↓
GET NEXT INCOMPLETE CHALLENGE
 ↓
EASY
 ↓
QUESTION
 ↓
ANSWER
 ├── WRONG → FEEDBACK → RETRY
 └── CORRECT
       ↓
     SCORE
       ↓
 TRANSFORMATION
       ↓
 COMPLETE CHALLENGE
       ↓
 CHECK EASY PROGRESS
       ↓
 MORE EASY?
 ├── YES → NEXT EASY CHALLENGE
 └── NO
       ↓
 MEDIUM UNLOCKED
       ↓
 MEDIUM CHALLENGES
       ↓
 HARD UNLOCKED
       ↓
 HARD CHALLENGES
       ↓
 CHARACTER COMPLETE
       ↓
 NEXT CHARACTER
       ↓
 ALL REQUIRED CHALLENGES COMPLETE?
 ├── NO → CITY / NEXT CHARACTER
 └── YES
       ↓
 FINAL DESIGN CHALLENGE
       ↓
 FINAL EVALUATION
       ↓
 ENDING
```

------------------------------------------------------------------------

# 59. Recommended System Boundaries

Keep these responsibilities separate:

``` text
SceneManager
    → scene transitions

GameStateManager
    → global state

DialogueManager
    → dialogue

CharacterManager
    → NPC data/progress

ChallengeManager
    → challenge selection/evaluation

TransformationManager
    → interface changes

ScoreManager
    → score calculation

ProgressionManager
    → unlocks

ContentLoader
    → content data

SaveManager
    → persistence

UI systems
    → presentation
```

No single system should own the entire gameplay loop.

------------------------------------------------------------------------

# 60. Critical Anti-Hardcoding Rules

The implementation must NOT:

``` text
Hardcode Rahul's question count
Hardcode Fatima's question count
Hardcode one question per NPC
Hardcode answer text inside UI code
Hardcode correct answers inside UI code
Hardcode difficulty transitions to specific question IDs
Hardcode transformation logic to specific question numbers
```

Instead use:

``` text
characterId
challengeId
difficulty
optionId
transformationId
progress state
content data
```

------------------------------------------------------------------------

# 61. Content Expansion Rule

Adding a new challenge should ideally require only:

``` text
1. Add challenge content.
2. Add referenced transformation if new.
3. Register/load content if required by the chosen data system.
```

It should **not** require rewriting:

``` text
ChallengeManager
GameStateManager
NPC system
UI system
```

------------------------------------------------------------------------

# 62. Example Expansion

Current:

``` text
rahul-visual-easy-01
rahul-visual-easy-02
rahul-visual-easy-03
```

Add:

``` text
rahul-visual-easy-04
```

The system should automatically see:

``` text
4 available Easy challenges
```

without a code change to the selection algorithm.

------------------------------------------------------------------------

# 63. Dynamic Difficulty Expansion

If content later adds:

``` text
EXPERT
```

the difficulty system should be configurable rather than assuming:

``` text
easy → medium → hard
```

as immutable code.

For the MVP, the progression remains:

``` text
Easy → Medium → Hard
```

------------------------------------------------------------------------

# 64. Accessibility Rule

The game is teaching accessibility.

Therefore, the gameplay engine itself should not create unnecessary
barriers.

Examples:

``` text
Keyboard support
Readable UI
Captions
Reduced motion
Clear focus
Pause when necessary
```

The intentionally inaccessible appointment simulation is the exception
because it is a controlled learning mechanic.

------------------------------------------------------------------------

# 65. Definition of Done

The gameplay system is complete when:

``` text
[ ] Opening sequence works.
[ ] Appointment simulation works.
[ ] 30-second timer works.
[ ] Success/failure converge into realization.
[ ] City exploration works.
[ ] NPC dialogue is data-driven.
[ ] Multiple challenges per character work.
[ ] Easy/Medium/Hard progression works.
[ ] Questions are loaded from content data.
[ ] Options are rendered dynamically.
[ ] Correct answers are evaluated from data.
[ ] Wrong answers can be retried.
[ ] Score updates correctly.
[ ] Interface transformations work.
[ ] Challenge completion is tracked.
[ ] Character progress is tracked.
[ ] New challenges can be added without rewriting gameplay logic.
[ ] Final challenge works.
[ ] Final evaluation works.
[ ] Game can reset cleanly.
```

------------------------------------------------------------------------

# 66. Final Gameplay Principle

The player should experience:

``` text
SEE THE PROBLEM
      ↓
MEET THE PERSON
      ↓
UNDERSTAND THE NEED
      ↓
MAKE A DESIGN DECISION
      ↓
SEE THE CONSEQUENCE
      ↓
LEARN
      ↓
FACE A HARDER PROBLEM
```

The game should therefore feel like:

> **a narrative 8-bit/pixel-art RPG where the player gradually learns to
> become an inclusive digital product designer.**

Not:

> **a fixed sequence of MCQs disguised as a game.**
