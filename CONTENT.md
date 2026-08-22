# CONTENT.md --- Inclusive Interface

# 1. Purpose

This document contains the **actual player-facing content** for the
Inclusive Interface MVP.

It defines:

-   Narrative text
-   Character dialogue
-   System messages
-   Internal thoughts
-   Objectives
-   Accessibility challenge questions
-   Answer options
-   Feedback
-   Interface transformation examples
-   Final evaluation text

This file is content, not implementation logic.

------------------------------------------------------------------------

# 2. Content Tone

The game should sound like a real narrative game.

## Tone

-   Human
-   Conversational
-   Slightly mysterious
-   Modern
-   Emotional when necessary
-   Occasionally humorous
-   Never preachy

## Important Rule

Characters should **not explain accessibility like teachers**.

Instead of:

> "People with visual impairments require semantic labels."

Use:

> "I can find the button. I just don't know what it does."

The game teaches the principle through the situation.

------------------------------------------------------------------------

# 3. Writing Rules

### Keep dialogue short

Use short lines and pauses.

### Give characters personality

NPCs should sound like individual people.

### Avoid pity

Do not portray disability as tragedy.

### Avoid stereotypes

A character's accessibility need should not be their entire identity.

### Show before explaining

Let the player notice the problem first.

### Use explanations after decisions

Educational explanations should generally appear as short feedback after
the player chooses an answer.

------------------------------------------------------------------------

# 4. Opening Sequence

## Scene: Black Screen

``` text
SYSTEM INITIALIZING...
```

Pause.

``` text
USER PROFILE: UNKNOWN
```

Glitch.

Black screen.

Then:

# WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

Hold.

Fade.

------------------------------------------------------------------------

# 5. Sign-Up Screen

Title:

# SIGN UP TO EXPERIENCE

Supporting text:

> "Try it yourself."

Fields:

``` text
NAME
USERNAME
```

Button:

``` text
[ ENTER EXPERIENCE ]
```

After submission:

``` text
PROFILE CREATED.
```

Short glitch.

``` text
ENTERING EXPERIENCE...
```

------------------------------------------------------------------------

# 6. Developer Room

The player enters the protagonist's room.

No long narration is required.

Optional environmental text:

``` text
A laptop that has seen better days.
```

``` text
Half-finished code.
Again.
```

``` text
A cup of coffee.
Cold.
```

These lines should be optional environmental observations.

------------------------------------------------------------------------

# 7. Grandma Encounter

Grandma calls from another room.

### Dialogue

**GRANDMA**

> "Hey!"

**PLAYER**

> "Yeah?"

**GRANDMA**

> "Are you busy?"

**PLAYER**

> "Not really. What's up?"

**GRANDMA**

> "Can you book a doctor's appointment for me?"

**PLAYER**

> "Sure. For when?"

**GRANDMA**

> "Tomorrow. Four in the evening."

**PLAYER**

> "Okay. Give me a minute."

Grandma leaves.

Short pause.

Laptop screen lights up.

------------------------------------------------------------------------

# 8. Task Assignment

System message:

``` text
TASK RECEIVED
```

Then:

``` text
BOOK A DOCTOR'S APPOINTMENT
```

Then:

``` text
TOMORROW
4:00 PM
```

Then:

``` text
30 SECONDS
```

------------------------------------------------------------------------

# 9. Appointment Website Content

The website should look like a fictional healthcare appointment portal.

Suggested title:

``` text
CITYCARE
```

Page:

``` text
BOOK YOUR APPOINTMENT
```

Fields:

``` text
SELECT DEPARTMENT
SELECT DOCTOR
SELECT DATE
SELECT TIME
PATIENT DETAILS
CAPTCHA
```

Button:

``` text
CONTINUE
```

The website should intentionally contain accessibility problems.

------------------------------------------------------------------------

# 10. Simulated Website Microcopy

Examples of intentionally poor content:

``` text
Appointment Date
```

Secondary text:

``` text
Please select an available date from the calendar below. Appointments are subject to availability and may be changed or cancelled without prior notice.
```

The secondary text should be visually too small in the simulation.

------------------------------------------------------------------------

# 11. CAPTCHA Content

Example:

``` text
VERIFY YOU ARE HUMAN

Type the characters shown:

8R?mQ1
```

The CAPTCHA should be visually distorted and difficult to read.

The purpose is to demonstrate how an inaccessible verification process
can create unnecessary barriers.

------------------------------------------------------------------------

# 12. Appointment Challenge Outcome --- Success

If the player completes the task:

# APPOINTMENT CONFIRMED

Then:

``` text
BOOKING ID: CC-4821
```

Pause.

The screen glitches.

Then:

``` text
WAIT.
```

------------------------------------------------------------------------

# 13. Appointment Challenge Outcome --- Failure

