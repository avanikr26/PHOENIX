# PERFORMANCE.md --- Inclusive Interface

# 1. Purpose

This document defines the performance targets, optimization strategy,
asset rules, runtime safeguards, loading behavior, and profiling
approach for **Inclusive Interface**.

The project is a browser-based 2D pixel-art narrative game.

The performance goal is not maximum graphical complexity.

The goal is:

> **A stable, responsive, fast-loading game that feels polished during
> the hackathon demo.**

------------------------------------------------------------------------

# 2. Performance Philosophy

Prioritize:

``` text
STABILITY
    ↓
RESPONSIVENESS
    ↓
FAST LOADING
    ↓
CONSISTENT FRAME RATE
    ↓
VISUAL POLISH
```

Do not sacrifice game stability to add unnecessary effects.

------------------------------------------------------------------------

# 3. MVP Performance Targets

Target hardware:

> Typical modern student laptop using a modern Chromium-based browser.

Target:

``` text
Frame rate:        60 FPS where practical
Input latency:     Immediate / responsive
Initial load:      As short as practical
Scene transition:  < 1 second where assets are already loaded
Memory:            Stable during full demo
CPU:               No sustained unnecessary spikes
GPU:               Avoid sustained high utilization
```

These are targets rather than strict hardware guarantees.

------------------------------------------------------------------------

# 4. Core Performance Requirement

The complete demo flow should be playable without:

-   Noticeable stuttering
-   Memory growth
-   Long loading pauses
-   Frozen UI
-   Input lag
-   Timer desynchronization
-   Audio glitches
-   Scene-transition failures

------------------------------------------------------------------------

# 5. Performance Budget

For the MVP, keep the project lightweight.

Recommended priorities:

``` text
Small environments
Small sprites
Compressed audio
Limited particles
Limited active game objects
Limited post-processing
Simple collision
Simple AI
```

The game does not need:

``` text
3D rendering
complex physics
dynamic global illumination
advanced shaders
procedural world generation
real-time multiplayer
```

------------------------------------------------------------------------

# 6. Rendering Strategy

Use Phaser's 2D rendering.

The game should rely primarily on:

-   Sprites
-   Tilemaps
-   Bitmap/pixel-art assets
-   Simple UI
-   Lightweight effects

Avoid expensive rendering effects unless they provide significant visual
value.

------------------------------------------------------------------------

# 7. Pixel-Art Rendering

Pixel art should remain crisp without excessive scaling work.

Use:

``` text
nearest-neighbor / pixel-art rendering
```

where appropriate.

Avoid:

``` text
large source images
continuous image filtering
unnecessary canvas redraws
```

------------------------------------------------------------------------

# 8. Internal Resolution

Use a fixed logical resolution where practical.

Example:

``` text
1280 × 720
```

or a smaller base resolution scaled to the browser.

The final choice should be based on:

-   Asset size
-   UI readability
-   Browser performance
-   Pixel-art style

------------------------------------------------------------------------

# 9. Object Count

Keep the number of active game objects low.

For a typical city scene:

``` text
Player
+
NPCs
+
Interactive objects
+
Background elements
```

Do not create thousands of individual sprites for decorative details.

Prefer:

``` text
tilemaps
sprite sheets
static background layers
```

when appropriate.

------------------------------------------------------------------------

# 10. Tilemaps

Use tilemaps for larger environments.

Benefits:

-   Efficient map representation
-   Reusable tiles
-   Smaller asset footprint
-   Easier level editing
-   Reduced object count

For very small scenes, manually placed sprites are acceptable.

------------------------------------------------------------------------

# 11. Sprite Sheets

Use sprite sheets/atlases when multiple animation frames belong to the
same asset group.

Example:

``` text
rahul.png
```

containing:

``` text
idle frames
walk frames
interaction frames
```

This can reduce asset-loading overhead.

------------------------------------------------------------------------

# 12. Texture Size

Avoid unnecessarily large textures.

For pixel-art assets:

Prefer the smallest resolution that still looks correct at the game's
internal resolution.

Do not export:

``` text
4096 × 4096
```

textures for tiny:

