# VISUAL_REFERENCE.md

## Purpose

This document locks the **exact visual direction** of the game based on the visual reference provided by the team.

The reference is the target for the game's **environment density, pixel-art quality, character presentation, dialogue presentation, composition, and overall RPG feeling**.

This document is intentionally more specific than generic terms such as "8-bit", "retro", or "pixel art".

> **Target: a detailed, atmospheric, story-driven pixel-art RPG town with visual-novel dialogue presentation.**

---


# 0. CANONICAL REFERENCE — NON-NEGOTIABLE

The **uploaded reference screenshot provided by the project team** is the canonical visual benchmark for the game's city/exploration presentation.

The implementation should aim for the **same visual language, density, composition quality, and RPG presentation shown in that reference**.

This means the target is specifically:

```text
DETAILED PIXEL-ART RPG
+
RICH, DENSE CITY ENVIRONMENT
+
MULTIPLE PROPER BUILDINGS
+
NATURAL NPC DISTRIBUTION
+
DETAILED PROPS / STREET ELEMENTS
+
EXPRESSIVE PIXEL CHARACTERS
+
RPG DIALOGUE BOX AT THE BOTTOM
+
CHARACTER PORTRAIT + NAME
+
WORLD STILL VISIBLE DURING DIALOGUE
```

## The reference is NOT merely an inspiration for "pixel art"

Do not reduce the reference to:

```text
"make it 8-bit"
"make it retro"
"make it pixelated"
```

Those descriptions are too broad.

The required interpretation is:

> **Build a detailed, populated, handcrafted-feeling pixel-art RPG environment with the same kind of visual richness and dialogue composition demonstrated by the supplied reference.**

## Reference-Level Environment Density

A finished city scene should contain enough visual information to feel like a real RPG location:

```text
buildings
doors
windows
roofs
shopfronts
signs
stairs
sidewalks
roads
crosswalks
street lamps
trees
plants
benches
fences
walls
flowers
fountains
vehicles
bus stops
small props
NPCs
```

Not every scene needs every item, but the overall world must have comparable richness.

## Reference-Level Character Presentation

Important characters must be proper pixel-art sprites.

They should have:

```text
recognizable faces
hair
clothing
body shape
silhouette
expressions
idle/walk states
```

Do not use colored rectangles or primitive block avatars as final character art.

## Reference-Level Dialogue Presentation

When a character speaks, use the same general RPG presentation principle:

```text
GAME WORLD
      +
CHARACTER
      +
BOTTOM DIALOGUE WINDOW
      +
CHARACTER NAME
      +
CHARACTER PORTRAIT
      +
READABLE DIALOGUE
```

The dialogue window should occupy the lower portion of the screen while leaving the world visible above it.

## Important Composition Rule

The reference has **world-first composition**.

The player sees:

```text
CITY / ENVIRONMENT
       ↓
CHARACTERS
       ↓
STORY / DIALOGUE
       ↓
UI
```

Not:

```text
HUD
HUD
HUD
STATUS
HUD
       ↓
small game world
```

## Do Not "Improve" the Reference Into Something Else

Do not reinterpret the reference as:

```text
cyberpunk
sci-fi
neon
futuristic
minimalist
flat vector
dashboard
fake handheld console
```

Do not add visual elements simply because they make the game look more technologically advanced.

The target is the **detailed pixel-art RPG look itself**.

## Acceptance Test

Before considering the city visual implementation complete, compare a screenshot of the implementation against the supplied reference and ask:

```text
Does the environment feel equally like a proper RPG world?
Are there enough buildings and environmental details?
Do the characters look like actual pixel-art RPG characters?
Are NPCs naturally distributed?
Does the dialogue presentation feel like an RPG?
Does the world remain visible during dialogue?
Does the scene feel populated rather than empty?
```

If several answers are "no", the visual implementation is not finished.


# 1. Core Visual Target

The game should look like a **proper handcrafted pixel-art RPG**, similar in presentation quality and composition to the supplied reference.

The target feeling is:

```text
DETAILED PIXEL ART
        +
NARRATIVE RPG
        +
EXPLORABLE CITY
        +
EXPRESSIVE CHARACTERS
        +
ENVIRONMENTAL STORYTELLING
        +
VISUAL-NOVEL DIALOGUE
```

