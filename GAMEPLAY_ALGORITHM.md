# GAMEPLAY_ALGORITHM.md --- Inclusive Interface

# 1. Purpose

This document defines the **runtime gameplay logic** for Inclusive
Interface.

It explains how the game should move between scenes, how player actions
affect game state, how accessibility challenges work, how scoring is
calculated, and how the game progresses from the opening sequence to the
final evaluation.

The implementation should treat this document as the gameplay behavior
specification.

------------------------------------------------------------------------

# 2. Core Gameplay Architecture

The game follows a state-driven flow:

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
 ↓
GRANDMA_DIALOGUE
 ↓
APPOINTMENT_TASK
 ↓
ACCESSIBILITY_SIMULATION
 ↓
REALIZATION
 ↓
DESIGNER_INTRO
 ↓
CITY
 ↓
NPC_ENCOUNTER
 ↓
DIALOGUE
 ↓
ACCESSIBILITY_CHALLENGE
 ↓
DECISION
 ↓
FEEDBACK
 ↓
INTERFACE_TRANSFORMATION
 ↓
SCORE_UPDATE
 ↓
CITY
 ↓
NEXT_ENCOUNTER
 ↓
FINAL_EVALUATION
 ↓
ENDING
```

The player should never become lost between these states.

------------------------------------------------------------------------

# 3. Global Game State

The game should maintain a central state object.

Conceptually:

``` text
GameState
│
├── player
│   ├── name
│   └── username
│
├── currentScene
│
├── currentLevel
│
├── score
│
├── categoryScores
│   ├── visual
│   ├── hearing
│   ├── motor
│   ├── cognitive
│   ├── color
│   └── language
│
├── completedChallenges
│
├── challengeAttempts
│
├── unlockedLocations
│
├── discoveredCharacters
│
└── difficulty
```

Not every field has to be implemented in the first prototype.

------------------------------------------------------------------------

# 4. Scene State Machine

Use a finite-state-machine-style approach for major gameplay states.

Example:

``` text
STATE: BOOT
    ↓
STATE: TITLE
    ↓
STATE: PROFILE
    ↓
STATE: INTRO
    ↓
STATE: DEVELOPER_ROOM
```

A state should define:

-   What the player can do.
-   What UI is visible.
-   What events can occur.
-   What state can be entered next.

------------------------------------------------------------------------

# 5. State Transition Rules

## BOOT

### Purpose

Initialize the game.

### Actions

-   Load configuration.
-   Initialize game state.
-   Load assets required for the title scene.

### Transition

``` text
BOOT → TITLE
```

------------------------------------------------------------------------

# 6. TITLE State

Display:

``` text
SYSTEM INITIALIZING...
```

Then:

``` text
USER PROFILE: UNKNOWN
```

Then:

``` text
WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
```

### Transition

Player interaction:

``` text
TITLE → PROFILE
```

------------------------------------------------------------------------

# 7. PROFILE State

Display:

``` text
SIGN UP TO EXPERIENCE
```

Collect:

-   Name
-   Username

Validate input.

### If valid

``` text
PROFILE → INTRO
```

### If invalid

Remain in:

``` text
PROFILE
```

and display a short error.

------------------------------------------------------------------------

# 8. INTRO State

The intro introduces the protagonist.

The scene should use:

-   Narrative text
-   Character dialogue
-   Short transitions

Do not require gameplay here beyond advancing the story.

### Transition

``` text
INTRO → DEVELOPER_ROOM
```

------------------------------------------------------------------------

# 9. DEVELOPER_ROOM State

The player can move around.

### Available actions

``` text
MOVE
INTERACT
INSPECT
```

The player may inspect a few objects.

The important trigger is the grandma interaction.

### Transition

``` text
DEVELOPER_ROOM
      ↓
GRANDMA_DIALOGUE
```

------------------------------------------------------------------------

# 10. GRANDMA_DIALOGUE State

Dialogue establishes the first task.

Required information:

``` text
TASK = BOOK_DOCTOR_APPOINTMENT
DATE = TOMORROW
TIME = 4:00 PM
```

After the conversation:

``` text
GRANDMA_DIALOGUE → APPOINTMENT_TASK
```

------------------------------------------------------------------------

# 11. APPOINTMENT_TASK State

Display:

``` text
TASK ASSIGNED

BOOK A DOCTOR'S APPOINTMENT

