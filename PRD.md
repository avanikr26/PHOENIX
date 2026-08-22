# PRD.md --- Inclusive Interface

# 1. Product Overview

**Product Name:** Inclusive Interface\
**Product Type:** Educational narrative game\
**Primary Platform:** Desktop web / browser-based prototype\
**Primary Audience:** Developers, UI/UX designers, students, and digital
product creators\
**Hackathon:** Code Fury --- Inclusive Digital Experiences

## Product Summary

Inclusive Interface is a narrative RPG and interactive simulation that
teaches inclusive digital design through gameplay.

The player first experiences a deliberately inaccessible website while
attempting to book a doctor's appointment. After the player struggles
with the interface, the game reveals its central message:

> **YOU DIDN'T FAIL.**\
> **BUT THE INTERFACE DID.**

The player then becomes a digital product designer in a fictional city.
They explore the city, meet people with different accessibility needs,
understand their problems through natural conversations, and make design
decisions that improve digital interfaces.

The product is designed to create **empathy through experience**, rather
than teaching accessibility only through definitions or lectures.

------------------------------------------------------------------------

# 2. Problem Statement

Many digital products are designed around an assumed "average" user.

Developers and designers may know that accessibility is important, but
they often do not experience the barriers created by:

-   Small text
-   Poor contrast
-   Tiny interaction targets
-   Missing captions
-   Color-only communication
-   Poor keyboard navigation
-   Confusing layouts
-   Complex language
-   Excessive cognitive load
-   Missing semantic labels

This creates a gap between:

**How developers think an interface works**

and

**How different users actually experience it.**

The product addresses this gap by letting players experience
inaccessible design and then practice solving accessibility problems.

------------------------------------------------------------------------

# 3. Product Vision

Create a game that makes players think:

> **"Who might struggle with the interface I am designing?"**

The game should make accessibility feel like a practical design
responsibility rather than an optional feature.

------------------------------------------------------------------------

# 4. Product Goals

## Primary Goals

### G1 --- Create Empathy Through Gameplay

Let players experience the frustration caused by inaccessible design.

### G2 --- Teach Practical Accessibility

Teach players to identify common accessibility barriers and select
appropriate design solutions.

### G3 --- Demonstrate Cause and Effect

Show how a design decision changes a user's experience.

### G4 --- Make Accessibility Memorable

Use narrative, gameplay, and emotional moments rather than textbook
explanations.

### G5 --- Deliver a Strong Hackathon Demo

The core concept should be understandable within a few minutes of
gameplay.

------------------------------------------------------------------------

# 5. Non-Goals

The product is **not** intended to:

-   Replace accessibility testing tools.
-   Replace professional accessibility audits.
-   Diagnose disabilities.
-   Simulate every real-world disability perfectly.
-   Act as an assistive technology product.
-   Teach complete professional accessibility standards in one game.
-   Build a massive open-world RPG for the MVP.

The game is an educational simulation.

------------------------------------------------------------------------

# 6. Target Users

## Persona 1 --- Student Developer

**Profile:** Computer science student learning web development.

**Problem:** Knows basic UI development but has little experience
designing for accessibility.

**Goal:** Understand how accessibility affects real users.

**Expected outcome:** Begins considering accessibility during
development.

------------------------------------------------------------------------

## Persona 2 --- Junior UI/UX Designer

**Profile:** Early-career designer.

**Problem:** Understands visual design but may overlook accessibility.

**Goal:** Learn how design decisions affect different users.

**Expected outcome:** Can recognize common accessibility barriers.

------------------------------------------------------------------------

## Persona 3 --- Hackathon Participant

**Profile:** Developer/design student participating in a technology
competition.

**Problem:** Needs a quick, engaging way to understand inclusive design.

**Goal:** Learn through an interactive experience.

**Expected outcome:** Understands the project's central message quickly.

------------------------------------------------------------------------

# 7. Core User Journey

``` text
START GAME
    ↓
BLACK SCREEN
    ↓
"WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?"
    ↓
SIGN UP
    ↓
DEVELOPER'S ROOM
    ↓
GRANDMA REQUESTS DOCTOR APPOINTMENT
    ↓
INACCESSIBLE APPOINTMENT WEBSITE
    ↓
30-SECOND TASK
    ↓
FRUSTRATION / FAILURE OR SUCCESS
    ↓
"YOU DIDN'T FAIL."
    ↓
"BUT THE INTERFACE DID."
    ↓
PLAYER BECOMES DIGITAL PRODUCT DESIGNER
    ↓
CITY EXPLORATION
    ↓
MEET USERS
    ↓
UNDERSTAND THEIR NEED
    ↓
ACCESSIBILITY CHALLENGE
    ↓
MAKE DESIGN DECISION
    ↓
INTERFACE CHANGES
    ↓
SCORE
    ↓
MORE USERS
    ↓
HIGHER DIFFICULTY
    ↓
FINAL DESIGN CHALLENGE
    ↓
ACCESSIBILITY REPORT
```

