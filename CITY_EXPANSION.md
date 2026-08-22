# CITY_EXPANSION.md

## Purpose

This document defines the required correction to the current city/exploration scene.

The current implementation has the correct gameplay flow, but the city environment is too sparse and reads as a **village / empty prototype map**.

The required change is:

> **Turn the exploration area into a proper, dense urban city viewed from a bird's-eye/2D RPG perspective.**

This is an environment expansion, not a request to redesign the game's gameplay, dialogue, challenge system, appointment simulation, or accessibility mechanics.

---

# 1. Current Problem

The current city contains too much:

```text
green grass
empty open space
single straight road
isolated buildings
large unused areas
sparsely placed NPCs
```

It currently reads closer to:

```text
small village / park
```

than:

```text
dense fictional city
```

The player should feel like they are inside a city.

---

# 2. Required Result

The city should contain substantially more:

```text
BUILDINGS
ROADS
STREETS
INTERSECTIONS
HIGHWAYS / MAJOR ROADS
TRAFFIC
SIDEWALKS
CROSSWALKS
PARKING
PUBLIC SPACES
SHOPS
HOMES
OFFICES
HOSPITALS
CAFES
PUBLIC SERVICES
NPCs
VEHICLES
STREET PROPS
```

The environment should feel **urban and populated**.

---

# 3. Grass Must Stop Dominating the Map

This is one of the most important changes.

Do NOT use large green areas as the default background.

Current problem:

```text
████████████████████████
████████████████████████
       ROAD
████████████████████████
████████████████████████
```

Target:

```text
BUILDINGS  BUILDINGS  BUILDINGS
████████████████████████████████
STREET ─── INTERSECTION ─── STREET
████████████████████████████████
BUILDINGS  PLAZA  BUILDINGS
████████████████████████████████
MAJOR ROAD / HIGHWAY / TRAFFIC
████████████████████████████████
BUILDINGS  PARK  BUILDINGS
```

Green space should exist only where it makes sense:

```text
parks
small gardens
tree areas
courtyards
roadside landscaping
```

Do not use grass as filler.

---

# 4. City, Not Village

The world should communicate:

> **This is a city.**

Visual signals of a city include:

```text
dense building blocks
multiple streets
intersections
traffic
larger roads
sidewalk networks
commercial districts
residential blocks
public transport
parking areas
urban signage
streetlights
```

The player should be able to look at the scene and immediately recognize an urban environment.

---

# 5. Bird's-Eye / RPG View

Keep the existing exploration perspective.

Use:

```text
top-down
bird's-eye
slightly angled 2D RPG
```

Do NOT switch to:

```text
first person
third-person 3D
side-scrolling
isometric strategy map
```

The city should be readable from above while still feeling like a playable RPG environment.

---

# 6. Urban Layout

Build the city using connected blocks.

Example conceptual structure:

```text
┌───────────────┬───────────────┬───────────────┐
│ RESIDENTIAL   │ COMMERCIAL    │ HOSPITAL      │
│ BUILDINGS     │ SHOPS         │ + PHARMACY    │
├───────────────┼───────────────┼───────────────┤
│               │               │               │
│ SIDE STREET   │ MAIN STREET   │ SIDE STREET   │
│               │               │               │
├───────────────┼───────────────┼───────────────┤
│ PARK / PLAZA  │ CITY CENTER   │ CAFE / SHOPS  │
├───────────────┼───────────────┼───────────────┤
│ OFFICES       │ MAJOR ROAD    │ TRANSIT AREA  │
│ / DESIGN LAB  │ / HIGHWAY     │ / BUS STOP    │
└───────────────┴───────────────┴───────────────┘
```

This is a layout concept, not a literal map requirement.

---

# 7. Buildings Must Occupy the City

The city should contain many buildings.

Possible categories:

### Residential

```text
apartments
houses
townhouses
residential blocks
```

### Commercial

```text
cafe
restaurant
grocery
pharmacy
electronics shop
clothing shop
bookstore
convenience store
```

### Public

```text
hospital
clinic
library
school
community center
government/public-service building
```

### Work

```text
design studio
office buildings
small businesses
workshops
```

Not every building needs to be enterable.

The important requirement is that buildings visually form a **city**, rather than isolated structures sitting in grass.

---

# 8. Building Density

Buildings should be placed relatively close together in urban areas.

Avoid:

```text
BUILDING

500 pixels of grass

BUILDING

500 pixels of grass

BUILDING
```

Prefer:

```text
BUILDING | SIDEWALK | BUILDING | SIDEWALK | SHOP
──────────────────────────────────────────────
             STREET
──────────────────────────────────────────────
BUILDING | PARKING  | BUILDING | CAFE
```

Use density to create an urban feeling.

---

# 9. Roads

The city needs a proper road network.

Include:

```text
small streets
main streets
intersections
crossroads
major roads
```

Roads should connect locations.

