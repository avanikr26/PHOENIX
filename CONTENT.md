# CONTENT.md --- Player-Facing Game Content

# 1. Purpose

This document contains the **actual player-facing narrative, dialogue,
scenarios, challenge questions, answers, feedback, and progression
content** for Inclusive Interface.

This is not only a content schema.

It is the source of truth for what the player experiences.

The game should communicate like an actual narrative game, not like an
accessibility textbook.

------------------------------------------------------------------------

# 2. Content Principles

The content should be:

-   Human
-   Conversational
-   Short
-   Game-like
-   Emotionally grounded
-   Respectful
-   Specific
-   Interactive
-   Educational without sounding like a lecture

Prefer:

> **Rahul:** "I know there's a button here. I just can't tell what it
> does."

Over:

> "Users with visual impairments may have difficulty identifying
> unlabeled interactive controls."

The second statement can appear in explanations, but not as the main
character voice.

------------------------------------------------------------------------

# 3. Content Structure

The game content is organized as:

``` text
OPENING
   ↓
DEVELOPER STORY
   ↓
APPOINTMENT EXPERIENCE
   ↓
REALIZATION
   ↓
DESIGNER INTRO
   ↓
CITY
   ↓
CHARACTERS
   ↓
MULTIPLE CHALLENGES
   ↓
EASY → MEDIUM → HARD
   ↓
FINAL DESIGN CHALLENGE
   ↓
FINAL EVALUATION
   ↓
ENDING
```

------------------------------------------------------------------------

# 4. Opening Sequence

## Scene: Black Screen

### SYSTEM

> SYSTEM INITIALIZING...

Pause.

### SYSTEM

> USER PROFILE: UNKNOWN

Glitch.

### SYSTEM

> INTERFACE LOADING...

Pause.

Screen remains black.

### NARRATOR / SYSTEM

> WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?

Cut to pixel-art environment.

------------------------------------------------------------------------

# 5. Profile Screen

Display:

> **SIGN UP TO EXPERIENCE**

Subtext:

> Create your player profile.

Fields:

``` text
NAME
USERNAME
```

Button:

> ENTER THE EXPERIENCE

Do not ask for:

``` text
password
phone number
real address
medical information
```

------------------------------------------------------------------------

# 6. Developer Room

The player enters a small pixel-art bedroom/workspace.

The player character is a young developer.

Visual elements:

``` text
Laptop
Desk
Chair
Bed
Window
Small room
```

The player is sitting in front of the laptop.

### NARRATION

> Another night.
>
> Another screen.
>
> Another thing to build.

Pause.

### GRANDMA

> "Hey!"

The player turns.

### PLAYER

> "Yeah, Grandma?"

### GRANDMA

> "Can you help me book a doctor's appointment?"

### PLAYER

> "Sure. For what time?"

### GRANDMA

> "Tomorrow. Around 4 PM."

### PLAYER

> "Okay. Give me a minute."

Glitch.

------------------------------------------------------------------------

# 7. Appointment Scene

The environment changes.

The screen becomes a fictional healthcare booking interface.

### SYSTEM

> TASK ASSIGNED

### SYSTEM

> BOOK A DOCTOR'S APPOINTMENT FOR TOMORROW AT 4 PM.

### SYSTEM

> TIME LIMIT: 30 SECONDS

Start timer.

------------------------------------------------------------------------

# 8. Intentionally Inaccessible Interface

The simulated interface should contain believable barriers.

Examples:

``` text
Tiny text
Poor contrast
Tiny click targets
Unclear labels
Weak hierarchy
Color-only indicators
Confusing form layout
Bad CAPTCHA
Ambiguous error messages
```

The interface is intentionally bad.

The **actual game UI must remain accessible**.

------------------------------------------------------------------------

# 9. Appointment Website Content

Use fictional branding:

> **CITYCARE**

Example doctor list:

``` text
Dr. Maya Rao
General Medicine

Dr. Arjun Sen
Family Medicine

Dr. Neha Kapoor
Internal Medicine
```

Required appointment:

``` text
Tomorrow
4:00 PM
```

Example intentionally confusing labels:

``` text
Continue
Next
Proceed
>
```

Some controls may not clearly communicate their purpose.

------------------------------------------------------------------------

# 10. Appointment Microcopy

Example:

> Appointments are subjected to availability and confirmation.

Small supporting text:

