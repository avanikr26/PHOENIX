# GAME_DESIGN.md --- Inclusive Interface

# 1. Game Overview

**Title:** Inclusive Interface

**Genre:** Narrative RPG / Visual Novel / Accessibility Design
Simulation

**Visual Style:** 8-bit / pixel-art game with cinematic glitch
transitions

**Platform:** Browser

**Primary Audience:** Developers, designers, students, product teams,
and anyone who builds digital interfaces.

**Core Purpose:**

> Teach players how inaccessible digital design affects people with
> different needs by letting them experience barriers, meet fictional
> users, make design decisions, and see the consequences.

This is not a tool that directly "fixes" disabilities.

It is a game about **designing digital experiences that do not create
unnecessary barriers.**

------------------------------------------------------------------------

# 2. Core Game Idea

The player begins as a young developer.

They initially believe that if a website works for them, it is probably
good enough.

The game challenges that assumption.

The player first experiences a deliberately frustrating digital
interface while trying to help their grandmother book a doctor's
appointment.

Then the game reveals:

> **YOU DIDN'T FAIL.**

Pause.

> **BUT THE INTERFACE DID.**

The player is then given a new role:

> **DIGITAL PRODUCT DESIGNER**

They enter a fictional city where different people experience different
digital barriers.

The player's job is to:

``` text
Meet people
   ↓
Listen to their experiences
   ↓
Understand the barrier
   ↓
Choose a design solution
   ↓
See the interface change
   ↓
Earn score
   ↓
Learn
   ↓
Face harder challenges
```

------------------------------------------------------------------------

# 3. The Core Design Philosophy

The game should teach through **experience**, not lectures.

Instead of saying:

> "Low contrast is bad for users with visual impairments."

the game should make the player encounter:

``` text
Poor contrast
   ↓
Difficulty understanding interface
   ↓
Meet affected user
   ↓
Choose better contrast
   ↓
See improvement
```

The player should understand the principle because they **used it**, not
because they memorized a definition.

------------------------------------------------------------------------

# 4. What Makes the Game Different

Most solutions to the accessibility problem may attempt to:

``` text
make a website accessible
add voice navigation
add speech recognition
add accessibility controls
```

This project approaches the problem differently.

The game targets the **people who design digital experiences**.

The question is not:

> "How can technology help disabled users use this website?"

The question is:

> **"Why was the website designed in a way that created the barrier in
> the first place?"**

The game therefore teaches inclusive thinking at the design stage.

------------------------------------------------------------------------

# 5. Player Role

The player begins as:

``` text
Junior Developer
```

After the opening realization, the role becomes:

``` text
Digital Product Designer
```

The player is hired to design services for a fictional city.

The city contains people with different:

``` text
visual needs
hearing needs
motor needs
cognitive needs
color-vision needs
language needs
```

The player's objective is to make digital services usable by as many
people as possible.

------------------------------------------------------------------------

# 6. Narrative Structure

The game is divided into major acts.

``` text
ACT 0 — SYSTEM INITIALIZING
        ↓
ACT 1 — THE FRUSTRATION
        ↓
ACT 2 — THE REALIZATION
        ↓
ACT 3 — THE CITY
        ↓
ACT 4 — THE PEOPLE
        ↓
ACT 5 — THE DESIGNER
        ↓
ACT 6 — THE FINAL TEST
        ↓
ACT 7 — THE REFLECTION
```

------------------------------------------------------------------------

# 7. ACT 0 --- System Initializing

The screen begins completely black.

Text appears:

> SYSTEM INITIALIZING...

Glitch.

> USER PROFILE: UNKNOWN

Glitch.

Then:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

The title disappears.

The player enters profile setup.

------------------------------------------------------------------------

# 8. Profile Setup

Screen:

# SIGN UP TO EXPERIENCE

The player enters:

``` text
Name
Username
```

This is not real authentication.

The information exists only to personalize the game.