``` text
32 × 32
```

pixel-art objects.

------------------------------------------------------------------------

# 13. Asset Compression

Recommended:

### Images

``` text
PNG
WebP
```

### Audio

``` text
OGG
MP3
WAV for short effects where appropriate
```

Use compression for larger music files.

------------------------------------------------------------------------

# 14. Asset Naming

Consistent naming makes asset management easier.

Example:

``` text
rahul-idle.png
rahul-walk.png
rahul-portrait-neutral.png

city-plaza.png
hospital-sign.png

ui-dialogue-box.png
ui-choice-cursor.png
```

Avoid:

``` text
final.png
final2.png
newnew.png
thing.png
```

------------------------------------------------------------------------

# 15. Loading Architecture

Use a loading/boot scene.

Conceptual flow:

``` text
BOOT
 ↓
LOAD CORE ASSETS
 ↓
TITLE
 ↓
LOAD SCENE ASSETS
 ↓
PLAY
```

For a small MVP, preloading all lightweight assets is acceptable.

------------------------------------------------------------------------

# 16. Scene Asset Management

When practical:

``` text
Scene A assets
      ↓
Scene A
      ↓
unload temporary assets
      ↓
Scene B assets
      ↓
Scene B
```

However, do not introduce complicated asset streaming if the total game
remains small.

------------------------------------------------------------------------

# 17. Scene Cleanup

Every scene should clean up:

-   Timers
-   Event listeners
-   Input handlers
-   Temporary game objects
-   Audio
-   Tweens
-   Animation callbacks

A common source of performance problems is:

> Old scene systems continuing to run after the player leaves the scene.

------------------------------------------------------------------------

# 18. Timer Cleanup

The appointment timer must stop when:

``` text
appointment completed
appointment failed
scene changes
player restarts
```

Never allow multiple timers to run simultaneously.

------------------------------------------------------------------------

# 19. Event Listener Cleanup

If a scene subscribes to an event:

``` text
eventBus.on(...)
```

it must unsubscribe when the scene/system is destroyed.

Otherwise:

``` text
Scene 1 listener
Scene 2 listener
Scene 3 listener
...
```

may all react to the same event.

------------------------------------------------------------------------

# 20. Animation Performance

Animations should be lightweight.

Good:

``` text
idle animation
walk animation
dialogue typing
small UI transitions
glitch transition
```

Avoid:

``` text
hundreds of independent animated particles
continuous full-screen distortion
large animated backgrounds
```

------------------------------------------------------------------------

# 21. Particle Effects

Particles should be used sparingly.

Potential uses:

``` text
glitch
dust
small environmental effects
transition effects
```

Do not use particles as decoration everywhere.

------------------------------------------------------------------------

# 22. Glitch Effects

The glitch aesthetic is important to the game's identity.

However, it should be implemented efficiently.

Prefer:

``` text
short duration
few layers
small number of objects
simple shader/effect
```

Avoid keeping expensive glitch effects active continuously.

------------------------------------------------------------------------

# 23. Screen Shake

Screen shake should be:

-   Short
-   Small
-   Rare

Use it only for important moments.

Do not use constant camera movement.

Also respect:

``` text
REDUCED MOTION
```

settings.

------------------------------------------------------------------------

# 24. UI Performance

Avoid unnecessary DOM manipulation if most of the game is rendered in
Phaser.

For Phaser UI:

-   Reuse panels.
-   Reuse text objects.
-   Update only changing values.
-   Avoid destroying/recreating the same component every frame.

------------------------------------------------------------------------

# 25. HUD Updates

The HUD should not redraw everything every frame.

Bad:

``` text
Every frame:
    recreate score text
    recreate objective text
    recreate timer
```

Better:

``` text
Score changes
    ↓
Update score text

Objective changes
    ↓
Update objective text

Timer ticks
    ↓
Update timer text
```

------------------------------------------------------------------------

# 26. Dialogue Performance

Dialogue text animation should not create thousands of objects.

Prefer:

``` text
one text object
+
changing string
```

rather than:

``` text
one object per character
```

unless a specific visual effect requires it.

