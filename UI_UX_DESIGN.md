# UI_UX_DESIGN.md --- Inclusive Interface

# 1. Purpose

This document defines the visual language, interface behavior,
interaction patterns, screen hierarchy, accessibility rules, and UX
principles for **Inclusive Interface**.

The UI must feel like part of a **real narrative pixel-art game**, not
like an educational dashboard.

The game has an intentional contrast:

> **The simulated website can be badly designed on purpose.**\
> **The actual game UI must be designed well.**

------------------------------------------------------------------------

# 2. Core UX Philosophy

The player should understand the game through:

``` text
SEE
 ↓
EXPLORE
 ↓
INTERACT
 ↓
EXPERIENCE
 ↓
DECIDE
 ↓
SEE THE CONSEQUENCE
```

Avoid explaining everything with text.

Whenever possible:

> **Show the player instead of telling the player.**

------------------------------------------------------------------------

# 3. Primary UX Goals

The interface should:

1.  Make the player immediately understand what they can interact with.
2.  Keep the narrative easy to follow.
3.  Make exploration intuitive.
4.  Make dialogue readable.
5.  Make design decisions understandable.
6.  Make consequences visually obvious.
7.  Keep the player aware of score/progress without overwhelming them.
8.  Preserve the retro/pixel-art identity.
9.  Remain accessible despite the retro visual style.

------------------------------------------------------------------------

# 4. Visual Identity

## Style

The visual identity should combine:

-   Pixel-art RPG
-   8-bit / 16-bit aesthetics
-   Retro computer interfaces
-   Narrative adventure games
-   Visual-novel dialogue
-   Subtle modern polish

The game should feel:

-   Mysterious
-   Slightly futuristic
-   Nostalgic
-   Human
-   Atmospheric
-   Technological

Avoid making it look like:

-   A corporate SaaS product
-   A school learning-management system
-   A generic quiz application
-   A medical application
-   A generic AI dashboard

------------------------------------------------------------------------

# 5. Visual Language

Use a consistent visual vocabulary.

### Shapes

Prefer:

-   Rectangular pixel panels
-   Sharp or slightly rounded retro panels
-   Pixel borders
-   Simple geometric icons

### Text

Use:

-   Pixel/retro display font for titles where readable
-   Highly readable font for body/dialogue text

Do not use an overly decorative pixel font for long paragraphs.

### Effects

Use:

-   Scanlines
-   CRT-style subtle texture
-   Pixel transitions
-   Glitch effects
-   Small screen distortions

Effects must not interfere with readability.

------------------------------------------------------------------------

# 6. Color System

The game should have a controlled palette.

Suggested conceptual palette:

``` text
BACKGROUND
Deep black / near-black

SURFACE
Dark charcoal

PRIMARY
Electric cyan / cool blue

SECONDARY
Purple / violet

ACCENT
Warm yellow

SUCCESS
Accessible green + icon/text

ERROR
Accessible red + icon/text

TEXT
Near-white

SECONDARY TEXT
Light grey
```

Do not rely on color alone to communicate meaning.

For example:

``` text
✓ AVAILABLE
✕ UNAVAILABLE
```

rather than:

``` text
GREEN = AVAILABLE
RED = UNAVAILABLE
```

------------------------------------------------------------------------

# 7. Actual Game Accessibility

The actual game should follow accessibility principles even though the
appointment website intentionally violates them.

## Required where feasible

-   Strong text contrast
-   Readable typography
-   Adjustable text size
-   Captions/subtitles
-   Clear interaction states
-   Keyboard support
-   Non-color-only indicators
-   Reduced-motion option
-   Clear focus state
-   Sufficient interaction target size
-   Adjustable timing where appropriate

The game's educational simulation should not make the entire game
difficult to use.

------------------------------------------------------------------------

# 8. Screen Hierarchy

The player should always know:

``` text
WHERE AM I?
WHAT CAN I DO?
WHAT IS MY CURRENT TASK?
WHAT HAPPENS IF I INTERACT?
```

Priority:

### 1. Narrative / Objective

What is happening?

### 2. Interaction

What can I do?

### 3. Feedback

What happened?

### 4. Secondary information

Score, progress, optional details.

Do not let decorative UI overpower the current task.

------------------------------------------------------------------------

# 9. Main UI Layers

The game can be organized into:

``` text
GAME WORLD
    ↓
HUD
    ↓
INTERACTION PROMPT
    ↓
DIALOGUE / CHALLENGE OVERLAY
    ↓
SYSTEM NOTIFICATION
```

Only the necessary layer should be visually dominant at any given
moment.

