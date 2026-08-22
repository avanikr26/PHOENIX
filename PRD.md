# PRD.md --- Inclusive Interface

# 1. Product Requirements Document

**Product Name:** Inclusive Interface

**Product Type:** Browser-based educational game

**Genre:** Narrative RPG + Visual Novel + Interactive Design Simulation

**Visual Direction:** 8-bit / pixel-art / retro RPG with cinematic
glitch transitions

**Primary Audience:** Developers, designers, students, product teams,
and digital creators

**Primary Goal:**

> Help players understand inclusive digital design by letting them
> experience inaccessible interfaces, meet users with different needs,
> make design decisions, and see the consequences of those decisions.

------------------------------------------------------------------------

# 2. Problem Statement

Millions of people experience barriers when using digital products
because interfaces are often designed around an assumed "average" user.

Common barriers include:

``` text
visual barriers
hearing barriers
motor barriers
cognitive barriers
color-vision barriers
language barriers
low digital literacy
```

The conventional response is often to add accessibility features after
the main product has already been designed.

The deeper problem is that many developers and designers do not
personally experience these barriers and may not understand how
seemingly small design choices affect different users.

There is therefore a gap between:

``` text
People who build digital products
              ↕
People who experience digital barriers
```

**Inclusive Interface** addresses this gap through simulation and
gameplay.

------------------------------------------------------------------------

# 3. Product Vision

Create an experience where players do not merely read about
accessibility.

They:

``` text
experience
    ↓
question
    ↓
understand
    ↓
design
    ↓
see the consequence
    ↓
learn
```

The player should finish the game thinking:

> **"I should design for different users from the beginning, not add
> accessibility at the end."**

------------------------------------------------------------------------

# 4. Product Concept

The player begins as a young developer.

They receive a simple task:

> Help grandma book a doctor's appointment for tomorrow at 4 PM.

The player has 30 seconds to use an intentionally frustrating,
inaccessible simulated website.

After the experience:

> YOU DIDN'T FAIL.

Then:

> BUT THE INTERFACE DID.

The player becomes a digital product designer in a fictional city.

They meet people with different accessibility needs and solve interface
challenges.

Each correct design decision can visibly improve a simulated interface.

The player earns score, progresses through difficulty levels, and
eventually faces a final inclusive design challenge.

------------------------------------------------------------------------

# 5. Product Differentiation

The product does **not** attempt to be:

``` text
Alexa
screen reader
speech-to-text tool
accessibility browser extension
accessibility testing website
```

Instead, it targets the **designer/developer mindset**.

The core proposition is:

> **Teach the people who create digital interfaces to recognize and
> remove barriers before those barriers reach users.**

------------------------------------------------------------------------

# 6. Target Users

## Primary Users

### Developers

People who build websites, applications, and digital services.

### UI/UX Designers

People who make decisions about:

``` text
layout
navigation
controls
typography
color
interaction
information hierarchy
```

### Students

Students learning:

``` text
web development
UI/UX
human-computer interaction
software engineering
product design
```

### Product Teams

Teams who want a simple interactive way to discuss inclusive design.

------------------------------------------------------------------------

# 7. Secondary Audience

The game can also be used by:

``` text
hackathon judges
teachers
design educators
technology clubs
developers learning accessibility
general users interested in inclusive technology
```

------------------------------------------------------------------------

# 8. User Persona

## Example Player

``` text
Age: 18–30
Role: student / junior developer / designer
Technical knowledge: beginner to intermediate
Accessibility knowledge: low to moderate
```

The player may know how to build an interface but may not think
systematically about accessibility.

The game is designed to create that shift.

------------------------------------------------------------------------

# 9. User Journey

The intended journey is:

``` text
OPEN GAME
   ↓
"WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?"
   ↓
PROFILE
   ↓
DEVELOPER ROOM
   ↓
GRANDMA REQUEST
   ↓
30-SECOND APPOINTMENT
   ↓
FRUSTRATION
   ↓
REALIZATION
   ↓
DIGITAL DESIGNER ROLE
   ↓
CITY
   ↓
MEET USERS
   ↓
MAKE DESIGN DECISIONS
   ↓
SEE INTERFACE CHANGE
   ↓
GAIN SCORE
   ↓
UNLOCK HARDER CHALLENGES
   ↓
FINAL DESIGN CHALLENGE
   ↓
EVALUATION
   ↓
REFLECTION
```