------------------------------------------------------------------------

# 27. Dialogue Typing Effect

The typing animation should be lightweight.

Example approach:

``` text
full text stored
 ↓
visible substring changes
 ↓
single text object updates
```

Allow the player to instantly complete the current line.

------------------------------------------------------------------------

# 28. Challenge UI Performance

The challenge screen should reuse:

``` text
Question panel
Choice buttons
Feedback panel
```

Do not recreate the entire UI tree for every answer.

------------------------------------------------------------------------

# 29. Appointment Simulation Performance

The simulated website is primarily UI.

Keep it lightweight.

Avoid:

-   Real web-page rendering inside the game
-   Embedded external websites
-   iframe dependencies
-   network requests
-   unnecessary DOM complexity

The appointment interface should be a local simulation.

------------------------------------------------------------------------

# 30. Fake CAPTCHA Performance

The CAPTCHA should be generated locally.

Use:

``` text
predefined challenge
```

or:

``` text
small locally generated visual
```

Do not call an external CAPTCHA service.

------------------------------------------------------------------------

# 31. Input Performance

Input handling should be event-driven where possible.

Avoid polling every key through expensive operations.

Player movement can use the game's normal update loop, but UI actions
should generally respond to input events.

------------------------------------------------------------------------

# 32. Game Loop

Keep the main update loop simple.

Typical responsibilities:

``` text
read movement input
update player
check interactions
update lightweight world behavior
```

Do not perform:

``` text
large file parsing
complex searches
network requests
DOM rebuilding
```

inside every frame.

------------------------------------------------------------------------

# 33. Avoid Work in `update()`

Do not repeatedly perform expensive operations inside the game loop.

Bad:

``` text
Every frame:
    parse all challenge JSON
    search every NPC
    rebuild UI
    recalculate final score
```

Better:

``` text
Load once.
Cache data.
React to events.
```

------------------------------------------------------------------------

# 34. Content Caching

Load content once and keep it in memory during the game.

For example:

``` text
CharacterRegistry
DialogueRegistry
ChallengeRegistry
TransformationRegistry
```

Then:

``` text
getChallenge("rahul-01")
```

does not require rereading the file every time.

------------------------------------------------------------------------

# 35. Content Loading

For a small static game, content can be imported at build time.

Example:

``` text
import challenges from "./content/challenges";
```

This avoids repeated runtime fetches.

If JSON is loaded dynamically, cache the parsed result.

------------------------------------------------------------------------

# 36. Memory Management

Watch for:

``` text
orphaned sprites
orphaned event listeners
orphaned timers
orphaned tweens
unreleased audio
duplicate textures
```

The game should not continuously increase memory usage while the player
moves between scenes.

------------------------------------------------------------------------

# 37. Audio Performance

Do not play too many simultaneous sounds.

Use:

``` text
music
+
small number of SFX
```

Avoid overlapping dozens of audio sources.

------------------------------------------------------------------------

# 38. Audio Preloading

Preload critical sounds:

``` text
UI click
dialogue advance
correct
incorrect
glitch
```

Load large music tracks when needed if the asset size becomes
significant.

------------------------------------------------------------------------

# 39. Music Transitions

When changing scenes:

``` text
stop/fade previous track
        ↓
start/fade next track
```

Avoid abruptly starting many tracks simultaneously.

------------------------------------------------------------------------

# 40. Browser Performance

The game should avoid unnecessary browser-level work.

Avoid:

``` text
setInterval loops everywhere
constant DOM measurements
continuous layout calculations
unnecessary resize handlers
large canvas readbacks
```

Use the game engine's timing/rendering systems where possible.

------------------------------------------------------------------------

# 41. Resize Handling

Browser resizing should not cause expensive repeated calculations.

Use a debounced/throttled resize handler if necessary.

The game should maintain:

``` text
stable aspect ratio
readable UI
correct input coordinates
```

------------------------------------------------------------------------

# 42. Garbage Collection

Avoid creating many short-lived objects every frame.

Bad:

``` ts
update() {
  const temp = {
    x: player.x,
    y: player.y
  };
}
```

when repeated unnecessarily.

