# UI_UX_DESIGN.md --- Inclusive Interface

# 1. Purpose

This document defines the visual, interaction, and UX system for
**Inclusive Interface**.

The target experience is:

> **An 8-bit / pixel-art narrative RPG + visual-novel hybrid with modern
> cinematic presentation.**

The game should feel like an actual game first, while its accessibility
lessons emerge naturally through gameplay.

------------------------------------------------------------------------

# 2. Core UX Philosophy

The player should experience:

``` text
CURIOSITY
   ↓
EXPLORATION
   ↓
FRUSTRATION
   ↓
REALIZATION
   ↓
EMPATHY
   ↓
DESIGN DECISION
   ↓
CONSEQUENCE
   ↓
LEARNING
```

Do not turn the experience into a conventional quiz application.

The MCQs/challenges are embedded inside the narrative game loop.

------------------------------------------------------------------------

# 3. Visual Identity

The visual direction combines:

-   8-bit / pixel-art aesthetics
-   Retro RPG environments
-   Pixel-art characters
-   Narrative dialogue presentation
-   Visual-novel-inspired character portraits
-   Glitch transitions
-   Cinematic black-screen sequences
-   Modern UI composition
-   Subtle lighting and atmospheric effects

Reference feeling:

> **Retro game + cinematic storytelling + modern product design.**

Do not directly copy Roblox, Minecraft, Undertale, or another existing
game's assets or branding.

------------------------------------------------------------------------

# 4. Pixel-Art Direction

## Characters

Characters should use:

``` text
Pixel sprites
Small readable silhouettes
Distinct clothing
Simple facial/pose variations
Limited animation
```

Possible states:

``` text
idle
walk
talk
surprised
happy
thinking
concerned
```

------------------------------------------------------------------------

# 5. Environment Direction

The world should be compact and readable.

MVP locations:

``` text
Developer Room
City Plaza
Hospital
Community Area
Design Office
```

Not every location needs to be fully explorable.

Use:

``` text
tilemaps
foreground objects
background layers
interactive objects
NPCs
```

to create depth.

------------------------------------------------------------------------

# 6. Color Direction

The game can use a mostly restrained retro palette.

Recommended approach:

``` text
dark neutral backgrounds
muted environmental colors
bright accent colors for interaction
stronger colors for important narrative moments
```

Do not rely on color alone for important gameplay information.

For example:

Bad:

``` text
GREEN = correct
RED = wrong
```

Better:

``` text
✓ CORRECT
✕ TRY AGAIN
```

with color as additional reinforcement.

------------------------------------------------------------------------

# 7. Typography

The game should use pixel-compatible or retro-inspired typography for:

``` text
Titles
System messages
Dialogue labels
HUD
```

However, readability is more important than stylistic purity.

Long explanatory text should use a highly readable font if necessary.

------------------------------------------------------------------------

# 8. Text Hierarchy

Use clear levels:

``` text
TITLE
   ↓
SECTION
   ↓
BODY
   ↓
SUPPORTING TEXT
```

Example:

``` text
TASK ASSIGNED

Book a doctor's appointment
for tomorrow at 4 PM.

TIME LIMIT
30 SECONDS
```

Important information should be visually dominant.

------------------------------------------------------------------------

# 9. Opening Screen

The opening should start with:

``` text
BLACK SCREEN
```

Then:

> SYSTEM INITIALIZING...

Glitch.

> USER PROFILE: UNKNOWN

Glitch.

Then:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

The statement should appear prominently.

Pause.

Then transition into the game.

------------------------------------------------------------------------

# 10. Profile Screen

Use a simple game-like profile setup.

``` text
SIGN UP TO EXPERIENCE
```

Fields:

``` text
NAME
USERNAME
```

Button:

``` text
ENTER THE EXPERIENCE
```

Do not request:

``` text
password
phone number
address
medical information
```

The profile exists for personalization, not real authentication.

------------------------------------------------------------------------

# 11. Developer Room

The room should communicate the protagonist's identity immediately.

Visual elements:

``` text
Laptop
Desk
Chair
Bed
Window
Books
Developer objects
```

The laptop should be visually prominent.

The camera can slowly move or use subtle environmental animation.

------------------------------------------------------------------------

# 12. Dialogue System

Dialogue should feel like a narrative RPG.

Recommended structure:

``` text
┌────────────────────────────────────────────┐
│                                            │
│              GAME WORLD                    │
│                                            │
│                  NPC                       │
│                                            │
│ ┌────────────────────────────────────────┐ │
│ │ RAHUL                                  │ │
│ │                                        │ │
│ │ "Why do websites keep making me guess │ │
│ │ what buttons do?"                     │ │
│ └────────────────────────────────────────┘ │
│                     ▼                      │
└────────────────────────────────────────────┘
```