------------------------------------------------------------------------

# 10. Functional Requirements

## FR-01 --- Opening Experience

The system must display the opening sequence:

``` text
SYSTEM INITIALIZING...
USER PROFILE: UNKNOWN
WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
```

with glitch/cinematic transitions.

------------------------------------------------------------------------

# 11. FR-02 --- Profile Setup

The player must be able to enter:

``` text
Name
Username
```

No real authentication is required for MVP.

The data is used for local personalization only.

------------------------------------------------------------------------

# 12. FR-03 --- Developer Introduction

The player must enter a developer room and experience the opening
narrative.

The room must contain at least:

``` text
player
laptop
desk
basic environmental props
```

------------------------------------------------------------------------

# 13. FR-04 --- Grandma Interaction

The player must interact with grandma through dialogue.

Required task:

> Book a doctor's appointment for tomorrow at 4 PM.

------------------------------------------------------------------------

# 14. FR-05 --- Appointment Simulation

The system must provide a fictional appointment interface.

The interface must intentionally contain accessibility barriers such as:

``` text
tiny text
poor contrast
tiny click targets
confusing hierarchy
unclear labels
bad CAPTCHA
color-only indicators
weak error messaging
```

The simulation must be clearly separated from the actual game UI.

------------------------------------------------------------------------

# 15. FR-06 --- Appointment Timer

The player receives:

``` text
30 seconds
```

to complete the appointment task.

The timer must use elapsed-time calculation.

If time expires:

``` text
TIME'S UP.
```

The player continues into the narrative.

------------------------------------------------------------------------

# 16. FR-07 --- Appointment Success

If the player completes the task:

``` text
YOUR APPOINTMENT IS CONFIRMED
```

The player continues into the realization sequence.

------------------------------------------------------------------------

# 17. FR-08 --- Realization Sequence

Both appointment outcomes must converge into:

``` text
YOU DIDN'T FAIL.

BUT THE INTERFACE DID.
```

This is a required narrative moment.

------------------------------------------------------------------------

# 18. FR-09 --- Designer Role

The player must transition from developer to:

> **DIGITAL PRODUCT DESIGNER**

The game explains:

> You're hired to build digital services for a fictional city.

> The city has thousands of users with different needs.

> Your job is to design interfaces that let everyone complete their
> tasks.

------------------------------------------------------------------------

# 19. FR-10 --- City Exploration

The player must be able to explore a small pixel-art city.

The MVP requires:

``` text
player movement
NPC locations
interaction prompts
simple environment
```

A large open world is not required.

------------------------------------------------------------------------

# 20. FR-11 --- Characters

The MVP should include at least:

``` text
Rahul — visual accessibility
Fatima — hearing accessibility
Mira — color-vision accessibility
```

The architecture must support adding more characters.

------------------------------------------------------------------------

# 21. FR-12 --- Character Dialogue

Each character must have narrative dialogue before or around their
challenges.

Dialogue should feel natural and character-driven.

It must not read like a textbook definition of a disability.

------------------------------------------------------------------------

# 22. FR-13 --- Multiple Challenges

This is a **critical product requirement**.

The game must support:

``` text
multiple challenges per character
```

It must NOT be designed as:

``` text
Rahul → one question
Fatima → one question
```

or:

``` text
Rahul → two questions
Fatima → two questions
```

The number of challenges must come from content data.

Example:

``` text
Rahul
 ├── Easy 01
 ├── Easy 02
 ├── Easy 03
 ├── Medium 01
 ├── Medium 02
 ├── Hard 01
 └── Hard 02
```

The system must continue working if additional challenges are added.

------------------------------------------------------------------------

# 23. FR-14 --- Dynamic Challenge Loading

Challenges must be loaded from structured content.

The runtime flow is:

``` text
Content
 ↓
ContentLoader
 ↓
ChallengeRegistry
 ↓
ChallengeManager
 ↓
Dynamic Challenge UI
```

The UI must not contain hardcoded question text.

------------------------------------------------------------------------

# 24. FR-15 --- Challenge Structure

Each challenge must support:

``` text
ID
character ID
difficulty
accessibility category
scenario
question
options
correct option
explanation
points
optional transformations
```

