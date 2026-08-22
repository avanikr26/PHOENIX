# CHALLENGE_CONTENT_STRUCTURE.md --- Multi-Level Challenge System

# 1. Purpose

This document clarifies one of the most important gameplay requirements
of **Inclusive Interface**:

> **The game is NOT a collection of one MCQ per character.**

Rahul, Fatima, and every other user/NPC can have **multiple
accessibility challenges across multiple difficulty levels**.

The player progressively learns to identify and solve different
accessibility barriers.

------------------------------------------------------------------------

# 2. Core Challenge Structure

The game should work as:

``` text
PLAYER MEETS USER
        ↓
USER CONVERSATION
        ↓
ACCESSIBILITY PROBLEM
        ↓
MULTIPLE CHALLENGES
        ↓
PLAYER MAKES DESIGN DECISIONS
        ↓
INTERFACE CHANGES
        ↓
SCORE / PROGRESS
        ↓
NEXT CHALLENGE
```

A character is therefore a **challenge category/storyline**, not a
single question.

------------------------------------------------------------------------

# 3. Difficulty Levels

The game should contain at least:

``` text
EASY
MEDIUM
HARD
```

Possible future:

``` text
EXPERT
```

Each level should increase the complexity of the design decision.

------------------------------------------------------------------------

# 4. Easy Level

The player learns obvious accessibility principles.

Characteristics:

-   One major barrier
-   Clear scenario
-   Four options
-   One clearly best solution
-   Short explanation
-   Simple interface transformation

Example:

> Rahul cannot tell what unlabeled buttons do.

Question:

> What should you change?

Correct:

> Add clear labels.

------------------------------------------------------------------------

# 5. Medium Level

The player must reason about more than one factor.

Characteristics:

-   Less obvious barrier
-   Multiple plausible answers
-   More realistic interface
-   Possible combination of accessibility principles
-   Previous changes may not remain visible
-   Player must understand the user's actual need

Example:

> Rahul can identify a button using a screen reader, but the form's
> instructions are presented only through visual positioning.

Possible solutions may include:

-   semantic structure
-   descriptive labels
-   logical reading order
-   explicit instructions

The player must select the **best** solution for the specific problem.

------------------------------------------------------------------------

# 6. Hard Level

The player must make realistic design trade-offs.

Characteristics:

-   Multiple simultaneous barriers
-   Several plausible solutions
-   Accessibility needs may overlap
-   The player must prioritize
-   Interface changes may have consequences
-   Questions should test design reasoning rather than memorization

Example:

> A booking page uses color, icons, tiny controls, unclear labels, and a
> time-sensitive interaction.

The player may need to identify which change provides the greatest
accessibility improvement first.

------------------------------------------------------------------------

# 7. Multiple Questions Per Character

Each major NPC should have a challenge set.

Example:

``` text
RAHUL
│
├── Easy
│   ├── RAHUL-V-01
│   ├── RAHUL-V-02
│   └── RAHUL-V-03
│
├── Medium
│   ├── RAHUL-V-04
│   ├── RAHUL-V-05
│   └── RAHUL-V-06
│
└── Hard
    ├── RAHUL-V-07
    ├── RAHUL-V-08
    └── RAHUL-V-09
```

Similarly:

``` text
FATIMA
│
├── Easy
│   ├── FATIMA-H-01
│   ├── FATIMA-H-02
│   └── FATIMA-H-03
│
├── Medium
│   ├── FATIMA-H-04
│   ├── FATIMA-H-05
│   └── FATIMA-H-06
│
└── Hard
    ├── FATIMA-H-07
    ├── FATIMA-H-08
    └── FATIMA-H-09
```

The exact number can be adjusted for the hackathon MVP.

------------------------------------------------------------------------

# 8. Important Distinction

Do NOT structure the game as:

``` text
Meet Rahul
 ↓
Answer one question
 ↓
Rahul finished forever
```

Instead:

``` text
Meet Rahul
 ↓
Rahul storyline unlocked
 ↓
Easy challenges
 ↓
Medium challenges
 ↓
Hard challenges
 ↓
Rahul storyline completed
```

The same applies to Fatima and other characters.

------------------------------------------------------------------------

# 9. Character Progression

A character can act as a learning path.

Example:

``` text
RAHUL

Challenge 1
Basic labels
       ↓
Challenge 2
Text alternatives
       ↓
Challenge 3
Reading order
       ↓
Challenge 4
Complex form structure
       ↓
Challenge 5
Combined accessibility problem
```