> Please ensure that all information is entered correctly before
> proceeding with your request.

Error:

> Something went wrong.

CAPTCHA:

> VERIFY

The CAPTCHA should be deliberately difficult to interpret.

It must remain fictional and local.

------------------------------------------------------------------------

# 11. Appointment Success

If completed within the time limit:

### SYSTEM

> YOUR APPOINTMENT IS CONFIRMED

Pause.

### PLAYER --- INNER VOICE

> Wait.

Pause.

> If this is frustrating me...

Pause.

> ...what must it feel like for someone who actually depends on
> accessibility to use an interface?

------------------------------------------------------------------------

# 12. Appointment Failure

If the timer reaches zero:

### SYSTEM

> TIME'S UP.

Pause.

### PLAYER --- INNER VOICE

> I couldn't even finish one simple task.

Pause.

> What happens when the interface isn't just frustrating...

> ...but impossible to use?

The player proceeds to the same realization sequence.

------------------------------------------------------------------------

# 13. Realization Sequence

Black screen.

Glitch.

### SYSTEM

> YOU DIDN'T FAIL.

Pause.

Glitch.

### SYSTEM

> BUT THE INTERFACE DID.

Silence.

Then:

### SYSTEM

> SO WHAT WOULD YOU BUILD INSTEAD?

------------------------------------------------------------------------

# 14. Designer Introduction

The game shifts into the main RPG environment.

### SYSTEM

> ROLE UPDATED

### SYSTEM

> DIGITAL PRODUCT DESIGNER

### SYSTEM

> LOCATION: CITY

### SYSTEM

> OBJECTIVE:

> Build digital services that let everyone complete everyday tasks.

Narration:

> The city has thousands of users.

> No two people experience an interface in exactly the same way.

> Your job isn't to design for the "average" user.

> Your job is to design for people.

------------------------------------------------------------------------

# 15. City Introduction

The player enters a pixel-art city.

Possible locations:

``` text
City Plaza
Hospital
Café
Library
Transit Stop
Design Office
Community Center
```

Only the locations needed for the MVP must be implemented.

------------------------------------------------------------------------

# 16. City Interaction

When the player approaches an NPC:

### SYSTEM

> PRESS E TO TALK

The player interacts.

The NPC's dialogue begins.

------------------------------------------------------------------------

# 17. Rahul --- Character Profile

## Accessibility Category

``` text
Visual
```

Rahul has a visual impairment.

Do not define Rahul only through his impairment.

He should feel like a normal person with a specific experience of
digital interfaces.

Personality:

``` text
Observant
Calm
Slightly sarcastic
Patient
Direct
```

------------------------------------------------------------------------

# 18. Rahul --- First Encounter

### RAHUL

> "Hey."

### PLAYER

> "Hey. I'm the new designer."

### RAHUL

> "Designer?"

### PLAYER

> "Yeah."

### RAHUL

> "Then I've got a question for you."

Pause.

### PLAYER

> "Shoot."

### RAHUL

> "Why do websites keep making me guess what buttons do?"

Challenge begins.

------------------------------------------------------------------------

# 19. Rahul --- Easy Challenge 01

## ID

``` text
rahul-visual-easy-01
```

## Scenario

> Rahul opens a booking page.
>
> There are three buttons.
>
> Each button contains only an icon.
>
> Nothing explains what the icons mean.

## Question

> **What is the best improvement?**

### Options

**A.** Make the icons more colorful.

**B.** Add clear, descriptive labels.

**C.** Add an animation when the buttons appear.

**D.** Make the icons smaller.

### Correct

``` text
B
```

### Feedback

> Exactly.

> A symbol might look obvious to one person and completely unclear to
> another.

> Clear labels tell the user what the control actually does.

### Interface Change

``` text
ICON ONLY
    ↓
ICON + CLEAR LABEL
```

------------------------------------------------------------------------

# 20. Rahul --- Easy Challenge 02

## ID

``` text
rahul-visual-easy-02
```

## Scenario

> Rahul encounters a form with text fields.
>
> The fields have no visible labels.
>
> The designer assumes the user will understand what each box is for.

## Question

> **What should the form provide?**

### Options

**A.** Placeholder text only.

**B.** Clear, persistent field labels.

**C.** A brighter background.

**D.** A loading animation.

### Correct

``` text
B
```

### Feedback

> A field shouldn't make the user guess what information belongs there.