Dialogue should be short enough to read comfortably.

------------------------------------------------------------------------

# 13. Character Portraits

During important dialogue, show a character portrait.

Possible:

``` text
portrait
name
expression
dialogue
```

Expressions can change based on the line.

Example:

``` text
Rahul — neutral
Rahul — confused
Rahul — amused
Rahul — serious
```

This helps the game feel like a story rather than a form.

------------------------------------------------------------------------

# 14. Dialogue Interaction

Default:

``` text
ENTER / SPACE → Continue
```

If choices exist:

``` text
ARROW KEYS → Navigate
ENTER → Select
```

Also support mouse/touch where appropriate.

------------------------------------------------------------------------

# 15. Dialogue Animation

Use subtle animation:

``` text
text reveal
portrait transition
small character movement
dialogue box transition
```

Avoid excessive effects.

Allow reduced-motion behavior.

------------------------------------------------------------------------

# 16. Glitch Transitions

Glitch effects are a recurring visual language.

Use them for:

``` text
Opening
Scene changes
Realization
Level transitions
Major narrative moments
```

Do not use glitch effects continuously.

The effect should mean:

> **Something changed.**

------------------------------------------------------------------------

# 17. Appointment Simulation

This is intentionally different from the rest of the game.

The player should feel like the entire screen has become a
website/mobile interface.

Visual structure:

``` text
┌──────────────────────────────────────┐
│ CITYCARE                             │
├──────────────────────────────────────┤
│                                      │
│ Doctor Appointment                   │
│                                      │
│ [ tiny / unclear controls ]          │
│                                      │
│ [ intentionally poor hierarchy ]     │
│                                      │
│                  00:23               │
└──────────────────────────────────────┘
```

The simulation is intentionally inaccessible.

**Only the simulated website should contain these barriers.**

------------------------------------------------------------------------

# 18. Simulated Website Barriers

The simulated website may intentionally contain:

``` text
Small text
Poor contrast
Tiny click targets
Unclear labels
Confusing hierarchy
Color-only status
Bad CAPTCHA
Weak error messages
```

Example:

``` text
Appointment Date
16px

Appointments are subjected to availability...
8px
```

The player should notice the mismatch.

------------------------------------------------------------------------

# 19. 30-Second Timer

Timer should be highly visible.

Example:

``` text
TIME LEFT
00:27
```

Do not communicate remaining time through color alone.

Use:

``` text
numeric countdown
visual progress
optional non-audio warning
```

The timer may become visually urgent near the end.

------------------------------------------------------------------------

# 20. Appointment Success Screen

If completed:

# YOUR APPOINTMENT IS CONFIRMED

Then pause.

The game should intentionally create a moment of silence before the
realization.

------------------------------------------------------------------------

# 21. Appointment Failure Screen

If time expires:

# TIME'S UP.

Do not show:

> YOU FAILED.

The player is intentionally not blamed.

------------------------------------------------------------------------

# 22. Realization Sequence

Black screen.

Glitch.

# YOU DIDN'T FAIL.

Pause.

# BUT THE INTERFACE DID.

This should be one of the strongest visual moments in the entire game.

Keep the screen simple.

------------------------------------------------------------------------

# 23. Designer Introduction

Transition into:

``` text
ROLE UPDATED

DIGITAL PRODUCT DESIGNER
```

Then:

``` text
OBJECTIVE

Design digital services
that let everyone complete
their tasks.
```

This is the bridge into the main game.

------------------------------------------------------------------------

# 24. City UI

The city should have minimal HUD.

Possible:

``` text
TOP LEFT
Player name / small avatar

TOP RIGHT
Score

BOTTOM
Interaction prompt
```

Avoid filling the screen with game UI.

The world itself should remain visible.

------------------------------------------------------------------------

# 25. Interaction Prompt

When near an NPC:

``` text
[E] TALK
```

or:

``` text
PRESS E TO TALK
```

The prompt should appear near the interaction target.

Use icon + text where possible.

------------------------------------------------------------------------

# 26. NPC Encounter Flow

``` text
Player approaches NPC
       ↓
Interaction prompt
       ↓
Player interacts
       ↓
Dialogue
       ↓
Challenge introduction
       ↓
Challenge UI
```

The player should understand why the challenge is appearing.

------------------------------------------------------------------------

# 27. Challenge UI Philosophy

The challenge interface should feel like a **game decision screen**, not
a Google Form.

