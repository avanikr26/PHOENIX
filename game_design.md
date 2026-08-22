# GAME DESIGN DOCUMENT --- Inclusive Interface

> **Working Title:** Inclusive Interface\
> **Genre:** Narrative RPG + Visual Novel + Accessibility Simulation\
> **Core Message:** **You didn't fail. The interface did.**

------------------------------------------------------------------------

## 1. Game Vision

**Inclusive Interface** is an educational narrative game designed to
help developers, designers, and students understand accessibility by
**experiencing interface barriers first-hand**.

The player begins as a young developer who struggles to complete a
deliberately inaccessible digital task. After realizing that the problem
was the interface---not the user---the player enters a fictional city
and becomes a digital product designer.

They meet people with different needs, understand their experiences
through natural conversations, identify accessibility barriers, and make
design decisions that improve digital interfaces.

The game should feel like a **real game first** and an educational
experience second.

It must not feel like a PowerPoint presentation, accessibility textbook,
or quiz app.

------------------------------------------------------------------------

# 2. Core Design Philosophy

The game is built around one idea:

> **Accessibility is not an extra feature added after development. It is
> part of good design.**

The player should gradually move from:

**"I know accessibility exists."**

to:

**"I understand how an interface can exclude someone."**

and finally:

**"I automatically think about different users when I design."**

------------------------------------------------------------------------

# 3. Target Audience

### Primary

-   Software developers
-   Web developers
-   UI/UX designers
-   Product designers
-   Computer science students
-   Design students
-   Hackathon participants

### Secondary

-   Teachers
-   Accessibility educators
-   Students learning human-centered design
-   General players interested in technology and design

------------------------------------------------------------------------

# 4. Genre & Gameplay Style

The game combines:

-   Pixel-art RPG exploration
-   Retro 8-bit / 16-bit aesthetics
-   Visual-novel-style dialogue
-   Narrative storytelling
-   Choice-based gameplay
-   Simulated UI challenges
-   Educational decision-making
-   Score and progression systems

### Reference Feel

The visual language can take inspiration from:

-   Retro handheld RPGs
-   Pixel-art narrative games
-   Japanese visual novels
-   Classic RPG exploration
-   Retro computer interfaces
-   Roblox-like exploration and character movement

The game should **capture the feeling** of these references without
directly copying their characters, UI, assets, or environments.

------------------------------------------------------------------------

# 5. Player Role

The player controls a young aspiring digital developer.

At the beginning, the character is primarily a normal developer who has
not deeply considered accessibility.

After the opening sequence, the player becomes:

> **A DIGITAL PRODUCT DESIGNER**

The player is hired to build digital services for a fictional city.

The city contains people with different:

-   Visual needs
-   Hearing needs
-   Motor needs
-   Cognitive needs
-   Color-vision needs
-   Language needs
-   Digital-literacy needs

The player's job is to make digital services that allow everyone to
complete everyday tasks.

------------------------------------------------------------------------

# 6. Game Structure

The complete experience follows this progression:

``` text
OPENING
   ↓
SIGN UP
   ↓
DEVELOPER'S ROOM
   ↓
GRANDMA'S REQUEST
   ↓
INACCESSIBLE WEBSITE
   ↓
30-SECOND CHALLENGE
   ↓
REALIZATION
   ↓
"YOU DIDN'T FAIL."
   ↓
"THE INTERFACE DID."
   ↓
DIGITAL DESIGNER ROLE
   ↓
CITY EXPLORATION
   ↓
MEET USERS
   ↓
UNDERSTAND THEIR PROBLEM
   ↓
ACCESSIBILITY CHALLENGE
   ↓
MAKE DESIGN DECISION
   ↓
SEE INTERFACE CHANGE
   ↓
GAIN SCORE
   ↓
EXPLORE FURTHER
   ↓
EASY → MEDIUM → HARD
   ↓
FINAL CITY-WIDE DESIGN CHALLENGE
   ↓
ACCESSIBILITY REPORT
```

------------------------------------------------------------------------

# 7. Opening Experience

The opening should feel cinematic and mysterious.

## Scene 01 --- Black Screen

The screen starts completely black.

A small cursor appears.

A subtle typing sound plays.

Text appears:

``` text
SYSTEM INITIALIZING...
```

