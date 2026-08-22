# MVP_SCOPE.md --- Inclusive Interface

# 1. Purpose

This document defines the **Minimum Viable Product (MVP)** for Inclusive
Interface.

The MVP is not the complete game.

It is a **polished vertical slice** that proves the central innovation:

> **Let the player experience inaccessible design first, then teach them
> to design for different users.**

The MVP must be small enough for a two-person hackathon team to build,
test, and reliably demonstrate.

------------------------------------------------------------------------

# 2. MVP Goal

The MVP must demonstrate the complete core loop:

``` text
EXPERIENCE BAD DESIGN
        ↓
REALIZE THE PROBLEM
        ↓
BECOME A DESIGNER
        ↓
MEET A USER
        ↓
UNDERSTAND THEIR NEED
        ↓
MAKE A DESIGN DECISION
        ↓
SEE THE INTERFACE IMPROVE
        ↓
EARN SCORE
```

If this loop works smoothly, the MVP succeeds.

------------------------------------------------------------------------

# 3. MVP Player Experience

A new player should be able to start the game without prior explanation
and experience this sequence:

``` text
BLACK SCREEN
      ↓
"What if the interface wasn't designed for you?"
      ↓
SIGN UP
      ↓
DEVELOPER ROOM
      ↓
GRANDMA REQUEST
      ↓
DOCTOR APPOINTMENT TASK
      ↓
30-SECOND INACCESSIBLE WEBSITE
      ↓
FRUSTRATION
      ↓
"YOU DIDN'T FAIL."
      ↓
"BUT THE INTERFACE DID."
      ↓
DIGITAL PRODUCT DESIGNER
      ↓
CITY
      ↓
MEET USER
      ↓
DIALOGUE
      ↓
ACCESSIBILITY CHALLENGE
      ↓
DESIGN DECISION
      ↓
INTERFACE IMPROVES
      ↓
SCORE
      ↓
FINAL EVALUATION
```

------------------------------------------------------------------------

# 4. MVP Feature Tiers

## P0 --- Must Have

These features are required for the MVP to be considered functional.

-   Opening sequence
-   Sign-up
-   Developer room
-   Grandma interaction
-   Doctor appointment task
-   Intentionally inaccessible appointment website
-   30-second timer
-   Success/failure handling
-   "You didn't fail. The interface did." sequence
-   Digital designer transition
-   Small explorable city
-   At least 3 accessibility-focused NPCs
-   Dialogue system
-   Accessibility challenge system
-   Multiple-choice answers
-   Correct/incorrect feedback
-   Visible interface transformation
-   Score system
-   Final accessibility evaluation

------------------------------------------------------------------------

## P1 --- Should Have

Implement these if the P0 experience is stable.

-   Easy difficulty
-   Medium difficulty
-   Accessibility category scores
-   More than one challenge per NPC
-   More city locations
-   More environmental interactions
-   Basic progression/unlocking
-   Save/progress state
-   More interface transformations

------------------------------------------------------------------------

## P2 --- Nice to Have

Only implement after P0 and P1 are stable.

-   Hard difficulty
-   Adaptive learning
-   Character customization
-   Voice acting
-   Multiple endings
-   Large city
-   Advanced statistics
-   Full localization
-   Multiplayer
-   Online accounts
-   Analytics dashboard

------------------------------------------------------------------------

# 5. P0 --- Opening Sequence

## Objective

Immediately communicate the game's theme.

### Required sequence

``` text
BLACK
 ↓
SYSTEM INITIALIZING...
 ↓
USER PROFILE: UNKNOWN
 ↓
GLITCH
 ↓
WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
 ↓
SIGN UP TO EXPERIENCE
```

### Requirements

-   Black opening screen.
-   Text typing animation.
-   Subtle glitch effect.
-   Strong typography.
-   Smooth transition into sign-up.

### Not Required

-   Complex cinematic animation.
-   Voice-over.
-   3D effects.

------------------------------------------------------------------------

# 6. P0 --- Sign-Up

## Objective

Give the player a basic identity before entering the story.

### Required fields

-   Display name
-   Username

Optional:

-   Avatar/name preference

### Acceptance Criteria

-   Player can enter data.
-   Invalid empty input is handled.
-   Player can continue.
-   Player name is available to the game state.

### Scope Limit

Do not build a real authentication system for the MVP.

A local/in-memory profile is sufficient.

------------------------------------------------------------------------

# 7. P0 --- Developer Room

## Objective

Introduce the protagonist before the accessibility lesson begins.

### Environment

Minimum:

-   Desk
-   Laptop
-   Chair
-   Bed
-   Window
-   Basic room decoration

### Player interaction

The player can:

-   Move around.
-   Inspect a few objects.
-   Interact with the laptop.
-   Trigger the grandma scene.

