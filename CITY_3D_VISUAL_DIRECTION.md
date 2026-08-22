# CITY_3D_VISUAL_DIRECTION.md

## Purpose

This document is the **authoritative visual direction for the game's city**.

The current city must be redesigned from the existing flat/2D sparse map into a **detailed 3D low-poly / stylized 3D city viewed from a bird's-eye perspective**.

The uploaded visual reference is the target for the overall city composition, density, perspective, materials, roads, buildings, traffic, and atmosphere.

> **The target is a real-feeling 3D city seen from above — NOT a neon city, NOT a cyberpunk city, NOT a flat 2D tilemap, and NOT a grassy village.**

---

# 1. NON-NEGOTIABLE VISUAL TARGET

The city should look like:

```text
3D
+
BIRD'S-EYE / TOP-DOWN CAMERA
+
DENSE URBAN CITY
+
LOW-POLY / STYLIZED REALISM
+
NATURAL COLORS
+
REALISTIC URBAN MATERIALS
+
BUILDINGS FILLING THE WORLD
+
ROADS AND INTERSECTIONS
+
TRAFFIC
+
PEDESTRIANS
+
STREET PROPS
+
NATURAL DAYLIGHT
```

The player should immediately understand:

> **"I am walking through a city."**

Not:

> "I am walking through a pixel village."

---

# 2. USE THE UPLOADED REFERENCE AS THE VISUAL BENCHMARK

The uploaded reference demonstrates the desired direction.

Match its principles:

- 3D geometry
- bird's-eye city view
- dense building placement
- connected road network
- realistic sidewalks
- intersections
- vehicles
- urban infrastructure
- varied buildings
- natural materials
- realistic/stylized lighting
- people distributed through streets
- small environmental details
- clear city districts
- strong visual depth

The reference is more important than generic instructions such as:

```text
"8-bit"
"retro"
"pixel art"
"neon"
"futuristic"
```

For the **city exploration portion**, the new requirement is specifically **3D**.

---

# 3. IMPORTANT: NO NEON

The current neon/cyan/green/purple treatment is WRONG for the city.

Do NOT use neon as the primary visual language.

Forbidden:

```text
❌ neon green buildings
❌ glowing cyan roads
❌ glowing purple windows
❌ magenta architecture
❌ cyberpunk signs everywhere
❌ emissive roads
❌ glowing building outlines
❌ futuristic holograms
❌ oversaturated city colors
```

The city should use natural colors.

Preferred:

```text
concrete
stone
brick
wood
glass
paint
asphalt
road markings
natural vegetation
warm sunlight
soft shadows
```

---

# 4. COLOR PALETTE

Use an earthy, natural urban palette.

Examples:

```text
concrete gray
warm gray
stone
beige
brick red
brown
muted blue
muted green
cream
white
dark asphalt
natural tree green
```

Accent colors are allowed for:

```text
shop signs
traffic signals
vehicle colors
building branding
flowers
small visual landmarks
```

But accents must remain controlled.

The entire city must NOT become neon.

---

# 5. LIGHTING

Default lighting should be:

```text
daytime
natural sunlight
soft shadows
clear visibility
```

Possible later variations:

```text
sunny
cloudy
rainy
```

Do not make the city permanently dark.

Do not make night the default.

Do not use cyberpunk glow as the main lighting system.

---

# 6. 3D STYLE

The city should use:

> **Stylized low-poly to mid-poly 3D assets.**

The style should be attractive and game-like rather than photorealistic.

Buildings should have:

```text
3D walls
3D roofs
3D doors
3D windows
3D signs
3D balconies where appropriate
3D steps
3D awnings
```

Vehicles should be actual 3D objects.

Characters should be actual 3D characters.

Trees should be actual 3D objects.

---

# 7. CAMERA

Use a bird's-eye / top-down exploration camera.

Preferred:

```text
top-down
or
slightly angled bird's-eye
```

The camera should show:

```text
buildings
roads
sidewalks
NPCs
vehicles
props
```