Prefer:

-   Reuse objects.
-   Reuse arrays where practical.
-   Cache references.

Do not micro-optimize prematurely.

------------------------------------------------------------------------

# 43. Object Pooling

Object pooling is optional.

Use it only if profiling shows repeated creation/destruction is causing
a problem.

Possible candidates:

``` text
particles
damage-like feedback objects
floating score text
temporary effects
```

For the MVP, normal object creation is acceptable for most systems.

------------------------------------------------------------------------

# 44. Network Performance

The MVP should require almost no runtime network activity.

Preferred:

``` text
Browser
  ↓
Static assets
  ↓
Game
```

Avoid:

``` text
Browser
  ↓
API
  ↓
Database
  ↓
External service
```

for core gameplay.

------------------------------------------------------------------------

# 45. Offline Resilience

After the application has loaded required assets, core gameplay should
not depend on continuous network connectivity.

This is especially important during a hackathon demo.

------------------------------------------------------------------------

# 46. Build Size

Keep the production bundle reasonable.

Monitor:

``` text
JavaScript
CSS
Images
Audio
Fonts
```

Large music files and uncompressed images are common sources of
unnecessary bundle growth.

------------------------------------------------------------------------

# 47. Build Optimization

Use Vite production builds:

``` bash
npm run build
```

This provides:

-   Minification
-   Bundling
-   Asset hashing
-   Production optimization

Do not disable optimization unless debugging.

------------------------------------------------------------------------

# 48. Lazy Loading

Lazy-load only when useful.

Potential candidates:

``` text
large music files
large optional scenes
future bonus levels
```

Do not over-engineer lazy loading for tiny assets.

------------------------------------------------------------------------

# 49. Performance Monitoring

During development, monitor:

``` text
FPS
frame time
memory
asset loading time
bundle size
scene transition time
```

Phaser's debug/development tools and browser DevTools can help.

------------------------------------------------------------------------

# 50. Browser DevTools

Use:

### Performance tab

Check:

``` text
frame drops
long tasks
layout work
script execution
```

### Memory tab

Check:

``` text
heap growth
detached objects
memory leaks
```

### Network tab

Check:

``` text
unexpected requests
large assets
slow resources
failed requests
```

------------------------------------------------------------------------

# 51. Performance Profiling Process

When something feels slow:

``` text
1. Reproduce the issue.
2. Measure it.
3. Identify the expensive operation.
4. Fix the actual bottleneck.
5. Measure again.
```

Do not optimize based purely on assumptions.

------------------------------------------------------------------------

# 52. Common Performance Problems

Watch for:

## Problem

FPS drops in city.

### Possible causes

``` text
too many sprites
too many animated objects
expensive effects
large tilemap
```

------------------------------------------------------------------------

## Problem

Game becomes slower after several scene changes.

### Possible causes

``` text
event listener leak
timer leak
audio leak
scene objects not destroyed
```

------------------------------------------------------------------------

## Problem

Initial load is slow.

### Possible causes

``` text
huge images
large audio
too many fonts
unused assets
large JavaScript bundle
```

------------------------------------------------------------------------

# 53. Performance Testing Matrix

Test at least:

  Environment                             Priority
  --------------------------------------- ----------
  Modern laptop + Chrome                  P0
  Modern laptop + Edge                    P0
  Modern laptop + Firefox                 P1
  Smaller laptop                          P1
  Resized browser window                  P1
  Low network speed during initial load   P2

The final hackathon demo should use the most stable tested environment.

------------------------------------------------------------------------

# 54. Performance Acceptance Criteria

The MVP should meet:

``` text
[ ] Game launches without visible stutter.
[ ] Player movement feels responsive.
[ ] Dialogue transitions smoothly.
[ ] Challenge UI opens immediately.
[ ] Timer updates correctly.
[ ] Score updates without noticeable delay.
[ ] City remains playable.
[ ] Scene transitions do not accumulate memory.
[ ] Audio does not overlap incorrectly.
[ ] Browser remains responsive.
[ ] Full demo can be completed without degradation.
```

------------------------------------------------------------------------

# 55. Accessibility vs Performance