------------------------------------------------------------------------

# 8. Core Gameplay Loop

``` text
EXPLORE
  ↓
DISCOVER
  ↓
TALK
  ↓
UNDERSTAND
  ↓
DESIGN
  ↓
DECIDE
  ↓
IMPROVE
  ↓
SCORE
  ↓
EXPLORE AGAIN
```

The player should spend most of the main game moving through the world,
talking to users, and making design decisions.

------------------------------------------------------------------------

# 9. MVP Scope

The MVP should be a polished vertical slice.

## Required

-   Opening cinematic
-   First-time sign-up
-   Developer room
-   Grandma interaction
-   Appointment task
-   Intentionally inaccessible website
-   30-second timer
-   Success/failure outcomes
-   "You didn't fail. The interface did." sequence
-   Digital product designer transition
-   Small explorable city
-   At least 3 accessibility-focused characters
-   Dialogue system
-   Multiple-choice challenge system
-   Correct/incorrect feedback
-   Interface improvement mechanic
-   Score system
-   Accessibility category score
-   Easy and Medium difficulty
-   Final evaluation screen

## Optional

-   Hard difficulty
-   More characters
-   More city locations
-   Save system
-   Character customization
-   Adaptive learning
-   Voice acting
-   Multiple endings
-   Full accessibility analytics

------------------------------------------------------------------------

# 10. Functional Requirements

## FR-01 --- Game Start

The player must be able to start the game and see the opening sequence.

### Acceptance Criteria

-   Black screen appears.
-   System text animates.
-   Glitch transition occurs.
-   Main statement appears.
-   Player can continue to sign-up.

------------------------------------------------------------------------

# 11. FR-02 --- Player Registration

The game must allow first-time players to enter basic information.

### Required

-   Player name
-   Username or display name

### Acceptance Criteria

-   Data is validated.
-   Player profile is created.
-   Player enters the opening scene.

------------------------------------------------------------------------

# 12. FR-03 --- Opening Narrative

The game must introduce the protagonist as a young developer.

### Acceptance Criteria

-   Player enters developer's room.
-   Grandma initiates dialogue.
-   Grandma requests a doctor's appointment.
-   Required appointment time is tomorrow at 4 PM.
-   Player receives the task.

------------------------------------------------------------------------

# 13. FR-04 --- Inaccessible Website Simulation

The game must contain a deliberately inaccessible simulated appointment
interface.

### Required barriers

At least four should be present in the MVP:

-   Small text
-   Poor contrast
-   Tiny clickable areas
-   Confusing hierarchy
-   Poor CAPTCHA
-   Color-only information
-   Confusing labels
-   Excessive cognitive load

### Acceptance Criteria

The player can attempt the appointment task.

------------------------------------------------------------------------

# 14. FR-05 --- 30-Second Challenge

The appointment task must have a 30-second time limit.

### Acceptance Criteria

-   Timer is visible.
-   Timer counts down.
-   Player can interact with the website.
-   Timer reaches zero if the player does not finish.
-   Game handles success and failure.
-   Both outcomes converge to the realization scene.

------------------------------------------------------------------------

# 15. FR-06 --- Narrative Realization

The game must display:

> **YOU DIDN'T FAIL.**

followed by:

> **BUT THE INTERFACE DID.**

### Acceptance Criteria

The sequence works regardless of whether the player succeeded or failed
the appointment task.

------------------------------------------------------------------------

# 16. FR-07 --- City Exploration

After the opening, the player enters a fictional city.

### Required

-   Player movement
-   Interactive NPCs
-   Basic environment
-   At least three accessible challenge locations or encounters

------------------------------------------------------------------------

# 17. FR-08 --- NPC Dialogue

The game must support interactive character conversations.

### Dialogue requirements

Each dialogue entry should support:

-   Character name
-   Text
-   Portrait
-   Expression where available
-   Next dialogue
-   Optional choice

Dialogue must sound conversational.

It should not read like a textbook.

------------------------------------------------------------------------

# 18. FR-09 --- Accessibility Characters