The player should still be clearly visible.

Avoid an extreme first-person camera.

Avoid a cinematic low-angle camera for normal exploration.

---

# 8. CAMERA MOVEMENT

The camera should follow the player smoothly.

It should:

```text
follow player
move smoothly
avoid excessive shaking
keep player readable
show nearby surroundings
```

Camera zoom may be supported.

The player should be able to understand where they are within the city.

---

# 9. CITY MUST BE DENSE

The city must NOT contain huge empty areas.

Bad:

```text
████████████████████████
████████████████████████
████  BUILDING     ████
████████ ROAD ██████████
████████████████████████
```

Good:

```text
BUILDING | BUILDING | SHOP | APARTMENT
──────────── STREET ────────────────
SIDEWALK | NPC | CAR | BUS STOP
────────── INTERSECTION ───────────
CAFE | PLAZA | HOSPITAL | PHARMACY
──────────── ROAD ─────────────────
OFFICE | DESIGN LAB | PARKING
```

The city should feel built-up.

---

# 10. BUILDINGS MUST FILL THE WORLD

Use many building types.

### Residential

```text
apartments
houses
townhouses
residential blocks
```

### Commercial

```text
cafes
restaurants
grocery stores
pharmacies
clothing stores
electronics stores
bookstores
markets
```

### Institutional

```text
hospital
clinic
school
library
community center
public-service buildings
```

### Workplaces

```text
office buildings
design studio
small businesses
workshops
```

Buildings should form blocks rather than isolated objects sitting in grass.

---

# 11. BUILDING DETAIL

Buildings must not be simple cubes with text above them.

Add:

```text
windows
doors
roofs
awnings
signboards
balconies
stairs
entrances
plants
lights
architectural variation
```

Different districts should have different building styles.

---

# 12. ROADS

Build a connected road network.

Required:

```text
small roads
main roads
intersections
crossroads
major roads
```

Roads should connect the city's districts.

Do NOT use one long road across an otherwise empty map.

---

# 13. HIGHWAY / MAJOR ROAD

The city should contain at least one visually significant major road.

It may include:

```text
multiple lanes
lane markings
central divider
traffic
streetlights
pedestrian crossings
sidewalks
```

The major road should visually communicate that this is a city.

---

# 14. TRAFFIC

Traffic is an important part of the city.

Include 3D vehicles such as:

```text
cars
buses
taxis
delivery vans
trucks
motorcycles
bicycles
auto-rickshaws where appropriate
```

Vehicles should be:

```text
moving
parked
waiting
turning
```

Simple AI/path loops are sufficient for the MVP.

---

# 15. PUBLIC TRANSPORT

Include:

```text
bus stops
bus shelters
city buses
transit signs
waiting passengers
```

Public transport should feel integrated into the city rather than placed randomly.

---

# 16. SIDEWALKS

Buildings should connect to a sidewalk network.

Use:

```text
sidewalks
curbs
crosswalks
ramps
pedestrian paths
stairs
```

The player and NPCs should naturally move through pedestrian areas.

---

# 17. INTERSECTIONS

Intersections should contain appropriate urban details:

```text
traffic lights
crosswalks
road markings
street signs
curbs
pedestrian signals
```

This helps establish the urban scale.

---

# 18. PARKING

Add realistic parking areas where appropriate:

```text
street parking
hospital parking
shop parking
office parking
small parking lots
```

Vehicles should be aligned naturally.

---

# 19. CITY PROPS

The world needs small details.

Examples:

```text
streetlights
benches
trash cans
mailboxes
signposts
advertising boards
planters
flower beds
fences
bollards
phone/electrical boxes
bus shelters
vending machines
fire hydrants
road barriers
construction materials
```

These elements should make the city feel lived-in.

---

# 20. VEGETATION

Vegetation should support the city.

Use:

```text
street trees
small parks
planters
flower beds
small gardens
median greenery
courtyard plants
```

Do NOT use grass as a filler texture over most of the map.

