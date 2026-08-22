# AGENTS.md --- Inclusive Interface

# 1. Purpose

This file contains the implementation rules for AI coding agents,
especially **Anti-Gravity**, working on **Inclusive Interface**.

Treat this file together with:

``` text
PRD.md
GAME_DESIGN.md
MVP_SCOPE.md
GAMEPLAY_ALGORITHM.md
UI_UX_DESIGN.md
CONTENT.md
CHALLENGE_CONTENT_STRUCTURE.md
ARCHITECTURE.md
PROJECT_STRUCTURE.md
TECH_STACK.md
API_SPEC.md
SECURITY.md
PERFORMANCE.md
```

These documents form the project specification.

> **Do not invent a different game architecture when the specification
> already defines one.**

------------------------------------------------------------------------

# 2. Core Project Identity

The project is:

> **An 8-bit / pixel-art narrative RPG + visual-novel hybrid that
> teaches inclusive digital product design through interactive
> accessibility challenges.**

The player first experiences a deliberately inaccessible simulated
interface and then becomes a digital product designer who must improve
interfaces for fictional users with different accessibility needs.

The game is **not**:

-   A normal accessibility website
-   An Alexa-style assistant
-   A simple accessibility checker
-   A two-question MCQ demo
-   A static quiz
-   A collection of hardcoded screens

------------------------------------------------------------------------

# 3. Critical Gameplay Requirement

The game must support:

``` text
MULTIPLE CHARACTERS
        ×
MULTIPLE DIFFICULTY LEVELS
        ×
MULTIPLE CHALLENGES PER CHARACTER
        ×
DYNAMIC INTERFACE TRANSFORMATIONS
```

Minimum intended progression:

``` text
Easy
 ↓
Medium
 ↓
Hard
```

For example:

``` text
Rahul
 ├── Easy → multiple challenges
 ├── Medium → multiple challenges
 └── Hard → multiple challenges

Fatima
 ├── Easy → multiple challenges
 ├── Medium → multiple challenges
 └── Hard → multiple challenges
```

The same architecture must work for future characters.

------------------------------------------------------------------------

# 4. Golden Rule: Content Is Data

This is one of the most important rules in the project.

> **Do not hardcode authored questions, answers, dialogue, or character
> challenge sequences inside gameplay code.**

The content layer provides:

``` text
characters
dialogue
questions
options
correct answers
explanations
difficulty
categories
transformations
```

Gameplay systems provide:

``` text
selection
evaluation
scoring
progression
state management
```

UI provides:

``` text
presentation
interaction
feedback
```

------------------------------------------------------------------------

# 5. Never Hardcode Q1 / Q2 / Q3

Do NOT implement:

``` ts
showRahulQuestion1();
showRahulQuestion2();
showRahulQuestion3();
```

Do NOT implement:

``` ts
if (questionNumber === 1) {
    ...
}
```

Do NOT implement:

``` ts
if (character === "rahul") {
    question = "...";
}
```

Instead:

``` ts
const challenge = challengeManager.getNextChallenge(
  characterId,
  difficulty
);
```

Then render the returned data.

------------------------------------------------------------------------

# 6. Never Assume Two Questions

The project is explicitly designed for **multiple
questions/challenges**.

Do not write code assuming:

``` text
Rahul = 1 question
Fatima = 1 question
```

or:

``` text
Rahul = 2 questions
Fatima = 2 questions
```

The number of challenges must come from the content data.

If `CONTENT.md` contains 9 Rahul challenges, the system must support all
9.

If more are added later, the system should continue working.

------------------------------------------------------------------------

# 7. Dynamic Challenge Architecture

Follow this pipeline:

``` text
CONTENT
   ↓
ContentLoader
   ↓
Content Validation
   ↓
ChallengeRegistry
   ↓
ChallengeManager
   ↓
Dynamic Challenge UI
```

The UI should never directly parse raw content files.

------------------------------------------------------------------------

