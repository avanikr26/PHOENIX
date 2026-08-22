# CODE FURY — IMPLEMENTATION GAPS & GAMEPLAY PATCH

## Status

**Purpose:** This document is an implementation patch for the existing Code Fury project specifications.

> **FREEZE ART. FIX GAMEPLAY.**

The existing visual design is considered final for this implementation pass.

Do not redesign the city, characters, color palette, atmosphere, or existing UI aesthetic.

This file exists to tell the coding agent exactly what gameplay/narrative functionality must be present and how it integrates with the existing project.

---

# 1. AUTHORITY AND SCOPE

This document takes precedence only for the missing gameplay requirements described below.

It does **not** replace:

- `GAME_DESIGN.md`
- `GAMEPLAY_ALGORITHM.md`
- `CONTENT.md`
- `UI_UX_DESIGN.md`
- `ARCHITECTURE.md`
- `MVP_SCOPE.md`
- `PRD.md`
- `PROJECT_STRUCTURE.md`
- `TECH_STACK.md`
- `API_SPEC.md`
- `SECURITY.md`
- `PERFORMANCE.md`
- `CHALLENGE_CONTENT_STRUCTURE.md`

If an existing specification already defines something correctly, preserve it.

If an existing implementation already works, do not rewrite it merely for style.

If two specifications conflict, this document resolves the conflict only for the gameplay requirements explicitly stated here.

---

# 2. VISUAL DESIGN IS FROZEN

Do NOT:

- redesign the city
- replace the current pixel-art style
- convert the exploration world to 3D
- introduce Roblox-style graphics
- redesign characters
- introduce a new visual identity
- replace the existing UI aesthetic
- add unrelated HUD systems

The existing visual shell is now treated as the final presentation layer.

The implementation work is:

```text
STORY
+
CINEMATICS
+
INTERACTION
+
QUESTIONS
+
SCORING
+
DIFFICULTY
+
WEBSITE STATE
+
PROGRESSION
```

---

# 3. REQUIRED COMPLETE GAME FLOW

The actual game flow must be:

```text
CINEMATIC INTRO
        ↓
PROTAGONIST ROOM
        ↓
GRANDMOTHER CALL
        ↓
APPOINTMENT TASK
        ↓
BAD WEBSITE CHALLENGE
        ↓
30-SECOND TIMER
        ↓
SUCCESS OR FAILURE
        ↓
REFLECTION SEQUENCE
        ↓
ENTER CITY
        ↓
EXPLORE
        ↓
MEET NPC
        ↓
NPC-SPECIFIC SCENARIO
        ↓
NPC-SPECIFIC QUESTION
        ↓
ANSWER
        ↓
FEEDBACK
        ↓
SCORE UPDATE
        ↓
WEBSITE IMPROVEMENT
        ↓
NEXT NPC
        ↓
NEW QUESTION
        ↓
NEW IMPROVEMENT
        ↓
DIFFICULTY PROGRESSION
        ↓
LEVEL COMPLETE
```

This is not optional.

---

# 4. CINEMATIC INTRODUCTION

## Scene 1 — Black Screen

Start on a black screen.

Use subtle ambient audio.

Display:

> WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

Hold long enough to read.

Then use a subtle glitch transition.

The player should not be dropped immediately into the accessibility challenge.

---

# 5. PROTAGONIST ROOM

Show the protagonist as a young beginner developer/designer.

He is:

- seated at a laptop/computer
- in his room
- looking at his computer
- clearly established as a developer/designer

The scene must feel like a narrative moment, not a loading screen.

Allow:

- character animation
- ambient room animation
- dialogue timing
- subtle sound

Do not rush directly into the next screen.

---

# 6. GRANDMOTHER SCENE

Grandmother calls the protagonist.

Required narrative purpose:

> The protagonist initially assumes helping her will be easy.

Example:

**Grandmother**

> "Can you help me book a doctor's appointment for tomorrow at 4?"

**Protagonist**

> "Yeah, sure. I'll help you."

The exact wording may be polished through `CONTENT.md`, but the narrative meaning must remain.