> Give the field a clear name.

### Interface Change

``` text
UNLABELED FIELD
       ↓
LABELED FIELD
```

------------------------------------------------------------------------

# 21. Rahul --- Easy Challenge 03

## ID

``` text
rahul-visual-easy-03
```

## Scenario

> A website displays an important status using only a colored dot.

### Question

> **What is the safest design?**

### Options

**A.** Use a brighter color.

**B.** Make the dot larger.

**C.** Use color plus text or an icon.

**D.** Add a flashing animation.

### Correct

``` text
C
```

### Feedback

> Color can communicate information, but it shouldn't be the only way to
> communicate it.

### Interface Change

``` text
● GREEN
    ↓
✓ AVAILABLE
```

------------------------------------------------------------------------

# 22. Rahul --- Medium Challenge 01

## ID

``` text
rahul-visual-medium-01
```

## Scenario

> Rahul can technically access a form, but the fields are presented in a
> confusing order.
>
> The instructions are visually positioned beside the fields rather than
> being clearly associated with them.

## Question

> **Which improvement is strongest?**

### Options

**A.** Add more decorative icons.

**B.** Use a logical reading order and clear field labels.

**C.** Increase the number of colors.

**D.** Add a moving cursor.

### Correct

``` text
B
```

### Feedback

> Accessibility isn't only about making something visible.

> The structure needs to make sense too.

### Interface Change

``` text
CONFUSING ORDER
      ↓
LOGICAL ORDER
```

------------------------------------------------------------------------

# 23. Rahul --- Medium Challenge 02

## ID

``` text
rahul-visual-medium-02
```

## Scenario

> A booking form has a small text instruction at the bottom of the page.
>
> The instruction explains an important requirement.
>
> Nothing connects that instruction clearly to the field it describes.

## Question

> **What should the designer do?**

### Options

**A.** Make the instruction decorative.

**B.** Remove the instruction.

**C.** Associate the instruction directly with the relevant field.

**D.** Put the instruction in a tooltip that disappears immediately.

### Correct

``` text
C
```

### Feedback

> Important instructions should be available when the user needs them.

------------------------------------------------------------------------

# 24. Rahul --- Medium Challenge 03

## ID

``` text
rahul-visual-medium-03
```

## Scenario

> Rahul encounters a button that visually looks clickable.
>
> But only a tiny part of the button actually responds.

## Question

> **What should happen?**

### Options

**A.** Keep the tiny hit area.

**B.** Make the entire visible control interactive.

**C.** Hide the button.

**D.** Add a sound every time the mouse moves over it.

### Correct

``` text
B
```

### Feedback

> If something looks like a button, the whole button should behave like
> one.

### Interface Change

``` text
TINY HIT AREA
      ↓
FULL TARGET
```

------------------------------------------------------------------------

# 25. Rahul --- Hard Challenge 01

## ID

``` text
rahul-visual-hard-01
```

## Scenario

> A healthcare booking page contains:
>
> -   tiny controls
> -   unclear labels
> -   weak contrast
> -   color-only status indicators
> -   a short timeout
>
> You can only make two changes before launch.

## Question

> **Which pair should you prioritize?**

### Options

**A.** Add decorative animation + new colors.

**B.** Improve labels + make important controls usable at an appropriate
target size.

**C.** Add background music + change the logo.

**D.** Add a loading animation + rounded corners.

### Correct

``` text
B
```

### Feedback

> Good design decisions start with the barriers that prevent people from
> completing the task.

------------------------------------------------------------------------

# 26. Rahul --- Hard Challenge 02

## ID

``` text
rahul-visual-hard-02
```

## Scenario

> A form has good labels, but an error appears only as a red border
> around the field.

## Question

> **What should the designer add?**

### Options

**A.** A darker red.

**B.** A sound only.

**C.** A clear text explanation connected to the field.

**D.** More animation.

### Correct

``` text
C
```

### Feedback

> The user needs to know what went wrong and how to fix it.

------------------------------------------------------------------------

# 27. Rahul --- Hard Challenge 03

## ID

``` text
rahul-visual-hard-03
```

## Scenario

> A complex booking flow has several screens.
>
> Each screen looks different.
>
> Rahul keeps losing track of where he is in the process.

## Question

> **What would help most?**

### Options

**A.** Change the background on every screen.

**B.** Add a clear, consistent progress indicator and predictable
navigation.