No real:

``` text
password
phone number
address
medical data
```

is required.

------------------------------------------------------------------------

# 9. ACT 1 --- The Developer

The protagonist appears in their room.

Environment:

``` text
desk
laptop
chair
bed
window
books
developer equipment
```

The protagonist is a young developer.

They are looking at their laptop.

Then:

``` text
GRANDMA:
"Can you help me book a doctor's appointment?"
```

Player:

``` text
"Sure. What time?"
```

Grandma:

``` text
"Tomorrow. 4 PM."
```

The protagonist opens the appointment website.

------------------------------------------------------------------------

# 10. The Appointment Challenge

The entire screen changes into the simulated website.

The player has:

# 30 SECONDS

to book:

``` text
Doctor appointment
Tomorrow
4 PM
```

The website intentionally contains barriers.

Examples:

``` text
tiny text
poor contrast
tiny click targets
unclear labels
confusing hierarchy
bad CAPTCHA
color-only indicators
weak error messages
```

The website is intentionally bad.

The **actual game UI is not**.

------------------------------------------------------------------------

# 11. Why the Appointment Challenge Exists

The purpose is not to test the player's reflexes.

The purpose is to create an emotional realization:

> "If this is frustrating for me, what must it feel like for someone who
> actually depends on accessible design?"

The player may:

``` text
complete the task
```

or:

``` text
run out of time
```

Both paths continue into the same narrative realization.

------------------------------------------------------------------------

# 12. Success Path

If the player completes the appointment:

# YOUR APPOINTMENT IS CONFIRMED

Pause.

The player thinks:

> WAIT.

Then the realization sequence begins.

------------------------------------------------------------------------

# 13. Failure Path

If the timer expires:

# TIME'S UP.

No:

> YOU FAILED.

Instead, the game moves into the same realization.

------------------------------------------------------------------------

# 14. Realization

Black screen.

Glitch.

# YOU DIDN'T FAIL.

Pause.

# BUT THE INTERFACE DID.

This is the central narrative statement of the game.

------------------------------------------------------------------------

# 15. ACT 2 --- Role Change

The player is introduced to a new role:

# DIGITAL PRODUCT DESIGNER

Then:

> You're hired to build digital services for a fictional city.

Then:

> The city has thousands of users with different needs.

Then:

> Your job is to design interfaces that let everyone complete their
> tasks.

The city opens.

------------------------------------------------------------------------

# 16. ACT 3 --- The City

The city is a small explorable pixel-art environment.

The player can:

``` text
walk
explore
talk to NPCs
discover locations
start challenges
return to previous areas
```

The city acts as the game's main hub.

------------------------------------------------------------------------

# 17. City Design Philosophy

The city should feel alive without requiring a huge open world.

Use:

``` text
small districts
NPCs
shops
hospital
home
office
public services
signboards
interactive objects
```

The player should naturally encounter characters.

------------------------------------------------------------------------

# 18. NPC Characters

The first core characters include:

``` text
Rahul
Fatima
Mira
```

Additional characters can be added later.

Each character represents a different accessibility perspective.

------------------------------------------------------------------------

# 19. Rahul

**Primary accessibility category:**

``` text
Visual
```

Rahul experiences barriers caused by interfaces that depend too heavily
on visual recognition.

Possible issues:

``` text
unlabeled icons
small text
poor contrast
unclear focus
visual-only status
complex layouts
```

Rahul should be presented as a complete person, not as a "disability
example."

His personality, preferences, humor, and opinions should exist
independently of his accessibility needs.

------------------------------------------------------------------------

# 20. Fatima

**Primary accessibility category:**

``` text
Hearing
```

Fatima experiences barriers when important information is communicated
only through:

``` text
sound
audio alerts
spoken instructions
audio confirmation
```

Possible improvements include:

``` text
captions
visual notifications
text alternatives
visible status messages
```

Again, Fatima is a character first.