The text glitches.

``` text
USER PROFILE: UNKNOWN
```

Glitch.

The screen goes black again.

A final line appears:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

Hold for a moment.

The text disappears.

------------------------------------------------------------------------

# 8. Sign-Up Sequence

The game displays:

# SIGN UP TO EXPERIENCE

The first-time player enters basic information.

Suggested fields:

-   Name
-   Username
-   Optional character name

The sign-up should feel like part of the game world, not a generic
website form.

After submission:

``` text
PROFILE CREATED.
```

Screen flicker.

``` text
ENTERING EXPERIENCE...
```

Glitch transition.

------------------------------------------------------------------------

# 9. Chapter 1 --- The Developer

The player appears inside a small bedroom/workspace.

### Environment

The room should contain:

-   Desk
-   Laptop
-   Chair
-   Bed
-   Books
-   Window
-   Small decorations
-   Developer-related objects
-   Ambient lighting

The protagonist sits in front of the laptop.

There is no long exposition.

The player gets a short period to explore or observe the room.

Ambient sounds:

-   Laptop fan
-   Keyboard clicks
-   Room ambience
-   Distant city sounds

Then:

``` text
GRANDMA:
"Hey!"
```

The protagonist looks toward the door.

------------------------------------------------------------------------

# 10. Grandma Conversation

The dialogue should feel like a normal family conversation.

### Example

**GRANDMA:**

> "Are you busy?"

**PLAYER:**

> "Not really. What's up?"

**GRANDMA:**

> "Can you book a doctor's appointment for me?"

**PLAYER:**

> "Sure. For when?"

**GRANDMA:**

> "Tomorrow. Four in the evening."

**PLAYER:**

> "Okay. Give me a minute."

Grandma leaves.

The protagonist turns back toward the laptop.

A short pause.

Then:

``` text
TASK RECEIVED
```

Glitch.

------------------------------------------------------------------------

# 11. The Simulated Website

The game transitions from the room into a simulated appointment website.

The player receives:

> **TASK: BOOK A DOCTOR'S APPOINTMENT**

> **DATE: TOMORROW**

> **TIME: 4:00 PM**

A large timer appears:

# 30

The countdown begins.

------------------------------------------------------------------------

# 12. Important Rule --- Deliberately Inaccessible Simulation

The simulated website is **intentionally inaccessible**.

This is a game mechanic.

The actual game outside the simulation must remain usable and
accessible.

The player should experience realistic design barriers such as:

### Typography

-   Tiny secondary text
-   Poor hierarchy
-   Difficult-to-read information
-   Inconsistent sizing

### Contrast

-   Light grey text on grey
-   Pale controls
-   Weak borders
-   Low-contrast states

### Interaction

-   Tiny clickable areas
-   Difficult controls
-   Misleading button boundaries
-   Poor spacing

### Forms

-   Confusing labels
-   Unclear required fields
-   Inconsistent field order

### CAPTCHA

-   Difficult-to-read characters
-   Poor contrast
-   Confusing instructions

### Color-only communication

Example:

``` text
GREEN = AVAILABLE
RED = UNAVAILABLE
```

without another meaningful indicator.

### Cognitive overload

-   Too much information
-   Poor hierarchy
-   Unnecessary instructions
-   Distracting elements

------------------------------------------------------------------------

# 13. Why the 30-Second Challenge Exists

The timer is not intended to test the player's intelligence.

It creates a small amount of pressure so that the player can **feel the
friction caused by poor design**.

The player's reaction should ideally be:

> "Why is this so unnecessarily difficult?"

That emotional reaction is important.

It prepares the player for the next scene.

------------------------------------------------------------------------

# 14. Challenge Outcomes

There are two possible outcomes.

## If the player succeeds

Display:

# APPOINTMENT CONFIRMED

Pause.

Then:

``` text
WAIT.
```

The screen begins to distort.

------------------------------------------------------------------------

## If the player fails

Display:

# TIME'S UP

The interface freezes.

The screen glitches.

The game does not blame the player.

------------------------------------------------------------------------

# 15. The Realization Scene

Both outcomes converge into the same narrative scene.

The screen becomes black.

No music for a moment.

Then:

# YOU DIDN'T FAIL.

Pause.

Glitch.

Then:

# BUT THE INTERFACE DID.

This is the emotional turning point of the entire game.

------------------------------------------------------------------------

# 16. Internal Voice

The protagonist's internal thoughts should sound natural and personal.

Example:

**PLAYER --- THOUGHT**

> "That was just one appointment."

Pause.

> "And it was already this frustrating."

Pause.

> "What happens when someone has to deal with this every single day?"

This should not become a long lecture.

The player should **reach the conclusion emotionally**.

------------------------------------------------------------------------

# 17. Transition to the Main Game

Black screen.

A cursor appears.

Text:

``` text
ROLE UPDATED
```

Glitch.

# DIGITAL PRODUCT DESIGNER

Then:

> "You're hired to build digital services for a fictional city."

Then:

> "The city has thousands of users with different needs."

Then:

> "Your job is simple."

Pause.

> "Make sure everyone can use what you build."

The city appears.

------------------------------------------------------------------------

# 18. The City

The city is the main exploration hub.

The player can move around and discover characters and locations.

Possible locations:

-   Hospital
-   Bank
-   School
-   Railway station
-   Government office
-   Shopping area
-   Café
-   Residential area
-   Technology center
-   Public service center

The first prototype does not need every location.

For the MVP, use a small city with a few accessible buildings.

------------------------------------------------------------------------

# 19. Exploration System

The player moves around using RPG-style controls.

Possible interactions:

``` text
MOVE
INTERACT
TALK
INSPECT
ENTER
```

When approaching an important NPC:

``` text
[ TALK ]
```

appears.

Environmental objects can also be inspected.

Example:

**PLAYER:**

> "A broken sign."

Or:

> "Someone left a stack of forms here."

Small environmental observations can add world-building without
interrupting gameplay.

------------------------------------------------------------------------

# 20. Communication Style

The game's communication must feel like **actual game dialogue**.

Avoid long educational paragraphs during gameplay.

### Do not write:

> "Rahul is visually impaired and therefore requires accessible semantic
> labels."

### Instead:

**RAHUL:**

> "I use a screen reader most of the time."

**PLAYER:**

> "So this button isn't a problem?"

**RAHUL:**

> "I can find the button."

Pause.

> "I just don't know what it does."

This communicates the accessibility problem naturally.

------------------------------------------------------------------------

# 21. Dialogue Rules

All character dialogue should follow these rules:

### Rule 1 --- Natural

Characters should sound like people talking.

### Rule 2 --- Short

Keep most dialogue lines short.

### Rule 3 --- Personality-driven

Characters should not sound like instructors.

### Rule 4 --- Show, don't lecture

Let the player discover the problem.

### Rule 5 --- Avoid pity

Characters are not helpless.

### Rule 6 --- Avoid stereotypes

A disability should not be the character's entire personality.

### Rule 7 --- The player should sometimes ask questions

This makes conversations interactive.

### Rule 8 --- Accessibility concepts should emerge naturally

The game should teach without constantly saying:

> "This is an accessibility principle."

------------------------------------------------------------------------

# 22. Character Communication Format

Dialogue boxes should use:

``` text
CHARACTER NAME

"Dialogue appears here."
```

Character portraits should appear beside the dialogue box.

For important moments, use:

-   Portrait changes
-   Expression changes
-   Text typing animation
-   Screen shake
-   Glitch
-   Music changes

------------------------------------------------------------------------

# 23. Character 01 --- Rahul

### Role

Rahul is a city resident with a visual impairment.

### Personality

Calm, observant, slightly sarcastic, independent.

He should not be portrayed as weak or dependent.

### Example Dialogue

**RAHUL:**

> "Hey. You're the new designer, right?"

**PLAYER:**

> "Yeah."

**RAHUL:**

> "Good. I need your help with something."

**PLAYER:**

> "What's wrong?"

**RAHUL:**

> "Nothing's wrong with me."

Pause.

> "The website, though?"

> "That's another story."

This can lead into the accessibility challenge.

------------------------------------------------------------------------

# 24. Rahul's Challenge

Rahul is trying to use the appointment interface.

The problem could involve:

-   Missing semantic labels
-   Poor heading structure
-   Unclear controls
-   Poor text readability
-   Non-descriptive buttons

The game asks:

> **WHAT SHOULD YOU CHANGE?**