**C.** Add more animations.

**D.** Remove all headings.

### Correct

``` text
B
```

### Feedback

> Consistency reduces the amount of mental effort required to navigate a
> task.

------------------------------------------------------------------------

# 28. Fatima --- Character Profile

## Accessibility Category

``` text
Hearing
```

Fatima has a hearing impairment.

Personality:

``` text
Confident
Funny
Energetic
Direct
```

She should not be portrayed as helpless.

Her problem is with the interface, not with her ability to participate.

------------------------------------------------------------------------

# 29. Fatima --- First Encounter

### FATIMA

> "You're the new designer?"

### PLAYER

> "Apparently."

### FATIMA

> "Good."

Pause.

### FATIMA

> "Then please tell whoever designed this notification that I don't hear
> it."

### PLAYER

> "The notification?"

### FATIMA

> "Exactly."

Challenge begins.

------------------------------------------------------------------------

# 30. Fatima --- Easy Challenge 01

## ID

``` text
fatima-hearing-easy-01
```

## Scenario

> An important appointment reminder is delivered only through a sound.

## Question

> **What should the interface provide?**

### Options

**A.** Louder audio.

**B.** A visual and/or text notification.

**C.** More background music.

**D.** A different ringtone.

### Correct

``` text
B
```

### Feedback

> Important information shouldn't depend on hearing alone.

### Interface Change

``` text
AUDIO ONLY
    ↓
AUDIO + VISUAL/TEXT
```

------------------------------------------------------------------------

# 31. Fatima --- Easy Challenge 02

## ID

``` text
fatima-hearing-easy-02
```

## Scenario

> A tutorial video contains spoken instructions but no captions.

## Question

> **What should be added?**

### Options

**A.** Louder narration.

**B.** Captions.

**C.** Faster playback.

**D.** More background music.

### Correct

``` text
B
```

### Feedback

> Captions give users access to spoken information without depending on
> audio.

------------------------------------------------------------------------

# 32. Fatima --- Easy Challenge 03

## ID

``` text
fatima-hearing-easy-03
```

## Scenario

> A website displays an error only through a short notification sound.

## Question

> **What should replace the audio-only message?**

### Options

**A.** A louder sound.

**B.** A longer sound.

**C.** A visible text notification.

**D.** No notification.

### Correct

``` text
C
```

------------------------------------------------------------------------

# 33. Fatima --- Medium Challenge 01

## ID

``` text
fatima-hearing-medium-01
```

## Scenario

> A live event provides captions, but they disappear immediately after
> each sentence.

## Question

> **What would improve the experience?**

### Options

**A.** Make the captions smaller.

**B.** Keep important information available long enough to understand
and act on it.

**C.** Remove captions.

**D.** Add background animation.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 34. Fatima --- Medium Challenge 02

## ID

``` text
fatima-hearing-medium-02
```

## Scenario

> An emergency notification flashes briefly on screen and then
> disappears.

## Question

> **What is the better design?**

### Options

**A.** Make it flash faster.

**B.** Provide a persistent visual notification or notification history.

**C.** Replace it with a sound.

**D.** Hide it after one second.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 35. Fatima --- Medium Challenge 03

## ID

``` text
fatima-hearing-medium-03
```

## Scenario

> A video has captions, but important non-speech sounds are never
> represented.

## Question

> **What should captions communicate?**

### Options

**A.** Spoken words only.

**B.** Important audio information, including relevant non-speech
sounds.

**C.** Background music lyrics only.

**D.** Nothing beyond the title.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 36. Fatima --- Hard Challenge 01

## ID

``` text
fatima-hearing-hard-01
```

## Scenario

> A healthcare app communicates:
>
> -   appointment reminders through sound
> -   urgent alerts through sound
> -   short video instructions without captions
>
> You have limited development time.

## Question

> **Which change should have the highest priority?**

### Options

**A.** Replace the notification sound.

**B.** Make critical information available through a visual/text
channel.

**C.** Add background music controls.

**D.** Animate the logo.

### Correct

``` text
B
```

### Feedback

> Critical information needs an accessible communication path.

------------------------------------------------------------------------

# 37. Fatima --- Hard Challenge 02

## ID

``` text
fatima-hearing-hard-02
```

## Scenario

> A support agent communicates with users through a video interface.
>
> Captions exist, but there is no transcript or way to review important
> information later.