Use:

``` text
Character
Scenario
Question
Options
Feedback
Score
```

Example:

``` text
┌─────────────────────────────────────────────┐
│ RAHUL                                       │
│ Visual Challenge                            │
├─────────────────────────────────────────────┤
│                                             │
│ Rahul opens a booking page.                 │
│ Three buttons contain only icons.            │
│                                             │
│ What is the best improvement?               │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ A  Make the icons more colorful.       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ B  Add clear, descriptive labels.      │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ C  Add an animation.                    │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ D  Make the icons smaller.              │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 28. Dynamic Challenge UI Requirement

There must be **one reusable challenge UI**.

It must dynamically receive:

``` text
character
scenario
question
options[]
difficulty
category
```

Do not create:

``` text
RahulQuestion1Screen
RahulQuestion2Screen
FatimaQuestion1Screen
```

The UI should render the content it receives.

------------------------------------------------------------------------

# 29. Dynamic Options

The challenge component should support:

``` text
2 options
3 options
4 options
5 options
```

The MVP can normally use four.

Option buttons should be generated from the challenge data.

------------------------------------------------------------------------

# 30. Difficulty Indicator

Show the current level clearly.

Example:

``` text
RAHUL
VISUAL ACCESSIBILITY

EASY
```

For medium:

``` text
MEDIUM
```

For hard:

``` text
HARD
```

Avoid making the UI visually imply that a character itself is "easy" or
"hard."

Difficulty describes the challenge.

------------------------------------------------------------------------

# 31. Challenge Progress

Show progress where useful.

Example:

``` text
RAHUL
EASY

CHALLENGE 2 / 3
```

If the number of challenges is dynamically loaded, derive this from
actual challenge data.

Never hardcode:

``` text
3
```

if the content pool changes.

------------------------------------------------------------------------

# 32. Answer Selection

Selected option:

``` text
strong border
clear indicator
optional subtle animation
```

Do not rely only on color.

Example:

``` text
[✓] B  Add clear, descriptive labels.
```

------------------------------------------------------------------------

# 33. Correct Feedback

Use satisfying but restrained feedback.

Examples:

``` text
✓ NICE

ACCESSIBILITY IMPROVED
+125
```

or:

> Good choice.

> You removed the barrier.

------------------------------------------------------------------------

# 34. Wrong Feedback

Avoid:

``` text
WRONG!!!
YOU FAILED!!!
```

Use:

``` text
NOT QUITE

Think about what information
the user is actually missing.

[TRY AGAIN]
```

This maintains the game's educational tone.

------------------------------------------------------------------------

# 35. Explanation Panel

After an answer, show a short explanation.

Example:

> A symbol might be obvious to one person and unclear to another.

> Clear labels tell the user what the control does.

Use an optional:

``` text
WHY?
```

expandable panel for additional detail.

------------------------------------------------------------------------

# 36. Interface Transformation

After a correct answer:

``` text
OLD INTERFACE
      ↓
PLAYER DECISION
      ↓
GLITCH / TRANSITION
      ↓
IMPROVED INTERFACE
```

Example:

``` text
[ 🔍 ]     [ 🛒 ]     [ ⚙ ]

        ↓

[ 🔍 Search ] [ 🛒 Cart ] [ ⚙ Settings ]
```

The transformation should be visually obvious.

------------------------------------------------------------------------

# 37. Transformation Animation

Recommended:

``` text
0.1–0.3s glitch
0.2–0.4s transition
interface replacement
short confirmation
```

Do not make transformations so long that they interrupt gameplay.

Respect reduced-motion settings.

------------------------------------------------------------------------

# 38. Score Display

Global score can appear in the HUD:

``` text
SCORE
1,250
```

After a correct answer:

``` text
+125
```

Animate briefly.

Do not permanently cover the gameplay area.

------------------------------------------------------------------------

# 39. Category Score

The player may eventually see:

``` text
VISUAL      92
HEARING     88
COLOR       100
```

This should be shown in the final report or optional profile screen.

Do not overload the main exploration HUD with statistics.

------------------------------------------------------------------------

# 40. Level Unlock

When Medium unlocks:

``` text
GLITCH
```

Then:

# MEDIUM UNLOCKED

> The obvious problems are getting harder to spot.

For Hard:

# HARD UNLOCKED

> Now you're designing under real constraints.

------------------------------------------------------------------------

# 41. Character Completion

When a character's required challenges are complete:

``` text
CHARACTER EXPERIENCE IMPROVED
```

Then return to the city.

The NPC can provide a short closing line.

------------------------------------------------------------------------

# 42. Multiple Challenge Progression

The game must visually communicate that a character has **multiple
challenges**.

Example:

``` text
RAHUL
────────────────