------------------------------------------------------------------------

# 25. FR-16 --- Dynamic Options

The challenge UI must generate answer choices from the challenge data.

It must not assume a specific question or fixed text.

The implementation should support varying option counts.

------------------------------------------------------------------------

# 26. FR-17 --- Answer Evaluation

The system must:

``` text
receive selected option ID
compare with correct option ID
return correct/incorrect
```

The UI must not contain the correct answer.

------------------------------------------------------------------------

# 27. FR-18 --- Wrong Answer

A wrong answer must:

``` text
show supportive feedback
allow retry
preserve challenge state
```

The game must not shame the player.

------------------------------------------------------------------------

# 28. FR-19 --- Correct Answer

A correct answer must:

``` text
show positive feedback
award points
mark challenge complete
apply configured transformation(s)
update character progress
check progression/unlocks
```

------------------------------------------------------------------------

# 29. FR-20 --- Interface Transformations

Correct decisions should visibly improve a simulated interface.

Examples:

``` text
unlabeled icon
→ descriptive label

audio-only alert
→ audio + visual/text alert

color-only status
→ icon + text + color

tiny target
→ larger target
```

The exact transformation is defined by challenge content.

------------------------------------------------------------------------

# 30. FR-21 --- Scoring

The system must track:

``` text
overall score
category score
```

Minimum scoring:

``` text
correct answer → points
```

Optional:

``` text
first-attempt bonus
efficiency bonus
```

------------------------------------------------------------------------

# 31. FR-22 --- Difficulty Levels

The game must contain:

``` text
Easy
Medium
Hard
```

### Easy

Clear accessibility barrier.

### Medium

Less obvious or contextual barrier.

### Hard

Complex scenario, trade-off, or multiple accessibility considerations.

------------------------------------------------------------------------

# 32. FR-23 --- Difficulty Unlocks

Progression must support:

``` text
Easy
 ↓
Medium
 ↓
Hard
```

Unlock conditions must be data/state-driven.

Do not hardcode:

``` text
"question 3 unlocks Medium"
```

------------------------------------------------------------------------

# 33. FR-24 --- Character Progress

The system must track:

``` text
challenge completion
attempts
difficulty progress
character completion
```

Example:

``` text
Rahul

Easy   3/3
Medium 2/3
Hard   0/3
```

------------------------------------------------------------------------

# 34. FR-25 --- Final Challenge

After sufficient progression, the player must encounter a final
multi-decision design challenge.

The challenge should combine multiple accessibility considerations.

Example:

> Design a healthcare service that can be used by people with different
> needs.

The player should make several decisions rather than answer one
definition question.

------------------------------------------------------------------------

# 35. FR-26 --- Final Evaluation

The system must display:

``` text
DESIGN REVIEW COMPLETE
```

and show:

``` text
category scores
overall inclusivity score
```

Only relevant categories need to be displayed.

------------------------------------------------------------------------

# 36. FR-27 --- Ending

The game must end with a narrative reflection.

Required visual direction:

``` text
black screen
glitch
USER PROFILE: KNOWN
WHAT IF THE INTERFACE WAS DESIGNED FOR EVERYONE?
```

------------------------------------------------------------------------

# 37. Non-Functional Requirements

## NFR-01 --- Performance

The game should:

``` text
load quickly
maintain stable browser performance
avoid unnecessary scene reloads
reuse assets and UI
```

------------------------------------------------------------------------

# 38. NFR-02 --- Accessibility

The actual game interface must provide:

``` text
keyboard support
visible focus
captions
readable text
text alternatives for important information
no color-only critical information
reduced-motion support where practical
```

The intentionally inaccessible appointment simulation is the controlled
exception.

------------------------------------------------------------------------

# 39. NFR-03 --- Maintainability

The architecture must support:

``` text
new characters
new challenges
new categories
new transformations
new dialogue
new difficulty content
```

without rewriting the core gameplay engine.

------------------------------------------------------------------------

# 40. NFR-04 --- Data-Driven Content

Player-facing content must live in structured data.

Do not place large amounts of:

``` text
question text
dialogue
answers
explanations
```

inside components or gameplay services.

------------------------------------------------------------------------

# 41. NFR-05 --- Browser Compatibility

The MVP targets modern desktop browsers.