# 8. Challenge Selection

Challenge selection must be dynamic.

Required conceptual flow:

``` text
characterId
    ↓
difficulty
    ↓
available challenge pool
    ↓
remove completed challenges
    ↓
check prerequisites
    ↓
select next challenge
```

Do not hardcode question ordering into scene files.

------------------------------------------------------------------------

# 9. Adding a Challenge Must Be Cheap

Adding:

``` text
rahul-visual-easy-04
```

should normally require:

``` text
add content
```

and, only if necessary:

``` text
add a new transformation definition
```

It should NOT require rewriting:

``` text
ChallengeManager
ChallengePanel
GameStateManager
CharacterManager
ProgressionManager
```

------------------------------------------------------------------------

# 10. Adding a Character Must Be Scalable

Adding a future character should normally involve:

``` text
character data
dialogue data
challenge data
assets
```

It should NOT require creating:

``` text
NewChallengeManager
NewChallengeUI
NewScoringSystem
```

for that character.

------------------------------------------------------------------------

# 11. Preserve the Narrative

The game must feel like an actual game.

Do not reduce it to:

``` text
NPC
 ↓
MCQ
 ↓
NPC
 ↓
MCQ
```

The intended experience is:

``` text
Explore
 ↓
Meet person
 ↓
Talk
 ↓
Understand their problem
 ↓
Make design decision
 ↓
See interface change
 ↓
Learn
 ↓
Explore again
```

Dialogue, environment, animation, sound, and interface changes should
support the narrative.

------------------------------------------------------------------------

# 12. Opening Sequence Must Be Preserved

The intended opening:

``` text
BLACK SCREEN
 ↓
SYSTEM INITIALIZING...
 ↓
USER PROFILE: UNKNOWN
 ↓
WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
 ↓
SIGN UP TO EXPERIENCE
 ↓
GAME
```

Do not remove this sequence merely to simplify implementation unless
explicitly instructed.

------------------------------------------------------------------------

# 13. Appointment Simulation

The opening appointment website is intentionally inaccessible.

It should contain simulated barriers such as:

``` text
small text
poor contrast
tiny clickable areas
confusing hierarchy
bad CAPTCHA
unclear labels
color-only indicators
```

The purpose is to create the player's realization.

The simulation must remain separate from the actual accessible game UI.

------------------------------------------------------------------------

# 14. Critical Narrative Moment

Both appointment outcomes should converge:

``` text
SUCCESS
   ┐
   ├──> REALIZATION
   ┘
FAILURE
```

Then:

``` text
YOU DIDN'T FAIL.

BUT THE INTERFACE DID.
```

Do not rewrite this into a conventional failure screen.

------------------------------------------------------------------------

# 15. Actual Game Must Be Accessible

The simulated website is intentionally inaccessible.

The **actual game must not be**.

Implement where practical:

``` text
keyboard navigation
visible focus
captions
readable text
text alternatives
reduced motion
pause support
no color-only critical information
```

Do not confuse the teaching simulation with the game's actual
accessibility.

------------------------------------------------------------------------

# 16. Dynamic UI Rule

Use reusable components.

Preferred:

``` text
ChallengePanel
ChoiceList
DialogueBox
CharacterPortrait
ScorePopup
TimerDisplay
```

Not:

``` text
RahulQuestionOnePanel
RahulQuestionTwoPanel
FatimaQuestionOnePanel
```

The UI receives content and renders it.

------------------------------------------------------------------------

# 17. UI Must Not Own Game Logic

UI components must not decide:

``` text
whether an answer is correct
how many points are awarded
whether Medium is unlocked
whether Rahul is complete
which question comes next
```

Instead:

``` text
UI
 ↓
Gameplay Service
 ↓
Game State
```

------------------------------------------------------------------------

# 18. Stable IDs

Use stable IDs.

Examples:

``` text
rahul
fatima
rahul-visual-easy-01
rahul-visual-medium-03
b
add-descriptive-labels
```

Do not use:

``` text
question text
display name
array position
```

as persistent identifiers.

------------------------------------------------------------------------

# 19. Answer Evaluation

Correct answers must come from content data.

Use:

``` ts
selectedOptionId === challenge.correctOption
```

Do not compare:

``` ts
selectedText === "Add clear, descriptive labels."
```

The UI should emit the option ID.

------------------------------------------------------------------------

# 20. Wrong Answers

Wrong answers should normally allow retry.

Use supportive feedback:

``` text
NOT QUITE

Think about what the user
is actually experiencing.

[TRY AGAIN]
```

Do not shame the player.

------------------------------------------------------------------------

# 21. Correct Answers

Correct answers should:

``` text
show feedback
award score
apply transformations
mark challenge complete
update progress
check unlocks
```

The sequence should remain consistent.

------------------------------------------------------------------------

# 22. Interface Transformations

Correct design decisions should produce visible consequences where
defined.

Use transformation IDs:

``` text
add-descriptive-labels
increase-target-size
add-text-status
add-captions
add-visual-alert
add-error-description
improve-reading-order
```

Do not write:

``` ts
if (rahulQuestion4) {
   changeButton();
}
```

Instead:

``` ts
applyTransformation("add-descriptive-labels");
```

------------------------------------------------------------------------

# 23. Difficulty Progression

The MVP progression is:

``` text
EASY
 ↓
MEDIUM
 ↓
HARD
```

Unlock requirements should be based on progress data.

Do not hardcode:

``` text
Rahul question 3 = Medium unlock
```

Instead use:

``` text
required completed challenges
```

------------------------------------------------------------------------

# 24. Character Progress

Track progress per character.

Example:

``` text
Rahul
Easy   3/3
Medium 1/3
Hard   0/3
```

Do not represent a character as complete after one question.

------------------------------------------------------------------------

# 25. Challenge Progress

Track:

``` text
challengeId
attemptCount
completed
bestScore
```

This allows the system to support retries and progression.

------------------------------------------------------------------------

# 26. Scoring

Keep scoring inside `ScoreManager`.

Do not calculate score inside UI components.

The scoring system should support:

``` text
base points
attempt bonus
efficiency bonus
category score
overall score
```

Exact values should come from project specifications/configuration.

------------------------------------------------------------------------

# 27. Accessibility Categories

The game may include:

``` text
visual
hearing
motor
cognitive
color
language
```

Do not assume that every character represents only one category forever.

A hard challenge may involve multiple accessibility considerations.

------------------------------------------------------------------------

# 28. Character Representation

Characters must be represented respectfully.

Do not:

``` text
mock disabilities
use disability as a joke
make the character helpless
treat accessibility as a superpower
use insulting language
```

The player is learning to remove barriers, not "fix" people.

------------------------------------------------------------------------

# 29. Dialogue Style

Keep dialogue:

``` text
natural
short
human
character-specific
game-like
```

Avoid turning character dialogue into textbook explanations.

The system can teach principles through:

``` text
dialogue
challenge
consequence
explanation
```

------------------------------------------------------------------------

# 30. Do Not Replace Authored Content

If actual authored content exists in:

``` text
CONTENT.md
content/challenges/
content/dialogue/
```

do not replace it with generic placeholders such as:

``` text
Question 1
Question 2
Question 3
```

or:

``` text
TODO: Add question
```

unless the content is genuinely missing.

------------------------------------------------------------------------

# 31. Do Not Invent Contradictory Content

If implementation reveals ambiguity:

1.  Check the documentation.
2.  Check `CONTENT.md`.
3.  Check `GAMEPLAY_ALGORITHM.md`.
4.  Check `ARCHITECTURE.md`.
5.  Check `API_SPEC.md`.
6.  Preserve the existing project intent.
7.  Only then choose the smallest reasonable implementation.