The room does not need to be large.

------------------------------------------------------------------------

# 8. P0 --- Grandma Scene

## Objective

Create the first human story interaction.

### Required dialogue

The conversation should establish:

-   Grandma needs a doctor appointment.
-   Appointment is required for tomorrow.
-   Time is 4 PM.

Example:

**GRANDMA:**

> "Can you book a doctor's appointment for me?"

**PLAYER:**

> "Sure. For when?"

**GRANDMA:**

> "Tomorrow. Four in the evening."

**PLAYER:**

> "Okay. Give me a minute."

The conversation should remain short and natural.

------------------------------------------------------------------------

# 9. P0 --- Appointment Website

## Objective

Create the first hands-on accessibility experience.

The website is deliberately inaccessible.

### Required barriers

Implement at least four:

1.  Small text
2.  Poor contrast
3.  Tiny click targets
4.  Confusing hierarchy
5.  Poor CAPTCHA
6.  Color-only information
7.  Confusing labels
8.  Cognitive overload

The MVP does not need every barrier.

------------------------------------------------------------------------

# 10. P0 --- 30-Second Challenge

## Objective

Create controlled frustration.

### Task

> **Book a doctor's appointment for tomorrow at 4 PM.**

### Timer

``` text
30
29
28
...
01
00
```

### Requirements

-   Timer starts when the challenge begins.
-   Player can interact with the simulated website.
-   Success can occur before the timer expires.
-   Failure occurs when the timer reaches zero.
-   Both outcomes lead to the same narrative realization.

### Important

The challenge must be difficult because of the **bad interface**, not
because the intended task is unclear.

------------------------------------------------------------------------

# 11. P0 --- Realization Scene

This is one of the most important parts of the MVP.

After success or failure:

``` text
BLACK SCREEN

YOU DIDN'T FAIL.

GLITCH

BUT THE INTERFACE DID.
```

This sequence must be polished.

### Purpose

The player should understand:

> The user is not necessarily the problem.

The design can be the barrier.

------------------------------------------------------------------------

# 12. P0 --- Designer Transition

The player is told:

> **YOU ARE NOW A DIGITAL PRODUCT DESIGNER.**

Then:

> "You're hired to build digital services for a fictional city."

The city loads.

This is the transition from:

**Experiencing accessibility problems**

to:

**Solving accessibility problems.**

------------------------------------------------------------------------

# 13. P0 --- Small City

The MVP does not need a large open world.

Create a small explorable area.

### Recommended layout

``` text
          HOSPITAL
             |
      NPC --- PLAZA --- NPC
             |
          DESIGN HUB
             |
           HOME
```

The actual layout can change based on the chosen game engine.

### Minimum requirements

-   Player movement
-   Collision
-   At least 3 interactable NPCs
-   At least 2 environmental objects
-   Basic background ambience

------------------------------------------------------------------------

# 14. P0 --- NPCs

Minimum:

## NPC 1 --- Rahul

Category:

**Visual accessibility**

Potential problems:

-   Poor labels
-   Small text
-   Unclear controls
-   Poor structure

------------------------------------------------------------------------

## NPC 2 --- Fatima

Category:

**Hearing accessibility**

Potential problems:

-   Audio-only information
-   Missing captions
-   Sound-only notifications

------------------------------------------------------------------------

## NPC 3 --- Choose One

Recommended:

**Color vision**

Potential problems:

-   Color-only states
-   Red/green indicators
-   Color-only charts

Alternative:

-   Motor accessibility
-   Cognitive accessibility
-   Language barrier

------------------------------------------------------------------------

# 15. P0 --- Dialogue System

The dialogue system needs only the functionality required for the MVP.

### Minimum capabilities

-   Display character name
-   Display dialogue text
-   Display character portrait
-   Advance dialogue
-   Support basic branching choice
-   Trigger challenge
-   Trigger scene transition

### Example

``` text
RAHUL

"I can find the button."

PLAYER

"Then what's the problem?"

RAHUL

"I don't know what it does."
```

Then:

``` text
DESIGN DECISION REQUIRED
```

------------------------------------------------------------------------

# 16. P0 --- Accessibility Challenge

Each NPC should trigger one primary challenge.

### Challenge structure

``` text
NPC PROBLEM
 ↓
QUESTION
 ↓
3–4 OPTIONS
 ↓
PLAYER DECISION
 ↓
FEEDBACK
 ↓
INTERFACE CHANGE
 ↓
SCORE
```

------------------------------------------------------------------------

# 17. P0 --- Rahul Challenge

Example:

> Rahul can find the controls, but cannot understand what several
> unlabeled controls do.

Question:

> **What should you change?**

Options:

``` text
A. Add more colors
B. Add clear descriptive labels
C. Add more animation
D. Hide the controls
```