Do not use one long isolated horizontal road as the primary city structure.

---

# 10. Major Road / Highway

At least one major road should communicate the scale of the city.

It can include:

```text
multiple lanes
lane markings
central divider
traffic
streetlights
sidewalks
crossings
```

The major road should remain visually compatible with the pixel-art RPG style.

Do not turn it into a modern racing game.

---

# 11. Traffic

The city should have visible traffic.

Use:

```text
cars
buses
taxis
delivery vehicles
motorcycles
bicycles
```

Vehicles can:

```text
move along roads
stop at intersections
remain parked
```

For the MVP, simple loops are sufficient.

The important part is that the city feels active.

---

# 12. Public Transport

Include visible public transport infrastructure.

Examples:

```text
bus stops
bus shelters
bus signs
city buses
transit information
```

A bus should not simply be a decorative rectangle.

If possible, have vehicles move along defined road paths.

---

# 13. Sidewalk Network

Buildings should connect to sidewalks.

Use:

```text
sidewalks
curbs
crosswalks
ramps
stairs
pedestrian paths
```

The player should be able to understand where pedestrians are supposed to walk.

---

# 14. Intersections

Add multiple intersections.

They should contain appropriate:

```text
crosswalks
traffic lights
road markings
corners
street signs
pedestrian crossings
```

Intersections are an important visual signal that the player is in a city.

---

# 15. Parking

Use believable urban parking areas:

```text
street parking
small parking lots
hospital parking
shop parking
```

Vehicles should be placed naturally.

---

# 16. Urban Street Furniture

Add details such as:

```text
streetlights
benches
trash cans
mailboxes
signposts
bollards
phone/electrical boxes
bus shelters
advertising boards
planters
```

These small elements dramatically improve environmental density.

---

# 17. Trees and Greenery

Trees are still allowed.

The correction is:

> **Greenery should support the city, not replace the city.**

Good:

```text
tree-lined streets
small parks
flower beds
planters
courtyards
median greenery
```

Bad:

```text
huge grass field
+
three trees
+
one road
```

---

# 18. City Landmarks

Create recognizable landmarks.

Possible:

```text
hospital
city plaza
large cafe
bus terminal
library
design lab
fountain
public square
```

Landmarks help the player understand where they are.

---

# 19. City Districts

The MVP does not need a massive map.

Instead, create a compact but dense city containing recognizable districts.

Possible:

```text
RESIDENTIAL DISTRICT
COMMERCIAL DISTRICT
HOSPITAL / PUBLIC SERVICES
CITY PLAZA
DESIGN / OFFICE DISTRICT
TRANSIT AREA
```

A compact dense city is preferable to a giant empty map.

---

# 20. NPC Distribution

NPCs should appear **throughout the streets**.

They should not all stand near the hospital or in one line.

Examples:

```text
person walking to cafe
person waiting for bus
person sitting on bench
person crossing road
shopkeeper outside store
student walking
elderly person near park
worker leaving office
cyclist
parent with child
```

Important characters such as Rahul and Fatima should be discoverable naturally within the city.

---

# 21. Main Characters Must Be Seen in the City

Rahul, Fatima, Mira, Grandma, and other important characters should not appear as isolated icons on an empty map.

They should be:

```text
standing on streets
walking
sitting
waiting
near buildings
near public infrastructure
inside appropriate locations
```

Their placement should make narrative sense.

---

# 22. NPC Interaction Markers

Keep interaction markers subtle.

Example:

```text
[ TALK ]
```

or a small icon above the NPC.

Do not create huge futuristic labels.

---

# 23. Character Scale

Keep the character sprite scale readable from the bird's-eye view.

Characters should remain visually distinct from:

```text
trees
vehicles
props
buildings
```

---

# 24. Environmental Animation

Where practical, add simple ambient movement:

```text
cars moving
buses moving
NPCs walking
trees moving slightly
water/fountain animation
shop signs
```

These small animations make the city feel alive.

---

# 25. Buildings Should Have Detail

Buildings should contain visible pixel-art details:

```text
windows
doors
roofs
awnings
signs
stairs
lights
plants
walls
decorations
```

Avoid flat boxes with text labels.

---

# 26. Signage

Use believable signs:

```text
CITYCARE HOSPITAL
PHARMACY
CAFE
LIBRARY
GROCERY
BUS STOP
DESIGN LAB
```

Signs help the player navigate.

Avoid random technical labels.

---

# 27. City Color Palette

Keep the established detailed pixel-art RPG palette.

Use:

```text
stone
brick
wood
warm windows
muted greens
natural road colors
soft signage colors
```

Do not convert the city into a neon cyberpunk environment.

---

# 28. Keep the Existing Game Systems

This document changes the **city environment only**.

Do NOT break or redesign:

```text
opening sequence
developer room
Grandma dialogue
appointment simulation
30-second timer
"You didn't fail" sequence
city transition
character dialogue
challenge system
multiple questions
difficulty system
score
interface transformations
accessibility mechanics
voice/subtitles
```