TOMORROW
4:00 PM
```

Then transition to:

``` text
ACCESSIBILITY_SIMULATION
```

------------------------------------------------------------------------

# 12. Accessibility Simulation Algorithm

The intentionally inaccessible appointment website is a special gameplay
state.

## Initialization

When entering:

``` text
ACCESSIBILITY_SIMULATION
```

initialize:

``` text
timer = 30
appointmentCompleted = false
```

Then start the countdown.

------------------------------------------------------------------------

# 13. Timer Algorithm

Conceptually:

``` text
START TIMER

while timer > 0 and appointmentCompleted == false:

    wait 1 second

    timer = timer - 1

    update timer display

if appointmentCompleted == true:
    SUCCESS

else if timer == 0:
    FAILURE
```

The timer should not continue running after the task ends.

------------------------------------------------------------------------

# 14. Appointment Interaction

The simulated website should have a sequence of required actions.

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
CONFIRM APPOINTMENT
```

The exact number of steps can be simplified for the MVP.

------------------------------------------------------------------------

# 15. Intentional Accessibility Barriers

Each website interaction may contain one or more deliberate barriers.

Examples:

``` text
SMALL_TEXT
LOW_CONTRAST
TINY_TARGET
UNCLEAR_LABEL
CONFUSING_HIERARCHY
BAD_CAPTCHA
COLOR_ONLY_STATUS
```

These barriers should increase friction.

They should not make the task technically impossible.

------------------------------------------------------------------------

# 16. Appointment Success Condition

The appointment is successful when all required fields are correctly
completed.

Conceptually:

``` text
if doctorSelected
AND dateCorrect
AND timeCorrect
AND detailsValid
AND captchaCorrect
AND confirmPressed:

    appointmentCompleted = true
```

Then:

``` text
ACCESSIBILITY_SIMULATION → APPOINTMENT_SUCCESS
```

------------------------------------------------------------------------

# 17. Appointment Failure Condition

If:

``` text
timer == 0
AND appointmentCompleted == false
```

then:

``` text
ACCESSIBILITY_SIMULATION → APPOINTMENT_FAILURE
```

The player should not be blamed.

------------------------------------------------------------------------

# 18. Success State

Display:

``` text
APPOINTMENT CONFIRMED
```

Allow a short pause.

Then:

``` text
SUCCESS → REALIZATION
```

------------------------------------------------------------------------

# 19. Failure State

Display:

``` text
TIME'S UP
```

Allow a short pause.

Then:

``` text
FAILURE → REALIZATION
```

------------------------------------------------------------------------

# 20. Realization Algorithm

Both paths must converge:

``` text
SUCCESS ──────┐
              ↓
          REALIZATION
              ↑
FAILURE ──────┘
```

Display:

``` text
YOU DIDN'T FAIL.
```

Then:

``` text
BUT THE INTERFACE DID.
```

Do not create separate long story paths for success and failure in the
MVP.

This keeps the narrative consistent.

------------------------------------------------------------------------

# 21. Designer Transition

After the realization:

``` text
REALIZATION → DESIGNER_INTRO
```

Display:

``` text
ROLE UPDATED

DIGITAL PRODUCT DESIGNER
```

Then:

> "You're hired to build digital services for a fictional city."

After the transition:

``` text
DESIGNER_INTRO → CITY
```

------------------------------------------------------------------------

# 22. CITY State

The player gains control of the character.

The city contains interactable NPCs.

Each NPC should have:

``` text
NPC_ID
NAME
LOCATION
ACCESSIBILITY_CATEGORY
DIALOGUE_ID
CHALLENGE_ID
COMPLETED
```

------------------------------------------------------------------------

# 23. NPC Discovery

When the player enters an NPC interaction area:

``` text
if NPC.completed == false:

    show interaction prompt
```

Example:

``` text
[TALK]
```

When the player interacts:

``` text
CITY → DIALOGUE
```

------------------------------------------------------------------------

# 24. Dialogue Algorithm

Dialogue should be data-driven.

Conceptually:

``` text
dialogueNode = startingDialogueNode

while dialogueNode has next:

    display speaker
    display portrait
    display text

    wait for player input

    dialogueNode = next
```

A dialogue node may contain:

``` text
speaker
text
portrait
expression
next
choice
trigger
```

------------------------------------------------------------------------

# 25. Dialogue Branches

Some dialogue can branch.

Example:

``` text
RAHUL:
"I can't tell which button does what."

PLAYER:

A. "What do you mean?"
B. "Let's fix it."
```