Do not silently redesign the game.

------------------------------------------------------------------------

# 32. Documentation Priority

When documents conflict, use this priority:

``` text
Explicit latest project requirement
        ↓
CONTENT.md for player-facing content
        ↓
GAMEPLAY_ALGORITHM.md for gameplay behavior
        ↓
ARCHITECTURE.md for system boundaries
        ↓
API_SPEC.md for contracts
        ↓
UI_UX_DESIGN.md for presentation
        ↓
Other supporting documents
```

If the conflict is significant, flag it rather than inventing a new
rule.

------------------------------------------------------------------------

# 33. Minimal-Change Rule

When modifying existing code:

> **Make the smallest change that correctly satisfies the requirement.**

Do not rewrite functioning systems just because another implementation
looks cleaner.

------------------------------------------------------------------------

# 34. Reuse Before Creating

Before creating a new:

``` text
component
manager
utility
service
data structure
```

check whether an existing one can be reused.

Avoid duplicate systems.

------------------------------------------------------------------------

# 35. Architecture Boundaries

Respect these responsibilities:

``` text
ContentLoader
→ loading/validation

ChallengeRegistry
→ indexing challenge data

ChallengeManager
→ challenge lifecycle

GameStateManager
→ runtime state

ScoreManager
→ scoring

ProgressionManager
→ unlocks

TransformationManager
→ interface changes

DialogueManager
→ dialogue

SceneManager
→ major scene transitions
```

Do not move responsibilities randomly between systems.

------------------------------------------------------------------------

# 36. State Ownership

There should be one source of truth for progression.

Do not keep:

``` text
score in UI
score in ChallengeManager
score in GameState
```

and let them drift apart.

Prefer:

``` text
GameStateManager
      ↑
ScoreManager
      ↑
ChallengeManager
```

with clear ownership.

------------------------------------------------------------------------

# 37. Event-Driven Communication

Use events where they reduce coupling.

Useful events:

``` text
SceneChanged
DialogueCompleted
ChallengeStarted
AnswerSubmitted
ChallengeCompleted
ScoreChanged
TransformationApplied
DifficultyUnlocked
CharacterCompleted
TimerExpired
GameCompleted
```

Avoid tightly coupling every system to every other system.

------------------------------------------------------------------------

# 38. Content Validation

Before running the game, validate:

``` text
duplicate IDs
missing references
invalid correct options
invalid difficulty
invalid category
missing transformations
broken dialogue links
```

Fail clearly during development.

Do not silently ignore broken content.

------------------------------------------------------------------------

# 39. Testing Requirements

At minimum test:

``` text
Challenge selection
Answer evaluation
Retry
Scoring
Difficulty unlock
Character completion
Transformation application
Content validation
Timer
Game reset
```

Integration test:

``` text
NPC
 ↓
Dialogue
 ↓
Challenge
 ↓
Answer
 ↓
Score
 ↓
Transformation
 ↓
Progression
```

------------------------------------------------------------------------

# 40. Build/Test After Significant Changes

After changing gameplay or architecture:

``` text
run tests
run type checking
run linting if configured
run build
```

Do not claim a feature works without verifying it when verification is
available.

------------------------------------------------------------------------

# 41. Do Not Break the Existing Demo

When adding features:

``` text
preserve opening
preserve appointment sequence
preserve city
preserve dialogue
preserve existing challenge content
```

unless the requested change explicitly modifies them.

------------------------------------------------------------------------

# 42. Performance Rules

Prefer:

``` text
load content once
index content
reuse components
reuse assets
avoid unnecessary re-renders
avoid unnecessary scene reloads
```

Do not optimize prematurely.

Prioritize stable gameplay and demo reliability.

------------------------------------------------------------------------

# 43. Asset Rules

Use:

``` text
original assets
properly licensed assets
generated assets
```

Do not copy copyrighted game assets.

Do not use Roblox branding or proprietary assets simply because the
visual direction is Roblox-like.