EASY
✓ ✓ ✓

MEDIUM
✓ ✓ ○

HARD
🔒 🔒 🔒
```

This is better than showing:

``` text
Rahul — Completed
```

after one question.

------------------------------------------------------------------------

# 43. Challenge Navigation

The player should normally proceed naturally:

``` text
Challenge complete
      ↓
Feedback
      ↓
Transformation
      ↓
Next challenge
```

Optionally:

``` text
[CONTINUE]
```

After completing the current character's challenge set:

``` text
RETURN TO CITY
```

------------------------------------------------------------------------

# 44. City Exploration Feedback

When a character has unfinished challenges:

``` text
NPC
  ↓
small interaction indicator
```

When completed:

``` text
NPC
  ↓
completion indicator
```

Do not use color alone.

Use icons or text if necessary.

------------------------------------------------------------------------

# 45. Final Challenge UI

The final challenge should feel more serious.

Example:

``` text
FINAL DESIGN CHALLENGE

You are designing a healthcare service.

Your users:

Rahul
Fatima
Mira
and others.

Make the interface work for everyone.
```

Then present multiple design decisions.

------------------------------------------------------------------------

# 46. Final Evaluation UI

Use a clean report screen.

``` text
DESIGN REVIEW COMPLETE

VISUAL       92
HEARING      88
COLOR        100

OVERALL
93%

INCLUSIVITY SCORE
```

Then:

``` text
WHAT DID YOU LEARN?
```

------------------------------------------------------------------------

# 47. Ending UI

Black screen.

Glitch.

> USER PROFILE: KNOWN

Then:

# WHAT IF THE INTERFACE WAS DESIGNED FOR EVERYONE?

Fade out.

------------------------------------------------------------------------

# 48. Input UX

Desktop defaults:

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

Challenge:

``` text
Mouse
Keyboard
```

The final implementation should allow the core game to be played without
requiring a mouse where practical.

------------------------------------------------------------------------

# 49. Focus States

Interactive UI must have visible focus.

Example:

``` text
┌──────────────────────────────┐
│ > B  Add clear labels        │
└──────────────────────────────┘
```

The player should always know what is selected.

------------------------------------------------------------------------

# 50. Keyboard Navigation

Challenge options:

``` text
Arrow Up / Down
Enter
```

Dialogue:

``` text
Enter / Space
```

Menus:

``` text
Arrow keys
Enter
Escape
```

------------------------------------------------------------------------

# 51. Accessibility of the Actual Game

The game itself should provide:

``` text
Readable text
Keyboard support
Visible focus
Captions
Text-based important information
Reduced motion
Pause support
No color-only critical information
```

This is critical because the game teaches accessibility.

------------------------------------------------------------------------

# 52. Reduced Motion

If enabled:

``` text
Disable or reduce:
glitch intensity
screen shake
large transitions
rapid flashing
excessive particle effects
```

Keep the information understandable without animation.

------------------------------------------------------------------------

# 53. Captions

All important spoken/audio information should have text equivalents.

This includes:

``` text
NPC dialogue
Narrative voice
Important sound-based gameplay information
```

------------------------------------------------------------------------

# 54. Audio UX

Audio should enhance the experience, not carry critical information
alone.

Use:

``` text
Dialogue SFX
Button SFX
Success SFX
Error SFX
Glitch SFX
Ambient music
```

Every critical gameplay state must also have a visual/text
representation.

------------------------------------------------------------------------

# 55. Timer Accessibility

The 30-second appointment timer is intentionally stressful.

However, communicate time through:

``` text
numbers
visual progress
text
```

not audio alone.

For accessibility/testing modes, timer behavior can be configurable.

------------------------------------------------------------------------

# 56. Mobile / Responsive Behavior

The primary MVP target is desktop browser.

Minimum requirement:

``` text
1280 × 720
```

The game should remain usable at smaller common desktop resolutions.

If mobile support is added:

``` text
touch controls
responsive challenge panel
larger touch targets
```

must be implemented.

------------------------------------------------------------------------

# 57. UI Component Principles

Components should be reusable.

Examples:

``` text
Button
Panel
DialogueBox
ChoiceButton
ChallengePanel
CharacterPortrait
ProgressIndicator
ScorePopup
SystemMessage
TimerDisplay
```

Avoid creating separate components for individual questions.

------------------------------------------------------------------------

# 58. Dynamic Content Binding

UI receives data:

``` ts
{
  scenario,
  question,
  options,
  difficulty,
  character
}
```

Then renders it.

The UI does not contain authored content.

------------------------------------------------------------------------

# 59. Long Text Handling

If content is longer than expected:

``` text
wrap text
resize panel
paginate dialogue
scroll where necessary
```

Do not let text overflow outside the UI.

Dialogue should be authored short enough for comfortable reading.

------------------------------------------------------------------------

# 60. Loading States

When content or a scene is loading:

``` text
LOADING...
```

Keep the visual style consistent with the opening system messages.

Avoid blank screens without explanation.

------------------------------------------------------------------------

# 61. Error States

If content fails:

``` text
CONTENT UNAVAILABLE
```

For development builds, log the exact ID.

Example:

``` text
Challenge unavailable:
rahul-visual-medium-04
```

The player-facing build should avoid exposing technical stack traces.

------------------------------------------------------------------------

# 62. Responsive Challenge Layout

The challenge panel should adapt to:

``` text
different screen widths
different option lengths
different question lengths
```

Do not assume every question has identical text length.

------------------------------------------------------------------------

# 63. Visual Hierarchy of Challenge Screen

Priority order:

``` text
1. Character / context
2. Scenario
3. Question
4. Options
5. Feedback
6. Score
7. Secondary information
```

The answer options must be the most obvious interactive elements.

------------------------------------------------------------------------

# 64. Visual Hierarchy of Exploration

Priority order:

``` text
1. World
2. Player
3. NPCs
4. Interaction prompt
5. Small HUD
```

The HUD should never overpower the pixel-art world.

------------------------------------------------------------------------

# 65. Visual Hierarchy of Narrative Screens

Priority:

``` text
Main statement
      ↓