## Question

> **Which improvement adds the most flexibility?**

### Options

**A.** Louder audio.

**B.** A transcript/history of important communication.

**C.** More animated icons.

**D.** Smaller captions.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 38. Fatima --- Hard Challenge 03

## ID

``` text
fatima-hearing-hard-03
```

## Scenario

> A notification can be communicated visually or through sound.
>
> The designer wants to use both, but the visual notification disappears
> immediately.

## Question

> **What is the best approach?**

### Options

**A.** Keep the visual notification available long enough to understand
and act.

**B.** Remove the visual notification.

**C.** Make the sound louder.

**D.** Use only animation.

### Correct

``` text
A
```

------------------------------------------------------------------------

# 39. Color Vision User --- Character Profile

Working name:

``` text
Mira
```

Accessibility category:

``` text
Color
```

Personality:

``` text
Curious
Practical
Playful
```

The character demonstrates that color should not be the sole carrier of
important information.

------------------------------------------------------------------------

# 40. Mira --- First Encounter

### MIRA

> "Quick question."

### PLAYER

> "Okay."

### MIRA

> "Which one of these means 'available'?"

The player looks at two colored indicators.

### PLAYER

> "The green one?"

### MIRA

> "Exactly."

Pause.

### MIRA

> "Now imagine I couldn't tell them apart."

Challenge begins.

------------------------------------------------------------------------

# 41. Mira --- Easy Challenge 01

## ID

``` text
mira-color-easy-01
```

## Scenario

> A status indicator uses only green and red.

## Question

> **What should be added?**

### Options

**A.** Brighter green.

**B.** Different shades of red.

**C.** Text or icons alongside the colors.

**D.** Flashing colors.

### Correct

``` text
C
```

------------------------------------------------------------------------

# 42. Mira --- Easy Challenge 02

## ID

``` text
mira-color-easy-02
```

## Scenario

> A form marks required fields only with a red dot.

## Question

> **What should the designer do?**

### Options

**A.** Make the dot brighter.

**B.** Add a clear text indicator such as "Required."

**C.** Make the dot blink.

**D.** Remove all indicators.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 43. Mira --- Easy Challenge 03

## ID

``` text
mira-color-easy-03
```

## Scenario

> A chart uses five colors but no labels.

## Question

> **What should accompany the colors?**

### Options

**A.** More colors.

**B.** Labels, patterns, or another distinguishing method.

**C.** Lower contrast.

**D.** Animation only.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 44. Mira --- Medium Challenge 01

## ID

``` text
mira-color-medium-01
```

## Scenario

> A map uses colored lines to represent different transit routes.
>
> Some routes look very similar.

## Question

> **What would improve identification?**

### Options

**A.** Increase saturation only.

**B.** Add route names, numbers, icons, or patterns.

**C.** Remove labels.

**D.** Make every route the same color.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 45. Mira --- Medium Challenge 02

## ID

``` text
mira-color-medium-02
```

## Scenario

> An error state is indicated only by a red border.

## Question

> **What is the stronger design?**

### Options

**A.** Darker red.

**B.** Red border + error icon + explanatory text.

**C.** Remove the error state.

**D.** Flash the border.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 46. Mira --- Medium Challenge 03

## ID

``` text
mira-color-medium-03
```

## Scenario

> A game dashboard shows task progress using green, yellow, and red
> cards.
>
> There are no labels.

## Question

> **What should be added?**

### Options

**A.** More saturated colors.

**B.** Text or icons that communicate the same status.

**C.** More animations.

**D.** A darker background.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 47. Mira --- Hard Challenge 01

## ID

``` text
mira-color-hard-01
```

## Scenario

> A healthcare dashboard communicates:
>
> -   available
> -   waiting
> -   unavailable
>
> using only three colors.

## Question

> **What is the strongest redesign?**

### Options

**A.** Use brighter colors.

**B.** Use color + text + distinct icons.

**C.** Use animation only.

**D.** Remove status information.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 48. Mira --- Hard Challenge 02

## ID

``` text
mira-color-hard-02
```

## Scenario

> A chart must remain understandable when printed in grayscale.

## Question

> **Which approach is safest?**

### Options

**A.** Use only color.

**B.** Combine color with labels, patterns, or shapes.

**C.** Increase the number of colors.

**D.** Make all values transparent.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 49. Mira --- Hard Challenge 03

## ID