Correct:

**B**

Feedback:

> **GOOD DESIGN.**

Then:

``` text
BEFORE

[ ? ] [ ? ] [ ? ]

AFTER

[ BOOK ] [ EDIT ] [ CANCEL ]
```

------------------------------------------------------------------------

# 18. P0 --- Fatima Challenge

Example:

> An important announcement is only available through a loudspeaker.

Question:

> **What would make the information more accessible?**

Possible answers:

``` text
A. Increase the speaker volume
B. Add captions/text information
C. Play the sound repeatedly
D. Add more background music
```

Correct:

**B**

Feedback:

> "Important information shouldn't depend on hearing alone."

------------------------------------------------------------------------

# 19. P0 --- Third Challenge

Example for color vision:

> The website shows appointment availability using only red and green.

Question:

> **What should you change?**

Possible answers:

``` text
A. Make the red brighter
B. Make the green brighter
C. Add labels/icons alongside the colors
D. Remove all status information
```

Correct:

**C**

------------------------------------------------------------------------

# 20. P0 --- Interface Transformation

The player must see the result of a correct decision.

Example:

### Before

``` text
AVAILABLE
[GREEN]

UNAVAILABLE
[RED]
```

### After

``` text
✓ AVAILABLE

✕ UNAVAILABLE
```

Color can remain, but it must no longer be the only indicator.

------------------------------------------------------------------------

# 21. P0 --- Score

Minimum score implementation:

``` text
Correct answer: +100
First attempt: +25
```

Optional:

``` text
Fast solution: +10
```

The player should immediately see the score increase.

Example:

``` text
+100 ACCESSIBILITY
```

------------------------------------------------------------------------

# 22. P0 --- Category Score

At minimum, track:

-   Visual
-   Hearing
-   Color vision

If time allows, add:

-   Motor
-   Cognitive
-   Language

Example:

``` text
ACCESSIBILITY

VISUAL       ████████░░ 80%
HEARING      ██████████ 100%
COLOR        ███████░░░ 70%
```

------------------------------------------------------------------------

# 23. P0 --- Final Evaluation

After the MVP's main challenges, display:

# DESIGN REPORT

Example:

``` text
YOUR DESIGN

VISUAL          90%
HEARING         100%
COLOR           80%

OVERALL         90%
```

Then show the final message:

> **WHO DID YOU DESIGN FOR?**

Pause.

> **EVERYONE.**

------------------------------------------------------------------------

# 24. MVP Communication Style

The MVP must use game-like communication.

### System messages

Short:

> TASK RECEIVED

> 30 SECONDS

> DESIGN DECISION REQUIRED

> GOOD DESIGN

### Character dialogue

Natural:

> "I can find the button."

> "So what's wrong?"

> "I don't know what it does."

### Internal thoughts

Short:

> "Why is this so difficult?"

Do not replace gameplay with long educational explanations.

------------------------------------------------------------------------

# 25. MVP Visual Style

Required:

-   Pixel-art aesthetic
-   Retro game UI
-   Pixel characters
-   Dialogue boxes
-   Small animations
-   Glitch transitions

Avoid:

-   Generic corporate dashboard appearance
-   Stock illustrations
-   Excessive modern SaaS styling
-   Large blocks of explanatory text

------------------------------------------------------------------------

# 26. MVP Audio

Minimum:

-   Background music
-   Interaction sound
-   Dialogue advance sound
-   Timer sound
-   Glitch sound
-   Correct/incorrect feedback sound

Voice acting is not required.

Subtitles should be available for important spoken content.

------------------------------------------------------------------------

# 27. MVP Accessibility

The actual game should remain accessible.

Minimum:

-   Readable text
-   Adequate contrast
-   Captions/subtitles
-   No color-only game-critical information
-   Clear focus/selection state
-   Keyboard controls where feasible
-   Reduced-motion consideration

The deliberately inaccessible appointment website is an isolated
simulation.

------------------------------------------------------------------------

# 28. What Must NOT Be Built for MVP

Do not spend hackathon time on:

-   Massive open-world city
-   Multiplayer
-   Online matchmaking
-   Complex account system
-   Cloud database
-   Full voice acting
-   AI-generated NPC conversations
-   Procedural city generation
-   Advanced analytics
-   Complex inventory
-   Combat
-   Weapons
-   Character skill trees
-   Crafting
-   Real-world medical integration

These features do not strengthen the core hackathon solution.

------------------------------------------------------------------------

# 29. MVP Technical Simplification

Whenever possible, choose the simplest implementation that provides the
desired player experience.

For example:

Instead of a real backend:

> Use local game state.

Instead of real authentication:

> Use a local player profile.

Instead of a large database:

> Use static challenge data.

Instead of procedural dialogue:

> Use authored dialogue.

Instead of a large world:

> Use one small city scene.

------------------------------------------------------------------------

# 30. Two-Person Team Priority

Because the team consists of two people, split work around independent
systems.

## Developer A --- Core Game

Focus on:

-   Game setup
-   Player movement
-   Scene management
-   City
-   NPC interaction
-   Dialogue system
-   Game state

## Developer B --- Accessibility Experience

Focus on:

-   Appointment website
-   30-second challenge
-   Accessibility challenge UI
-   Question/answer system
-   Interface transformations
-   Scoring
-   Accessibility report

Both should coordinate on:

-   Narrative
-   Visual style
-   Integration
-   Final demo

The exact division can change based on individual strengths.

------------------------------------------------------------------------

# 31. Development Order

Build in this order:

## Phase 1 --- Foundation

-   Project setup
-   Player movement
-   Basic scene
-   UI system

## Phase 2 --- Opening

-   Black screen
-   Title message
-   Sign-up
-   Developer room
-   Grandma dialogue

## Phase 3 --- First Challenge

-   Appointment UI
-   Timer
-   Interaction
-   Success/failure
-   Realization scene

## Phase 4 --- Main Game

-   City
-   NPCs
-   Dialogue
-   Challenge system

## Phase 5 --- Learning Loop

-   Answers
-   Feedback
-   Interface transformation
-   Score

## Phase 6 --- Polish

-   Pixel art
-   Glitches
-   Audio
-   Animations
-   Transitions
-   Accessibility

## Phase 7 --- Demo

-   Full playthrough
-   Bug fixing
-   Performance testing
-   Final presentation flow

------------------------------------------------------------------------

# 32. MVP Testing Checklist

Before the hackathon demo, verify:

-   [ ] Game launches successfully.
-   [ ] Opening sequence works.
-   [ ] Sign-up works.
-   [ ] Player enters developer room.
-   [ ] Grandma dialogue triggers.
-   [ ] Appointment task starts.
-   [ ] 30-second timer works.
-   [ ] Inaccessible UI can be interacted with.
-   [ ] Success state works.
-   [ ] Failure state works.
-   [ ] Both outcomes reach the realization scene.
-   [ ] City loads.
-   [ ] Player can move.
-   [ ] NPCs can be interacted with.
-   [ ] Dialogue advances correctly.
-   [ ] Accessibility challenge opens.
-   [ ] Answers can be selected.
-   [ ] Correct answer is detected.
-   [ ] Incorrect answer is handled.
-   [ ] Interface visibly changes.
-   [ ] Score updates.
-   [ ] Final evaluation appears.
-   [ ] No critical console/runtime errors occur.
-   [ ] Demo can be completed without developer intervention.

------------------------------------------------------------------------

# 33. MVP Demo Script

The demo should be rehearsed around this exact story:

### Step 1

Start on black screen.

### Step 2

Show:

> **WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?**

### Step 3

Enter developer room.

### Step 4

Grandma asks for appointment.

### Step 5

Open appointment website.

### Step 6

Start 30-second timer.

### Step 7

Demonstrate frustration.

### Step 8

Show:

> **YOU DIDN'T FAIL.**

Then:

> **BUT THE INTERFACE DID.**

### Step 9

Enter city.

### Step 10

Meet Rahul.

### Step 11

Show his problem through dialogue.

### Step 12

Ask accessibility question.

### Step 13

Choose correct answer.

### Step 14

Show interface improving.

### Step 15

Show score increase.

### Step 16

Meet second NPC if time allows.

### Step 17

Show final accessibility score.

------------------------------------------------------------------------

# 34. MVP Success Criteria

The MVP is successful if judges can understand these three ideas:

### Idea 1

> **Bad interfaces can create real barriers.**

### Idea 2

> **Accessibility problems are easier to understand when experienced.**

### Idea 3

> **Developers can learn to identify and remove those barriers.**

The game does not need hundreds of levels to prove this.

A strong 5-minute vertical slice is more valuable than a large
unfinished game.

------------------------------------------------------------------------

# 35. Scope Control Rule

When deciding whether to add a feature, ask:

> **Does this feature strengthen the experience of learning inclusive
> design?**

If the answer is:

### YES

Consider it.

### MAYBE

Add it only after P0 is complete.

### NO

Do not build it during the MVP.

------------------------------------------------------------------------

# 36. Final MVP Definition

The MVP is:

> **A short, polished playable experience where the player first
> struggles with an intentionally inaccessible appointment interface,
> realizes that the interface---not the user---is the problem, then
> enters a pixel-art city and learns to improve digital interfaces for
> people with different accessibility needs through dialogue, design
> choices, visible UI transformations, and scoring.**

The MVP should prove the concept, not attempt to build the entire final
game.