Both may eventually reach the same challenge in the MVP.

Complex branching is optional.

------------------------------------------------------------------------

# 26. Dialogue → Challenge Transition

When the NPC has explained enough context:

``` text
DIALOGUE
   ↓
CHALLENGE_INTRO
```

Display:

``` text
DESIGN DECISION REQUIRED
```

Then present the challenge.

------------------------------------------------------------------------

# 27. Challenge Data Model

Each challenge should contain:

``` text
Challenge
│
├── id
├── characterId
├── category
├── scenario
├── question
├── options
├── correctOption
├── explanation
├── points
└── interfaceChanges
```

Example:

``` text
id: rahul_01
category: visual
scenario: "Rahul cannot tell what several controls do."
question: "What should you change?"
options: [...]
correctOption: "B"
points: 100
```

------------------------------------------------------------------------

# 28. Challenge Algorithm

``` text
START CHALLENGE

load challenge data

display scenario

display question

display options

wait for player selection

validate selection
```

Then:

``` text
if selectedOption == correctOption:

    CORRECT

else:

    INCORRECT
```

------------------------------------------------------------------------

# 29. Correct Answer Algorithm

When the player selects the correct answer:

``` text
score += challenge.points
```

If it is the first attempt:

``` text
score += FIRST_ATTEMPT_BONUS
```

Then:

``` text
categoryScore += challenge.categoryValue
```

Then:

``` text
applyInterfaceChanges()
```

Then:

``` text
showPositiveFeedback()
```

Then:

``` text
markChallengeComplete()
```

Finally:

``` text
CHALLENGE → CITY
```

------------------------------------------------------------------------

# 30. Incorrect Answer Algorithm

When the player selects an incorrect answer:

``` text
showIncorrectFeedback()
```

Then provide a short explanation.

Example:

``` text
THAT DOESN'T SOLVE THE BARRIER.
```

Then:

> "The problem isn't the color. The user needs another way to understand
> the control."

Depending on difficulty:

### Easy

Allow immediate retry.

### Medium

Allow retry with a small score consequence.

### Hard

Reveal limited feedback and require another attempt.

------------------------------------------------------------------------

# 31. Attempt Tracking

Each challenge should track attempts.

Example:

``` text
challengeAttempts[challengeId] += 1
```

First attempt:

``` text
attempts == 1
```

First-attempt bonus:

``` text
+25
```

Additional attempts do not receive the bonus.

------------------------------------------------------------------------

# 32. Interface Transformation Algorithm

Each correct challenge may contain a list of UI changes.

Example:

``` text
interfaceChanges:

- increaseButtonSize
- addSemanticLabels
- improveContrast
```

When the player succeeds:

``` text
for each change in interfaceChanges:

    apply change
```

The interface should update immediately where possible.

------------------------------------------------------------------------

# 33. Before/After Demonstration

For important challenges, show:

``` text
BEFORE
   ↓
PLAYER DECISION
   ↓
AFTER
```

Example:

``` text
BEFORE

[ ? ] [ ? ] [ ? ]

AFTER

[ BOOK ] [ EDIT ] [ CANCEL ]
```

This visual transformation is a core learning mechanic.

------------------------------------------------------------------------

# 34. Score Algorithm

Recommended base score:

``` text
CORRECT = 100
```

First attempt:

``` text
FIRST_ATTEMPT = 25
```

Optional speed bonus:

``` text
SPEED_BONUS = 10
```

Conceptually:

``` text
points = BASE_POINTS

if attempts == 1:
    points += FIRST_ATTEMPT_BONUS

if speedConditionSatisfied:
    points += SPEED_BONUS
```

Avoid making speed more important than correct reasoning.

------------------------------------------------------------------------

# 35. Accessibility Category Score

Each challenge belongs to a category.

Example:

``` text
visual
hearing
motor
cognitive
color
language
```

When a challenge is completed:

``` text
categoryScores[category] += categoryValue
```

Normalize the result for display.

Example:

``` text
visualScore =
completedVisualPoints / possibleVisualPoints * 100
```

------------------------------------------------------------------------

# 36. Challenge Completion

After a successful challenge:

``` text
completedChallenges.add(challengeId)
```

The NPC can then change state:

``` text
NPC.completed = true
```

The player can continue exploring.

------------------------------------------------------------------------

# 37. NPC Progression

Example:

``` text
CITY

Rahul → Completed
Fatima → Available
Color NPC → Locked
```

After Rahul's challenge:

``` text
Rahul → Completed
Fatima → Available
Color NPC → Available
```

This creates simple progression without requiring a large quest system.

------------------------------------------------------------------------

# 38. Difficulty Algorithm

Game difficulty should affect how much information the player receives.

## EASY

``` text
clear scenario
obvious barrier
simple choices
retry allowed
```

## MEDIUM

``` text
less direct scenario
multiple barriers
plausible distractors
limited retries
```

## HARD

``` text
indirect clues
multiple accessibility considerations
complex trade-offs
limited feedback
```

Difficulty should primarily change **reasoning complexity**, not simply
make the controls harder.

------------------------------------------------------------------------

# 39. Final Challenge Algorithm

When all required MVP challenges are completed:

``` text
if completedRequiredChallenges >= requiredChallengeCount:

    unlock FINAL_CHALLENGE
```

The player enters the final design scenario.

------------------------------------------------------------------------

# 40. Final Challenge

The player designs a public service for multiple user needs.

Possible categories:

``` text
VISUAL
HEARING
MOTOR
COGNITIVE
COLOR
LANGUAGE
```

The player makes several decisions.

Each decision modifies the final accessibility score.

------------------------------------------------------------------------

# 41. Final Score Calculation

Conceptually:

``` text
overallScore =
(
    visualScore
    + hearingScore
    + motorScore
    + cognitiveScore
    + colorScore
    + languageScore
) / numberOfUsedCategories
```

If the MVP only implements three categories:

``` text
overallScore =
(
    visualScore
    + hearingScore
    + colorScore
) / 3
```

Do not show categories that were never implemented.

------------------------------------------------------------------------

# 42. Final Evaluation State

Display:

``` text
DESIGN REPORT
```

Then:

``` text
VISUAL       XX%
HEARING      XX%
COLOR        XX%

OVERALL      XX%
```

Then:

``` text
WHO DID YOU DESIGN FOR?
```

Pause.

``` text
EVERYONE.
```

Transition to ending.

------------------------------------------------------------------------

# 43. Game Completion

When the final evaluation is displayed:

``` text
gameCompleted = true
```

Store:

``` text
finalScore
categoryScores
completedChallenges
```

Then:

``` text
FINAL_EVALUATION → ENDING
```

------------------------------------------------------------------------

# 44. Ending State

The final narrative message should reinforce the lesson.

Example:

> "I used to think accessibility meant adding extra features."

Pause.

> "Now I think it means making sure nobody has to fight the interface
> just to get something done."

Then:

``` text
SYSTEM MESSAGE
```

Glitch.

# WHO DID YOU DESIGN FOR?

Then:

# EVERYONE.

------------------------------------------------------------------------

# 45. Input Handling

The game should support the target platform's standard controls.

For desktop:

``` text
W / A / S / D
```

or:

``` text
ARROW KEYS
```

for movement.

Interaction:

``` text
E
```

Dialogue:

``` text
ENTER / SPACE
```

Choice selection:

``` text
ARROW KEYS
ENTER
```

The exact key bindings can change based on the chosen framework.

------------------------------------------------------------------------

# 46. Interaction Priority

When multiple interactable objects are nearby:

``` text
NPC
   >
IMPORTANT OBJECT
   >
ENVIRONMENTAL OBJECT
```

The system should prioritize the most important interaction.

Do not allow interaction prompts to overlap excessively.

------------------------------------------------------------------------

# 47. Pause Behavior

The player should be able to pause during normal exploration.

The 30-second appointment challenge may have restricted pause behavior
depending on the intended learning experience.

If the timer is considered critical:

``` text
pauseMenu = disabled
```

If accessibility requires pausing:

``` text
pauseTimer = true
```

The final implementation should prioritize accessibility over artificial
difficulty.

------------------------------------------------------------------------

# 48. Save State

For the MVP, saving can be simplified.

Minimum state to save:

``` text
playerName
currentScene
score
completedChallenges
categoryScores
difficulty
```

If implementing a save system would slow development significantly, use
session-only state for the hackathon demo.

------------------------------------------------------------------------

# 49. Reset Behavior

Provide a reliable way to restart the game.

Possible:

``` text
MAIN MENU
→ NEW GAME
```

Reset:

``` text
score = 0
completedChallenges = []
categoryScores = {}
currentScene = TITLE
```

Do not leave old challenge state after starting a new game.

------------------------------------------------------------------------

# 50. Error Recovery