``` text
mira-color-hard-03
```

## Scenario

> You are designing a critical alert system.
>
> The alert currently uses red text.
>
> You want the alert to remain obvious without relying on color.

## Question

> **Which combination is strongest?**

### Options

**A.** Red text only.

**B.** Icon + text + appropriate visual emphasis.

**C.** Background animation only.

**D.** A brighter red.

### Correct

``` text
B
```

------------------------------------------------------------------------

# 50. Future Characters

The architecture should support future users such as:

``` text
Motor accessibility user
Cognitive accessibility user
Language-barrier user
Low digital-literacy user
```

Each can have:

``` text
Easy
Medium
Hard
```

with multiple questions per level.

------------------------------------------------------------------------

# 51. Example Motor Character

Working name:

``` text
Arjun
```

Possible challenges:

``` text
Easy:
- tiny click targets
- hover-only controls
- keyboard access

Medium:
- complex drag interaction
- timed interaction
- inconsistent focus

Hard:
- multi-step task requiring precise movement
- conflicting input methods
- inaccessible modal navigation
```

------------------------------------------------------------------------

# 52. Example Cognitive Accessibility Character

Working name:

``` text
Nisha
```

Possible challenges:

``` text
Easy:
- confusing labels
- cluttered layout
- unclear instructions

Medium:
- inconsistent navigation
- too many simultaneous choices
- unclear error recovery

Hard:
- complex multi-step task
- time pressure
- conflicting instructions
```

------------------------------------------------------------------------

# 53. Challenge Explanation Style

Explanations should be short.

Bad:

> According to accessibility standards, WCAG 2.2 success criterion X
> requires...

Better:

> Good choice.

> The user needs another way to access the same information.

The game can optionally display:

``` text
WHY?
```

for a slightly deeper explanation.

------------------------------------------------------------------------

# 54. Wrong Answer Feedback

Never shame the player.

Avoid:

> WRONG. YOU DON'T UNDERSTAND ACCESSIBILITY.

Prefer:

> Not quite.

> Think about what information the user is actually missing.

Then:

> Try again.

------------------------------------------------------------------------

# 55. Correct Answer Feedback

Use short, satisfying feedback.

Examples:

> Nice.

> That's the better choice.

> Exactly.

> Good catch.

> You fixed the barrier.

> That's what inclusive design looks like.

------------------------------------------------------------------------

# 56. Score Feedback

Examples:

``` text
+100
ACCESSIBILITY IMPROVED
```

First attempt:

``` text
+25
FIRST TRY
```

Hard challenge:

``` text
BARRIER REMOVED
+125
```

------------------------------------------------------------------------

# 57. Level Unlock Messages

Easy completed:

> **LEVEL UP**

> You've learned the basics.

Medium unlocked:

> **MEDIUM CHALLENGES UNLOCKED**

> The obvious problems are getting harder to spot.

Hard unlocked:

> **HARD CHALLENGES UNLOCKED**

> Now you're designing under real constraints.

------------------------------------------------------------------------

# 58. Character Completion

When Rahul's required challenge set is complete:

### SYSTEM

> RAHUL'S EXPERIENCE: IMPROVED

Rahul:

> "That would've made things a lot easier."

Player:

> "I'm starting to see it."

Rahul:

> "Good."

> "Don't just make it work."

> "Make it usable."

------------------------------------------------------------------------

# 59. Fatima Completion

Fatima:

> "You know what's funny?"

Player:

> "What?"

Fatima:

> "I shouldn't have to ask an interface to tell me something twice."

Pause.

> "It should've told me in a way I could actually receive."

------------------------------------------------------------------------

# 60. Mira Completion

Mira:

> "See?"

Player:

> "Yeah."

Mira:

> "Color can help."

Pause.

> "It just shouldn't be the only thing doing the talking."

------------------------------------------------------------------------

# 61. Final Challenge Introduction

After the major character paths:

### SYSTEM

> FINAL DESIGN CHALLENGE

Glitch.

> You've met the users.

> You've seen the barriers.

> Now build the interface.

------------------------------------------------------------------------

# 62. Final Challenge

The player is presented with a fictional digital service.

Requirements may include:

``` text
Visual accessibility
Hearing accessibility
Color accessibility
Motor accessibility
Cognitive accessibility
```

The player makes multiple design decisions.

Example:

### Decision 1

> How should status be communicated?