The game should feel like a complete game world, not a prototype containing a few rectangles on a map.

---

# 2. The Supplied Reference Is the Visual Benchmark

The provided reference demonstrates the desired characteristics:

- dense environmental detail
- multiple buildings occupying the scene
- textured architecture
- streets and walkable paths
- stairs and elevation changes
- lamps and street furniture
- trees and plants
- shops and signs
- small environmental props
- multiple NPCs
- recognizable pixel-art characters
- natural NPC placement
- strong foreground/background separation
- large but unobtrusive dialogue box
- character portrait inside the dialogue presentation
- readable nameplate
- world remaining visible while dialogue is active

When evaluating the implementation, compare the result against these characteristics.

---

# 3. Environment Density

The city must have **substantial environmental detail**.

Do not build the city as:

```text
grass
+
one road
+
three buildings
+
NPC rectangles
```

Instead, scenes should contain many visual elements that make the location feel inhabited.

Examples:

```text
houses
apartments
shops
hospital
pharmacy
cafe
library
design studio
grocery
bus stop
park
public buildings
alleys
stairs
bridges
walls
fences
lamps
trees
flower beds
benches
signboards
street furniture
mailboxes
vending machines
vehicles
bicycles
small props
```

Not every scene needs every element.

The goal is **richness appropriate to the location**.

---

# 4. Buildings

Buildings should have recognizable architectural structure.

A building should not simply be:

```text
colored rectangle + text
```

Buildings should contain details such as:

```text
doors
windows
roofs
walls
signboards
awnings
steps
lights
plants
decorations
```

Different buildings should have different visual identities.

For example:

```text
hospital
→ larger entrance
→ medical signage
→ formal architecture

cafe
→ awning
→ outdoor seating
→ warm windows

pharmacy
→ pharmacy sign
→ storefront
→ shelves/windows

home
→ residential door
→ windows
→ small garden/porch
```

---

# 5. Streets

Streets should look like actual streets.

Include where appropriate:

```text
sidewalks
road markings
crosswalks
curbs
streetlights
signs
traffic signals
parked vehicles
moving vehicles
bus stops
```

Avoid giant empty areas of grass surrounding a thin road.

---

# 6. Walkable Space

The player should have meaningful places to walk.

Use:

```text
main streets
side paths
small alleys
building entrances
stairs
parks
public spaces
```

The player should feel like they are exploring a town rather than moving across an empty game board.

---

# 7. Environmental Props

Small props are important.

Examples:

```text
benches
flower pots
trash cans
mailboxes
street lamps
posters
signs
fountains
vending machines
bicycles
tables
chairs
crates
planters
trees
bushes
```

These should support the location's identity.

---

# 8. Pixel-Art Quality

Pixel art should have:

```text
clear silhouettes
visible pixel structure
consistent pixel density
detailed textures
intentional shading
coherent outlines
consistent perspective
```

Avoid simplistic placeholder geometry when final assets are being presented.

Do not use:

```text
flat rectangles
basic geometric avatars
generic emoji characters
smooth vector characters
randomly mixed pixel resolutions
```

unless they are explicitly temporary development placeholders.

---

# 9. Character Sprites

Characters should look like actual RPG characters.

Each important character needs:

```text
head
hair
face
body
clothing
shoes
distinct silhouette
```

Characters should have enough pixel detail to be recognizable.

Avoid:

```text
blue rectangle = Rahul
orange rectangle = Grandma
purple rectangle = Fatima
```

---

# 10. Character Variety

NPCs should not all look identical.

Vary:

```text
hair
clothing
height
body shape
age
skin tone
accessories
posture
```

The city should feel populated by different people.

---

# 11. NPC Placement

NPCs should be distributed naturally.

Examples:

```text
person waiting at bus stop
person entering pharmacy
shopkeeper outside store
elderly person sitting on bench
student walking through street
person sitting in cafe
worker near hospital
```

Do not line up all major characters in a row.

---

# 12. Character Animation

Where practical, use:

```text
idle animation
walking animation
talking animation
small environmental movement
```

The city should feel alive.

Animation can be simple.

It just needs to communicate life.

---

