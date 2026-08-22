# CODE_FURY_IMPLEMENTATION_CHANGE_REQUEST.md

## Purpose

This is an **additive/corrective implementation update** for the existing Code Fury project.

**Change only what is explicitly requested here. Retain every existing feature, mechanic, visual element, NPC, question system, difficulty system, dynamic website system, voice/subtitle system, and narrative step that is not explicitly changed.**

Before editing:
1. Inspect the existing code and `.md` specifications.
2. Reuse the existing architecture.
3. Do not create a parallel architecture.
4. Do not remove working features.
5. Fix only the gaps below.

---

# 1. LANDING PAGE

The first page needs to look more polished, modern, aesthetic, eye-catching, and intentionally designed rather than like a generic AI-generated landing page.

### 3D background

Use the existing compatible stack, preferably Three.js / React Three Fiber, to create a subtle 3D background representing **digital UI/UX design**.

Possible elements:
- floating UI panels
- interface cards
- form fields
- buttons
- wireframe layouts
- accessibility symbols
- cursor/interaction elements
- design grids
- layered windows

Animation can include subtle parallax, depth, slow movement, and lighting.

Do NOT use random decorative 3D objects just for visual noise.

Do NOT redesign the game's identity.

### Landing-page visual target

It should feel:
- modern
- premium
- cinematic
- interactive
- intentional
- human-designed

Avoid:
- generic AI gradients
- random blobs
- excessive glassmorphism
- excessive neon
- unrelated futuristic objects

### Taskbar

**Remove the taskbar from the FIRST/LANDING PAGE ONLY.**

Do not globally remove existing game UI or controls from other screens.

Retain the existing core opening message:

> WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

---

# 2. NEW GAME RESET

Every completely new game/session must start with:

```text
SCORE = 0
BADGES = 0
```

No previous score or badge state may leak into a new game.

The UI must initially show:

> SCORE: 0

Badges must begin locked/unearned and increase only as the player actually progresses.

Within one game, retain:
- score
- badges
- NPC progress
- website improvements
- difficulty progress
- completed challenges

Starting a **new game** resets all of them.

---

# 3. LOGIN / USER PROFILE PAGE

Replace:

> USER PROFILE: UNKNOWN

with:

> **ENTER USER PROFILE**

This is the actual first-time user profile/login setup.

Request:

### NAME
`Enter your name`

### EMAIL
`Enter your email`

### PASSWORD
`Create a strong password`

Text must be substantially larger and easier to read.

Use:
- large headings
- large labels
- comfortable line height
- strong contrast
- clear spacing

### Password requirements

Show a strong-password requirement such as:
- minimum 8 characters
- uppercase
- lowercase
- number
- special character

A strength indicator may be shown.

Use the existing architecture for profile storage. Do not introduce unnecessary backend infrastructure. Never display the password in plaintext after entry.

Use a clear CTA such as:

> CREATE PROFILE

Do not proceed until required fields are valid.

---

# 4. DESIGNER / STUDY ROOM

The designer scene needs to look substantially better.

The protagonist is a young beginner developer/designer working in his study room.

The environment should be a polished **3D room** with:
- desk
- laptop/computer
- monitor
- keyboard
- mouse
- chair
- books
- notebooks
- shelves
- lamp
- bed
- window
- curtains
- wall details
- personal objects

It should have real 3D depth, materials, lighting, shadows, and believable placement.

Do not leave it as a sparse room made of flat rectangles.

---

# 5. GRANDMA CALL — AUTOMATIC CINEMATIC

The current repeated:

```text
NEXT → NEXT → NEXT
```

story progression is wrong for this sequence.

The designer/Grandma sequence should automatically play as a short cinematic.

Sequence:

```text
Designer works at computer
        ↓
Grandma calls
        ↓
Designer reacts
        ↓
Designer picks up mobile phone
        ↓
Designer gets up
        ↓
Designer automatically walks downstairs
        ↓
Designer approaches Grandma
        ↓
Conversation begins
```

The player should NOT have to repeatedly click NEXT to make these story beats happen.

The automatic behavior applies to this cinematic only. Gameplay sections remain interactive.

The designer must visibly have a mobile phone in his hand during the call.

---

# 6. GRANDMA DIALOGUE

Retain the existing narrative.

Example:

**Grandma:**
> "Can you help me book a doctor's appointment for tomorrow at 4 PM?"

**Designer:**
> "Yeah, sure. I'll help you."

The purpose is to establish that the designer initially assumes the task will be easy.

Do not remove the motivation for the first accessibility challenge.

---

# 7. BAD WEBSITE

The existing appointment website is already implemented and should remain.

Do not rebuild it unnecessarily.

Keep the intentionally inaccessible design and its gameplay.

The task remains:

> Book a doctor's appointment for tomorrow at 4:00 PM.

The challenge remains 30 seconds.

### Timer

The time limitation must now be clearly visible on the website/gameplay screen.

Example:

> **TIME LEFT: 30s**

It must:
- start only when the challenge starts
- visibly count down
- stop on completion
- reach 0 on failure
- trigger the existing failure/reflection sequence
- not continue running into later scenes