------------------------------------------------------------------------

# 10. Opening Screen

The opening should be minimal.

## State

Black screen.

Small cursor.

Text:

``` text
SYSTEM INITIALIZING...
```

Then:

``` text
USER PROFILE: UNKNOWN
```

Then:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

The title should be centered.

No unnecessary buttons.

The player should have one clear continuation action.

------------------------------------------------------------------------

# 11. Sign-Up Screen

Title:

# SIGN UP TO EXPERIENCE

Use a retro system-panel style.

Example:

``` text
┌─────────────────────────────────┐
│       SIGN UP TO EXPERIENCE     │
│                                 │
│ NAME                            │
│ [________________________]      │
│                                 │
│ USERNAME                        │
│ [________________________]      │
│                                 │
│              [ ENTER ]          │
└─────────────────────────────────┘
```

The actual implementation should provide clear labels and focus states.

Do not make the registration form intentionally inaccessible.

------------------------------------------------------------------------

# 12. Main Game HUD

The HUD should be minimal.

Possible elements:

``` text
┌─────────────────────────────────────┐
│ SCORE: 425             DAY 02       │
│                                     │
│                                     │
│           GAME WORLD                │
│                                     │
│                                     │
│                                     │
│ [E] TALK                            │
└─────────────────────────────────────┘
```

Do not permanently display large panels.

The game world should remain the focus.

------------------------------------------------------------------------

# 13. Interaction Prompt

When the player approaches an interactive object:

``` text
[E] TALK
```

or:

``` text
[E] INSPECT
```

The prompt should:

-   Appear near the interaction target.
-   Have strong contrast.
-   Be large enough to read.
-   Have a keyboard-accessible equivalent.
-   Disappear when the player moves away.

------------------------------------------------------------------------

# 14. Interaction Priority

If several objects are nearby:

``` text
Story-critical NPC
      ↓
Story-critical object
      ↓
Optional object
```

The player should not accidentally interact with an unrelated object
when trying to talk to an NPC.

------------------------------------------------------------------------

# 15. Dialogue UI

Dialogue is one of the most important UI components.

Recommended layout:

``` text
┌───────────────────────────────────────────┐
│                                           │
│            GAME WORLD                     │
│                                           │
│        [CHARACTER PORTRAIT]               │
│                                           │
├───────────────────────────────────────────┤
│ RAHUL                                     │
│                                           │
│ "I can find the button."                  │
│                                           │
│                         [SPACE] NEXT      │
└───────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 16. Dialogue Design

Dialogue should feel like a game conversation.

### Use

-   Character name
-   Portrait
-   Expression
-   Short dialogue
-   Typing animation
-   Continue indicator

### Avoid

-   Long paragraphs
-   Lecture-style explanations
-   Large blocks of accessibility theory

------------------------------------------------------------------------

# 17. Dialogue Animation

Text may appear character-by-character.

The player should be able to:

### First press

Speed up / complete current line.

### Second press

Advance to next line.

This prevents players from being forced to wait for the typing
animation.

------------------------------------------------------------------------

# 18. Character Portraits

Portraits should communicate emotion.

Possible expressions:

``` text
neutral
happy
confused
annoyed
surprised
serious
```

Do not require dozens of expressions for the MVP.

Two or three per major NPC are enough.

------------------------------------------------------------------------

# 19. Internal Thought UI

Internal thoughts should visually differ from dialogue.

Example:

``` text
────────────────────────────

PLAYER — THOUGHT

"Why is this so difficult?"

────────────────────────────
```

Possible visual treatment:

-   Slightly transparent panel
-   Italic or distinct typeface
-   No character portrait
-   Slower fade-in

Keep it short.

------------------------------------------------------------------------

# 20. System Message UI

System messages should feel like the game world is communicating
directly with the player.

Examples:

``` text
TASK RECEIVED
```

``` text
30 SECONDS
```

``` text
DESIGN DECISION REQUIRED
```

``` text
GOOD DESIGN
```

Use short text.

Do not turn system messages into paragraphs.

------------------------------------------------------------------------

# 21. Glitch Transitions

Glitch transitions are a core visual language.

Use them for:

-   Opening
-   Scene transitions
-   Realization
-   Level changes
-   Important system messages

Example:

``` text
[screen distortion]

YOU DIDN'T FAIL.

[black]