# 13. Camera

Use a game camera appropriate to a narrative RPG.

Preferred:

```text
top-down
three-quarter top-down
slightly angled RPG perspective
```

The camera should show enough of the environment to establish the location while keeping the player character readable.

---

# 14. Dialogue Presentation

Dialogue should resemble the supplied reference.

During dialogue:

```text
WORLD REMAINS VISIBLE
        +
DIALOGUE BOX AT BOTTOM
        +
CHARACTER NAME
        +
CHARACTER PORTRAIT
        +
DIALOGUE TEXT
```

The dialogue box should feel like a classic RPG/visual-novel dialogue window.

---

# 15. Dialogue Box

The dialogue box should:

- occupy the lower portion of the screen
- have a clear border
- use readable typography
- have a character name area
- support a portrait
- leave enough of the world visible
- provide a clear continuation indicator

Do not turn dialogue into a full-screen technical dashboard.

---

# 16. Character Portraits

Important conversations may show a larger character portrait alongside or inside the dialogue area.

Portraits should:

```text
match the character sprite
use the same pixel-art language
show personality
support expressions
```

Possible expressions:

```text
neutral
happy
confused
worried
frustrated
surprised
relieved
```

---

# 17. Voice and Dialogue

Character dialogue is not text-only.

The game should support:

```text
spoken voice
+
subtitles
+
character portrait/expression
+
text fallback
```

Voice can be short dialogue clips rather than full-length professional voice acting.

Important gameplay information must never depend on audio alone.

---

# 18. Subtitles

Subtitles should remain readable and synchronized with spoken dialogue.

A player should be able to understand the entire story without sound.

This is especially important because the game teaches inclusive communication.

---

# 19. Audio-Independent Communication

Important information must have a non-audio representation.

For example:

```text
sound alert
+
visual indicator
+
text/caption
```

not:

```text
sound alert only
```

This principle should also appear in gameplay challenges.

---

# 20. City Accessibility Elements

Because accessibility is part of the game's subject, the world can contain believable accessibility infrastructure:

```text
ramps
accessible entrances
tactile paving
elevators
accessible crossings
visual bus information
audible crossing signals
clear signs
accessible toilets
```

These should be integrated naturally into the environment.

They should not turn the city into an accessibility-themed dashboard.

---

# 21. Color and Lighting

Use a rich but coherent pixel-art palette.

Preferred:

```text
warm browns
muted greens
cream
stone gray
dusty blue
soft yellow
warm red
natural skin tones
```

Night scenes can use:

```text
deep blue
purple-gray
warm window light
muted teal
```

Avoid making the entire world neon.

---

# 22. Depth and Composition

Scenes should have visual depth.

Use:

```text
background buildings
midground structures
playable streets
foreground objects
```

Trees, walls, roofs, signs, and props can help frame the player.

The scene should feel layered rather than flat.

---

# 23. World Variety

Different locations should have different visual identities.

Examples:

### Residential area

```text
homes
gardens
small streets
benches
mailboxes
```

### Commercial area

```text
shops
signs
awnings
customers
storefronts
```

### Hospital area

```text
hospital entrance
pharmacy
ambulance area
benches
clear signage
```

### Park

```text
trees
paths
flowers
fountain
benches
NPCs
```

### Design studio

```text
office
computers
desks
posters
design materials
```

---

# 24. Interactive World

Where appropriate, objects can be interactable.

Examples:

```text
door
NPC
bench
bus stop
sign
vending machine
notice board
computer
shop
hospital entrance
```

Interaction should reveal:

```text
dialogue
information
scene transition
mini-event
challenge
```

---

# 25. UI Philosophy

The UI should be **rich where the game needs it and quiet where the world should dominate**.

Exploration:

```text
minimal HUD
```

Dialogue:

```text
large RPG dialogue window
```

Challenge:

```text
focused decision interface
```

Menu:

```text
clean retro menu
```

Do not keep a giant HUD permanently visible.

---

# 26. HUD

Only show information that matters.

Possible:

```text
small score
objective
interaction prompt
```

Avoid unnecessary:

```text
energy
credits
battery
technical diagnostics
fake system metrics
```

---

# 27. Map

A map may be used if it improves exploration.

