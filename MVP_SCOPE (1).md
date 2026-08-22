# MVP_SCOPE.md --- Inclusive Interface

# 1. Purpose

This document defines the **Minimum Viable Product (MVP)** for Inclusive
Interface.

The MVP must be:

-   Playable from beginning to end
-   Demonstrable during the hackathon
-   Visually recognizable as an 8-bit/pixel-art game
-   Narrative-driven
-   Data-driven
-   Dynamic
-   Educational without feeling like a quiz app
-   Small enough for a two-person team to complete reliably

The MVP is **not** the complete long-term game.

It is the smallest version that successfully communicates the project's
core innovation:

> **Teach developers and designers inclusive design by making them
> experience barriers, meet users, make accessibility decisions, and see
> the interface change.**

------------------------------------------------------------------------

# 2. MVP Core Experience

The complete MVP journey should be:

``` text
BOOT
 ↓
OPENING CINEMATIC
 ↓
PROFILE SETUP
 ↓
DEVELOPER ROOM
 ↓
GRANDMA DIALOGUE
 ↓
30-SECOND APPOINTMENT SIMULATION
 ↓
SUCCESS / FAILURE
 ↓
"YOU DIDN'T FAIL. BUT THE INTERFACE DID."
 ↓
DIGITAL DESIGNER INTRO
 ↓
CITY
 ↓
NPC ENCOUNTER
 ↓
DIALOGUE
 ↓
MULTIPLE ACCESSIBILITY CHALLENGES
 ↓
CORRECT DECISION
 ↓
INTERFACE TRANSFORMATION
 ↓
SCORE / PROGRESS
 ↓
NEXT CHALLENGE
 ↓
DIFFICULTY PROGRESSION
 ↓
FINAL DESIGN CHALLENGE
 ↓
FINAL EVALUATION
 ↓
ENDING
```

------------------------------------------------------------------------

# 3. MVP Non-Negotiable Features

The following are required.

``` text
[REQUIRED]
Opening cinematic
Profile setup
Developer room
Grandma interaction
Appointment simulation
30-second timer
Intentional accessibility barriers
Success/failure convergence
Realization sequence
Designer introduction
Pixel-art city
NPC interaction
Dialogue system
Multiple challenges per character
Easy / Medium / Hard
Dynamic challenge loading
Dynamic options
Answer evaluation
Retry
Scoring
Interface transformations
Character progress
Difficulty unlocks
Final challenge
Final evaluation
Ending
```

If a feature is not listed as required, it can be simplified or deferred
if time becomes limited.

------------------------------------------------------------------------

# 4. MVP Narrative

## Opening

Black screen:

> SYSTEM INITIALIZING...

Then:

> USER PROFILE: UNKNOWN

Then:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

------------------------------------------------------------------------

## Profile

``` text
SIGN UP TO EXPERIENCE
```

Collect only:

``` text
Name
Username
```

No real authentication is required.

------------------------------------------------------------------------

## Developer Room

The player sees:

``` text
young developer
desk
laptop
room
```

Grandma calls.

Dialogue:

``` text
Grandma:
"Can you help me book a doctor's appointment?"

Player:
"Sure. What time?"

Grandma:
"Tomorrow. 4 PM."
```

------------------------------------------------------------------------

# 5. MVP Appointment Simulation

The appointment experience is a major MVP feature.

The player must attempt:

``` text
Book doctor appointment
Date: tomorrow
Time: 4 PM
```

Time limit:

``` text
30 seconds
```

The simulated website intentionally contains:

``` text
small text
poor contrast
tiny click targets
confusing hierarchy
unclear labels
bad CAPTCHA
color-only information
weak error messages
```

This is a **simulated fictional website**.

No real medical appointment is created.

------------------------------------------------------------------------

# 6. Appointment Success / Failure

Both outcomes are valid.

### Success

``` text
YOUR APPOINTMENT IS CONFIRMED
```

Then the realization.

### Failure

``` text
TIME'S UP.
```

Then the realization.

Both converge to:

``` text
YOU DIDN'T FAIL.

BUT THE INTERFACE DID.
```

The player must never be presented with a conventional:

``` text
GAME OVER
YOU FAILED
```

screen.

------------------------------------------------------------------------

# 7. MVP Designer Introduction

After the realization:

``` text
ROLE UPDATED

DIGITAL PRODUCT DESIGNER
```

Then:

> You're hired to build digital services for a fictional city.

Then:

> The city has thousands of users with different needs.

Then:

> Your job is to design interfaces that let everyone complete their
> tasks.