Possible answers:

A. Add more animations\
B. Make everything red\
C. Add clear labels and accessible structure\
D. Reduce the font size

Correct answer:

**C**

------------------------------------------------------------------------

# 25. Character 02 --- Fatima

### Role

Fatima has a hearing impairment.

### Personality

Confident, energetic, humorous.

### Example Dialogue

**FATIMA:**

> "Did you see the announcement?"

**PLAYER:**

> "No. What happened?"

**FATIMA:**

> "Exactly."

Pause.

> "They announced it over the speakers."

**PLAYER:**

> "Oh."

**FATIMA:**

> "Yeah. Apparently the entire building forgot that text exists."

This introduces the problem without giving a textbook explanation.

------------------------------------------------------------------------

# 26. Fatima's Challenge

Possible barriers:

-   Audio-only instructions
-   Videos without captions
-   Sound-only notifications

Possible solutions:

-   Captions
-   Transcripts
-   Visual notifications
-   Text alternatives

------------------------------------------------------------------------

# 27. Color Vision Character

The character should not simply be introduced as:

> "I am color blind."

Instead, demonstrate the problem through dialogue.

Example:

**PLAYER:**

> "The green option is available."

**CHARACTER:**

> "Which one?"

**PLAYER:**

> "The green one."

Pause.

**CHARACTER:**

> "That doesn't help."

This creates the realization naturally.

------------------------------------------------------------------------

# 28. Motor Accessibility Character

Possible dialogue:

**CHARACTER:**

> "Can you make that button bigger?"

**PLAYER:**

> "It's already there."

**CHARACTER:**

> "I know."

> "I'm trying to hit it."

This introduces the problem of tiny interaction targets.

Possible solutions:

-   Larger controls
-   Better spacing
-   Keyboard accessibility
-   Reduced precision requirements
-   Adjustable time limits

------------------------------------------------------------------------

# 29. Cognitive Accessibility Character

The character may become overwhelmed by a complicated interface.

Example:

**CHARACTER:**

> "Where am I supposed to start?"

**PLAYER:**

> "Just fill out the form."

**CHARACTER:**

> "Which part?"

The player sees that the problem is not lack of intelligence.

The interface lacks clarity.

Possible solutions:

-   Clear hierarchy
-   Simple instructions
-   Consistent navigation
-   Chunked information
-   Reduced distractions

------------------------------------------------------------------------

# 30. Language Barrier Character

The character may encounter:

-   Complex language
-   Technical terms
-   Missing language options
-   Poor translations

Example:

**CHARACTER:**

> "I know what I want to do."

**PLAYER:**

> "So what's stopping you?"

**CHARACTER:**

> "I don't understand half of the words on this page."

Possible solutions:

-   Language selection
-   Plain language
-   Consistent terminology
-   Better translations

------------------------------------------------------------------------

# 31. Character Encounter Flow

Every major encounter follows:

``` text
PLAYER EXPLORES
      ↓
NPC SPOTTED
      ↓
DIALOGUE
      ↓
USER'S GOAL REVEALED
      ↓
PROBLEM DISCOVERED
      ↓
PLAYER OBSERVES
      ↓
DESIGN QUESTION
      ↓
MULTIPLE CHOICE
      ↓
DECISION
      ↓
INTERFACE CHANGES
      ↓
FEEDBACK
      ↓
SCORE
      ↓
CONTINUE
```

------------------------------------------------------------------------

# 32. Accessibility Challenge UI

The challenge should appear as an in-world game screen rather than a
generic quiz.

Example:

``` text
────────────────────────────────
        DESIGN DECISION
────────────────────────────────

Rahul can't identify what
several controls do.

What would you change?

> A  Add more colors
  B  Add clear labels
  C  Add more animations
  D  Hide secondary controls

────────────────────────────────
       [ SELECT ]
────────────────────────────────
```

The player selects an option using normal game controls.

------------------------------------------------------------------------

# 33. Correct Answer Feedback

Do not simply display:

> CORRECT!

Instead:

``` text
GOOD DESIGN.
```

Then show the interface changing.

Example:

``` text
BEFORE

[ ? ]     [ ? ]     [ ? ]

AFTER

[ BOOK ]  [ EDIT ]  [ CANCEL ]
```

Then:

> **Clear labels make controls easier to understand.**

Keep explanations short.

------------------------------------------------------------------------

# 34. Incorrect Answer Feedback

Do not aggressively punish the player.

Example:

``` text
THAT DOESN'T SOLVE THE BARRIER.
```

Then:

> "The problem isn't the color."

> "The user needs another way to understand the control."

The player can try again or continue depending on difficulty.

------------------------------------------------------------------------

# 35. Interface Evolution

The same fictional service can visually improve as the player makes
better design decisions.

### Initial version

``` text
LOW CONTRAST
SMALL TEXT
UNCLEAR LABELS
COLOR-ONLY STATES
TINY BUTTONS
```

### Improved version

``` text
BETTER CONTRAST
CLEAR HIERARCHY
DESCRIPTIVE LABELS
MULTIPLE STATUS INDICATORS
LARGER TARGETS
```

This creates a visible representation of learning.

------------------------------------------------------------------------

# 36. Scoring System

The player receives:

### Accessibility Points

``` text
Correct decision       +100
First-attempt bonus     +25
Efficient solution      +10
Identify extra issue    +25
```

Incorrect decisions should not cause extreme penalties.

The primary objective is learning.

------------------------------------------------------------------------

# 37. Accessibility Score

The game also maintains category scores.

Example:

``` text
ACCESSIBILITY

VISUAL       █████████░ 90%
HEARING      ████████░░ 80%
MOTOR        ███████░░░ 70%
COGNITIVE    █████████░ 90%
LANGUAGE     ████████░░ 80%

OVERALL      82%
```

The score should be presented as progress, not as a judgment of the
player.

------------------------------------------------------------------------

# 38. Difficulty

## EASY --- RECOGNIZE

The problem is relatively obvious.

Example:

> "The text is impossible to read."

The correct solution is easier to identify.

------------------------------------------------------------------------

## MEDIUM --- ANALYZE

Multiple problems appear together.

The player must determine which solution addresses the user's actual
barrier.

------------------------------------------------------------------------

## HARD --- DESIGN

The game gives less direct information.

The player must infer the accessibility requirement from conversation
and observation.

Multiple answers may appear reasonable, but only one best addresses the
actual problem.

------------------------------------------------------------------------

# 39. Adaptive Learning

The game should remember the player's previous decisions.

If a player repeatedly struggles with:

-   Color accessibility
-   Motor accessibility
-   Cognitive accessibility

future scenarios can include slightly more practice with that concept.

This turns the game into a learning loop rather than a static quiz.

------------------------------------------------------------------------

# 40. Final Challenge

The final challenge should reverse the opening.

### Beginning

The player struggles with someone else's inaccessible interface.

### Ending

The player is responsible for creating the interface.

The player receives:

> **CITY PROJECT: PUBLIC HEALTH SERVICE**

Users include:

-   Rahul
-   Fatima
-   Color vision user
-   Motor accessibility user
-   Cognitive accessibility user
-   Language-barrier user

The player must make multiple design decisions.

------------------------------------------------------------------------

# 41. Final Evaluation

At the end:

# DESIGN REPORT

Example:

``` text
YOUR CITY SERVICE

Visual Accessibility       92%
Hearing Accessibility      88%
Motor Accessibility        84%
Cognitive Accessibility    90%
Language Accessibility     87%

───────────────────────────
OVERALL ACCESSIBILITY      88%
───────────────────────────
```

Then the game should provide a short narrative conclusion.

Example:

**PLAYER --- THOUGHT**

> "I used to think accessibility meant adding extra features."

Pause.

> "Now I think it means making sure nobody has to fight the interface
> just to get something done."

------------------------------------------------------------------------

# 42. Ending Message

The final screen fades toward black.

A cursor appears.

``` text
SYSTEM MESSAGE
```

Glitch.

# WHO DID YOU DESIGN FOR?

Pause.

Then:

# EVERYONE.

The game ends.

------------------------------------------------------------------------

# 43. Visual Style

### Environment

Use pixel-art environments with:

-   Strong silhouettes
-   Layered backgrounds
-   Simple environmental animation
-   Atmospheric lighting
-   Small interactive details

### Characters

Characters should have:

-   Distinct silhouettes
-   Unique clothing
-   Facial expressions
-   Idle animations
-   Dialogue portraits