The existing gameplay should continue working.

---

# 29. Do Not Change the Appointment Website

The appointment simulation is already working.

Do not redesign it as part of this task unless a separate task explicitly requests it.

The purpose of this task is:

> **Make the city feel like a city.**

---

# 30. Do Not Change the Realization Screen

The:

```text
YOU DIDN'T FAIL.
BUT THE INTERFACE DID.
```

sequence is not part of this environment change.

Leave it intact.

---

# 31. Do Not Add a New HUD

More city elements does NOT mean more HUD.

Do not add:

```text
energy
credits
health
technical statistics
large minimaps
multiple status bars
```

unless already required by the game design.

The visual expansion should happen **inside the world**.

---

# 32. Map Size

Do not simply make the map enormous.

Prefer:

```text
compact
dense
connected
interesting
```

A smaller city with many meaningful elements is better than a huge empty city.

---

# 33. Camera and Viewport

The camera should reveal enough of the city to understand its structure.

The player should be able to see:

```text
roads
buildings
NPCs
vehicles
landmarks
```

while keeping the player character readable.

---

# 34. Performance

Do not spawn thousands of objects.

Use:

```text
tilemaps
reusable sprites
object pooling where appropriate
simple vehicle paths
simple NPC movement
```

The city should look dense without destroying performance.

---

# 35. Reusable Environment Assets

Create reusable asset categories:

```text
building tiles
road tiles
sidewalk tiles
wall tiles
roof tiles
window tiles
street furniture
trees
vehicles
NPC sprites
signs
lamps
```

This makes the city scalable.

---

# 36. Procedural / Data-Driven Placement

Where practical, use reusable map data rather than manually duplicating huge amounts of code.

But do NOT generate a random city that looks incoherent.

The city layout should be intentionally designed.

---

# 37. Visual Quality Target

The final exploration screenshot should look closer to:

```text
┌─────────────────────────────────────────────────┐
│ BUILDINGS  SHOP  HOSPITAL  CAFE  BUILDINGS     │
│                                                 │
│ ───── STREET ────────┬──── STREET ────────     │
│      NPC   NPC       │        CAR              │
│                      │                         │
│ BUILDINGS       PLAZA│       SHOPS             │
│                      │                         │
│ ───────────── MAJOR ROAD / HIGHWAY ──────────  │
│      CAR     BUS     CAR      NPC              │
│                                                 │
│ OFFICES     DESIGN LAB     TRANSIT             │
│                                                 │
└─────────────────────────────────────────────────┘
```

This is a conceptual example only.

---

# 38. Current Screenshot vs Required Direction

Current:

```text
large grass
single road
isolated buildings
few NPCs
large empty spaces
```

Required:

```text
dense urban blocks
multiple connected roads
major road/highway
traffic
sidewalks
crosswalks
many buildings
shops
public services
vehicles
NPCs distributed through streets
urban props
limited purposeful greenery
```

---

# 39. Definition of Done

The city expansion is complete when:

```text
[ ] Green grass no longer dominates the map
[ ] Multiple building blocks fill the environment
[ ] Roads form a connected network
[ ] At least one major road/highway exists
[ ] Traffic is visible
[ ] Sidewalks are present
[ ] Crosswalks/intersections are present
[ ] Public transport is visible
[ ] Shops and public buildings exist
[ ] Residential buildings exist
[ ] Office/work buildings exist
[ ] Urban props are distributed throughout
[ ] NPCs are visible across streets
[ ] Main characters are naturally placed
[ ] Buildings have pixel-art detail
[ ] The city feels populated
[ ] The player can explore meaningful areas
[ ] Existing gameplay systems still work
[ ] No cyberpunk HUD has been introduced
[ ] No unnecessary UI has been added
[ ] Performance remains acceptable
```

---

# 40. Final Instruction to the Coding Agent

> **Do not make the existing city slightly prettier. Rebuild the exploration environment so it reads unmistakably as a proper city.**

Specifically:

```text
REDUCE EMPTY GRASS
+
INCREASE BUILDING DENSITY
+
CREATE CONNECTED STREETS
+
ADD MAJOR ROADS / HIGHWAY
+
ADD TRAFFIC
+
ADD SIDEWALKS + CROSSWALKS
+
ADD SHOPS + PUBLIC BUILDINGS
+
ADD RESIDENTIAL + OFFICE BLOCKS
+
ADD URBAN PROPS
+
ADD NPCS THROUGHOUT THE STREETS
+
PLACE MAIN CHARACTERS NATURALLY
+
KEEP BIRD'S-EYE RPG CAMERA
+
KEEP EXISTING GAMEPLAY
```

The target is:

> **A dense, believable, detailed pixel-art city seen from above — not a grassy village map.**

Do not solve this by adding more HUD elements.

**Add detail to the WORLD.**