Grandmother has a visual impairment.

---

# 7. BAD WEBSITE CHALLENGE

The protagonist opens the intentionally inaccessible appointment website.

This is an actual gameplay scene.

It must not:

- disappear automatically
- be a static image
- immediately transition
- advance because the player clicked anywhere

Show:

> **YOUR TASK**  
> Book a doctor's appointment for tomorrow at 4:00 PM.

Then:

> **YOU HAVE 30 SECONDS.**

Provide an explicit:

> **START CHALLENGE**

Only after the player presses `START CHALLENGE` does the timer begin.

---

# 8. BAD WEBSITE INTERACTION

The website intentionally contains accessibility/usability failures.

Possible failures:

- tiny buttons
- poor contrast
- confusing navigation
- unclear labels
- bad information hierarchy
- difficult-to-find information
- color-only communication
- confusing form fields
- poor readability
- unclear feedback
- awkward interaction targets
- inaccessible controls

The website must be frustrating **for a reason**.

It should create the player's reaction:

> "Why is this so difficult?"

Do not make it randomly impossible.

The failures must correspond to real accessibility principles that the player later learns to correct.

---

# 9. TIMER RULE

Timer:

```text
30 seconds
```

Timer starts only when:

```text
START CHALLENGE
```

is activated.

The challenge ends only when:

```text
appointment successfully completed
OR
timer reaches 0
```

Do not end the challenge because the player clicked the screen.

---

# 10. SUCCESS PATH FOR INITIAL WEBSITE

If the player completes the appointment within 30 seconds:

Show:

> **YOUR APPOINTMENT IS CONFIRMED.**

Then trigger the realization.

Example internal voice:

> "Wait."

> "If this is frustrating me..."

> "...what must it feel like for someone who actually depends on accessibility?"

Then continue into the reflection sequence.

The exact wording can be refined in `CONTENT.md`.

---

# 11. FAILURE PATH FOR INITIAL WEBSITE

If the timer reaches 0 before completion:

Do not simply jump to the city.

Use:

```text
BLACK SCREEN
        ↓
pause
        ↓
YOU DIDN'T FAIL.
        ↓
glitch
        ↓
THE INTERFACE DID.
        ↓
pause
        ↓
Imagine facing this every day.
        ↓
For someone with a disability, this isn't a challenge.
        ↓
It's a barrier.
        ↓
Now let's understand why.
```

This sequence is a core narrative beat.

It must remain in the game.

---

# 12. NO RANDOM PROGRESSION

Remove progression caused by arbitrary screen clicks.

Use explicit controls:

```text
START CHALLENGE
CONTINUE
NEXT
ENTER CITY
ANSWER
CONFIRM
```

Gameplay screens advance based on actual state.

Examples:

```text
Website → complete task OR timeout
Question → select answer
NPC conversation → dialogue progression
Level → all required challenges completed
```

A generic `onClick -> nextScene()` pattern must not control the whole game.

---

# 13. CITY ENTRY

After the reflection sequence:

> ENTER ACCESS CITY

The player enters the existing pixel-art city.

**Do not redesign the city as part of this implementation patch.**

The player can now explore.

---

# 14. MULTIPLE NPC SYSTEM

The city must contain multiple accessibility scenarios.

Minimum conceptual set:

| NPC | Accessibility Need | Core Concept |
|---|---|---|
| Rahul | Visual impairment | semantic labels, screen-reader support, readable controls |
| Fatima | Hearing impairment | captions/subtitles and visual alternatives |
| Color-blind character | Color-vision deficiency | don't rely on color alone |
| Motor-access character | Motor difficulty | larger targets, keyboard alternatives, reduced precision |
| Cognitive/reading character | Cognitive/reading difficulty | clear hierarchy, simple language, predictable flow |

Names and exact character details should come from the project's content system.

---

# 15. EVERY NPC NEEDS UNIQUE CONTENT

This is mandatory.

Do NOT create:

```text
Rahul → same MCQ
Fatima → same MCQ
Color-blind NPC → same MCQ
```