It should look like a **game map**, not a technical city schematic.

It can show:

```text
hospital
cafe
design studio
player
important NPCs
visited locations
```

---

# 28. Glitch

Glitch is a narrative transition device.

Use it at important moments:

```text
opening
transition into appointment website
"You didn't fail"
level transitions
major story transitions
ending
```

Do not cover the normal city in glitch effects.

---

# 29. The Appointment Website

The intentionally inaccessible website should be visually different from the RPG world because it represents the interface the player is testing.

However, it must still resemble a believable normal website.

It should demonstrate:

```text
tiny text
poor contrast
tiny targets
unclear labels
confusing hierarchy
bad CAPTCHA
color-only information
```

It should NOT become a cyberpunk terminal.

---

# 30. Challenge Presentation

After meeting a character, the player should encounter a design challenge.

The presentation should feel like a game event:

```text
CHARACTER
    ↓
SCENARIO
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

The player should see the consequence of their decision.

---

# 31. Multiple Challenges

The reference-style presentation does not imply a single question per character.

The system must support:

```text
Rahul
→ multiple challenges
→ Easy
→ Medium
→ Hard

Fatima
→ multiple challenges
→ Easy
→ Medium
→ Hard

Mira
→ multiple challenges
→ Easy
→ Medium
→ Hard
```

The number of questions must come from content data.

---

# 32. Overall Visual Hierarchy

The priority on screen should generally be:

```text
1. WORLD
2. CHARACTERS
3. STORY
4. INTERACTION
5. UI
```

Not:

```text
1. HUD
2. SCORE
3. STATUS BARS
4. TECHNICAL PANELS
5. WORLD
```

---

# 33. What the Finished Screenshot Should Communicate

A screenshot should immediately communicate:

> "This is a detailed pixel-art RPG where I can explore a real-feeling town and talk to characters."

It should NOT communicate:

> "This is a cyberpunk accessibility dashboard."

---

# 34. Anti-Pattern: Prototype City

Do not consider the following sufficient for the final visual implementation:

```text
large grass field
+
single straight road
+
three flat buildings
+
four rectangular characters
+
empty background
```

That is a prototype layout, not the finished visual target.

---

# 35. Anti-Pattern: Overdesigned HUD

Do not replace missing world detail by adding:

```text
score panels
energy bars
credits
technical labels
neon frames
system indicators
```

**World detail must come from the world itself.**

---

# 36. Anti-Pattern: Generic Game Generator Look

Avoid a visual result that looks like:

```text
random pixel assets
+
generic UI cards
+
generic NPC sprites
+
flat map
```

Assets should be stylistically coherent.

---

# 37. Final Visual Contract

The final game should have:

```text
[✓] detailed pixel-art environments
[✓] recognizable buildings
[✓] streets and walkable areas
[✓] environmental props
[✓] natural NPC placement
[✓] expressive character sprites
[✓] dialogue portraits
[✓] RPG dialogue box
[✓] voice + subtitles
[✓] restrained HUD
[✓] atmospheric lighting
[✓] meaningful interaction
[✓] explorable city
[✓] narrative transitions
[✓] intentional glitch moments
[✓] dynamic multi-challenge gameplay
```

---

# 38. Absolute Visual Rule

> **Do not interpret "8-bit" as "simple rectangles."**

The target is **detailed pixel-art RPG presentation**.

More environmental detail is encouraged when it improves:

```text
immersion
navigation
storytelling
character interaction
world identity
```

The goal is not minimalism.

The goal is **a rich, coherent, handcrafted-feeling game world**.

---

# 39. Reference Matching Rule

When making visual decisions, ask:

> **Would this element look natural in the supplied pixel-art RPG reference?**

If yes:

```text
consider implementing it
```

If no:

```text
do not introduce it
```

This rule applies especially to:

```text
HUD
buildings
characters
dialogue
maps
menus
effects
```

---

# 40. Final Target

The visual target is:

> **A detailed, atmospheric pixel-art narrative RPG city, populated by expressive characters and believable environmental details, with classic RPG dialogue presentation and a restrained interface.**

**Not more futuristic.  
Not more minimal.  
Not more dashboard-like.**

**Match the reference's level of game-world detail and presentation.**