### UI

The UI should use:

-   Pixel fonts where appropriate
-   Retro panels
-   Clear borders
-   Simple icons
-   Consistent interaction states

The educational challenge UI can intentionally become more polished as
the player improves the fictional interface.

------------------------------------------------------------------------

# 44. Audio Direction

Audio should reinforce the narrative.

### Opening

-   Low ambient hum
-   Keyboard sounds
-   Subtle glitches
-   Sparse music

### Inaccessible Website

-   Timer ticking
-   Slightly stressful sound design
-   Error sounds
-   Abrupt interaction feedback

Do not make the sound excessively annoying.

### City

-   Calm background music
-   Environmental sounds
-   Footsteps
-   NPC ambience

### Accessibility Challenge

-   Short transition sound
-   Decision confirmation
-   Positive feedback for correct decisions

### Major Story Moments

Music should temporarily stop or become minimal when important messages
appear.

------------------------------------------------------------------------

# 45. Glitch Language

Glitches are a recurring visual storytelling device.

Use glitches for:

-   Scene transitions
-   System messages
-   Emotional realizations
-   Level changes
-   Important revelations

Do not overuse them.

The glitch should communicate:

> "Something has changed."

------------------------------------------------------------------------

# 46. Game Communication Hierarchy

The game communicates information through five layers:

### 1. Dialogue

Characters speak naturally.

### 2. Internal thoughts

The protagonist processes what happened.

### 3. Environment

Objects and locations communicate context.

### 4. System messages

Short UI-style messages communicate game states.

### 5. Visual changes

The interface itself demonstrates consequences.

No single layer should carry the entire explanation.

------------------------------------------------------------------------

# 47. Accessibility of the Actual Game

Although the game contains an intentionally inaccessible simulated
website, the actual game should follow accessibility best practices.

The game should aim to provide:

-   Adjustable text size
-   Subtitles/captions
-   Text alternatives for important audio
-   Clear interaction states
-   Keyboard/controller support
-   Avoidance of color-only communication
-   Adjustable timing where appropriate
-   Readable contrast
-   Clear navigation
-   Optional reduced motion
-   Language support where feasible

This distinction is critical:

> **The game simulates bad accessibility. The game itself should not be
> badly accessible.**

------------------------------------------------------------------------

# 48. MVP Scope

For the hackathon prototype, prioritize a polished vertical slice
instead of a huge game.

### Must Have

-   Cinematic opening
-   Sign-up
-   Developer room
-   Grandma dialogue
-   30-second inaccessible website
-   "You didn't fail" sequence
-   City exploration
-   3--4 characters
-   Dialogue system
-   Accessibility challenges
-   Multiple-choice decisions
-   Interface transformation
-   Score system
-   At least two difficulty levels
-   Final score screen

### Nice to Have

-   Full city
-   More characters
-   More accessibility categories
-   Adaptive learning
-   Character customization
-   Save system
-   Multiple endings
-   Voice acting
-   Multiplayer

------------------------------------------------------------------------

# 49. Hackathon Demonstration Flow

For a live Code Fury presentation, the ideal demo should take
approximately 3--5 minutes.

### Demo

1.  Black screen
2.  "WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?"
3.  Developer room
4.  Grandma asks for appointment
5.  30-second inaccessible website
6.  Player struggles
7.  "YOU DIDN'T FAIL."
8.  "BUT THE INTERFACE DID."
9.  City appears
10. Meet Rahul
11. Dialogue
12. Accessibility question
13. Player selects solution
14. Interface visibly improves
15. Score increases
16. Meet another user
17. Second challenge
18. Final accessibility score

The demo should make the judges understand the concept **without
requiring a long explanation from the team**.

------------------------------------------------------------------------

# 50. Core Success Metric

The game is successful if a player finishes and starts thinking:

> **"Before I design an interface, I should ask who might struggle to
> use it."**

That is the actual learning outcome.

------------------------------------------------------------------------

# 51. Final Product Statement

> **Inclusive Interface is a narrative accessibility game where players
> first experience the frustration of a poorly designed interface and
> then become designers responsible for creating digital experiences
> that work for people with different needs.**

The player doesn't learn accessibility because the game tells them what
it is.

**They learn because the game makes them experience why it matters.**