The MVP should include at least three characters representing different
accessibility considerations.

Recommended:

### Rahul

Visual accessibility.

Possible barriers:

-   Poor labels
-   Small text
-   Poor structure
-   Unclear controls

### Fatima

Hearing accessibility.

Possible barriers:

-   Audio-only information
-   Missing captions
-   Sound-only notifications

### Third Character

Color vision, motor, cognitive, or language accessibility.

The final implementation should prioritize variety.

------------------------------------------------------------------------

# 19. FR-10 --- Accessibility Challenge

After interacting with a character, the player must receive a design
challenge.

Example:

> Rahul cannot tell what several controls do.

Question:

> **What would you change?**

The player selects one of several options.

------------------------------------------------------------------------

# 20. FR-11 --- Decision Validation

The game must determine whether the player's answer is appropriate.

### Correct

-   Award points.
-   Explain the principle briefly.
-   Modify the interface.

### Incorrect

-   Explain why the solution does not address the barrier.
-   Allow retry where appropriate.
-   Apply a small or no penalty depending on difficulty.

------------------------------------------------------------------------

# 21. FR-12 --- Interface Transformation

Correct decisions must have a visible effect.

Example:

``` text
BEFORE

[ ? ] [ ? ] [ ? ]

AFTER

[ BOOK ] [ EDIT ] [ CANCEL ]
```

The transformation is important because it connects learning with visual
evidence.

------------------------------------------------------------------------

# 22. FR-13 --- Score System

The game must track:

-   Total score
-   Correct answers
-   Incorrect answers
-   First-attempt successes
-   Accessibility category scores

Recommended points:

``` text
Correct answer          +100
First attempt bonus      +25
Efficient solution       +10
Extra barrier            +25
```

------------------------------------------------------------------------

# 23. FR-14 --- Accessibility Categories

Track progress across:

-   Visual
-   Hearing
-   Motor
-   Cognitive
-   Color vision
-   Language

The MVP may use fewer categories if development time is limited.

------------------------------------------------------------------------

# 24. FR-15 --- Difficulty

The game should support:

### Easy

One obvious barrier.

### Medium

Multiple interacting barriers.

### Hard

Indirect clues and more complex decisions.

The MVP may initially implement Easy and Medium.

------------------------------------------------------------------------

# 25. FR-16 --- Final Evaluation

At the end of the prototype, display an accessibility report.

Example:

``` text
DESIGN REPORT

VISUAL       92%
HEARING      88%
MOTOR        84%
COGNITIVE    90%
LANGUAGE     87%

OVERALL      88%
```

The report should summarize the player's decisions.

------------------------------------------------------------------------

# 26. Narrative Requirements

The game must maintain a consistent emotional arc.

### Beginning

The player thinks:

> "Why is this website so frustrating?"

### Middle

The player realizes:

> "Other people may experience this every day."

### End

The player thinks:

> "I need to consider different users when I design."

------------------------------------------------------------------------

# 27. Dialogue Requirements

Dialogue should be:

-   Short
-   Natural
-   Character-specific
-   Conversational
-   Emotionally believable
-   Contextual

Avoid long explanations.

### Example

**RAHUL:**

> "I can find the button."

**PLAYER:**

> "Then what's wrong?"

**RAHUL:**

> "I don't know what it does."

The accessibility principle can then be explained in the challenge
feedback.

------------------------------------------------------------------------

# 28. Visual Requirements

The game should use:

-   Pixel-art characters
-   Pixel-art environments
-   Retro UI
-   Dialogue panels
-   Character portraits
-   Glitch transitions
-   Subtle animation
-   Strong visual hierarchy

The game should feel cohesive.

------------------------------------------------------------------------

# 29. Audio Requirements

The MVP should support:

-   Background music
-   Basic sound effects
-   Dialogue transition sounds
-   Timer sound
-   Interaction sounds
-   Glitch effects

Voice acting is optional.

All important spoken/audio information should have text alternatives in
the actual game.

------------------------------------------------------------------------

# 30. Accessibility Requirements for the Game Itself

The game must not intentionally reproduce inaccessible design outside
the simulation.

### Required where technically feasible

-   Readable text
-   Good contrast
-   Captions/subtitles
-   Non-color-only indicators
-   Keyboard support
-   Clear focus/selection states
-   Adjustable text size
-   Reduced motion option
-   Adjustable timing for non-critical gameplay
-   Clear navigation

The deliberately inaccessible website must be isolated as a teaching
simulation.

------------------------------------------------------------------------

# 31. Non-Functional Requirements

## Performance