---

# 8. TEXT DUPLICATION BUG

Fix the current text-rendering bug where every character/alphabet is repeated.

Incorrect:

```text
HHeelllloo
```

Correct:

```text
Hello
```

Inspect the typewriter/text animation implementation and make sure every character is rendered exactly once.

---

# 9. ACTUAL VOICE / TEXT-TO-SPEECH

The current dialogue voice produces unusual sound effects instead of understandable speech.

Replace/fix it with a proper text-to-speech implementation compatible with the existing project.

Possible compatible approach:
- Web Speech API / browser speech synthesis
- existing supported TTS model/service
- existing project voice solution

The outcome must be:

```text
dialogue text
+
understandable spoken voice
+
subtitles
```

Do NOT use random beeps, garbled audio, or placeholder sound effects as speech.

The spoken content must correspond to the displayed dialogue.

Avoid duplicate speech triggers.

Retain existing subtitle and accessibility controls.

---

# 10. ACCESS CITY TELEPORT

Immediately after the player teleports/enters the city, show:

> **WELCOME TO ACCESS CITY**

Suggested flow:

```text
CITY LOADS
↓
short pause
↓
WELCOME TO ACCESS CITY
↓
subtle transition
↓
PLAYER CONTROL
```

Do not require random clicking to dismiss it.

---

# 11. FATIMA PLACEMENT

Fatima must NOT be directly beside the starting point.

Place her far enough away that the player must actually navigate through the city.

The player should need to:

```text
walk
navigate streets
identify the environment
find Fatima
```

Do not place all important NPCs together.

---

# 12. RAHUL MUST WORK

Current problem:

> Fatima responds, but Rahul does not.

Fix Rahul's interaction.

Rahul must:
- detect player proximity
- show an interaction prompt
- open dialogue
- show his accessibility scenario
- present his question(s)
- accept an answer
- evaluate it
- update score
- apply the corresponding website improvement
- mark progression correctly

Do not implement Rahul as a special one-off system.

Use the same reusable NPC interaction architecture for all accessibility characters.

---

# 13. MANY NPCs / ACCESSIBILITY NEEDS

Do NOT stop at Rahul and Fatima.

The game must contain multiple characters representing different accessibility needs, including at least:

- visual impairment
- hearing impairment
- color-vision deficiency
- motor/mobility difficulty
- cognitive/reading difficulty
- language barrier

Additional NPCs may be used where supported by the existing design.

Distribute them throughout the city.

Examples:

```text
Rahul → one district
Fatima → another district
Color-vision character → another location
Motor-accessibility character → another location
Cognitive-accessibility character → another location
Language-accessibility character → another location
```

Do not cluster everyone at spawn.

---

# 14. MULTIPLE QUESTIONS — CRITICAL

The game is NOT:

```text
Rahul → one question
Fatima → one question
```

It must contain **multiple questions across multiple NPCs and multiple difficulty levels**.

Conceptually:

```text
Rahul
  → multiple questions

Fatima
  → multiple questions

Color-vision character
  → multiple questions

Motor-accessibility character
  → multiple questions

Cognitive-accessibility character
  → multiple questions

Language-accessibility character
  → multiple questions
```

Each NPC/scenario must have different questions.

Do not repeat the same MCQ for every NPC.

---

# 15. QUESTION SYSTEM

Use the existing question-bank/content architecture.

Do NOT hardcode one question inside an NPC component.

Each question should be data-driven and contain, at minimum:

```text
id
npcId
difficulty
scenario
question
options
correctAnswer
explanation
websiteModification
points
```

Reuse the existing schema if one already exists rather than creating a competing system.

Questions must vary by:
- accessibility need
- scenario
- wording
- answer choices
- design principle
- website consequence
- difficulty

---

# 16. DIFFICULTY

Retain:

```text
EASY
MEDIUM
HARD
```

### Easy
Basic accessibility concepts:
- captions
- readable text
- labels
- color + icons
- simple controls

### Medium
Reasoning-based concepts:
- keyboard navigation
- focus order
- form errors
- screen-reader labels
- contrast
- navigation

### Hard
Real design judgment:
- complex forms
- cognitive load
- multi-step workflows
- data visualization
- authentication
- responsive accessibility
- combined accessibility needs

Difficulty must genuinely affect question/scenario complexity.

---

# 17. DYNAMIC WEBSITE IMPROVEMENT

Retain the core mechanic:

```text
NPC problem
↓
question
↓
correct answer
↓
accessibility principle
↓
website modification
↓
player sees improvement
```

Correct answers must do more than increase score.

Possible improvements:
- larger text
- better contrast
- visible focus
- labels
- captions
- icons alongside color
- improved error messages
- larger click targets
- simpler navigation
- keyboard support
- reduced cognitive load

Improvements should accumulate during the game.

---

# 18. SCORE

Every new game:

```text
SCORE = 0
```

Correct answer:

```text
+points
```

Wrong answer:

```text
+0
```

Do not award score merely for:
- walking
- finding NPCs
- opening dialogue
- clicking
- loading a scene
- completing unrelated animations

The score represents the player's accessibility design decisions.

