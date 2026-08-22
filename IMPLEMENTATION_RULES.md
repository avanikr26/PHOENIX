# IMPLEMENTATION_RULES.md — Inclusive Interface

## 1. Purpose

This document is the final implementation guardrail for the coding agent.

It translates the project's design intent into practical rules for implementation.

> **Do not reinterpret the game. Implement the game that has already been designed.**

Read this together with:

```text
ART_DIRECTION.md
GAME_DESIGN.md
PRD.md
MVP_SCOPE.md
GAMEPLAY_ALGORITHM.md
UI_UX_DESIGN.md
CONTENT.md
ARCHITECTURE.md
API_SPEC.md
AGENTS.md
PROJECT_STRUCTURE.md
TECH_STACK.md
SECURITY.md
PERFORMANCE.md
```

---

# 2. Highest-Priority Rule

The implementation must preserve this identity:

> **A pixel-art narrative RPG / visual-novel hybrid set in an ordinary fictional city, with expressive characters, atmospheric environments, restrained retro UI, and cinematic glitch transitions.**

It must NOT become:

```text
cyberpunk
sci-fi
neon dashboard
futuristic accessibility simulator
generic AI game
static MCQ website
fake handheld-console interface
```

If there is a choice between adding a flashy feature and preserving the intended visual identity:

> **Preserve the intended visual identity.**

---

# 3. Visual Authority

Before changing any visual or UI implementation:

```text
READ ART_DIRECTION.md
```

`ART_DIRECTION.md` is the authoritative source for visual interpretation.

Broad terms such as:

```text
retro
8-bit
glitch
game UI
HUD
```

must be interpreted according to `ART_DIRECTION.md`.

Do not independently reinterpret them.

---

# 4. Forbidden Visual Drift

Do not introduce:

```text
❌ giant futuristic HUD
❌ neon-heavy city
❌ cyan/magenta cyberpunk palette
❌ permanent console frame
❌ unnecessary energy bar
❌ unnecessary credits/currency
❌ holographic panels
❌ futuristic diagnostic displays
❌ technical sci-fi labels
❌ constant scanlines
❌ constant glitch effects
❌ random glowing rectangles
❌ sci-fi city architecture
```

If a visual element has no gameplay or narrative purpose, remove it.

---

# 5. World Implementation

The city must feel like an ordinary fictional city.

Implement:

```text
homes
streets
shops
hospital
park
bus stop
community/public locations
trees
benches
streetlights
windows
doors
signboards
```

The MVP does not need a huge open world.

Prefer:

```text
small
dense
walkable
believable
```

over:

```text
large
empty
technically impressive
```

---

# 6. NPC Placement

Characters must exist naturally inside the world.

Good:

```text
Rahul near a public service
Fatima near a bus stop
Mira near a shop
Grandma at home
```

Bad:

```text
Rahul    Fatima    Mira    Grandma
```

standing in a row like a character-selection screen.

NPC placement should support narrative discovery.

---

# 7. Character Implementation

Important characters need:

```text
distinct sprite
distinct silhouette
distinct clothing
distinct personality
idle state
walking state
dialogue state
```

Do not represent characters as simple colored blocks.

Do not use accessibility needs as visual stereotypes.

---

# 8. Dialogue Implementation

Dialogue should feel like an actual game.

Use:

```text
character portrait where appropriate
name
short dialogue lines
expression changes where useful
dialogue progression
```

Avoid long textbook paragraphs.

Bad:

> "Visual impairment is a disability that affects a person's ability to perceive visual information..."

Good:

> "Why do I have to guess what this icon means?"

Teach through:

```text
character
experience
challenge
decision
consequence
```

---

# 9. Opening Must Be Preserved

The opening sequence is required:

```text
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
DEVELOPER ROOM
```

Do not remove it for convenience.

---

# 10. Developer Room

The room should look like a believable young developer's room.

Required visual ideas:

```text
desk
laptop
chair
bed
window
books
personal objects
```

Do NOT turn it into:

```text
cyberpunk command center
server room
futuristic laboratory
```

---

# 11. Grandma Sequence

The player must experience the original narrative:

```text
Grandma asks for help
 ↓
appointment tomorrow
 ↓
4 PM
 ↓
player opens appointment service
```

Do not replace this with a generic tutorial.

---

# 12. Appointment Simulation

The appointment website is intentionally inaccessible.

It may include:

```text
tiny text
poor contrast
tiny click targets
confusing hierarchy
unclear labels
bad CAPTCHA
color-only information
weak error messages
```

But it should look like a believable ordinary website.

It should NOT become a cyberpunk terminal.

---

# 13. 30-Second Constraint

The appointment simulation must use:

```text
30 seconds
```

The timer must be based on real elapsed time.

Both outcomes are valid:

```text
completed
timeout
```

Both must continue to the realization.

---

# 14. Realization Sequence

Preserve:

```text
BLACK SCREEN

YOU DIDN'T FAIL.

BUT THE INTERFACE DID.
```

This is a major narrative moment.