BUT THE INTERFACE DID.
```

The glitch should be brief.

------------------------------------------------------------------------

# 22. Accessibility Challenge UI

The challenge screen should feel like an in-world design terminal.

Example:

``` text
┌──────────────────────────────────────────┐
│ DESIGN DECISION REQUIRED                 │
├──────────────────────────────────────────┤
│                                          │
│ Rahul can't tell what several controls   │
│ actually do.                             │
│                                          │
│ WHAT SHOULD YOU CHANGE?                  │
│                                          │
│ > A  Add more colors                     │
│   B  Add clear labels                    │
│   C  Add more animation                  │
│   D  Hide secondary controls             │
│                                          │
│                 [ENTER] SELECT            │
└──────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 23. Challenge Interaction

The player should be able to:

-   Navigate choices with keyboard/controller.
-   Clearly see selected option.
-   Confirm selection.
-   Receive immediate feedback.

The selected option should have more than a color difference.

Use:

-   Border
-   Cursor
-   Highlight
-   Icon
-   Position change

------------------------------------------------------------------------

# 24. Correct Answer State

When correct:

``` text
GOOD DESIGN.
```

Then show the interface transformation.

Example:

``` text
BEFORE

[ ? ] [ ? ] [ ? ]

        ↓

AFTER

[ BOOK ] [ EDIT ] [ CANCEL ]
```

Then:

``` text
+100 ACCESSIBILITY
```

The score animation should be short.

------------------------------------------------------------------------

# 25. Incorrect Answer State

When incorrect:

``` text
THAT DOESN'T SOLVE THE BARRIER.
```

Then show a concise explanation.

Example:

> "The problem isn't the color. The user needs another way to understand
> the control."

Provide a retry option.

Avoid aggressive red flashing or harsh failure animations.

------------------------------------------------------------------------

# 26. Simulated Inaccessible Website

This is intentionally different from the game's normal UI.

The website should feel:

-   Frustrating
-   Visually cluttered
-   Poorly structured
-   Inconsistent
-   Difficult to interact with

It should include:

### Typography

-   Tiny secondary text
-   Weak hierarchy

### Contrast

-   Grey on grey
-   Pale controls

### Interaction

-   Tiny click areas
-   Misleading clickable regions

### Forms

-   Unclear labels
-   Confusing ordering

### CAPTCHA

-   Difficult-to-read characters

### Color

-   Color-only information

------------------------------------------------------------------------

# 27. Simulated Website UX Rule

The bad interface must be:

> **Frustrating but understandable.**

The player must know what they are trying to accomplish.

The challenge should test interface usability, not the player's ability
to guess the developer's intentions.

------------------------------------------------------------------------

# 28. 30-Second Timer UI

The timer should be highly visible.

Example:

``` text
┌───────────────┐
│      24       │
└───────────────┘
```

As time decreases, the visual urgency can increase.

However, the timer must remain readable.

Do not make the timer intentionally inaccessible.

------------------------------------------------------------------------

# 29. City Navigation UX

The player should immediately understand where they can go.

Use environmental landmarks rather than an enormous minimap.

Possible landmarks:

-   Hospital sign
-   Bank sign
-   School sign
-   Plaza
-   Design office

Optional:

``` text
CITY MAP
```

For MVP, the player should be able to navigate without requiring a
complex map.

------------------------------------------------------------------------

# 30. NPC Identification

Important NPCs should be visually recognizable.

Use:

-   Distinct sprite
-   Name on interaction
-   Optional small icon

Avoid giant quest markers unless necessary.

The player should discover characters naturally.

------------------------------------------------------------------------

# 31. Accessibility Category Indicators

When appropriate, show the category subtly.

Example:

``` text
VISUAL CHALLENGE
```

But do not reveal the answer before the player reasons about the
problem.

For harder difficulty, category labels can be hidden.

------------------------------------------------------------------------

# 32. Score HUD

Keep the score small during exploration.

Example:

``` text
SCORE 425
```

When score changes:

``` text
+100
```

Animate briefly, then return to the normal HUD.

------------------------------------------------------------------------

# 33. Accessibility Score Screen

The final score screen can be more detailed.

Example:

``` text
┌──────────────────────────────────────┐
│          DESIGN REPORT               │
│                                      │
│ VISUAL       █████████░ 90%          │
│ HEARING      ████████░░ 80%          │
│ COLOR        ██████████ 100%          │
│ MOTOR        ███████░░░ 70%          │
│                                      │
│ OVERALL      85%                      │
└──────────────────────────────────────┘
```

Do not use color alone for score interpretation.

------------------------------------------------------------------------

# 34. Final Screen

The final screen should be visually minimal.

``` text
WHO DID YOU DESIGN FOR?
```

Pause.

Then:

# EVERYONE.

The game should end with a clean fade rather than immediately returning
to a menu.

------------------------------------------------------------------------

# 35. Navigation Model