Primary target:

``` text
Chrome
Edge
Firefox
```

The game should target a common desktop resolution such as:

``` text
1280 × 720
```

or larger.

------------------------------------------------------------------------

# 42. NFR-06 --- Security

The MVP should not require sensitive information.

Do not store:

``` text
real medical information
real appointment information
passwords
API secrets
private keys
```

The appointment system is entirely fictional.

------------------------------------------------------------------------

# 43. NFR-07 --- Privacy

Profile data should be minimal:

``` text
name
username
```

If local storage is used, treat it as user-controlled data.

No unnecessary analytics or personally identifiable information is
required for the MVP.

------------------------------------------------------------------------

# 44. NFR-08 --- Reliability

The player must be able to:

``` text
start
play
restart
complete
```

without requiring developer intervention.

The hackathon demo must not depend on manual content injection.

------------------------------------------------------------------------

# 45. Data Model Requirements

Minimum entities:

``` text
Character
DialogueNode
Challenge
ChallengeOption
Transformation
GameState
ChallengeProgress
CharacterProgress
ScoreReport
```

------------------------------------------------------------------------

# 46. Character Data

Conceptually:

``` ts
{
  id,
  name,
  category,
  dialogueId,
  challengePoolId
}
```

------------------------------------------------------------------------

# 47. Challenge Data

Conceptually:

``` ts
{
  id,
  characterId,
  difficulty,
  category,
  scenario,
  question,
  options,
  correctOption,
  explanation,
  points,
  interfaceChanges
}
```

------------------------------------------------------------------------

# 48. Game State

Conceptually:

``` ts
{
  player,
  currentScene,
  currentCharacterId,
  currentChallengeId,
  currentDifficulty,
  score,
  categoryScores,
  completedChallenges,
  challengeAttempts,
  characterProgress,
  unlockedDifficulties,
  discoveredCharacters,
  gameCompleted
}
```

------------------------------------------------------------------------

# 49. Core User Stories

## US-01

**As a player, I want to experience a frustrating interface so that I
understand how inaccessible design can feel.**

Acceptance:

``` text
30-second appointment simulation works.
```

------------------------------------------------------------------------

## US-02

**As a player, I want to understand why the interface was frustrating so
that I question my assumptions.**

Acceptance:

``` text
"You didn't fail. But the interface did." appears.
```

------------------------------------------------------------------------

## US-03

**As a player, I want to meet people with different needs so that I
understand accessibility from their perspective.**

Acceptance:

``` text
NPCs have dialogue and accessibility-related scenarios.
```

------------------------------------------------------------------------

## US-04

**As a player, I want multiple challenges so that I can practice
accessibility decisions rather than answer one question and leave.**

Acceptance:

``` text
Each character supports multiple challenge records.
```

------------------------------------------------------------------------

## US-05

**As a player, I want challenges to become harder so that the game
continues to test my understanding.**

Acceptance:

``` text
Easy → Medium → Hard.
```

------------------------------------------------------------------------

## US-06

**As a player, I want to see the result of my design decision so that I
understand why it matters.**

Acceptance:

``` text
Correct answer can trigger visible interface transformation.
```

------------------------------------------------------------------------

## US-07

**As a player, I want feedback when I make mistakes so that I can learn
instead of simply being told I am wrong.**

Acceptance:

``` text
Wrong answers provide explanation and retry.
```

------------------------------------------------------------------------

## US-08

**As a player, I want to see my progress so that I know how much of the
design challenge I have completed.**

Acceptance:

``` text
Character and difficulty progress are visible.
```

------------------------------------------------------------------------

## US-09

**As a player, I want a final challenge so that I can apply what I
learned across multiple accessibility considerations.**

Acceptance:

``` text
Final challenge contains multiple design decisions.
```

------------------------------------------------------------------------

# 50. User Story --- Content Author

**As a content author, I want to add a new challenge without changing
gameplay code.**

Acceptance:

``` text
Adding a valid challenge record makes it available to ChallengeManager.
```

------------------------------------------------------------------------

# 51. User Story --- Developer

**As a developer, I want reusable systems so that adding characters and
challenges does not create duplicated code.**

Acceptance:

``` text
One challenge engine
One challenge UI
One scoring system
One progression system
```

------------------------------------------------------------------------