The player becomes progressively better at designing for that user's
needs.

------------------------------------------------------------------------

# 10. Global Level Progression

There can also be global game difficulty.

Example:

``` text
LEVEL 1 — EASY
Meet first users
Learn basic accessibility concepts

        ↓

LEVEL 2 — MEDIUM
More realistic interface problems
Less obvious solutions

        ↓

LEVEL 3 — HARD
Complex design decisions
Multiple barriers
Trade-offs

        ↓

FINAL DESIGN CHALLENGE
Design for everyone
```

------------------------------------------------------------------------

# 11. Character and Difficulty Are Separate

Do not assume:

``` text
Rahul = Easy
Fatima = Medium
```

Instead:

``` text
Rahul:
Easy + Medium + Hard

Fatima:
Easy + Medium + Hard

Color Vision User:
Easy + Medium + Hard

Motor User:
Easy + Medium + Hard

Cognitive User:
Easy + Medium + Hard
```

Difficulty describes the **challenge**, not the person.

------------------------------------------------------------------------

# 12. Challenge Pool

Challenges should be stored as a pool.

Conceptually:

``` text
ChallengePool
│
├── visual
│   ├── easy[]
│   ├── medium[]
│   └── hard[]
│
├── hearing
│   ├── easy[]
│   ├── medium[]
│   └── hard[]
│
├── color
│   ├── easy[]
│   ├── medium[]
│   └── hard[]
│
├── motor
│   ├── easy[]
│   ├── medium[]
│   └── hard[]
│
├── cognitive
│   ├── easy[]
│   ├── medium[]
│   └── hard[]
│
└── language
    ├── easy[]
    ├── medium[]
    └── hard[]
```

------------------------------------------------------------------------

# 13. Question Selection

The game should not necessarily show every challenge immediately.

The challenge manager can select from the available pool.

Example:

``` text
current difficulty = EASY
current character = RAHUL
        ↓
select incomplete Rahul easy challenge
        ↓
show challenge
```

Once the required easy challenges are completed:

``` text
unlock MEDIUM
```

------------------------------------------------------------------------

# 14. Unlock Rules

Recommended progression:

``` text
Easy challenges
      ↓
minimum required easy score/completion
      ↓
Medium unlocked
      ↓
minimum required medium score/completion
      ↓
Hard unlocked
      ↓
Final challenge
```

The exact thresholds can be tuned during implementation.

------------------------------------------------------------------------

# 15. Do Not Require Perfect Scores

A player should not become permanently stuck because of one wrong
answer.

Recommended:

``` text
Wrong answer
 ↓
Explanation
 ↓
Retry
```

The game is teaching design.

It should reward understanding rather than punish experimentation.

------------------------------------------------------------------------

# 16. Multiple Attempts

Each question can allow multiple attempts.

Example:

``` text
Attempt 1
Wrong

Explanation

Attempt 2
Correct
```

The player receives less bonus than someone who answered correctly on
the first attempt.

But the challenge still progresses.

------------------------------------------------------------------------

# 17. Score Structure

Each challenge can award:

``` text
Base correctness points
+
First-attempt bonus
+
Optional efficiency bonus
```

Example:

``` text
Correct answer:       +100
First attempt:        +25
Efficiency:           +10
```

Maximum:

``` text
135
```

The exact values can be tuned.

------------------------------------------------------------------------

# 18. Accessibility Category Scoring

Every challenge belongs to one or more categories.

Example:

``` text
Rahul challenge:
visual

Fatima challenge:
hearing

Color challenge:
color
```

Hard challenges may involve multiple categories.

Example:

``` text
visual + cognitive
```

This allows the final report to reflect the player's overall design
ability.

------------------------------------------------------------------------

# 19. Multi-Category Challenge

Hard-level challenges can deliberately combine barriers.

Example:

> A healthcare form uses tiny text, poor contrast, unclear labels, and
> color-only status indicators.

Question:

> Which redesign should you prioritize first?

The correct solution should address the most important barrier according
to the scenario.

This prevents the game from becoming a simple:

``` text
Disability → one obvious answer
```

quiz.

------------------------------------------------------------------------

# 20. Before/After Interface System

Every major challenge should ideally show a consequence.