The target is the **feeling of accessible 8-bit exploration**, not
cloning another game.

------------------------------------------------------------------------

# 44. Security Rules

Never place:

``` text
API secrets
private keys
real medical data
real appointment credentials
```

in the repository.

The appointment system is fictional.

Profile information should remain minimal.

Treat local storage as untrusted.

------------------------------------------------------------------------

# 45. No Backend Unless Required

The MVP is primarily client-side.

Do not introduce:

``` text
database
authentication server
cloud backend
real appointment API
```

unless a documented requirement explicitly demands it.

------------------------------------------------------------------------

# 46. AI Agent Workflow

Before coding:

``` text
1. Read relevant .md files.
2. Inspect existing project structure.
3. Identify existing systems.
4. Determine the smallest required change.
5. Implement.
6. Test.
7. Build.
8. Report what changed.
```

Do not start by generating a completely new project structure if one
already exists.

------------------------------------------------------------------------

# 47. When Content Is Missing

If a required piece of content is genuinely missing:

``` text
use a clearly marked temporary placeholder
```

and document it.

Do not silently invent major story content that contradicts the intended
narrative.

For minor UI copy, use the project's existing voice.

------------------------------------------------------------------------

# 48. When Requirements Are Ambiguous

Prefer:

``` text
existing documented behavior
```

over assumptions.

For implementation details that do not affect product behavior, choose
the simplest robust option.

Do not repeatedly ask for clarification when the documentation already
provides enough information.

------------------------------------------------------------------------

# 49. Anti-Gravity Implementation Checklist

Before considering a feature complete:

``` text
[ ] Did I read the relevant documentation?
[ ] Did I reuse existing systems?
[ ] Is content data-driven?
[ ] Did I avoid hardcoded questions?
[ ] Did I avoid assuming two questions?
[ ] Does the UI render dynamic content?
[ ] Are stable IDs used?
[ ] Is game state updated correctly?
[ ] Are score/progression systems separated?
[ ] Are transformations reusable?
[ ] Did I preserve the narrative?
[ ] Did I preserve accessibility of the actual game?
[ ] Did I test the change?
[ ] Did I run the build?
```

------------------------------------------------------------------------

# 50. Critical Anti-Hardcoding Checklist

Before committing challenge code:

``` text
[ ] No question text hardcoded in gameplay
[ ] No answer text hardcoded in UI
[ ] No correct answer hardcoded in UI
[ ] No character-specific challenge component
[ ] No fixed challenge count
[ ] No fixed Q1/Q2/Q3 sequence
[ ] No hardcoded difficulty unlock question ID
[ ] No question-number-based transformation logic
[ ] No duplicated challenge engine
```

------------------------------------------------------------------------

# 51. Definition of Done

A feature is complete when:

``` text
[ ] It follows the documented architecture.
[ ] It uses existing systems where possible.
[ ] It supports dynamic content.
[ ] It does not hardcode authored challenge content.
[ ] It does not break existing progression.
[ ] It maintains the game's narrative identity.
[ ] It preserves accessibility of the actual game UI.
[ ] It has been tested.
[ ] It builds successfully.
```

------------------------------------------------------------------------

# 52. Final Rule

When in doubt, preserve this architecture:

``` text
CONTENT
   ↓
CONTENT LOADER
   ↓
GAMEPLAY SERVICES
   ↓
GAME STATE
   ↓
DYNAMIC UI
   ↓
PLAYER
```

And preserve this gameplay identity:

``` text
MEET SOMEONE
      ↓
UNDERSTAND THEIR BARRIER
      ↓
MAKE A DESIGN DECISION
      ↓
SEE THE INTERFACE CHANGE
      ↓
LEARN
      ↓
FACE A HARDER CHALLENGE
```

**Do not turn Inclusive Interface into a static MCQ website.**

It must remain a dynamic, narrative, 8-bit accessibility-learning game.