# 52. User Story --- Judge

**As a hackathon judge, I want to understand the innovation quickly.**

Within the demo, the judge should see:

``` text
inaccessible interface
 ↓
realization
 ↓
designer role
 ↓
NPC
 ↓
multiple challenge decisions
 ↓
interface transformation
```

------------------------------------------------------------------------

# 53. Product Constraints

The project has:

``` text
two-person development team
hackathon time constraint
browser delivery
limited asset-production time
limited testing time
```

Therefore:

> Prefer a small polished experience over a huge incomplete game.

------------------------------------------------------------------------

# 54. Scope Priorities

Priority order:

``` text
P0 — Core gameplay
P1 — Dynamic challenge system
P2 — Narrative/presentation
P3 — Visual polish
P4 — Optional expansion
```

------------------------------------------------------------------------

# 55. P0 --- Core Gameplay

Must work:

``` text
opening
appointment simulation
realization
city
NPC interaction
challenge system
multiple challenges
answer evaluation
score
progression
final challenge
ending
```

------------------------------------------------------------------------

# 56. P1 --- Dynamic Systems

Must work:

``` text
content loading
challenge registry
dynamic challenge selection
dynamic options
multiple difficulty levels
character progress
transformations
```

------------------------------------------------------------------------

# 57. P2 --- Narrative

Must work:

``` text
dialogue
portraits
glitch transitions
character personalities
narrative feedback
```

------------------------------------------------------------------------

# 58. P3 --- Visual Polish

If time allows:

``` text
better animations
particles
environmental effects
additional props
advanced transitions
additional sound design
```

------------------------------------------------------------------------

# 59. P4 --- Future Expansion

Not required:

``` text
multiplayer
cloud saves
leaderboards
AI-generated challenges
real accessibility auditing
real appointment APIs
voice assistant
speech recognition
large open world
```

------------------------------------------------------------------------

# 60. Success Metrics

For the hackathon MVP, success means:

### Gameplay

A judge can complete the core loop without developer intervention.

### Technical

New challenges can be added through content data without rewriting the
challenge engine.

### Educational

A player can explain at least some accessibility principles after
playing.

### Emotional

The appointment simulation creates the intended realization.

### Visual

The game is immediately recognizable as a polished pixel-art/8-bit
experience.

------------------------------------------------------------------------

# 61. Acceptance Criteria --- Complete MVP

The MVP is accepted when:

``` text
[ ] Opening sequence works.
[ ] Profile setup works.
[ ] Developer room works.
[ ] Grandma dialogue works.
[ ] Appointment simulation works.
[ ] 30-second timer works.
[ ] Intentionally inaccessible barriers are present.
[ ] Success path works.
[ ] Timeout path works.
[ ] Both paths reach the realization.
[ ] Designer introduction works.
[ ] City is explorable.
[ ] NPCs can be interacted with.
[ ] Dialogue system works.
[ ] Multiple challenges per character work.
[ ] Challenge content loads dynamically.
[ ] Options load dynamically.
[ ] Answers are evaluated correctly.
[ ] Wrong answers can be retried.
[ ] Correct answers update score.
[ ] Transformations work.
[ ] Character progress works.
[ ] Medium/Hard progression works.
[ ] Final challenge works.
[ ] Final evaluation works.
[ ] Ending works.
[ ] Game can restart cleanly.
```

------------------------------------------------------------------------

# 62. Critical Anti-Requirement

The product must **not** become:

``` text
a static quiz
```

The following is explicitly rejected:

``` text
NPC
 ↓
one MCQ
 ↓
NPC
 ↓
one MCQ
 ↓
END
```

The required experience is:

``` text
NARRATIVE
 ↓
EXPLORATION
 ↓
MULTIPLE CHALLENGES
 ↓
DESIGN DECISIONS
 ↓
VISIBLE CONSEQUENCES
 ↓
PROGRESSION
 ↓
HARDER CHALLENGES
 ↓
FINAL DESIGN TEST
```

------------------------------------------------------------------------

# 63. Final Product Principle

The product exists to communicate one core idea:

> **Accessibility is not an extra feature. It is part of good design.**

The game makes that idea playable.

The player should leave with the mindset:

> **"Before I ask whether my interface works for me, I should ask who I
> designed it for."**