------------------------------------------------------------------------

# 8. MVP City

The city only needs to be large enough to demonstrate exploration.

Minimum:

``` text
one main city area
```

It should contain:

``` text
player spawn
NPC locations
simple buildings
paths
interactive objects
visual landmarks
```

Do not build a massive open world.

------------------------------------------------------------------------

# 9. MVP Characters

Minimum required characters:

``` text
Rahul
Fatima
Mira
```

## Rahul

Primary category:

``` text
Visual accessibility
```

## Fatima

Primary category:

``` text
Hearing accessibility
```

## Mira

Primary category:

``` text
Color-vision accessibility
```

The architecture must allow additional characters later.

------------------------------------------------------------------------

# 10. MVP Multiple-Challenge Requirement

This is **mandatory**.

The MVP must demonstrate that characters have **multiple challenges**,
not one question each.

For example:

``` text
Rahul
 ├── Easy Challenge 01
 ├── Easy Challenge 02
 ├── Easy Challenge 03
 ├── Medium Challenge 01
 ├── Medium Challenge 02
 ├── Medium Challenge 03
 ├── Hard Challenge 01
 ├── Hard Challenge 02
 └── Hard Challenge 03
```

The same structure applies to Fatima and Mira where authored content is
available.

The exact number of challenges must come from content data.

The gameplay engine must not assume a fixed number.

------------------------------------------------------------------------

# 11. MVP Challenge System

Every challenge must contain:

``` text
character
difficulty
category
scenario
question
options
correct answer
explanation
points
optional interface transformation
```

The challenge is rendered dynamically.

------------------------------------------------------------------------

# 12. MVP Challenge Loop

``` text
NPC
 ↓
Dialogue
 ↓
Challenge introduction
 ↓
Question
 ↓
Options
 ↓
Player selects answer
 ↓
Evaluate
```

If wrong:

``` text
feedback
 ↓
retry
```

If correct:

``` text
feedback
 ↓
score
 ↓
interface transformation
 ↓
mark complete
 ↓
next challenge
```

------------------------------------------------------------------------

# 13. MVP Dynamic Content Requirement

Questions must not be hardcoded into UI components.

The system must support:

``` text
Content
 ↓
ChallengeRegistry
 ↓
ChallengeManager
 ↓
DynamicChallengeUI
```

Adding:

``` text
rahul-visual-easy-04
```

must not require rewriting the challenge engine.

------------------------------------------------------------------------

# 14. MVP Difficulty Levels

Required:

``` text
Easy
Medium
Hard
```

## Easy

One obvious barrier.

Example:

``` text
unlabeled icon
```

## Medium

Less obvious barrier.

Example:

``` text
status information communicated only visually
```

## Hard

More complex scenario.

Example:

``` text
multiple users + competing interface constraints
```

------------------------------------------------------------------------

# 15. MVP Difficulty Unlocking

Minimum progression:

``` text
Easy
 ↓
required Easy challenges completed
 ↓
Medium unlocked
 ↓
required Medium challenges completed
 ↓
Hard unlocked
```

The thresholds should be configurable.

Do not hardcode a specific question ID as the unlock trigger.

------------------------------------------------------------------------

# 16. MVP Score

The player receives points for good design decisions.

Minimum:

``` text
Correct answer
→ points
```

Optional if time permits:

``` text
first-attempt bonus
efficiency bonus
```

Track:

``` text
overall score
category score
```

------------------------------------------------------------------------

# 17. MVP Interface Transformations

At least several challenge types must visibly change the simulated
interface.

Examples:

``` text
unlabeled icon
      ↓
labeled icon

audio-only notification
      ↓
audio + visual + text notification

color-only status
      ↓
color + icon + text

tiny target
      ↓
larger target
```

The player must be able to visually understand the consequence of their
decision.

------------------------------------------------------------------------

# 18. MVP Character Progress

Track:

``` text
Easy completed
Medium completed
Hard completed
Overall character completion
```

Example:

``` text
RAHUL

EASY
✓ ✓ ✓

MEDIUM
✓ ✓ ○

HARD
🔒 🔒 🔒
```

------------------------------------------------------------------------

# 19. MVP City Loop

The player should be able to:

``` text
walk
approach NPC
interact
read dialogue
start challenge
complete challenge
return to city
find another challenge/NPC
```

Full open-world mechanics are not required.

------------------------------------------------------------------------

# 20. MVP Dialogue System

Dialogue must support:

``` text
speaker
text
portrait
expression
next line
optional choice
optional gameplay trigger
```