### Decision 2

> How should the form be structured?

### Decision 3

> How should important alerts be delivered?

### Decision 4

> What should happen when the user makes an error?

### Decision 5

> How should the interface handle time-sensitive tasks?

The final challenge should combine previously learned principles.

------------------------------------------------------------------------

# 63. Final Evaluation

### SYSTEM

> DESIGN REVIEW COMPLETE.

Display category scores:

``` text
VISUAL        92
HEARING       88
COLOR         100
MOTOR         76
COGNITIVE     84
```

Then:

> OVERALL INCLUSIVITY SCORE

Example:

``` text
88%
```

------------------------------------------------------------------------

# 64. Final Evaluation Messages

High score:

> You didn't just build an interface.

> You built one that lets more people use it.

Medium score:

> You found many barriers.

> Now look closer.

Low score:

> You know what it feels like when the interface fails.

> Now you know where to start fixing it.

The exact thresholds can be tuned during implementation.

------------------------------------------------------------------------

# 65. Ending

Black screen.

The same visual language as the opening returns.

### SYSTEM

> USER PROFILE: KNOWN

Glitch.

### SYSTEM

> INTERFACE: IMPROVED

Pause.

Then:

# WHAT IF THE INTERFACE WAS DESIGNED FOR EVERYONE?

Fade out.

------------------------------------------------------------------------

# 66. End Card

``` text
INCLUSIVE INTERFACE

Design for people.
Not averages.

[PLAY AGAIN]
```

Optional:

``` text
[VIEW ACCESSIBILITY REPORT]
```

------------------------------------------------------------------------

# 67. Challenge Content Rules

Every challenge should follow:

``` text
SCENARIO
   ↓
USER NEED
   ↓
QUESTION
   ↓
OPTIONS
   ↓
PLAYER DECISION
   ↓
FEEDBACK
   ↓
INTERFACE CHANGE
```

Whenever practical.

------------------------------------------------------------------------

# 68. Question Quality Rules

A good question should:

-   Have one clearly defensible best answer.
-   Test understanding rather than vocabulary.
-   Be grounded in the user's actual problem.
-   Avoid trick wording.
-   Avoid stereotypes.
-   Have plausible distractors.
-   Explain why the correct answer works.

------------------------------------------------------------------------

# 69. Distractor Rules

Wrong answers should be believable.

Good distractor:

> Make the notification louder.

Bad distractor:

> Delete the entire website.

The wrong answer should represent a common design mistake or incomplete
solution.

------------------------------------------------------------------------

# 70. Character Representation Rules

Do:

``` text
Show individual personality.
Show preferences.
Let characters speak naturally.
Focus on barriers in the interface.
```

Do not:

``` text
Make disability the character's entire personality.
Use pity-based writing.
Treat characters as teaching props.
Use insulting stereotypes.
```

------------------------------------------------------------------------

# 71. Educational Principle

The game should repeatedly reinforce:

> **Accessibility is not an extra feature added after the product is
> finished.**

It is part of designing the product correctly in the first place.

------------------------------------------------------------------------

# 72. Content Scaling

The content system must support expansion.

Current:

``` text
3 characters
3 levels
multiple questions
```

Future:

``` text
10+ characters
multiple scenarios
multiple cities
branching stories
expert challenges
```

The code should not need to be rewritten when content expands.

------------------------------------------------------------------------

# 73. Content File Organization

The final implementation may split this document into actual data files:

``` text
content/
├── characters/
│   ├── rahul.json
│   ├── fatima.json
│   └── mira.json
│
├── dialogue/
│   ├── opening.json
│   ├── rahul.json
│   ├── fatima.json
│   ├── mira.json
│   └── ending.json
│
└── challenges/
    ├── rahul/
    │   ├── easy.json
    │   ├── medium.json
    │   └── hard.json
    │
    ├── fatima/
    │   ├── easy.json
    │   ├── medium.json
    │   └── hard.json
    │
    └── mira/
        ├── easy.json
        ├── medium.json
        └── hard.json
```

This Markdown document remains the content source/reference during
development.

------------------------------------------------------------------------

# 74. Final Content Principle

The game should never feel like:

> "Here is a disability. Memorize the correct accessibility feature."

It should feel like:

> **"Here's a person. Here's the problem they're facing. Can you figure
> out what the interface should have done?"**

That difference is the heart of **Inclusive Interface**.