``` text
BAD INTERFACE
      ↓
PLAYER DECISION
      ↓
TRANSFORMATION
      ↓
IMPROVED INTERFACE
```

For some harder questions, the transformation can involve several
changes.

Example:

``` text
Before:
small button
no label
color-only status

After:
larger target
clear label
icon + text status
```

------------------------------------------------------------------------

# 21. Previous Changes

Important gameplay rule:

> **Previous interface changes do not need to remain visible in every
> subsequent challenge.**

Each challenge can present a focused interface state relevant to the
current problem.

This prevents the game from becoming technically difficult to maintain
while still communicating the design lesson.

For hard levels, however, previous changes can optionally remain to
create a more realistic cumulative design environment.

------------------------------------------------------------------------

# 22. Challenge Variety

Do not make every question:

> "What accessibility feature should you add?"

Vary the question types.

Possible formats:

### Identify the barrier

> What is making this interface difficult to use?

### Choose the solution

> Which change would help?

### Prioritize

> Which problem should be fixed first?

### Compare

> Which of these two designs is more accessible?

### Diagnose

> Why is the current interface failing?

### Trade-off

> Which solution solves the barrier without creating another problem?

### Redesign

> Which combination of changes should you implement?

------------------------------------------------------------------------

# 23. Easy Question Example

## Rahul --- Visual

Scenario:

> Three buttons have icons but no text.

Question:

> What should you change?

``` text
A. Add more colors.
B. Add descriptive labels.
C. Add animation.
D. Make the icons smaller.
```

Correct:

``` text
B
```

------------------------------------------------------------------------

# 24. Easy Question Example --- Fatima

Scenario:

> An important alert is delivered only through a speaker.

Question:

> What should you add?

``` text
A. Louder audio.
B. Captions/text.
C. More background music.
D. A brighter speaker icon.
```

Correct:

``` text
B
```

------------------------------------------------------------------------

# 25. Medium Question Example --- Rahul

Scenario:

> A form has labels visually placed beside fields, but the logical
> reading order is confusing.

Question:

> What is the best improvement?

Possible answers:

``` text
A. Add more colors.
B. Make the font decorative.
C. Use clear labels and a logical reading order.
D. Add a moving cursor.
```

Correct:

``` text
C
```

The player now needs to understand structure, not just labels.

------------------------------------------------------------------------

# 26. Medium Question Example --- Fatima

Scenario:

> A live event displays announcements through audio, while some
> important updates appear only briefly on screen.

Question:

> What is the strongest solution?

Possible answers:

``` text
A. Increase speaker volume.
B. Add captions and persistent text notifications.
C. Make the screen flash.
D. Repeat the sound.
```

Correct:

``` text
B
```

------------------------------------------------------------------------

# 27. Hard Question Example

Scenario:

> A booking interface has:
>
> -   low contrast
> -   tiny controls
> -   color-only status
> -   unclear labels
> -   a short timeout

Question:

> You can fix only two problems before launch. Which combination
> provides the strongest accessibility improvement?

The player must reason about:

``` text
impact
+
user needs
+
task completion
```

This is more difficult than identifying a single accessibility feature.

------------------------------------------------------------------------

# 28. Question Difficulty Rules

## Easy

``` text
One barrier
One strong solution
Minimal ambiguity
```

## Medium

``` text
One major barrier
Multiple plausible solutions
Need to understand context
```

## Hard

``` text
Multiple barriers
Multiple plausible solutions
Trade-offs
Prioritization
Combination of accessibility principles
```

------------------------------------------------------------------------

# 29. Level Completion

A level should have multiple challenges.

Example:

``` text
EASY

Rahul  → 3 questions
Fatima → 3 questions
Color  → 3 questions

          ↓

MEDIUM

Rahul  → 3 questions
Fatima → 3 questions
Color  → 3 questions

          ↓

HARD

Mixed users → complex scenarios

          ↓

FINAL DESIGN CHALLENGE
```

The exact numbers can be reduced for the hackathon MVP.

------------------------------------------------------------------------

# 30. MVP Recommendation

For the hackathon, a practical target is:

``` text
3 core characters
×
3 difficulty levels
×
3 questions
=
27 challenges
```

This is a **content target**, not a requirement that all 27 must be
implemented before the first playable demo.

If time becomes limited:

### Minimum vertical slice

``` text
1 character
+
3 questions
+
Easy → Medium → Hard
```

Then expand.

------------------------------------------------------------------------

# 31. Recommended Full MVP