If the timer reaches zero:

# TIME'S UP

Pause.

The interface freezes.

Glitch.

Then:

``` text
...
```

Both success and failure continue into the same realization.

------------------------------------------------------------------------

# 14. Realization Sequence

Black screen.

No background music for a moment.

Then:

# YOU DIDN'T FAIL.

Pause.

Glitch.

Then:

# BUT THE INTERFACE DID.

Pause.

------------------------------------------------------------------------

# 15. Internal Thought

**PLAYER --- THOUGHT**

> "That was just one appointment."

Pause.

> "And it was already this frustrating."

Pause.

> "What happens when someone has to deal with this every single day?"

Fade to black.

------------------------------------------------------------------------

# 16. Designer Introduction

System message:

``` text
ROLE UPDATED
```

Glitch.

# DIGITAL PRODUCT DESIGNER

Then:

> "You're hired to build digital services for a fictional city."

Next:

> "The city has thousands of users with different needs."

Pause.

> "Your job is simple."

Pause.

> "Make sure everyone can use what you build."

------------------------------------------------------------------------

# 17. City Arrival

The player enters the city.

System message:

``` text
NEW LOCATION
```

# CITY DISTRICT 01

Optional objective:

``` text
OBJECTIVE

Explore the city.
Talk to people.
Find out what they need.
```

------------------------------------------------------------------------

# 18. Rahul --- Character Content

## Character Profile

**Name:** Rahul

**Accessibility focus:** Visual accessibility

**Personality:**

-   Calm
-   Observant
-   Independent
-   Slightly sarcastic

Rahul should feel like a normal person, not an accessibility tutorial.

------------------------------------------------------------------------

## Rahul First Encounter

**RAHUL**

> "You're the new designer, right?"

**PLAYER**

> "Yeah."

**RAHUL**

> "Good."

Pause.

> "I need your help with something."

**PLAYER**

> "What's wrong?"

**RAHUL**

> "Nothing's wrong with me."

Pause.

> "The website, though?"

> "That's another story."

------------------------------------------------------------------------

# 19. Rahul --- Problem Discovery

**PLAYER**

> "What happens?"

**RAHUL**

> "I can find most of the buttons."

**PLAYER**

> "So what's the problem?"

**RAHUL**

> "I don't know what half of them do."

Pause.

**PLAYER**

> "They're not labeled?"

**RAHUL**

> "Exactly."

Challenge begins.

------------------------------------------------------------------------

# 20. Rahul Challenge

System:

``` text
DESIGN DECISION REQUIRED
```

Scenario:

> Rahul can locate several controls, but their purpose is unclear.

Question:

# WHAT SHOULD YOU CHANGE?

Options:

``` text
A. Add more colors to the buttons.

B. Add clear, descriptive labels.

C. Add more animations when the buttons are hovered.

D. Hide the less important controls.
```

Correct answer:

**B**

------------------------------------------------------------------------

# 21. Rahul --- Correct Feedback

System:

# GOOD DESIGN.

Then:

``` text
BEFORE

[ ? ]     [ ? ]     [ ? ]
```

Transition.

``` text
AFTER

[ BOOK ]  [ EDIT ]  [ CANCEL ]
```

Feedback:

> "Clear labels make controls easier to understand."

Score:

``` text
+100 ACCESSIBILITY
```

------------------------------------------------------------------------

# 22. Rahul --- Incorrect Feedback

System:

# THAT DOESN'T SOLVE THE BARRIER.

Then:

> "The problem isn't that the buttons need more decoration."

Pause.

> "The user needs to know what each control actually does."

Retry:

``` text
[ TRY AGAIN ]
```

------------------------------------------------------------------------

# 23. Fatima --- Character Content

## Character Profile

**Name:** Fatima

**Accessibility focus:** Hearing accessibility

**Personality:**

-   Confident
-   Energetic
-   Humorous
-   Direct

------------------------------------------------------------------------

# 24. Fatima First Encounter

**FATIMA**

> "Did you hear the announcement?"

**PLAYER**

> "No. What happened?"

**FATIMA**

> "Exactly."

Pause.

> "They announced it over the speakers."

**PLAYER**

> "Oh."

**FATIMA**

> "Yeah."

Pause.

> "Apparently the entire building forgot that text exists."

------------------------------------------------------------------------

# 25. Fatima --- Problem Discovery

**PLAYER**

> "So you missed the announcement?"

**FATIMA**

> "I missed the audio."

Pause.

> "The information itself shouldn't have to disappear with it."

Challenge begins.

------------------------------------------------------------------------

# 26. Fatima Challenge

System:

``` text
DESIGN DECISION REQUIRED
```

Scenario:

> An important announcement is available only through a loudspeaker.

Question:

# HOW SHOULD YOU MAKE THE INFORMATION MORE ACCESSIBLE?

Options:

``` text
A. Increase the speaker volume.

B. Add captions or a written version.

C. Repeat the announcement more loudly.

D. Add background music to make it noticeable.
```

Correct answer:

**B**

------------------------------------------------------------------------

# 27. Fatima --- Correct Feedback

System:

# GOOD DESIGN.

Visual transformation:

``` text
BEFORE

🔊 "PLATFORM 4 HAS CHANGED."
```

After:

``` text
🔊 PLATFORM 4 HAS CHANGED.

[TEXT ANNOUNCEMENT]
```

Feedback:

> "Important information shouldn't depend on hearing alone."

Score:

``` text
+100 ACCESSIBILITY
```

------------------------------------------------------------------------

# 28. Fatima --- Incorrect Feedback

System:

# THAT DOESN'T REMOVE THE BARRIER.

Then:

> "Making the sound louder doesn't make the information available to
> someone who can't hear it."

Retry.

------------------------------------------------------------------------

# 29. Color Vision Character

For the MVP, the third character can represent color-vision
accessibility.

## Personality

-   Friendly
-   Practical
-   Straightforward

Avoid defining the character entirely through color blindness.

------------------------------------------------------------------------

# 30. Color Vision Character --- First Encounter

**PLAYER**

> "The green option is available."

**CHARACTER**

> "Which one?"

**PLAYER**

> "The green one."

Pause.

**CHARACTER**

> "That doesn't help."

The player pauses.

**PLAYER**

> "Right."

Challenge begins.

------------------------------------------------------------------------

# 31. Color Vision Challenge

System:

``` text
DESIGN DECISION REQUIRED
```

Scenario:

> Appointment availability is communicated using only red and green.

Question:

# WHAT SHOULD YOU CHANGE?

Options:

``` text
A. Make the red brighter.

B. Make the green brighter.

C. Add text or icons alongside the colors.

D. Remove the appointment status.
```

Correct:

**C**

------------------------------------------------------------------------

# 32. Color Vision --- Correct Feedback

System:

# GOOD DESIGN.

Before:

``` text
🟢
🔴
```

After:

``` text
✓ AVAILABLE
✕ UNAVAILABLE
```

Feedback:

> "Color can support information. It shouldn't be the only way to
> understand it."

Score:

``` text
+100 ACCESSIBILITY
```

------------------------------------------------------------------------

# 33. Color Vision --- Incorrect Feedback

System:

# COLOR ALONE ISN'T ENOUGH.

Then:

> "Making the colors brighter doesn't solve the problem."

> "Give the user another way to understand the status."

Retry.

------------------------------------------------------------------------

# 34. Optional Motor Character

If implemented, use:

**Accessibility focus:** Motor accessibility

### Dialogue

**CHARACTER**

> "Can you make that button bigger?"

**PLAYER**

> "It's already there."

**CHARACTER**

> "I know."

Pause.

> "I'm trying to hit it."

Challenge:

> **What should you change?**

Options:

``` text
A. Make the target smaller.

B. Increase the target size and spacing.

C. Add more animation.

D. Reduce the button's contrast.
```

Correct:

**B**

Feedback:

> "Interfaces shouldn't require unnecessary precision."

------------------------------------------------------------------------

# 35. Optional Cognitive Character

If implemented:

**CHARACTER**

> "Where am I supposed to start?"

**PLAYER**

> "Just fill out the form."

**CHARACTER**

> "Which part?"

Challenge:

> **What would help?**

Possible correct solutions:

-   Clear hierarchy
-   Step-by-step instructions
-   Reduced complexity
-   Consistent navigation

Feedback:

> "Clear structure reduces unnecessary cognitive load."

------------------------------------------------------------------------

# 36. Optional Language Barrier Character

If implemented:

**CHARACTER**

> "I know what I want to do."

**PLAYER**

> "So what's stopping you?"

**CHARACTER**

> "I don't understand half the words on this page."

Challenge solutions:

-   Plain language
-   Language selection
-   Better translation
-   Consistent terminology

Feedback:

> "An interface can't be inclusive if users can't understand it."

------------------------------------------------------------------------

# 37. City Objective Content

After entering the city:

``` text
OBJECTIVE

Explore the city.
Find people who need your help.
```

After the first NPC:

``` text
NEW OBJECTIVE

Understand the user before changing the interface.
```

After completing multiple challenges:

``` text
OBJECTIVE UPDATED

More users are waiting.
```

------------------------------------------------------------------------

# 38. System Messages

Use short system messages throughout the game.

Available messages:

``` text
SYSTEM INITIALIZING...
```

``` text
USER PROFILE: UNKNOWN
```

``` text
PROFILE CREATED.
```

``` text
TASK RECEIVED
```