The game should run smoothly on normal student/hackathon laptops.

## Reliability

The main demo flow should complete without crashes.

## Maintainability

Dialogue, characters, challenges, and scoring should be data-driven
where practical.

## Scalability

New characters and scenarios should be addable without rewriting the
core game systems.

## Responsiveness

UI should adapt to the target browser/window size.

------------------------------------------------------------------------

# 32. Technical Architecture Requirements

The exact framework can be selected separately, but the implementation
should conceptually separate:

``` text
GAME STATE
    ↓
SCENE MANAGEMENT
    ↓
PLAYER / NPC SYSTEMS
    ↓
DIALOGUE SYSTEM
    ↓
CHALLENGE SYSTEM
    ↓
ACCESSIBILITY DATA
    ↓
UI
    ↓
SCORING
```

Keep content separate from game logic where practical.

------------------------------------------------------------------------

# 33. Suggested Data Models

## Character

``` text
id
name
personality
accessibility_category
portrait
dialogue
challenge_ids
```

## Challenge

``` text
id
character_id
category
scenario
question
options
correct_answer
explanation
points
interface_changes
```

## Player State

``` text
name
score
category_scores
completed_challenges
current_scene
difficulty
```

------------------------------------------------------------------------

# 34. Error Handling

The application should handle:

-   Missing assets
-   Missing dialogue
-   Invalid challenge data
-   Invalid answer IDs
-   Missing scene references
-   Save/progression errors

The game should not crash because one optional asset is missing.

Development errors should be logged clearly.

------------------------------------------------------------------------

# 35. Security & Privacy

For the MVP:

-   Do not collect unnecessary personal information.
-   Do not collect sensitive disability information from players.
-   If registration data is stored, use only what is necessary.
-   Avoid sending player data to external services unless explicitly
    required.
-   Do not require real personal information to play.

------------------------------------------------------------------------

# 36. Success Metrics

The project should be evaluated using:

### Gameplay

-   Player completes the opening.
-   Player understands the task.
-   Player can complete accessibility challenges.

### Learning

After playing, the player should be able to identify common
accessibility barriers.

### Engagement

The player should want to continue exploring the city.

### Hackathon

Judges should understand the innovation within the first few minutes.

------------------------------------------------------------------------

# 37. Hackathon Demo Acceptance Criteria

A successful demo should show:

1.  Cinematic opening.
2.  Clear problem statement.
3.  Inaccessible website simulation.
4.  30-second challenge.
5.  Emotional realization.
6.  Transition to designer role.
7.  City exploration.
8.  Character interaction.
9.  Accessibility challenge.
10. Correct design decision.
11. Visible interface improvement.
12. Score increase.

If these twelve elements work, the core MVP is successful.

------------------------------------------------------------------------

# 38. Priority Matrix

## P0 --- Must Work

-   Opening
-   Sign-up
-   Developer room
-   Grandma scene
-   Appointment website
-   Timer
-   Realization
-   City
-   NPC dialogue
-   Accessibility challenge
-   Answer validation
-   Interface change
-   Score

## P1 --- Should Work

-   Multiple characters
-   Multiple categories
-   Difficulty
-   Accessibility report
-   Save state
-   More locations

## P2 --- Nice to Have

-   Voice acting
-   Character customization
-   Adaptive learning
-   Multiple endings
-   Full city
-   Advanced analytics
-   Multiplayer

------------------------------------------------------------------------

# 39. MVP Definition of Done

The MVP is complete when a new player can:

-   Start the game.
-   Understand the opening.
-   Complete or fail the appointment challenge.
-   See the realization sequence.
-   Enter the city.
-   Meet at least three users.
-   Understand their problems through dialogue.
-   Answer accessibility challenges.
-   See interfaces change.
-   Earn score.
-   Reach the final evaluation.
-   Complete the full demo without crashes.

------------------------------------------------------------------------

# 40. Product Principles

### Principle 1

**Experience before explanation.**

### Principle 2

**People are not the problem. Design can be.**

### Principle 3

**Accessibility is part of product quality.**

### Principle 4

**Every user has a context.**

### Principle 5

**Good design removes unnecessary friction.**

### Principle 6

**The game should teach without feeling like a lecture.**

------------------------------------------------------------------------

# 41. Final Product Statement

> **Inclusive Interface is a narrative RPG that makes developers
> experience inaccessible design first-hand, then challenges them to
> build digital experiences that work for people with different needs.**

The product succeeds when the player finishes the game with one question
in their head:

# **"Who did I design this for?"**