If the team has enough time:

``` text
Rahul
  Easy:   3
  Medium: 3
  Hard:   3

Fatima
  Easy:   3
  Medium: 3
  Hard:   3

Color Vision
  Easy:   3
  Medium: 3
  Hard:   3
```

Total:

``` text
27 challenges
```

Optional:

``` text
Motor
Cognitive
Language
```

can increase the content pool later.

------------------------------------------------------------------------

# 32. Challenge IDs

Use predictable IDs.

Example:

``` text
rahul-visual-easy-01
rahul-visual-easy-02
rahul-visual-easy-03

rahul-visual-medium-01
rahul-visual-medium-02
rahul-visual-medium-03

rahul-visual-hard-01
rahul-visual-hard-02
rahul-visual-hard-03
```

Fatima:

``` text
fatima-hearing-easy-01
fatima-hearing-medium-01
fatima-hearing-hard-01
```

This makes content easier to manage.

------------------------------------------------------------------------

# 33. Challenge Data Contract

Each challenge should contain:

``` text
id
characterId
difficulty
category
scenario
question
options
correctOption
explanation
points
interfaceChanges
```

Optional:

``` text
secondaryCategories
hint
timeLimit
prerequisites
```

------------------------------------------------------------------------

# 34. Challenge Progress Data

Track:

``` text
challengeId
attempts
completed
bestScore
```

Example:

``` json
{
  "challengeId": "rahul-visual-medium-02",
  "attempts": 2,
  "completed": true,
  "bestScore": 100
}
```

------------------------------------------------------------------------

# 35. Character Completion

A character is completed only after the required challenge set is
completed.

Example:

``` text
Rahul
3 Easy ✓
3 Medium ✓
3 Hard ✓
        ↓
Rahul storyline complete
```

The exact completion threshold can be configurable.

------------------------------------------------------------------------

# 36. Final Challenge

The final challenge should not simply ask another isolated MCQ.

It should combine what the player has learned.

Example:

``` text
Design a healthcare booking interface
for:

Rahul
Fatima
Color Vision User
Motor User
Cognitive User
```

The player makes several design decisions.

This creates the final test of the game's learning objective.

------------------------------------------------------------------------

# 37. Content Architecture Rule

The code must never assume:

``` text
Rahul has exactly one question.
Fatima has exactly one question.
```

Instead:

``` text
Character
    ↓
Challenge IDs[]
    ↓
Challenge Pool
    ↓
Difficulty
    ↓
Challenge Selection
```

This is critical for scalability.

------------------------------------------------------------------------

# 38. Gameplay Algorithm Requirement

The challenge manager must support:

``` text
multiple challenges
+
multiple attempts
+
multiple difficulty levels
+
multiple categories
+
unlock conditions
+
challenge completion
```

The game should never hardcode:

``` text
Rahul → one challenge
Fatima → one challenge
```

------------------------------------------------------------------------

# 39. UI Requirement

The challenge UI should dynamically render:

``` text
question
+
N answer options
```

Do not hardcode four specific answers into the UI.

Future challenge formats may contain:

``` text
2 options
3 options
4 options
5 options
```

if needed.

------------------------------------------------------------------------

# 40. Final Principle

The game is fundamentally a **progressive accessibility design learning
game**, not a one-question-per-NPC quiz.

The intended experience is:

``` text
MEET PEOPLE
      ↓
UNDERSTAND DIFFERENT NEEDS
      ↓
SOLVE MULTIPLE DESIGN PROBLEMS
      ↓
PROGRESS THROUGH DIFFICULTY
      ↓
MAKE HARDER DESIGN DECISIONS
      ↓
DESIGN FOR EVERYONE
```

The player's growth should be visible through the increasing complexity
of the challenges.

------------------------------------------------------------------------

# 41. Implementation Priority

If there is a conflict between adding more questions and polishing the
core experience:

``` text
1. Complete vertical slice
2. Stable challenge system
3. Multiple difficulty support
4. Multiple questions
5. More characters
6. Content expansion
7. Visual polish
```

The architecture must support the full multi-question system even if the
first demo contains only a small subset.

------------------------------------------------------------------------

# 42. Definitive Requirement

**Non-negotiable:**

> Rahul, Fatima, and future characters must support multiple questions
> across multiple difficulty levels.

The content system, challenge manager, progression system, scoring
system, and UI must all be designed around this requirement.