The system must be reusable for all characters.

------------------------------------------------------------------------

# 21. MVP Visual Style

Required visual identity:

``` text
pixel-art characters
pixel-art environment
retro UI
dialogue box
glitch transitions
cinematic black screens
```

The goal is a polished **8-bit/pixel-art game feel**, not photorealism.

------------------------------------------------------------------------

# 22. MVP UI

Required reusable UI components:

``` text
TitleScreen
ProfileScreen
DialogueBox
CharacterPortrait
HUD
InteractionPrompt
ChallengePanel
ChoiceButton
FeedbackPanel
ScoreDisplay
TimerDisplay
ProgressDisplay
FinalEvaluation
```

Do not create question-specific components.

------------------------------------------------------------------------

# 23. MVP Actual Game Accessibility

The game itself should include basic accessibility:

``` text
keyboard navigation
visible focus
readable text
captions
important text equivalents
no color-only critical information
reduced-motion option where practical
```

The intentionally inaccessible appointment website is the exception
because it is the controlled learning simulation.

------------------------------------------------------------------------

# 24. MVP Controls

Desktop:

``` text
WASD / Arrow Keys
```

Interaction:

``` text
E
```

Dialogue:

``` text
Enter / Space
```

Challenge options:

``` text
Mouse
Arrow Keys
Enter
```

------------------------------------------------------------------------

# 25. MVP Final Challenge

The final challenge should combine multiple accessibility
considerations.

Example:

``` text
Design a healthcare booking interface
for users with different needs.
```

The player makes several design decisions.

The final challenge should reuse the same dynamic challenge/decision
infrastructure where practical.

------------------------------------------------------------------------

# 26. MVP Final Evaluation

Display:

``` text
DESIGN REVIEW COMPLETE
```

Then:

``` text
VISUAL
HEARING
COLOR
```

and:

``` text
OVERALL INCLUSIVITY SCORE
```

Only categories represented in the implemented content need to appear.

------------------------------------------------------------------------

# 27. MVP Ending

Final sequence:

``` text
BLACK SCREEN
 ↓
GLITCH
 ↓
USER PROFILE: KNOWN
 ↓
WHAT IF THE INTERFACE WAS DESIGNED FOR EVERYONE?
 ↓
FADE OUT
```

------------------------------------------------------------------------

# 28. MVP Content Scope

The content must be sufficient to prove the game loop.

At minimum, content should include:

``` text
Opening dialogue
Grandma dialogue
Appointment labels/instructions
Realization text
Designer introduction
Rahul dialogue + challenges
Fatima dialogue + challenges
Mira dialogue + challenges
Correct feedback
Wrong feedback
Transformation explanations
Difficulty unlock messages
Character completion dialogue
Final challenge content
Final evaluation text
Ending text
```

The authored `CONTENT.md` is the source for player-facing content.

------------------------------------------------------------------------

# 29. MVP Content Architecture

Use:

``` text
characters/
dialogue/
challenges/
transformations/
```

The exact implementation format may be:

``` text
JSON
TypeScript objects
or another structured format
```

as long as the runtime remains data-driven.

------------------------------------------------------------------------

# 30. MVP Technical Architecture

Required core systems:

``` text
ContentLoader
ChallengeRegistry
ChallengeManager
GameStateManager
CharacterManager
DialogueManager
ScoreManager
ProgressionManager
TransformationManager
SceneManager
InputManager
```

Not every system needs to be a large class.

The implementation should remain appropriate for a two-person team.

------------------------------------------------------------------------

# 31. MVP Appointment System

Required components:

``` text
AppointmentState
AppointmentTimer
AppointmentUI
AppointmentFlow
```

The timer must use elapsed time.

The appointment simulation must be isolated from the normal accessible
game UI.

------------------------------------------------------------------------

# 32. MVP Persistence

Minimum:

``` text
session state
```

Optional:

``` text
localStorage save
```

Do not build cloud accounts for the MVP.

------------------------------------------------------------------------

# 33. MVP Backend

No backend is required.

Do not add:

``` text
database
real authentication
real medical APIs
real appointment APIs
```

unless the project requirements explicitly change.

------------------------------------------------------------------------

# 34. MVP Assets

Required:

``` text
player sprite
Rahul sprite
Fatima sprite
Mira sprite
basic city tiles
developer room tiles
NPC portraits
basic UI assets
appointment website assets
sound effects
background music
```

Placeholder assets are acceptable during development.

For the final demo, the most visible assets should be polished.