``` text
30 SECONDS
```

``` text
TIME'S UP
```

``` text
APPOINTMENT CONFIRMED
```

``` text
ROLE UPDATED
```

``` text
DIGITAL PRODUCT DESIGNER
```

``` text
NEW LOCATION
```

``` text
DESIGN DECISION REQUIRED
```

``` text
GOOD DESIGN.
```

``` text
THAT DOESN'T SOLVE THE BARRIER.
```

``` text
CHALLENGE COMPLETE
```

``` text
NEW USER DISCOVERED
```

------------------------------------------------------------------------

# 39. Score Messages

Use short animations/messages:

``` text
+100 ACCESSIBILITY
```

``` text
+25 FIRST ATTEMPT
```

Optional:

``` text
+10 EFFICIENT DESIGN
```

Category feedback:

``` text
VISUAL ACCESSIBILITY ↑
```

or:

``` text
HEARING ACCESSIBILITY ↑
```

------------------------------------------------------------------------

# 40. Discovery Messages

When a player finds a new NPC:

``` text
NEW USER DISCOVERED
```

Then:

``` text
RAHUL
VISUAL ACCESSIBILITY
```

For harder difficulty, the category label can be hidden so the player
must infer the problem.

------------------------------------------------------------------------

# 41. Final Challenge Content

System:

``` text
FINAL DESIGN CHALLENGE
```

Then:

> "The city is launching a new public healthcare service."

> "Thousands of people will use it."

Then:

``` text
YOUR USERS:

Rahul
Fatima
Color Vision User
Motor Accessibility User
Cognitive Accessibility User
Language Barrier User
```

The player makes several final design decisions.

------------------------------------------------------------------------

# 42. Final Evaluation Content

Title:

# DESIGN REPORT

Example:

``` text
VISUAL ACCESSIBILITY       92%
HEARING ACCESSIBILITY      88%
COLOR ACCESSIBILITY        100%
MOTOR ACCESSIBILITY        84%
COGNITIVE ACCESSIBILITY    90%
LANGUAGE ACCESSIBILITY     87%
```

Then:

# OVERALL ACCESSIBILITY

``` text
88%
```

------------------------------------------------------------------------

# 43. Final Narrative

**PLAYER --- THOUGHT**

> "I used to think accessibility meant adding extra features."

Pause.

> "Now I think it means making sure nobody has to fight the interface
> just to get something done."

Fade.

System:

``` text
SYSTEM MESSAGE
```

Glitch.

# WHO DID YOU DESIGN FOR?

Pause.

# EVERYONE.

------------------------------------------------------------------------

# 44. Ending

Black screen.

Small text:

``` text
END OF EXPERIENCE
```

Then:

> "Good design begins with understanding who you're designing for."

Optional final button:

``` text
[ PLAY AGAIN ]
```

------------------------------------------------------------------------

# 45. Content for Future Characters

New characters should follow this structure:

``` text
CHARACTER NAME

ACCESSIBILITY FOCUS

PERSONALITY

FIRST ENCOUNTER

PROBLEM DISCOVERY

DESIGN QUESTION

OPTION A
OPTION B
OPTION C
OPTION D

CORRECT ANSWER

CORRECT FEEDBACK

INCORRECT FEEDBACK

INTERFACE TRANSFORMATION
```

------------------------------------------------------------------------

# 46. Content Quality Checklist

Before adding a new scenario:

-   [ ] Character has a personality beyond their accessibility need.
-   [ ] Dialogue sounds natural.
-   [ ] The accessibility problem is discoverable through conversation.
-   [ ] The player can understand the user's goal.
-   [ ] The question tests a real design decision.
-   [ ] Wrong answers are plausible.
-   [ ] Correct answer has a clear reason.
-   [ ] Feedback is concise.
-   [ ] Interface transformation is visible.
-   [ ] The scenario does not use pity or stereotypes.
-   [ ] The scenario does not rely on a long lecture.
-   [ ] The scenario fits the game's narrative tone.

------------------------------------------------------------------------

# 47. Content Principle

The game's educational content should follow:

``` text
CHARACTER
   ↓
CONVERSATION
   ↓
PROBLEM
   ↓
PLAYER REALIZATION
   ↓
DESIGN DECISION
   ↓
CONSEQUENCE
   ↓
SHORT EXPLANATION
```

Not:

``` text
LECTURE
   ↓
QUIZ
   ↓
NEXT SLIDE
```

------------------------------------------------------------------------

# 48. Final Content Principle

> **Let the player meet the person before they meet the accessibility
> principle.**

The player should remember:

**Rahul**, not just "visual impairment."

**Fatima**, not just "hearing impairment."

The lesson should stick because it was connected to a person, a problem,
a decision, and a visible change.

That is the voice of Inclusive Interface.