The MVP should have a simple navigation structure:

``` text
TITLE
 ↓
PROFILE
 ↓
STORY
 ↓
CITY
 ↓
CHALLENGE
 ↓
CITY
 ↓
FINAL
```

Do not introduce unnecessary nested menus.

------------------------------------------------------------------------

# 36. Pause Menu

Recommended:

``` text
PAUSED

RESUME
SETTINGS
RESTART
QUIT
```

Settings may include:

-   Text size
-   Volume
-   Subtitles
-   Reduced motion
-   Controls

------------------------------------------------------------------------

# 37. Settings

For the actual game, provide where technically feasible:

### Text

``` text
TEXT SIZE
Small
Medium
Large
```

### Audio

``` text
MASTER VOLUME
MUSIC
SFX
```

### Captions

``` text
SUBTITLES
ON / OFF
```

### Motion

``` text
REDUCED MOTION
ON / OFF
```

### Controls

Show keyboard/controller mappings.

------------------------------------------------------------------------

# 38. Responsive Behavior

If the game runs in a browser:

-   Maintain readable text at different window sizes.
-   Prevent UI from overlapping.
-   Keep important controls visible.
-   Scale pixel art consistently.
-   Preserve aspect ratio where appropriate.

Do not allow the game to become unusable when the browser is resized.

------------------------------------------------------------------------

# 39. Pixel-Art Scaling

Pixel art should remain crisp.

Avoid unwanted blur from image scaling.

Use:

-   Integer scaling where possible
-   Pixelated rendering
-   Consistent sprite resolution

The exact implementation depends on the chosen framework.

------------------------------------------------------------------------

# 40. Motion Design

Animation should be purposeful.

Use:

-   Idle character animation
-   Walking
-   Dialogue entrance
-   UI transitions
-   Glitches
-   Score feedback

Avoid excessive:

-   Screen shake
-   Flashing
-   Constant particles
-   Rapid zooms

These can interfere with readability and accessibility.

------------------------------------------------------------------------

# 41. Interaction Feedback

Every important action should provide feedback.

Examples:

### Button selected

``` text
small highlight + sound
```

### Dialogue advanced

``` text
text transition + subtle sound
```

### Correct answer

``` text
positive animation + score
```

### Incorrect answer

``` text
brief feedback + explanation
```

### Interface changed

``` text
before → transition → after
```

------------------------------------------------------------------------

# 42. UX Principle --- No Dead Ends

The player should always know what to do next.

If the player finishes a dialogue:

> Show the next interaction.

If a challenge is complete:

> Return them to the city.

If the next character is unlocked:

> Provide a subtle indication.

Never leave the player in an unexplained empty state.

------------------------------------------------------------------------

# 43. UX Principle --- Minimize Cognitive Load

The game teaches cognitive accessibility, so its own UX should
demonstrate good information architecture.

Avoid:

-   Too many simultaneous instructions
-   Long walls of text
-   Unnecessary menus
-   Inconsistent controls
-   Unclear navigation

Break complex tasks into manageable steps.

------------------------------------------------------------------------

# 44. UX Principle --- Progressive Disclosure

Do not display everything at once.

Example:

Instead of:

``` text
10 controls
5 instructions
3 objectives
4 status indicators
```

show:

``` text
CURRENT OBJECTIVE

Talk to Rahul.
```

Then reveal additional information when needed.

------------------------------------------------------------------------

# 45. UX Principle --- Consistency

The same action should behave the same way throughout the game.

If:

``` text
E = interact
```

then keep:

``` text
E = interact
```

Do not change interaction controls between scenes without a strong
reason.

------------------------------------------------------------------------

# 46. UX Principle --- Feedback Before Progression

When the player performs an important action:

``` text
ACTION
 ↓
FEEDBACK
 ↓
NEXT STATE
```

Do not immediately change the scene without telling the player what
happened.

------------------------------------------------------------------------

# 47. UX Principle --- Accessibility Is Not Decoration

Accessibility controls should be functional.

Do not add:

> "Accessibility Settings"

just for appearance.

If a setting is shown, it should work.

If a feature cannot be implemented in the MVP, do not pretend it is
functional.

------------------------------------------------------------------------

# 48. Visual Contrast Between Game and Simulation

The intentional inaccessible website should visually contrast with the
normal game.

### Normal game

-   Clear hierarchy
-   Good contrast
-   Large enough controls
-   Predictable navigation

### Simulated website

-   Poor hierarchy
-   Low contrast
-   Tiny controls
-   Confusing navigation

This visual contrast reinforces the lesson.

------------------------------------------------------------------------