------------------------------------------------------------------------

# 21. Mira

**Primary accessibility category:**

``` text
Color Vision
```

Mira encounters interfaces that rely on:

``` text
red vs green
color-only status
color-coded charts
color-only warnings
```

Possible improvements:

``` text
icons
labels
patterns
text
shape
additional indicators
```

------------------------------------------------------------------------

# 22. Future Characters

The architecture should allow additional characters representing:

``` text
motor accessibility
cognitive accessibility
language barriers
low digital literacy
temporary impairments
situational limitations
```

The game should never require a new gameplay engine for a new character.

------------------------------------------------------------------------

# 23. Character Encounter Structure

A typical encounter:

``` text
Explore city
   ↓
See NPC
   ↓
Interact
   ↓
Character dialogue
   ↓
Character explains/experiences a problem
   ↓
Challenge introduced
   ↓
Player makes design decision
```

------------------------------------------------------------------------

# 24. Multiple Challenges Per Character

This is a critical design requirement.

A character is **not completed after one MCQ**.

Each character has multiple challenges.

Example:

``` text
RAHUL

EASY
 ├── Challenge 01
 ├── Challenge 02
 └── Challenge 03

MEDIUM
 ├── Challenge 01
 ├── Challenge 02
 └── Challenge 03

HARD
 ├── Challenge 01
 ├── Challenge 02
 └── Challenge 03
```

The exact number can expand through content data.

The game must never assume only two questions exist.

------------------------------------------------------------------------

# 25. Challenge Structure

Each challenge contains:

``` text
Character context
Scenario
Question
Options
Correct answer
Explanation
Score
Interface transformation
```

The player should understand the scenario before answering.

------------------------------------------------------------------------

# 26. Challenge Example

Example:

``` text
Rahul opens a booking website.

Three important buttons contain only icons.

He cannot reliably tell what they do.

What is the best improvement?
```

Options:

``` text
A. Make the icons more colorful.
B. Add clear, descriptive labels.
C. Add more animation.
D. Make the icons smaller.
```

Correct decision:

``` text
B
```

Then the interface visibly changes.

------------------------------------------------------------------------

# 27. Dynamic Challenge System

Challenges are data-driven.

The game should:

``` text
load challenge pool
 ↓
filter by character
 ↓
filter by difficulty
 ↓
remove completed challenges
 ↓
select next challenge
 ↓
render dynamically
```

The UI must not contain hardcoded questions.

------------------------------------------------------------------------

# 28. Difficulty Design

There are three MVP difficulty levels:

``` text
EASY
MEDIUM
HARD
```

## Easy

Focus:

``` text
one obvious accessibility barrier
clear scenario
strong best answer
simple transformation
```

## Medium

Focus:

``` text
less obvious barrier
multiple plausible choices
contextual reasoning
more realistic interface
```

## Hard

Focus:

``` text
multiple barriers
trade-offs
prioritization
complex design reasoning
multiple accessibility considerations
```

------------------------------------------------------------------------

# 29. Difficulty Progression

Recommended:

``` text
Easy
 ↓
required Easy challenges complete
 ↓
Medium unlocked
 ↓
required Medium challenges complete
 ↓
Hard unlocked
```

Unlock thresholds should be configurable.

------------------------------------------------------------------------

# 30. Challenge Feedback

Wrong answer:

``` text
NOT QUITE.

Think about what the user
is actually experiencing.

[TRY AGAIN]
```

Correct answer:

``` text
✓ GOOD CHOICE

ACCESSIBILITY IMPROVED
+125
```

Then show the interface transformation.

------------------------------------------------------------------------

# 31. Interface Transformation

The game should demonstrate the effect of good design.

Example:

Before:

``` text
[ 🔍 ] [ 🛒 ] [ ⚙ ]
```

After:

``` text
[ 🔍 Search ] [ 🛒 Cart ] [ ⚙ Settings ]
```