Supporting text
      ↓
Interaction
```

For major statements such as:

> YOU DIDN'T FAIL.

use minimal UI.

------------------------------------------------------------------------

# 66. UX Writing Rules

Use:

``` text
short sentences
natural dialogue
active voice
clear verbs
conversational language
```

Avoid:

``` text
technical jargon
long paragraphs
academic explanations
condescending language
```

------------------------------------------------------------------------

# 67. Character Voice

Characters must sound different from the system.

### SYSTEM

``` text
OBJECTIVE UPDATED
```

### PLAYER

``` text
Okay... I think I get it.
```

### RAHUL

``` text
Why do websites keep making me guess?
```

### FATIMA

``` text
I shouldn't need to hear a notification to know something happened.
```

This distinction makes the game feel alive.

------------------------------------------------------------------------

# 68. UX Feedback Principle

Every important action should produce feedback.

Examples:

``` text
Talk → dialogue opens
Select → option highlights
Submit → feedback appears
Correct → score + transformation
Unlock → notification
Complete → progress updates
```

------------------------------------------------------------------------

# 69. Do Not Hide Game Logic in UI

The UI must never determine:

``` text
correct answer
score
difficulty unlock
character completion
```

It only communicates with gameplay services.

------------------------------------------------------------------------

# 70. Definition of Done

The UI/UX system is complete when:

``` text
[ ] Pixel-art RPG visual direction is implemented.
[ ] Dialogue feels like a game.
[ ] Opening cinematic works.
[ ] Appointment simulation looks intentionally inaccessible.
[ ] Actual game UI remains accessible.
[ ] Challenge screen is reusable.
[ ] Questions are dynamically rendered.
[ ] Options are dynamically rendered.
[ ] Multiple challenges per character are visible/progressable.
[ ] Easy/Medium/Hard states are clear.
[ ] Correct/wrong feedback works.
[ ] Interface transformations are visible.
[ ] Score feedback works.
[ ] Keyboard navigation works.
[ ] Focus states are visible.
[ ] Captions/text equivalents exist.
[ ] Reduced motion is respected.
[ ] Final evaluation is readable.
[ ] No question-specific UI components are hardcoded.
```

------------------------------------------------------------------------

# 71. Final UX Principle

The game should never feel like:

> **"Here is an accessibility quiz."**

It should feel like:

> **"You're inside a world. You met someone. They have a problem. You're
> the designer. What are you going to change?"**

The UI exists to support that experience.

The final visual identity should communicate:

``` text
8-BIT / PIXEL ART
        +
NARRATIVE RPG
        +
VISUAL NOVEL DIALOGUE
        +
GLITCH CINEMATIC TRANSITIONS
        +
DYNAMIC DESIGN CHALLENGES
        +
ACCESSIBLE ACTUAL GAME UI
```

That is the intended UI/UX identity of **Inclusive Interface**.