If a dialogue or challenge fails to load:

``` text
log error
```

and show a development fallback instead of crashing.

Example:

``` text
[Dialogue unavailable]
```

This is acceptable during development but should not remain visible in
the final demo.

------------------------------------------------------------------------

# 51. Runtime Event Flow

A typical NPC encounter should behave like:

``` text
PLAYER ENTERS NPC AREA
        ↓
SHOW [TALK]
        ↓
PLAYER PRESSES INTERACT
        ↓
START DIALOGUE
        ↓
DIALOGUE COMPLETES
        ↓
LOAD CHALLENGE
        ↓
SHOW QUESTION
        ↓
PLAYER SELECTS ANSWER
        ↓
VALIDATE
   ↙          ↘
CORRECT      INCORRECT
   ↓             ↓
UPDATE SCORE   FEEDBACK
   ↓             ↓
UPDATE UI      RETRY / CONTINUE
   ↓
MARK COMPLETE
   ↓
RETURN TO CITY
```

------------------------------------------------------------------------

# 52. Complete Runtime Flow

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
GRANDMA DIALOGUE
 ↓
APPOINTMENT TASK
 ↓
START 30s TIMER
 ↓
ACCESSIBILITY SIMULATION
 ↓
 ┌───────────────┐
 │               │
SUCCESS        TIMEOUT
 │               │
 └───────┬───────┘
         ↓
    REALIZATION
         ↓
  DESIGNER INTRO
         ↓
        CITY
         ↓
    FIND NPC
         ↓
      DIALOGUE
         ↓
     CHALLENGE
         ↓
      DECISION
         ↓
  ┌──────┴──────┐
  ↓             ↓
CORRECT       WRONG
  ↓             ↓
SCORE         FEEDBACK
  ↓             ↓
UI CHANGE    RETRY
  ↓             │
  └──────┬──────┘
         ↓
      CITY
         ↓
NEXT NPC
         ↓
ALL REQUIRED
CHALLENGES DONE?
    ↙         ↘
  NO           YES
  ↓             ↓
 CITY      FINAL CHALLENGE
                ↓
         FINAL EVALUATION
                ↓
              ENDING
```

------------------------------------------------------------------------

# 53. Important Implementation Rule

The gameplay algorithm should remain **data-driven and modular**.

Avoid writing one enormous function that handles:

-   Dialogue
-   Movement
-   Questions
-   Scoring
-   Scene changes
-   UI
-   Saving

Instead, use separate systems that communicate through game state and
events.

------------------------------------------------------------------------

# 54. Recommended Systems

Conceptually separate:

``` text
GameStateManager
SceneManager
DialogueManager
ChallengeManager
ScoreManager
NPCManager
PlayerController
UIManager
AccessibilityManager
SaveManager
AudioManager
```

The exact class/module names can change according to the chosen
technology.

------------------------------------------------------------------------

# 55. Event-Based Communication

Where practical, systems should communicate through events.

Examples:

``` text
DialogueCompleted
ChallengeStarted
AnswerSelected
ChallengeCompleted
ScoreChanged
InterfaceChanged
NPCCompleted
LocationUnlocked
GameCompleted
```

This prevents systems from becoming tightly coupled.

------------------------------------------------------------------------

# 56. Core Algorithm Principle

The most important gameplay relationship is:

``` text
USER EXPERIENCE
      ↓
PLAYER UNDERSTANDING
      ↓
DESIGN DECISION
      ↓
INTERFACE CHANGE
      ↓
USER EXPERIENCE IMPROVES
```

Every major accessibility challenge should reinforce this relationship.

------------------------------------------------------------------------

# 57. Definition of Done

The gameplay system is complete when:

-   The player can start a new game.
-   The opening flow works.
-   The appointment challenge works.
-   The timer works.
-   Success and failure converge correctly.
-   The player enters the city.
-   NPCs can be discovered.
-   Dialogue works.
-   Challenges load correctly.
-   Answers are validated.
-   Scores update.
-   Interfaces transform.
-   Completed challenges are tracked.
-   Final evaluation calculates correctly.
-   Ending sequence plays.
-   Restarting the game resets the relevant state.
-   No critical runtime errors occur during the full demo flow.

------------------------------------------------------------------------

# 58. Final Gameplay Principle

> **The player should never simply be told that accessibility matters.**

The game should make the player:

**Experience the barrier → understand the user → make the decision → see
the improvement.**

That loop is the heart of Inclusive Interface.