# 49. UX Flow Example --- Rahul

``` text
PLAYER WALKS
      ↓
RAHUL FOUND
      ↓
[E] TALK
      ↓
DIALOGUE
      ↓
RAHUL EXPLAINS PROBLEM
      ↓
DESIGN DECISION
      ↓
SELECT OPTION
      ↓
GOOD DESIGN
      ↓
INTERFACE TRANSFORMS
      ↓
+100 ACCESSIBILITY
      ↓
RETURN TO CITY
```

The player should never wonder whether the challenge was successfully
completed.

------------------------------------------------------------------------

# 50. UX Flow Example --- Fatima

``` text
PLAYER WALKS
      ↓
FATIMA FOUND
      ↓
[E] TALK
      ↓
DIALOGUE
      ↓
AUDIO-ONLY PROBLEM REVEALED
      ↓
DESIGN DECISION
      ↓
CHOOSE CAPTIONS / TEXT
      ↓
INTERFACE CHANGES
      ↓
SCORE
      ↓
CITY
```

------------------------------------------------------------------------

# 51. UX Flow Example --- Color Vision

``` text
PLAYER
 ↓
CHARACTER
 ↓
"Which one is available?"
 ↓
PLAYER REALIZES COLOR ALONE IS INSUFFICIENT
 ↓
CHALLENGE
 ↓
ADD ICON / TEXT
 ↓
INTERFACE CHANGES
 ↓
SCORE
```

The player should discover the issue through conversation.

------------------------------------------------------------------------

# 52. UI Content Rules

Use short labels.

Prefer:

``` text
TALK
INSPECT
CONTINUE
SELECT
BACK
RESUME
```

Avoid:

``` text
Click this button to proceed to the next section of the current interaction.
```

Short labels improve readability and preserve the game feel.

------------------------------------------------------------------------

# 53. Error Message Rules

Error messages should:

-   Explain what happened.
-   Be concise.
-   Avoid blame.
-   Tell the player what they can do next.

Bad:

> ERROR!!!

Better:

> **That field is missing.**

Best:

> **Enter your name to continue.**

------------------------------------------------------------------------

# 54. Loading States

Use short game-like messages.

Examples:

``` text
LOADING CITY...
```

``` text
CONNECTING...
```

``` text
LOADING USER PROFILE...
```

Do not use generic spinning loaders everywhere if a simple pixel
animation can communicate the same thing.

------------------------------------------------------------------------

# 55. Empty States

If an area has no current interactions:

Do not leave a completely blank UI.

Possible subtle message:

> "Nothing here."

or simply allow the player to continue exploring.

Avoid unnecessary explanatory panels.

------------------------------------------------------------------------

# 56. Mobile / Touch Consideration

If the final product is browser-based and mobile support is planned:

-   Use sufficiently large touch targets.
-   Avoid hover-only interactions.
-   Support touch navigation.
-   Keep dialogue controls reachable.
-   Preserve readability.

For the hackathon MVP, desktop controls may be the primary target.

------------------------------------------------------------------------

# 57. Prototype Priority

If time is limited, prioritize these UI/UX elements:

## P0

-   Opening
-   Dialogue box
-   Player movement
-   Interaction prompt
-   Appointment simulation
-   Timer
-   Challenge UI
-   Feedback UI
-   Score
-   Interface transformation
-   Final report

## P1

-   Settings
-   Character portraits
-   Better transitions
-   Category score visualization
-   More environmental interactions

## P2

-   Advanced animations
-   Full customization
-   Advanced map
-   Extensive responsive layouts

------------------------------------------------------------------------

# 58. UI/UX Definition of Done

The UI/UX implementation is complete when:

-   The player understands how to move.
-   The player understands how to interact.
-   Dialogue is readable.
-   Important objectives are clear.
-   Challenges are understandable.
-   Options are selectable.
-   Correct/incorrect feedback is obvious.
-   Interface transformations are visible.
-   Score changes are visible.
-   Navigation is consistent.
-   Important information does not rely only on color.
-   The actual game remains accessible.
-   The intentionally inaccessible website is isolated to the
    simulation.
-   No critical UI overlaps occur during the demo.

------------------------------------------------------------------------

# 59. Final UX Principle

The most important UI/UX rule is:

> **The game should teach accessibility through its own design while
> intentionally showing what happens when a design ignores
> accessibility.**

The player should experience the difference:

``` text
BAD INTERFACE
      ↓
FRUSTRATION
      ↓
REALIZATION
      ↓
GOOD DESIGN
      ↓
UNDERSTANDING
```

That contrast is the heart of the product.
