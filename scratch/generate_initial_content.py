import json

def generate():
    with open("c:/COOOY/PHOENIX/src/data/parsed_challenges.json", "r", encoding="utf-8") as f:
        challenges = json.load(f)

    # Let's write the initialContent.ts file content
    ts_content = """import { Character, Challenge, District, Mission, Badge } from '../types/game';

export const INITIAL_DISTRICTS: District[] = [
  {
    id: 'medicity',
    name: 'Medicity Healthcare District',
    description: 'Central hospital and medical scheduling portal serving Access City citizens.',
    icon: '🏥',
    isUnlocked: true,
    unlockRequirement: 'Starting District',
    activeMissionId: 'mission-medicity-1',
  },
  {
    id: 'finance',
    name: 'Financial District',
    description: 'Digital banking, online payments, and accessible tax services.',
    icon: '🏦',
    isUnlocked: false,
    unlockRequirement: 'Complete Medicity Healthcare Mission',
  },
  {
    id: 'knowledge',
    name: 'Knowledge District',
    description: 'Educational portals, digital libraries, and learning resources.',
    icon: '🏫',
    isUnlocked: false,
    unlockRequirement: 'Complete Financial District Mission',
  },
  {
    id: 'civic',
    name: 'Civic District',
    description: 'Municipal government services, public voting, and civic announcements.',
    icon: '🏛️',
    isUnlocked: false,
    unlockRequirement: 'Complete Knowledge District Mission',
  },
  {
    id: 'commerce',
    name: 'Commerce District',
    description: 'Online shopping, local marketplace, and delivery services.',
    icon: '🛍️',
    isUnlocked: false,
    unlockRequirement: 'Complete Civic District Mission',
  },
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mission-medicity-1',
    districtId: 'medicity',
    title: 'Operation Inclusive Appointment',
    description: 'Redesign the Medicity appointment booking portal so Rahul, Fatima, and Grandma can book appointments independently.',
    storyIntro: 'Medicity portal is launching its digital scheduling system tomorrow. If we do not eliminate accessibility barriers now, thousands of citizens will be excluded!',
    requiredChallengeIds: ['rahul-visual-easy-01', 'fatima-hearing-easy-01', 'mira-color-easy-01'],
    rewardXp: 300,
    rewardCredits: 50,
    isCompleted: false,
  },
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'COLOR_CRUSHER',
    name: 'Color Crusher',
    description: 'Eliminated your first color-only information barrier.',
    icon: '🎨',
    conditionType: 'challenges_solved',
    conditionValue: 1,
    isUnlocked: false,
  },
  {
    id: 'CLEAR_THINKER',
    name: 'Clear Thinker',
    description: 'Solved cognitive accessibility barriers with plain language.',
    icon: '🧠',
    conditionType: 'category_mastered',
    conditionValue: 'cognitive',
    isUnlocked: false,
  },
  {
    id: 'KEYBOARD_KNIGHT',
    name: 'Keyboard Knight',
    description: 'Restored visible keyboard focus and logical DOM tab ordering.',
    icon: '⌨️',
    conditionType: 'category_mastered',
    conditionValue: 'keyboard',
    isUnlocked: false,
  },
  {
    id: 'INCLUSIVE_ARCHITECT',
    name: 'Inclusive Architect',
    description: 'Achieved 90%+ accessibility rating across Access City.',
    icon: '🏛️',
    conditionType: 'district_unlocked',
    conditionValue: 'medicity',
    isUnlocked: false,
  },
  {
    id: 'ZERO_EXCLUSION',
    name: 'Zero Exclusion',
    description: '10,000 citizens successfully served in the final city simulation.',
    icon: '👑',
    conditionType: 'zero_exclusion',
    conditionValue: 10000,
    isUnlocked: false,
  },
];

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'rahul',
    name: 'Rahul',
    role: 'Screen Reader User & Audio Advocate',
    bio: 'Rahul relies on screen readers and clear tactile/auditory feedback to navigate digital software.',
    storyRole: 'Advocates for screen reader compatibility and semantic HTML labels.',
    avatarColor: 0x3a86ef,
    accessibilityNeeds: ['screen-reader', 'visual'],
    initialDialogueId: 'rahul-intro-1',
    dialogueTree: {
      'rahul-intro-1': {
        id: 'rahul-intro-1',
        speaker: 'Rahul',
        text: "Hey.",
        nextId: 'rahul-intro-2',
      },
      'rahul-intro-2': {
        id: 'rahul-intro-2',
        speaker: 'Player',
        text: "Hey. I'm the new designer.",
        nextId: 'rahul-intro-3',
      },
      'rahul-intro-3': {
        id: 'rahul-intro-3',
        speaker: 'Rahul',
        text: "Designer? Then I've got a question for you.",
        nextId: 'rahul-intro-4',
      },
      'rahul-intro-4': {
        id: 'rahul-intro-4',
        speaker: 'Rahul',
        text: "Why do websites keep making me guess what buttons do?",
        triggerChallengeId: 'rahul-visual-easy-01',
      },
    },
  },
  {
    id: 'fatima',
    name: 'Fatima',
    role: 'Hearing Accessibility Advocate',
    bio: 'Fatima values captions, visual cues and text alternatives to audio content.',
    storyRole: 'Advocates for captions, text transcripts, and clear visual signifiers.',
    avatarColor: 0xff007f,
    accessibilityNeeds: ['auditory'],
    initialDialogueId: 'fatima-intro-1',
    dialogueTree: {
      'fatima-intro-1': {
        id: 'fatima-intro-1',
        speaker: 'Fatima',
        text: "Hi there.",
        nextId: 'fatima-intro-2',
      },
      'fatima-intro-2': {
        id: 'fatima-intro-2',
        speaker: 'Player',
        text: "Hi. Fatima, right?",
        nextId: 'fatima-intro-3',
      },
      'fatima-intro-3': {
        id: 'fatima-intro-3',
        speaker: 'Fatima',
        text: "Yes. I'm trying to watch this tutorial for the transit portal, but there are no subtitles, and the sound is extremely muffled.",
        nextId: 'fatima-intro-4',
      },
      'fatima-intro-4': {
        id: 'fatima-intro-4',
        speaker: 'Fatima',
        text: "I can't understand a word they are saying. Can you fix this?",
        triggerChallengeId: 'fatima-hearing-easy-01',
      },
    },
  },
  {
    id: 'grandma',
    name: 'Grandma Mira',
    role: 'Color Vision Advocate',
    bio: "Mira has color-vision deficiency and values design that doesn't rely on color alone.",
    storyRole: 'Advocates for icons, text labels, and clear shape-based indicators.',
    avatarColor: 0xffb703,
    accessibilityNeeds: ['visual'],
    initialDialogueId: 'grandma-intro-1',
    dialogueTree: {
      'grandma-intro-1': {
        id: 'grandma-intro-1',
        speaker: 'Grandma Mira',
        text: "Quick question.",
        nextId: 'grandma-intro-2',
      },
      'grandma-intro-2': {
        id: 'grandma-intro-2',
        speaker: 'Player',
        text: "Okay.",
        nextId: 'grandma-intro-3',
      },
      'grandma-intro-3': {
        id: 'grandma-intro-3',
        speaker: 'Grandma Mira',
        text: "Which one of these means 'available'?",
        nextId: 'grandma-intro-4',
      },
      'grandma-intro-4': {
        id: 'grandma-intro-4',
        speaker: 'Player',
        text: "The green one?",
        nextId: 'grandma-intro-5',
      },
      'grandma-intro-5': {
        id: 'grandma-intro-5',
        speaker: 'Grandma Mira',
        text: "Exactly. Now imagine I couldn't tell them apart.",
        triggerChallengeId: 'mira-color-easy-01',
      },
    },
  },
];

export const INITIAL_CHALLENGES: Challenge[] = """

    # Add challenges array formatting it cleanly
    challenges_str = json.dumps(challenges, indent=2)
    # Convert JSON to JS-like object formatting (replacing key strings with unquoted keys)
    # Also adjust category values from string to specific type values if needed
    ts_content += challenges_str + ";\n"
    
    with open("c:/COOOY/PHOENIX/src/data/initialContent.ts", "w", encoding="utf-8") as out:
        out.write(ts_content)
    print("Generated initialContent.ts successfully.")

if __name__ == "__main__":
    generate()