Do not optimize away accessibility features.

Keep:

``` text
captions
text alternatives
focus indicators
keyboard controls
reduced motion
readable text
```

If an accessibility feature is expensive, optimize its implementation
rather than removing it.

------------------------------------------------------------------------

# 56. Reduced Motion

When:

``` text
reducedMotion === true
```

reduce or disable:

``` text
screen shake
large camera movement
rapid glitch effects
excessive transitions
particle effects
```

Keep important state changes understandable through:

``` text
text
icons
sound
layout changes
```

------------------------------------------------------------------------

# 57. Timer Accuracy

The appointment timer must be based on elapsed time rather than assuming
that one update equals one second.

Conceptually:

``` text
remaining =
    duration -
    elapsedRealTime
```

This prevents timer drift if the browser temporarily slows down.

------------------------------------------------------------------------

# 58. Background Tab Behavior

Browsers may throttle inactive tabs.

Therefore, do not assume:

``` text
setInterval(() => remaining--, 1000)
```

is perfectly accurate.

Use timestamps or elapsed-time calculations for the actual timer.

------------------------------------------------------------------------

# 59. Demo Performance Mode

Optional:

``` text
DEMO MODE
```

can disable unnecessary effects.

Example:

``` text
reduced particles
simpler glitch
preload all assets
disable debug logging
```

This can provide an extra safety margin during judging.

Do not expose development/debug tools to players unless necessary.

------------------------------------------------------------------------

# 60. Development vs Production

## Development

Allow:

``` text
debug logging
FPS counter
scene labels
asset warnings
content validation
```

## Production

Disable:

``` text
verbose logging
debug overlays
development controls
test NPCs
test challenges
```

------------------------------------------------------------------------

# 61. Performance and AI Coding Agents

Anti-Gravity should follow these rules:

1.  Do not add a performance optimization without identifying a real
    issue.
2.  Do not introduce a heavy library for a small task.
3.  Do not duplicate asset-loading systems.
4.  Do not create unnecessary update loops.
5.  Clean up event listeners.
6.  Stop timers when scenes end.
7.  Reuse existing UI components.
8.  Keep content cached.
9.  Test scene transitions after changes.
10. Preserve accessibility features.

------------------------------------------------------------------------

# 62. Performance Review Checklist

Before final submission:

### Rendering

``` text
[ ] No obvious frame drops
[ ] Pixel art remains crisp
[ ] Effects are lightweight
```

### Memory

``` text
[ ] No obvious memory growth
[ ] Scenes clean up correctly
[ ] Audio stops correctly
```

### Loading

``` text
[ ] Startup is reasonable
[ ] No unnecessary assets load
[ ] Production build works
```

### Gameplay

``` text
[ ] Movement responsive
[ ] Dialogue smooth
[ ] Timer accurate
[ ] Challenge interaction immediate
[ ] Score updates correctly
```

### Accessibility

``` text
[ ] Captions work
[ ] Keyboard controls work
[ ] Reduced motion works
[ ] UI remains readable
```

------------------------------------------------------------------------

# 63. Performance Definition of Done

Performance is considered sufficient for the MVP when:

-   The complete game can be played from start to finish without
    degradation.
-   The main city scene remains responsive.
-   The appointment timer remains accurate.
-   Scene transitions clean up old systems.
-   No obvious memory leak appears during repeated scene transitions.
-   The browser remains responsive.
-   The production build loads correctly.
-   Assets are appropriately compressed.
-   The game does not rely on unnecessary network requests.
-   Accessibility features remain functional.

------------------------------------------------------------------------

# 64. Final Performance Principle

> **Optimize what the player feels, not what the code merely makes
> possible.**

For Inclusive Interface, the priorities are:

``` text
RESPONSIVE INPUT
      ↓
SMOOTH EXPLORATION
      ↓
CLEAR DIALOGUE
      ↓
FAST CHALLENGES
      ↓
STABLE TIMER
      ↓
SMOOTH TRANSITIONS
      ↓
POLISHED VISUALS
```

The player should never think about performance.

They should think:

> **"I understand the problem now."**