The previous large green fields must be removed.

---

# 21. CITY DISTRICTS

Create a compact but dense city with distinct districts.

Suggested:

### Residential District

```text
apartments
homes
small streets
shops
parking
trees
```

### Commercial District

```text
stores
cafes
restaurants
pedestrians
traffic
signage
```

### Hospital / Public Services

```text
hospital
pharmacy
clinic
ambulance access
bus stop
parking
```

### City Center

```text
plaza
shops
fountain
public buildings
heavy pedestrian activity
```

### Office / Design District

```text
offices
design studio
businesses
wider streets
parking
```

### Transit Area

```text
bus terminal
major road
bus stops
traffic
pedestrians
```

---

# 22. NPCs

NPCs should be actual 3D characters.

They should appear throughout the streets.

Examples:

```text
walking
waiting for bus
crossing road
sitting on bench
shopping
entering buildings
leaving buildings
talking
standing outside shops
```

Do not arrange NPCs in a straight line.

---

# 23. MAIN CHARACTERS

Characters such as:

```text
Rahul
Fatima
Mira
Grandma
```

should exist naturally within the city.

They should be:

```text
visible from the bird's-eye camera
standing/walking in believable locations
interactable
```

They should not appear as floating icons.

---

# 24. CHARACTER DESIGN

Use stylized 3D characters.

Characters should have:

```text
recognizable face
hair
clothing
body proportions
skin tone
accessories
distinct silhouette
```

Important characters should be visually identifiable.

---

# 25. CHARACTER MOVEMENT

Use simple movement states:

```text
idle
walk
talk
sit
wait
```

NPC movement does not need advanced AI.

Simple believable behavior is enough.

---

# 26. CITY SCALE

Do not create a gigantic empty world.

Prefer:

> **compact + dense + detailed**

over:

> **huge + empty + repetitive**

Every visible area should feel intentionally designed.

---

# 27. WORLD-FIRST UI

The city itself should contain the visual richness.

Do NOT compensate for an empty world by adding:

```text
score panels
energy bars
credits
technical HUD
large minimaps
futuristic overlays
```

The world should be interesting without UI decoration.

---

# 28. IN-GAME UI

UI should match the realistic/stylized city.

Use:

```text
clean
simple
slightly textured
retro-RPG-inspired
```

UI colors should remain natural.

No neon frames.

---

# 29. DIALOGUE

Keep the existing RPG dialogue system.

When a character speaks:

```text
3D world
+
character
+
bottom dialogue window
+
character name
+
portrait if used
+
dialogue text
+
voice
+
subtitles
```

The world should remain visible behind the dialogue.

---

# 30. VOICE

Voice remains part of the game.

Character dialogue should support:

```text
spoken audio
+
subtitles
```

Important gameplay information must never depend on audio alone.

---

# 31. ACCESSIBILITY

The city itself may demonstrate accessible infrastructure:

```text
ramps
accessible entrances
tactile paving
accessible crossings
visual information
audible signals
elevators
```

These should look like normal city infrastructure.

Do not turn accessibility elements into glowing sci-fi objects.

---

# 32. NO CYBERPUNK

Absolutely do NOT add:

```text
❌ neon city
❌ glowing roads
❌ holograms
❌ cyberpunk towers
❌ purple/cyan lighting everywhere
❌ glowing NPC outlines
❌ futuristic billboards
❌ sci-fi terminals
❌ emissive building edges
❌ futuristic HUD
```

The city is not cyberpunk.

---

# 33. NO FLAT 2D CITY

The exploration world must NOT remain:

```text
flat tilemap
flat colored rectangles
2D building cards
2D rectangular NPCs
flat road strips
```

Use actual 3D geometry for:

```text
buildings
roads
vehicles
characters
trees
props
```

---

# 34. NO VILLAGE

Do not leave:

```text
large grass fields
isolated buildings
single roads
small number of NPCs
```

The environment must visibly communicate urban density.

---

# 35. DAYTIME DEFAULT

Default city presentation:

```text
day
natural sunlight
soft shadows
warm realistic atmosphere
```

Night can exist later as a variation.

It should not be the default visual identity.

---

# 36. MATERIALS

Use believable materials:

```text
asphalt
concrete
brick
stone
glass
paint
wood
metal
soil
vegetation
```

Materials should have subtle texture.

Avoid excessive glossy surfaces.

---

# 37. ENVIRONMENTAL DEPTH

Use:

```text
foreground buildings/props
midground streets
background buildings
```

Buildings can have different heights.

Use shadows and occlusion to create depth.

---

# 38. CITY LANDMARKS

Include recognizable landmarks such as:

```text
CityCare Hospital
pharmacy
large cafe
city plaza
design lab
bus terminal
library
```

These can support navigation and storytelling.

---

# 39. EXPLORATION

The player should be able to:

```text
walk through streets
approach buildings
talk to NPCs
cross roads
visit important locations
discover characters
observe city life
```

The city is an explorable game environment, not merely a background image.

---

# 40. KEEP EXISTING GAMEPLAY

This document changes the **visual city implementation**.

Do NOT remove or redesign:

```text
opening sequence
developer room
Grandma sequence
appointment simulation
30-second timer
"You didn't fail" realization
city transition
dialogue system
voice/subtitles
multiple challenges
Easy / Medium / Hard
score
interface transformations
accessibility challenge mechanics
```

The city redesign must integrate with the existing gameplay.

---

# 41. PERFORMANCE

The 3D city must remain suitable for a web game.

Use:

```text
low-poly assets
texture atlases where practical
instancing/reusable assets
simple NPC AI
simple vehicle paths
culling
reasonable draw calls
```

Do not create unnecessarily high-poly assets.

The goal is:

> **visually rich but web-performance friendly.**

---

# 42. IMPLEMENTATION PRIORITY

Build in this order:

```text
1. 3D city ground/layout
2. road network
3. sidewalks/intersections
4. dense building blocks
5. major road/highway
6. vehicles/traffic
7. 3D NPCs
8. street props
9. vegetation
10. landmarks
11. main character placement
12. lighting/material polish
13. existing interaction/dialogue integration
```

---

# 43. DEFINITION OF DONE

The city redesign is complete only when:

```text
[ ] World is genuinely 3D
[ ] Bird's-eye camera is working
[ ] No huge empty grass fields
[ ] Buildings dominate the urban environment
[ ] Multiple connected streets exist
[ ] Intersections exist
[ ] Major road/highway exists
[ ] Traffic exists
[ ] Sidewalk network exists
[ ] Crosswalks exist
[ ] Public transport exists
[ ] Residential buildings exist
[ ] Commercial buildings exist
[ ] Public buildings exist
[ ] Office/work buildings exist
[ ] Urban props exist
[ ] 3D NPCs populate streets
[ ] Main characters are naturally placed
[ ] City has natural colors
[ ] City uses natural daylight
[ ] No neon visual identity
[ ] No cyberpunk aesthetic
[ ] No flat 2D exploration world
[ ] No village-like empty layout
[ ] Existing gameplay still works
[ ] Voice/subtitles still work
[ ] Performance remains acceptable
```

---

# 44. FINAL INSTRUCTION TO THE CODING AGENT

> **Rebuild the exploration city as a detailed 3D bird's-eye urban environment.**

The city should look:

```text
DENSE
3D
URBAN
NATURAL
DETAILED
POPULATED
BELIEVABLE
STYLIZED
```

It should NOT look:

```text
NEON
CYBERPUNK
FLAT 2D
EMPTY
GRASS-DOMINATED
VILLAGE-LIKE
FUTURISTIC
```

The uploaded reference is the benchmark for the desired city composition and density.

**Do not add more HUD elements to make the game look richer.**

**Make the WORLD richer.**

**Do not make it neon.**

**Do not make it cyberpunk.**

**Do not make it flat 2D.**

**Make it a proper 3D city viewed from above.**