---

# 19. BADGES

Every new game:

```text
BADGES = 0
```

Badges unlock only through actual milestones.

Examples:

```text
First Accessibility Fix
Visual Accessibility
Inclusive Audio
Color-Aware Design
Motor-Friendly Design
Cognitive Clarity
Accessibility Architect
```

Retain existing badge names if already implemented.

---

# 20. RETAIN EVERYTHING NOT REQUESTED

This is mandatory.

Do NOT remove or redesign:
- opening concept
- accessibility-learning purpose
- bad website
- 30-second challenge
- "YOU DIDN'T FAIL. THE INTERFACE DID."
- reflection sequence
- city exploration
- multiple NPC system
- accessibility scenarios
- question engine
- dynamic website improvement
- score
- difficulty
- voice/subtitles
- success state
- existing working UI
- existing working gameplay

unless directly contradicted by this document.

Do not use these requested fixes as an excuse to redesign unrelated screens.

---

# 21. IMPLEMENTATION ORDER

Implement in this order:

1. New-game state reset
2. Landing page 3D UI/UX background + taskbar removal
3. Profile/login page
4. 3D designer study room
5. Automatic Grandma cinematic + phone + stairs
6. Visible appointment timer
7. Text duplication fix
8. Actual TTS + subtitles
9. Access City welcome message
10. NPC spacing/distribution
11. Rahul interaction fix
12. Multiple NPCs
13. Multiple questions
14. Easy/Medium/Hard question progression
15. Score + badges verification
16. Dynamic website improvement verification
17. Full regression test

---

# 22. ACCEPTANCE TEST

### Landing
- [ ] Modern polished first page
- [ ] 3D UI/UX background
- [ ] Three.js/R3F or compatible solution where appropriate
- [ ] No generic AI-looking decorative scene
- [ ] Taskbar removed ONLY from landing page
- [ ] Core opening message retained

### New game
- [ ] SCORE starts at 0
- [ ] BADGES starts at 0
- [ ] Previous progress cannot leak into a new game

### Profile
- [ ] "ENTER USER PROFILE"
- [ ] Larger text
- [ ] Name
- [ ] Email
- [ ] Strong password
- [ ] Validation
- [ ] Create Profile CTA

### Designer
- [ ] Better-looking 3D study room
- [ ] Designer at computer
- [ ] Grandma call happens automatically
- [ ] No repeated NEXT/NEXT/NEXT cinematic
- [ ] Phone visible in designer's hand
- [ ] Designer automatically moves downstairs
- [ ] Grandma interaction begins naturally

### Appointment
- [ ] Existing website remains playable
- [ ] Visible timer
- [ ] Timer starts correctly
- [ ] Timer stops on completion
- [ ] Timer triggers failure at 0

### Text/voice
- [ ] Character duplication fixed
- [ ] Each character appears once
- [ ] Actual understandable TTS
- [ ] Dialogue and speech match
- [ ] Subtitles retained
- [ ] No random/unusual sound used as speech

### City
- [ ] "WELCOME TO ACCESS CITY"
- [ ] Player control resumes after transition
- [ ] Fatima is not beside spawn
- [ ] Player must navigate to Fatima
- [ ] NPCs are distributed through the city

### NPCs
- [ ] Rahul responds
- [ ] Rahul has scenario/questions
- [ ] Rahul answer evaluation works
- [ ] Rahul can change score/website state
- [ ] Fatima still works
- [ ] More accessibility NPCs exist

### Questions
- [ ] More than two total questions
- [ ] Multiple questions per NPC/scenario set
- [ ] Different questions for different accessibility needs
- [ ] Easy questions
- [ ] Medium questions
- [ ] Hard questions
- [ ] Data-driven question bank
- [ ] Correct answers work
- [ ] Wrong answers give 0 points

### Progression
- [ ] Correct answers visibly improve website
- [ ] Improvements persist
- [ ] Score persists during a game
- [ ] Badges progress during a game
- [ ] New game resets score/badges/progress

---

# 23. FINAL INSTRUCTION TO THE CODING AGENT

> **Implement these changes without breaking anything that the user did not ask to change.**

The desired flow is:

```text
MODERN 3D LANDING
        ↓
ENTER USER PROFILE
        ↓
3D DESIGNER STUDY ROOM
        ↓
AUTOMATIC GRANDMA CALL + MOVEMENT
        ↓
PLAYABLE BAD WEBSITE + VISIBLE TIMER
        ↓
YOU DIDN'T FAIL / THE INTERFACE DID
        ↓
WELCOME TO ACCESS CITY
        ↓
EXPLORE
        ↓
FIND MANY NPCs
        ↓
MULTIPLE QUESTIONS
        ↓
EASY → MEDIUM → HARD
        ↓
SCORE + BADGES
        ↓
WEBSITE EVOLVES
        ↓
LEVEL COMPLETION
```

**Do not simplify this into two MCQs.**

**Do not fix one NPC while leaving the reusable NPC system broken.**

**Do not remove existing gameplay.**

**Do not change unrelated visuals.**

**Make the requested changes, test them, and retain everything else.**