The player should visually understand:

> "My decision changed the interface."

------------------------------------------------------------------------

# 32. Transformation Types

Possible transformations:

``` text
add descriptive labels
increase target size
add text status
add captions
add visual alert
improve error message
improve reading order
add progress indicator
```

Transformations are identified by IDs.

------------------------------------------------------------------------

# 33. Score System

The game rewards good design decisions.

Possible scoring:

``` text
Correct answer
+ base points

First attempt
+ bonus

Efficient decision
+ bonus
```

Score should contribute to:

``` text
overall score
category score
final evaluation
```

------------------------------------------------------------------------

# 34. Learning Through Consequences

The player should not only receive:

``` text
CORRECT
```

They should also see:

``` text
WHAT CHANGED?
```

For example:

``` text
Your decision added descriptive labels.

Now the purpose of each control
is clear without guessing.
```

This reinforces the design principle.

------------------------------------------------------------------------

# 35. Character Completion

A character is complete when their required challenge progression is
complete.

Example:

``` text
Rahul
Easy   3/3
Medium 3/3
Hard   3/3
```

Then the player can receive a closing dialogue and return to
exploration.

------------------------------------------------------------------------

# 36. Character Progress UI

The player may see:

``` text
RAHUL

EASY
✓ ✓ ✓

MEDIUM
✓ ✓ ○

HARD
🔒 🔒 🔒
```

This communicates that the game contains multiple challenges.

------------------------------------------------------------------------

# 37. Exploration Loop

The main loop is:

``` text
EXPLORE
 ↓
DISCOVER NPC
 ↓
DIALOGUE
 ↓
CHALLENGE
 ↓
DECISION
 ↓
TRANSFORMATION
 ↓
SCORE
 ↓
PROGRESSION
 ↓
EXPLORE
```

This loop repeats with increasing complexity.

------------------------------------------------------------------------

# 38. Final Design Challenge

After enough progression, the player enters a final design scenario.

The player is told:

> You're designing a healthcare service.

Then:

> Your users have different needs.

The player must make several design decisions.

The final challenge combines lessons from previous encounters.

------------------------------------------------------------------------

# 39. Final Challenge Philosophy

The final challenge should test whether the player can:

``` text
identify barriers
prioritize users
avoid one-size-fits-all assumptions
design for multiple needs
justify design decisions
```

It should not simply ask the player to repeat definitions.

------------------------------------------------------------------------

# 40. Final Evaluation

After completing the final challenge:

``` text
DESIGN REVIEW COMPLETE
```

Then category scores:

``` text
VISUAL
HEARING
COLOR
...
```

Then:

``` text
OVERALL INCLUSIVITY SCORE
```

Only categories actually used in the game should be displayed.

------------------------------------------------------------------------

# 41. Ending

The game returns to the visual language of the opening.

Black screen.

Glitch.

> USER PROFILE: KNOWN

Then:

# WHAT IF THE INTERFACE WAS DESIGNED FOR EVERYONE?

Fade out.

------------------------------------------------------------------------

# 42. Game Feel

The game should feel:

``` text
curious
slightly mysterious
cinematic
playful
retro
empathetic
thought-provoking
```

It should not feel:

``` text
corporate
academic
preachy
like a form
like an accessibility audit tool
```

------------------------------------------------------------------------

# 43. 8-Bit / Pixel-Art Identity

The game uses:

``` text
pixel characters
pixel environments
pixel props
retro UI elements
limited animation
glitch effects
```

The style should be inspired by the **language of retro games**, not
copied from a particular game.

------------------------------------------------------------------------

# 44. Narrative + Gameplay Balance

Do not let dialogue become too long.

Do not let challenges appear without context.

Every challenge should answer:

``` text
Who is experiencing this?
What is the barrier?
Why does it matter?
What can the designer change?
```

------------------------------------------------------------------------

# 45. Player Learning Model

The intended learning progression:

``` text
Experience a barrier
        ↓
Question assumption
        ↓
Meet affected user
        ↓
Understand context
        ↓
Make decision
        ↓
See consequence
        ↓
Generalize principle
        ↓
Apply to harder scenario
```

------------------------------------------------------------------------

# 46. Game State

The game should track:

``` text
player profile
current scene
current character
current challenge
difficulty
score
category scores
completed challenges
attempts
character progress
unlocked difficulties
discovered characters
game completion
```

------------------------------------------------------------------------

# 47. Content Expansion

The design intentionally supports expansion.

A future content update may add:

``` text
new character
new accessibility category
new city area
new challenges
new transformations
new difficulty
```

without replacing the core gameplay loop.

------------------------------------------------------------------------

# 48. No Fixed Question Count

This is mandatory.

The design must never state:

``` text
Rahul has exactly 2 questions.
Fatima has exactly 2 questions.
```

Instead:

``` text
Each character has a configurable challenge pool.
```

The content determines the number of questions.

------------------------------------------------------------------------

# 49. Player Agency

The player should feel that their decisions matter.

When the player chooses:

``` text
Add captions
```

they should see:

``` text
captions appear
```

When they choose:

``` text
Add descriptive labels
```

they should see:

``` text
labels appear
```

This creates a direct relationship between:

``` text
DECISION → CONSEQUENCE
```

------------------------------------------------------------------------

# 50. Accessibility as a Design Principle

The game should teach:

> Accessibility is not an extra feature added at the end.

Instead:

> **Inclusive design should be considered from the beginning.**

The game should demonstrate this through mechanics rather than relying
only on text.

------------------------------------------------------------------------

# 51. Representation Principle

The goal is not:

> "Fix Rahul."

The goal is:

> "Remove the barrier that Rahul encounters."

This distinction should be reflected in:

``` text
dialogue
challenge wording
feedback
visuals
narrative
```

------------------------------------------------------------------------

# 52. Core Game Loop in One Sentence

> **Meet someone, understand their barrier, make a design decision, see
> the interface change, and become a better designer.**

------------------------------------------------------------------------

# 53. Technical Design Relationship

This game design depends on the following systems:

``` text
CONTENT.md
     ↓
Challenge Data
     ↓
ChallengeManager
     ↓
Dynamic Challenge UI
     ↓
TransformationManager
     ↓
ScoreManager
     ↓
ProgressionManager
```

The design intentionally avoids a hardcoded question flow.

------------------------------------------------------------------------

# 54. Definition of Done

The game design is successfully implemented when:

``` text
[ ] Opening cinematic exists.
[ ] Profile setup exists.
[ ] Developer room exists.
[ ] Grandma interaction exists.
[ ] 30-second appointment simulation exists.
[ ] Simulation contains intentional accessibility barriers.
[ ] Success and failure converge into realization.
[ ] "YOU DIDN'T FAIL. BUT THE INTERFACE DID." exists.
[ ] Player becomes a digital product designer.
[ ] City exploration exists.
[ ] Multiple NPC characters exist.
[ ] Each character supports multiple challenges.
[ ] Easy/Medium/Hard progression exists.
[ ] Challenges are dynamically loaded.
[ ] Questions/options are not hardcoded in UI.
[ ] Correct answers trigger transformations.
[ ] Score and progress update.
[ ] Character completion works.
[ ] Final multi-decision challenge exists.
[ ] Final evaluation exists.
[ ] Ending sequence exists.
[ ] Actual game UI remains accessible.
```

------------------------------------------------------------------------

# 55. Final Design Statement

**Inclusive Interface** is designed to make the player ask one question
repeatedly:

> **"Would this interface still work if I wasn't the person it was
> designed around?"**

The game does not teach accessibility by telling the player what to
think.

It teaches them by making them:

``` text
experience
→ understand
→ design
→ change
→ learn
```

That is the heart of the game.