------------------------------------------------------------------------

# 35. MVP Asset Priority

If time is limited:

### Highest priority

``` text
Player
NPCs
City
Developer room
Appointment website
Challenge UI
Dialogue UI
```

### Medium priority

``` text
Animations
Extra props
Additional environments
Advanced particles
```

### Low priority

``` text
Decorative NPCs
Large environment
Complex background animation
```

------------------------------------------------------------------------

# 36. MVP Audio

Minimum:

``` text
background music
button sounds
dialogue sounds
correct answer sound
wrong answer sound
glitch sound
```

Important information must never depend on audio alone.

------------------------------------------------------------------------

# 37. MVP Performance

Target:

``` text
smooth browser gameplay
stable frame rate
fast scene transitions
minimal loading
```

Avoid:

``` text
huge textures
unnecessary libraries
large unoptimized assets
continuous expensive effects
```

------------------------------------------------------------------------

# 38. MVP Testing

Before demo:

``` text
[ ] Game boots.
[ ] Profile works.
[ ] Opening sequence works.
[ ] Grandma dialogue works.
[ ] Appointment timer works.
[ ] Appointment success works.
[ ] Appointment timeout works.
[ ] Both paths reach realization.
[ ] City loads.
[ ] NPC interaction works.
[ ] Multiple challenges load.
[ ] Easy works.
[ ] Medium unlocks.
[ ] Hard unlocks.
[ ] Wrong answers retry.
[ ] Correct answers score.
[ ] Transformations appear.
[ ] Character progress updates.
[ ] Multiple characters work.
[ ] Final challenge works.
[ ] Final evaluation works.
[ ] Ending works.
[ ] Game can restart cleanly.
```

------------------------------------------------------------------------

# 39. MVP Demo Path

The safest hackathon demonstration path:

``` text
OPENING
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
MULTIPLE EASY CHALLENGES
 ↓
MEDIUM UNLOCK
 ↓
INTERFACE TRANSFORMATIONS
 ↓
SECOND CHARACTER
 ↓
FINAL CHALLENGE
 ↓
FINAL SCORE
```

The demo should show that the system is not limited to two questions.

------------------------------------------------------------------------

# 40. MVP Demo Priority

If the team has limited time, prioritize in this order:

``` text
1. Core gameplay loop
2. Dynamic multiple-challenge system
3. Appointment realization sequence
4. One polished city
5. Character dialogue
6. Interface transformations
7. Difficulty progression
8. Final evaluation
9. Extra polish
```

------------------------------------------------------------------------

# 41. Explicitly Out of MVP

The following should NOT block the MVP:

``` text
Multiplayer
Online accounts
Cloud saves
Real appointment APIs
AI-generated questions at runtime
Voice assistant
Speech recognition
Large open world
Procedural city generation
Complex inventory
Combat system
Character customization
Leaderboards
Advanced analytics
```

These may be future features.

------------------------------------------------------------------------

# 42. Future Scope

Potential future additions:

``` text
More characters
More accessibility categories
Language/localization
Expert difficulty
More cities
Dynamic scenario generation
Team mode
Leaderboards
Teacher dashboard
Designer analytics
Accessibility scoring dashboard
Real-world design case studies
```

These are not required for the hackathon MVP.

------------------------------------------------------------------------

# 43. MVP Scope Boundary

When deciding whether a feature belongs in MVP, ask:

> Does this directly improve the core loop of experiencing a barrier →
> understanding a user → making a design decision → seeing the interface
> improve?

If not, it should probably be deferred.

------------------------------------------------------------------------

# 44. MVP Definition of Done

The MVP is complete when a judge can sit down and experience:

``` text
"What if the interface wasn't designed for you?"
        ↓
frustrating interface
        ↓
realization
        ↓
designer role
        ↓
city
        ↓
person with an accessibility need
        ↓
multiple design challenges
        ↓
correct decision
        ↓
interface changes
        ↓
score/progress
        ↓
harder challenges
        ↓
final design evaluation
```

without the developers manually controlling the game.

------------------------------------------------------------------------

# 45. Final MVP Principle

The MVP should prove one thing clearly:

> **Inclusive design is not a feature you add after building the
> interface. It is a design decision you make before the barrier
> exists.**

The game demonstrates this through:

``` text
EXPERIENCE
    ↓
EMPATHY
    ↓
DESIGN
    ↓
CONSEQUENCE
    ↓
LEARNING
```

And it must remain:

> **a real 8-bit/pixel-art game --- not an MCQ website wearing a game
> skin.**