Do not replace it with:

```text
GAME OVER
YOU FAILED
MISSION FAILED
```

---

# 15. Designer Transition

The player becomes:

```text
DIGITAL PRODUCT DESIGNER
```

Then enters the city.

The transition should feel like a narrative change, not a technical dashboard.

---

# 16. Core Gameplay Loop

Implementation must preserve:

```text
EXPLORE
 ↓
MEET PERSON
 ↓
DIALOGUE
 ↓
UNDERSTAND BARRIER
 ↓
DESIGN CHALLENGE
 ↓
PLAYER DECISION
 ↓
FEEDBACK
 ↓
INTERFACE TRANSFORMATION
 ↓
SCORE / PROGRESS
 ↓
NEXT CHALLENGE
```

---

# 17. Multiple Challenges Are Mandatory

Never implement the game as:

```text
Rahul → Q1 → finish
Fatima → Q1 → finish
```

or:

```text
Rahul → Q1/Q2
Fatima → Q1/Q2
```

Instead:

```text
Character
 ↓
Challenge Pool
 ↓
Multiple challenges
 ↓
Difficulty progression
```

The number of challenges comes from content data.

---

# 18. No Hardcoded Questions

Never write:

```ts
showRahulQuestion1();
showRahulQuestion2();
```

Never write:

```ts
if (questionNumber === 1) ...
```

Never write:

```ts
if (character === "rahul") {
    question = "...";
}
```

Use data-driven challenge selection.

---

# 19. Dynamic Challenge Pipeline

Use:

```text
CONTENT
 ↓
ContentLoader
 ↓
ChallengeRegistry
 ↓
ChallengeManager
 ↓
Dynamic Challenge UI
```

The UI receives challenge data.

It does not contain authored challenge content.

---

# 20. Dynamic Options

Options must come from content.

Do not hardcode:

```text
A
B
C
D
```

as specific answer text inside the UI.

Use:

```ts
options.map(option => renderOption(option))
```

The system should support varying option counts.

---

# 21. Stable IDs

Use stable identifiers:

```text
rahul
fatima
mira

rahul-visual-easy-01
rahul-visual-medium-02

add-descriptive-labels
add-captions
```

Do not use:

```text
array position
question text
display name
```

as persistent identifiers.

---

# 22. Answer Evaluation

The UI should submit:

```text
selectedOptionId
```

The gameplay system compares:

```text
selectedOptionId
vs
correctOptionId
```

Do not compare large answer strings.

---

# 23. Wrong Answer Behavior

Wrong answers should:

```text
show feedback
explain the issue
allow retry
```

Do not shame the player.

Preferred:

```text
NOT QUITE.

Think about what the user
is actually experiencing.

[TRY AGAIN]
```

---

# 24. Correct Answer Behavior

Correct answers should:

```text
award score
mark challenge complete
show feedback
apply transformation
update progress
check progression
```

---

# 25. Interface Transformations

Transformations must be data-driven.

Example:

```text
add-descriptive-labels
increase-target-size
add-text-status
add-captions
add-visual-alert
improve-error-message
```

Do not write:

```ts
if (rahulQuestion4) {
    changeButton();
}
```

Use transformation IDs.

---

# 26. Difficulty

Required:

```text
Easy
Medium
Hard
```

Easy:

```text
obvious barrier
```

Medium:

```text
less obvious barrier
```

Hard:

```text
complex or multi-factor design decision
```

Difficulty represents design complexity.

It does not represent character strength.

---

# 27. Progression

Use:

```text
Easy
 ↓
required progress
 ↓
Medium
 ↓
required progress
 ↓
Hard
```

Do not hardcode a particular question number as the unlock condition.

---

# 28. Character Progress

Track:

```text
completed challenges
attempts
difficulty progress
character completion
```

Never mark a character complete after one question unless the content data genuinely contains only one challenge.

The architecture must support many challenges.

---

# 29. Score

Score belongs to the gameplay/state layer.

The UI displays score.

The UI must not calculate score.

Track:

```text
overall score
category score
```

Optional:

```text
first-attempt bonus
efficiency bonus
```

---

# 30. Actual Game Accessibility

The actual game must be accessible.

Where practical:

```text
keyboard navigation
visible focus
captions
readable text
text alternatives
no color-only critical information
reduced motion
pause
```

The appointment website is intentionally inaccessible because it is the controlled teaching simulation.

---

# 31. UI Restraint

The UI must not overpower the game world.

Exploration should primarily show:

```text
world
player
NPCs
small interaction prompt
small optional HUD
```

The player should see the city.

Do not cover the screen with panels.

---

# 32. No Dashboardization

Do not transform the game into:

```text
score dashboard
analytics dashboard
accessibility dashboard
developer dashboard
```

The player should be playing a game.

Statistics belong in:

```text
progress screen
final evaluation
```

not everywhere.

---

# 33. No Unnecessary Features

Do not add features simply because they are technically impressive.

Do NOT add unless explicitly required:

```text
inventory
combat
multiplayer
leaderboards
cloud accounts
real authentication
real appointments
voice assistant
AI-generated questions
large open world
complex economy
energy system
credits/currency
```

---

# 34. Content Rules

Player-facing content must come from:

```text
CONTENT.md
structured content files
```

Do not replace actual content with:

```text
Question 1
Question 2
Question 3
Lorem ipsum
TODO
```

unless the content is genuinely missing and the placeholder is explicitly marked as temporary.

---

# 35. Content Expansion

Adding a new challenge should normally require:

```text
new content record
```

not a gameplay rewrite.

Adding a new character should normally require:

```text
character data
dialogue
challenge content
assets
```

not a new gameplay engine.

---

# 36. Preserve Existing Work

Before changing an existing system:

1. Inspect the current implementation.
2. Understand why it exists.
3. Check the relevant documentation.
4. Make the smallest necessary change.
5. Test the result.

Do not replace working systems with a new architecture just because it is easier to generate.

---

# 37. Do Not Overbuild

For a two-person hackathon team:

> **A polished small game is better than a huge unfinished game.**

Prioritize:

```text
core loop
visual identity
dynamic challenges
narrative
interface transformations
demo reliability
```

---

# 38. Implementation Priority

Use this order:

```text
P0
Core playable game

P1
Dynamic challenge/progression systems

P2
Narrative and presentation

P3
Visual polish

P4
Optional extras
```

Do not sacrifice P0/P1 for P4.

---

# 39. Testing

After significant changes:

```text
run tests
run type checking
run linting if configured
run build
```

At minimum verify:

```text
opening
appointment
timer
realization
city
NPC interaction
dialogue
multiple challenges
answer evaluation
retry
score
transformations
difficulty unlocks
character progress
final challenge
ending
restart
```

---

# 40. Visual QA

Before accepting a visual change, check:

```text
[ ] Does it look like a pixel-art RPG?
[ ] Does the city look ordinary and believable?
[ ] Are characters recognizable?
[ ] Is the UI restrained?
[ ] Is the scene atmospheric?
[ ] Is the visual hierarchy clear?
[ ] Is it consistent with ART_DIRECTION.md?
[ ] Did unnecessary cyberpunk elements appear?
```

If the answer to the last question is yes:

> Fix it before continuing.

---

# 41. Code Review QA

Before committing:

```text
[ ] No hardcoded question text
[ ] No hardcoded answer text
[ ] No fixed Q1/Q2/Q3 flow
[ ] No character-specific challenge engine
[ ] No fixed challenge count
[ ] No question-number-based transformations
[ ] No duplicated scoring system
[ ] No duplicated progression system
[ ] No unnecessary new dependency
[ ] No secret/API key
[ ] Build passes
```

---

# 42. Agent Behavior

The coding agent must:

```text
inspect before modifying
reuse before creating
follow the documentation
avoid assumptions
keep content data-driven
test changes
preserve the visual identity
```

The agent must NOT:

```text
invent a new game
redesign the visual identity
simplify away multiple challenges
replace the city with a dashboard
add cyberpunk styling
hardcode content
```

---

# 43. When Documentation Is Ambiguous

Use this priority:

```text
explicit latest requirement
 ↓
ART_DIRECTION.md for visuals
 ↓
CONTENT.md for player-facing content
 ↓
GAMEPLAY_ALGORITHM.md for behavior
 ↓
ARCHITECTURE.md for structure
 ↓
API_SPEC.md for contracts
 ↓
UI_UX_DESIGN.md for UI/UX
 ↓
other supporting documents
```

When the ambiguity is only visual, `ART_DIRECTION.md` wins.

---

# 44. When Something Looks "Cool"

Do not add it just because it looks cool.

Ask:

```text
Does it belong to this game?
Does it support the story?
Does it improve gameplay?
Does it match the reference?
```

If not:

> **Do not use it.**

---

# 45. Final Implementation Contract

The finished game must communicate:

```text
A PLAYER
   ↓
ENTERS A WORLD
   ↓
MEETS REALISTIC PEOPLE
   ↓
HEARS THEIR EXPERIENCES
   ↓
MAKES DESIGN DECISIONS
   ↓
SEES INTERFACES CHANGE
   ↓
LEARNS TO DESIGN FOR MORE PEOPLE
```

The implementation must preserve:

```text
PIXEL ART
+
NARRATIVE RPG
+
VISUAL NOVEL
+
ORDINARY CITY
+
HUMAN CHARACTERS
+
RESTRAINED UI
+
MULTIPLE DYNAMIC CHALLENGES
+
EASY / MEDIUM / HARD
+
VISIBLE CONSEQUENCES
+
CINEMATIC GLITCH MOMENTS
```

---

# 46. Final Non-Negotiable Rule

> **Do not turn Inclusive Interface into something you think looks impressive. Build the game the team designed.**

If the implementation looks like:

> **a retro story-driven pixel game**

you are on the right track.

If it looks like:

> **a neon cyberpunk accessibility dashboard inside a fake portable console**

stop and correct it.