Instead:

```text
NPC
↓
unique scenario
↓
unique question
↓
unique answer choices
↓
unique accessibility principle
↓
unique website modification
```

The question bank must be data-driven.

---

# 16. EXAMPLE — RAHUL

Accessibility need:

> Visual impairment

Scenario:

> Rahul is trying to complete the payment page.

Question:

> Which change would make this page more accessible?

Choices:

```text
A. Make buttons smaller
B. Add proper labels and screen-reader-friendly controls
C. Add more colors
D. Hide instructions
```

Correct:

```text
B
```

The implementation should load this from challenge content rather than hardcoding it directly inside the UI component.

---

# 17. EXAMPLE — FATIMA

Accessibility need:

> Hearing impairment

Scenario:

> Fatima is watching a tutorial explaining how to use the website.

Question:

> What should the developer add?

Choices:

```text
A. Background music
B. Smaller text
C. Captions/subtitles
D. Faster animation
```

Correct:

```text
C
```

---

# 18. EXAMPLE — COLOR VISION

Scenario:

> A warning is communicated only through red and green.

Question:

> What should be changed?

Choices:

```text
A. Use only color
B. Add text/icons in addition to color
C. Remove all warnings
D. Make the colors brighter
```

Correct:

```text
B
```

These are examples only.

The real question bank should contain multiple questions per accessibility category.

---

# 19. MULTIPLE QUESTIONS PER LEVEL

There must be **multiple questions across multiple levels**.

This is NOT:

```text
Rahul = one question
Fatima = one question
```

Required model:

```text
EASY
 ├── Scenario 1
 ├── Scenario 2
 ├── Scenario 3
 └── Scenario 4+

MEDIUM
 ├── Scenario 1
 ├── Scenario 2
 ├── Scenario 3
 └── Scenario 4+

HARD
 ├── Scenario 1
 ├── Scenario 2
 ├── Scenario 3
 └── Scenario 4+
```

Questions should be selected from the content/question bank.

Do not show the same fixed sequence every time unless the level design intentionally requires it.

---

# 20. WEBSITE EVOLUTION

The bad website introduced in the beginning is the conceptual website the player progressively improves.

Initial:

```text
WEBSITE VERSION 0
```

Bad accessibility.

After a correct answer:

```text
WEBSITE VERSION 1
```

Apply that accessibility improvement.

After another:

```text
WEBSITE VERSION 2
```

Apply the next improvement.

Continue:

```text
VERSION 0
↓
VERSION 1
↓
VERSION 2
↓
VERSION 3
↓
...
```

The player must be able to visually perceive that their design decisions are improving the interface.

---

# 21. ACCESSIBILITY IMPROVEMENT STATE

Represent improvements as explicit state.

Example:

```js
websiteImprovements: {
  semanticLabels: false,
  captions: false,
  colorIndependentIndicators: false,
  largerTargets: false,
  simplifiedLayout: false,
  readableTypography: false,
  keyboardAlternative: false
}
```

The exact implementation can follow the existing architecture.

The important principle:

> A correct answer changes persistent game state.

---

# 22. SCORE

Start:

```text
SCORE: 0
```

Correct answer:

```text
+100
```

Wrong answer:

```text
+0
```

Walking:

```text
+0
```

Meeting an NPC:

```text
+0
```

Random clicks:

```text
+0
```

The score represents accessibility decision-making ability.

Do not award points merely for progressing through animations.

---

# 23. WRONG ANSWER

Wrong answers must not silently advance.

Show concise educational feedback.

Example:

> **Not quite.**

Then:

> Color alone should not communicate important information because users with color-vision deficiencies may not distinguish the colors.

Then allow appropriate progression.

Wrong answer:

```text
score += 0
```

---

# 24. CORRECT ANSWER

Correct answer flow:

```text
ANSWER
↓
ACCESSIBILITY IMPROVED
↓
+100
↓
UPDATE SCORE
↓
APPLY WEBSITE CHANGE
↓
CONTINUE
```

Feedback should make the player understand that they made a real design decision.

---

# 25. DIFFICULTY

Three levels:

```text
EASY
MEDIUM
HARD
```

## EASY

- obvious accessibility barriers
- straightforward questions
- beginner-friendly concepts
- strong distractor separation

## MEDIUM

- subtler barriers
- multiple plausible answers
- more complex scenarios
- combined considerations

## HARD

- realistic design decisions
- multiple accessibility concerns
- trade-offs
- ambiguous real-world situations
- reasoning rather than recognition

Difficulty must change actual content complexity.

Do not simply change the label.

---

# 26. LEVEL PROGRESSION

Recommended progression:

```text
EASY
↓
complete required challenges
↓
MEDIUM UNLOCKED
↓
complete required challenges
↓
HARD UNLOCKED
↓
complete final challenges
↓
GAME COMPLETE
```

Use the existing project progression architecture if already present.

---

# 27. GAME STATE

The game state must explicitly track at minimum:

```text
currentScene
currentNPC
currentDifficulty
currentQuestion
score
correctAnswers
wrongAnswers
timerState
badWebsiteState
websiteImprovements
NPCsEncountered
NPCsCompleted
levelCompletion
progressionStage
```

Do not use visible UI screens as the source of truth.

---

# 28. CONTENT DATA MODEL

Questions should be content data, not UI code.

Conceptual structure:

```js
{
  id: "visual-001",
  difficulty: "easy",
  npcId: "rahul",
  accessibilityNeed: "visual",
  scenario: "...",
  question: "...",
  options: [
    "...",
    "...",
    "...",
    "..."
  ],
  correctOption: 1,
  explanation: "...",
  improvement: "semanticLabels"
}
```

The existing `CHALLENGE_CONTENT_STRUCTURE.md` / `CONTENT.md` should be reused if they already define a compatible structure.

Do not create a competing content format unnecessarily.

---

# 29. WEBSITE DATA MODEL

Conceptually:

```js
{
  version: 0,
  improvements: [],
  completedActions: []
}
```

When a question is answered correctly:

```text
question.improvement
        ↓
website state
        ↓
website renders improved version
```

The UI should derive from state.

---

# 30. REQUIRED WEBSITE PROGRESSION EXAMPLE

Initial website:

```text
tiny text
poor contrast
unclear labels
color-only states
small targets
confusing hierarchy
```

After visual-accessibility improvement:

```text
readable labels
better text sizing
semantic control labels
screen-reader-friendly structure
```

After hearing-accessibility improvement:

```text
captions
visual notifications
text alternatives
```

After color-accessibility improvement:

```text
icons + labels
not color alone
```

After motor-accessibility improvement:

```text
larger targets
less precision required
keyboard alternatives
```

After cognitive-accessibility improvement:

```text
simpler hierarchy
clear instructions
predictable flow
```

---

# 31. SUCCESS STATE

When all required challenges for a level are completed:

```text
LEVEL COMPLETE
```

Then:

> YOU DID IT.

Then:

> You didn't just fix a website.

Then:

> You learned to design for people who were previously left out.

Show:

```text
FINAL SCORE
```

Example:

```text
750 / 1000
```

Then show the next difficulty unlock where applicable.

---

# 32. ACCEPTANCE TEST

The implementation is not complete unless:

- [ ] Cinematic black-screen opening exists.
- [ ] "WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?" appears.
- [ ] Protagonist is shown in his room.
- [ ] Protagonist is shown using his computer.
- [ ] Grandmother calls him.
- [ ] Appointment task is established.
- [ ] Bad website is an actual playable challenge.
- [ ] START CHALLENGE exists.
- [ ] Timer starts only after START CHALLENGE.
- [ ] Timer is 30 seconds.
- [ ] Website contains intentional accessibility failures.
- [ ] Challenge ends only on success or timeout.
- [ ] Failure reflection sequence exists.
- [ ] "YOU DIDN'T FAIL." appears.
- [ ] "THE INTERFACE DID." appears.
- [ ] Reflection explains barrier vs challenge.
- [ ] Player enters existing city.
- [ ] Multiple NPCs exist.
- [ ] NPCs represent different accessibility needs.
- [ ] Every NPC has different scenarios.
- [ ] There are multiple questions, not one question per NPC.
- [ ] Questions exist across Easy, Medium and Hard.
- [ ] Questions come from a data-driven question bank.
- [ ] Correct answers increase score.
- [ ] Score starts at 0.
- [ ] Wrong answers give 0 points.
- [ ] Wrong answers provide educational feedback.
- [ ] Correct answers provide positive feedback.
- [ ] Correct answers trigger website improvements.
- [ ] Website improvements persist.
- [ ] Difficulty genuinely changes challenge complexity.
- [ ] Level completion exists.
- [ ] Final score exists.
- [ ] Existing visual design remains unchanged.

---

# 33. IMPLEMENTATION ORDER

Implement in this order to reduce integration risk:

```text
1. Game state / progression
2. Cinematic intro
3. Protagonist room sequence
4. Grandmother dialogue
5. Bad website challenge state
6. 30-second timer
7. Success/failure detection
8. Reflection sequence
9. City entry
10. NPC interaction
11. Question bank
12. Question UI
13. Answer evaluation
14. Scoring
15. Website improvement state
16. Dynamic website rendering
17. Difficulty progression
18. Level completion
19. Integration testing
```

Do not start by redesigning visuals.

---

# 34. EXISTING FILE INTEGRATION MAP

Use the existing files rather than creating parallel specifications.

| Existing File | Action |
|---|---|
| `GAMEPLAY_ALGORITHM.md` | Integrate/modify only if the current flow does not include this complete loop |
| `CONTENT.md` | Add the actual cinematic dialogue, NPC scenarios and question bank |
| `CHALLENGE_CONTENT_STRUCTURE.md` | Reuse for question data; extend only if required |
| `GAME_DESIGN.md` | Keep as the high-level game identity |
| `PRD.md` | Keep as product-level requirements |
| `MVP_SCOPE.md` | Ensure the required gameplay is within MVP |
| `UI_UX_DESIGN.md` | Add only missing gameplay UI states if required |
| `ARCHITECTURE.md` | Extend only where new state systems need architectural definition |
| `PROJECT_STRUCTURE.md` | Add files only when implementation genuinely requires them |
| `TECH_STACK.md` | Do not change unless an actual missing dependency is required |
| `API_SPEC.md` | No changes expected for client-side gameplay unless the existing architecture requires an API |
| `SECURITY.md` | No gameplay redesign |
| `PERFORMANCE.md` | Preserve existing performance constraints |

---

# 35. NEW FILE POLICY

Do not create ten overlapping markdown files just because ten concepts exist.

The existing documentation already contains much of the project's structure.

Create a new `.md` file only when:

1. the concept is genuinely missing,
2. it cannot reasonably be covered by an existing file,
3. it will be directly useful to implementation.

This patch itself is intended to act as the implementation gap specification.

---

# 36. FINAL COMMAND

> **Inspect the existing project documentation and implementation first.**
>
> **Freeze the visual design.**
>
> **Do not redesign the city, characters, UI aesthetic, or art style.**
>
> Implement the missing narrative and gameplay:
>
> ```text
> cinematic intro
> → protagonist room
> → grandmother
> → bad website
> → 30-second challenge
> → reflection
> → city
> → multiple NPCs
> → unique scenarios
> → multiple questions
> → scoring
> → feedback
> → website improvements
> → Easy
> → Medium
> → Hard
> → completion
> ```
>
> The most important gameplay relationship is:
>
> **PERSON → ACCESSIBILITY PROBLEM → QUESTION → DESIGN DECISION → WEBSITE IMPROVEMENT**
>
> Do not reduce the game to two MCQs.
>
> Do not reduce each NPC to one question.
>
> Do not make questions static UI placeholders.
>
> Do not make the score decorative.
>
> Do not make the website improvement decorative.
>
> **The player's answers must actually change the state of the website and the game.**
