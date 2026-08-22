import { Character, Challenge, District, Mission, Badge } from '../types/game';

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
  {
    id: 'kofi',
    name: 'Kofi',
    role: 'Motor Accessibility Advocate',
    bio: 'Kofi cannot use a mouse and relies entirely on keyboard tab navigation to read, code, and browse websites.',
    storyRole: 'Advocates for logical tab sequence, visual focus indicators, and custom shortcut commands.',
    avatarColor: 0x3b82f6,
    accessibilityNeeds: ['motor', 'keyboard'],
    initialDialogueId: 'kofi-intro-1',
    dialogueTree: {
      'kofi-intro-1': {
        id: 'kofi-intro-1',
        speaker: 'Kofi',
        text: "Hey there, Ava. I heard you're auditing the design lab portal.",
        nextId: 'kofi-intro-2',
      },
      'kofi-intro-2': {
        id: 'kofi-intro-2',
        speaker: 'Player',
        text: "Hey Kofi. Yes, I want to make sure it's fully accessible for everyone.",
        nextId: 'kofi-intro-3',
      },
      'kofi-intro-3': {
        id: 'kofi-intro-3',
        speaker: 'Kofi',
        text: "Good! Because right now, I can't use it. When I try to press Tab, the focus disappears entirely into invisible advertisement links.",
        nextId: 'kofi-intro-4',
      },
      'kofi-intro-4': {
        id: 'kofi-intro-4',
        speaker: 'Kofi',
        text: "I have no idea where my keyboard outline is. Can you help fix the focus style?",
        triggerChallengeId: 'kofi-motor-easy-01',
      },
    },
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Cognitive Design Advocate',
    bio: 'Elena gets easily overwhelmed by flashing content, complex forms, and sudden timed sessions.',
    storyRole: 'Advocates for clean layouts, persistent user input values, clear errors, and session extensions.',
    avatarColor: 0x10b981,
    accessibilityNeeds: ['cognitive'],
    initialDialogueId: 'elena-intro-1',
    dialogueTree: {
      'elena-intro-1': {
        id: 'elena-intro-1',
        speaker: 'Elena',
        text: "Hello, Ava. Can I ask you about the registration forms?",
        nextId: 'elena-intro-2',
      },
      'elena-intro-2': {
        id: 'elena-intro-2',
        speaker: 'Player',
        text: "Sure, Elena. What's the issue with them?",
        nextId: 'elena-intro-3',
      },
      'elena-intro-3': {
        id: 'elena-intro-3',
        speaker: 'Elena',
        text: "They are so stressful! If I make one small typo, the form clears all fields completely, forcing me to start over under a strict time limit.",
        nextId: 'elena-intro-4',
      },
      'elena-intro-4': {
        id: 'elena-intro-4',
        speaker: 'Elena',
        text: "It makes my anxiety spike and makes it hard to complete applications. Is there a better design?",
        triggerChallengeId: 'elena-cognitive-easy-01',
      },
    },
  },
  {
    id: 'yuki',
    name: 'Yuki',
    role: 'Language and Localization Advocate',
    bio: 'Yuki is a non-native speaker who struggles with dense, complex legal phrasing and idioms in digital products.',
    storyRole: 'Advocates for plain language summaries, localization options, and clean textual descriptions.',
    avatarColor: 0xf59e0b,
    accessibilityNeeds: ['language'],
    initialDialogueId: 'yuki-intro-1',
    dialogueTree: {
      'yuki-intro-1': {
        id: 'yuki-intro-1',
        speaker: 'Yuki',
        text: "Excuse me. Ava, right?",
        nextId: 'yuki-intro-2',
      },
      'yuki-intro-2': {
        id: 'yuki-intro-2',
        speaker: 'Player',
        text: "Yes, hello! Can I help you with the registration page?",
        nextId: 'yuki-intro-3',
      },
      'yuki-intro-3': {
        id: 'yuki-intro-3',
        speaker: 'Yuki',
        text: "Yes. The civic enrollment page uses extremely complex legal jargon and phrases I've never heard before.",
        nextId: 'yuki-intro-4',
      },
      'yuki-intro-4': {
        id: 'yuki-intro-4',
        speaker: 'Yuki',
        text: "Without plain summaries or definitions, it is impossible for non-native speakers like me. Can you improve this text?",
        triggerChallengeId: 'yuki-language-easy-01',
      },
    },
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    "id": "rahul-visual-easy-01",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "easy",
    "title": "Rahul Easy Challenge 01",
    "scenario": "Rahul opens a booking page. There are three buttons. Each button contains only an icon. Nothing explains what the icons mean.",
    "description": "Rahul opens a booking page. There are three buttons. Each button contains only an icon. Nothing explains what the icons mean.",
    "question": "What is the best improvement?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Make the icons more colorful.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Add clear, descriptive labels.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Add an animation when the buttons appear.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Make the icons smaller.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-easy-02",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "easy",
    "title": "Rahul Easy Challenge 02",
    "scenario": "Rahul encounters a form with text fields. The fields have no visible labels. The designer assumes the user will understand what each box is for.",
    "description": "Rahul encounters a form with text fields. The fields have no visible labels. The designer assumes the user will understand what each box is for.",
    "question": "What should the form provide?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Placeholder text only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Clear, persistent field labels.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "A brighter background.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "A loading animation.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-easy-03",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "easy",
    "title": "Rahul Easy Challenge 03",
    "scenario": "A website displays an important status using only a colored dot.",
    "description": "A website displays an important status using only a colored dot.",
    "question": "What is the safest design?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Use a brighter color.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Make the dot larger.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "Use color plus text or an icon.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "d",
        "label": "Add a flashing animation.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-medium-01",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "medium",
    "title": "Rahul Medium Challenge 01",
    "scenario": "Rahul can technically access a form, but the fields are presented in a confusing order. The instructions are visually positioned beside the fields rather than being clearly associated with them.",
    "description": "Rahul can technically access a form, but the fields are presented in a confusing order. The instructions are visually positioned beside the fields rather than being clearly associated with them.",
    "question": "Which improvement is strongest?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Add more decorative icons.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Use a logical reading order and clear field labels.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Increase the number of colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Add a moving cursor.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-medium-02",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "medium",
    "title": "Rahul Medium Challenge 02",
    "scenario": "A booking form has a small text instruction at the bottom of the page. The instruction explains an important requirement. Nothing connects that instruction clearly to the field it describes.",
    "description": "A booking form has a small text instruction at the bottom of the page. The instruction explains an important requirement. Nothing connects that instruction clearly to the field it describes.",
    "question": "What should the designer do?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Make the instruction decorative.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Remove the instruction.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "Associate the instruction directly with the relevant field.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "d",
        "label": "Put the instruction in a tooltip that disappears immediately.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-medium-03",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "medium",
    "title": "Rahul Medium Challenge 03",
    "scenario": "Rahul encounters a button that visually looks clickable. But only a tiny part of the button actually responds.",
    "description": "Rahul encounters a button that visually looks clickable. But only a tiny part of the button actually responds.",
    "question": "What should happen?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Keep the tiny hit area.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Make the entire visible control interactive.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Hide the button.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Add a sound every time the mouse moves over it.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-hard-01",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "hard",
    "title": "Rahul Hard Challenge 01",
    "scenario": "A healthcare booking page contains: -   tiny controls -   unclear labels -   weak contrast -   color-only status indicators -   a short timeout You can only make two changes before launch.",
    "description": "A healthcare booking page contains: -   tiny controls -   unclear labels -   weak contrast -   color-only status indicators -   a short timeout You can only make two changes before launch.",
    "question": "Which pair should you prioritize?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Add decorative animation + new colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Improve labels + make important controls usable at an appropriate target size.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Add background music + change the logo.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Add a loading animation + rounded corners.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-hard-02",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "hard",
    "title": "Rahul Hard Challenge 02",
    "scenario": "A form has good labels, but an error appears only as a red border around the field.",
    "description": "A form has good labels, but an error appears only as a red border around the field.",
    "question": "What should the designer add?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "A darker red.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "A sound only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "A clear text explanation connected to the field.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "d",
        "label": "More animation.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "rahul-visual-hard-03",
    "characterId": "rahul",
    "category": "visual",
    "difficulty": "hard",
    "title": "Rahul Hard Challenge 03",
    "scenario": "A complex booking flow has several screens. Each screen looks different. Rahul keeps losing track of where he is in the process.",
    "description": "A complex booking flow has several screens. Each screen looks different. Rahul keeps losing track of where he is in the process.",
    "question": "What would help most?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Change the background on every screen.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Add a clear, consistent progress indicator and predictable navigation.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Add more animations.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Remove all headings.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "aria-labels"
    }
  },
  {
    "id": "fatima-hearing-easy-01",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "easy",
    "title": "Fatima Easy Challenge 01",
    "scenario": "An important appointment reminder is delivered only through a sound.",
    "description": "An important appointment reminder is delivered only through a sound.",
    "question": "What should the interface provide?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Louder audio.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "A visual and/or text notification.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "More background music.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "A different ringtone.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-easy-02",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "easy",
    "title": "Fatima Easy Challenge 02",
    "scenario": "A tutorial video contains spoken instructions but no captions.",
    "description": "A tutorial video contains spoken instructions but no captions.",
    "question": "What should be added?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Louder narration.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Captions.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Faster playback.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "More background music.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-easy-03",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "easy",
    "title": "Fatima Easy Challenge 03",
    "scenario": "A website displays an error only through a short notification sound.",
    "description": "A website displays an error only through a short notification sound.",
    "question": "What should replace the audio-only message?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "A louder sound.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "A longer sound.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "A visible text notification.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "d",
        "label": "No notification.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-medium-01",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "medium",
    "title": "Fatima Medium Challenge 01",
    "scenario": "A live event provides captions, but they disappear immediately after each sentence.",
    "description": "A live event provides captions, but they disappear immediately after each sentence.",
    "question": "What would improve the experience?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Make the captions smaller.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Keep important information available long enough to understand and act on it.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Remove captions.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Add background animation.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-medium-02",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "medium",
    "title": "Fatima Medium Challenge 02",
    "scenario": "An emergency notification flashes briefly on screen and then disappears.",
    "description": "An emergency notification flashes briefly on screen and then disappears.",
    "question": "What is the better design?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Make it flash faster.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Provide a persistent visual notification or notification history.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Replace it with a sound.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Hide it after one second.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-medium-03",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "medium",
    "title": "Fatima Medium Challenge 03",
    "scenario": "A video has captions, but important non-speech sounds are never represented.",
    "description": "A video has captions, but important non-speech sounds are never represented.",
    "question": "What should captions communicate?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Spoken words only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Important audio information, including relevant non-speech sounds.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Background music lyrics only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Nothing beyond the title.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-hard-01",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "hard",
    "title": "Fatima Hard Challenge 01",
    "scenario": "A healthcare app communicates: -   appointment reminders through sound -   urgent alerts through sound -   short video instructions without captions You have limited development time.",
    "description": "A healthcare app communicates: -   appointment reminders through sound -   urgent alerts through sound -   short video instructions without captions You have limited development time.",
    "question": "Which change should have the highest priority?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Replace the notification sound.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Make critical information available through a visual/text channel.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Add background music controls.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Animate the logo.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-hard-02",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "hard",
    "title": "Fatima Hard Challenge 02",
    "scenario": "A support agent communicates with users through a video interface. Captions exist, but there is no transcript or way to review important information later.",
    "description": "A support agent communicates with users through a video interface. Captions exist, but there is no transcript or way to review important information later.",
    "question": "Which improvement adds the most flexibility?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Louder audio.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "A transcript/history of important communication.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "More animated icons.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Smaller captions.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "fatima-hearing-hard-03",
    "characterId": "fatima",
    "category": "auditory",
    "difficulty": "hard",
    "title": "Fatima Hard Challenge 03",
    "scenario": "A notification can be communicated visually or through sound. The designer wants to use both, but the visual notification disappears immediately.",
    "description": "A notification can be communicated visually or through sound. The designer wants to use both, but the visual notification disappears immediately.",
    "question": "What is the best approach?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Keep the visual notification available long enough to understand and act.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "b",
        "label": "Remove the visual notification.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "Make the sound louder.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Use only animation.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "captions"
    }
  },
  {
    "id": "mira-color-easy-01",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "easy",
    "title": "Mira Easy Challenge 01",
    "scenario": "A status indicator uses only green and red.",
    "description": "A status indicator uses only green and red.",
    "question": "What should be added?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Brighter green.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Different shades of red.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "c",
        "label": "Text or icons alongside the colors.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "d",
        "label": "Flashing colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-easy-02",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "easy",
    "title": "Mira Easy Challenge 02",
    "scenario": "A form marks required fields only with a red dot.",
    "description": "A form marks required fields only with a red dot.",
    "question": "What should the designer do?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Make the dot brighter.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Add a clear text indicator such as \"Required.\"",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Make the dot blink.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Remove all indicators.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-easy-03",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "easy",
    "title": "Mira Easy Challenge 03",
    "scenario": "A chart uses five colors but no labels.",
    "description": "A chart uses five colors but no labels.",
    "question": "What should accompany the colors?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "More colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Labels, patterns, or another distinguishing method.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 20,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Lower contrast.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Animation only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-medium-01",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "medium",
    "title": "Mira Medium Challenge 01",
    "scenario": "A map uses colored lines to represent different transit routes. Some routes look very similar.",
    "description": "A map uses colored lines to represent different transit routes. Some routes look very similar.",
    "question": "What would improve identification?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Increase saturation only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Add route names, numbers, icons, or patterns.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Remove labels.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Make every route the same color.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-medium-02",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "medium",
    "title": "Mira Medium Challenge 02",
    "scenario": "An error state is indicated only by a red border.",
    "description": "An error state is indicated only by a red border.",
    "question": "What is the stronger design?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Darker red.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Red border + error icon + explanatory text.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Remove the error state.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Flash the border.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-medium-03",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "medium",
    "title": "Mira Medium Challenge 03",
    "scenario": "A game dashboard shows task progress using green, yellow, and red cards. There are no labels.",
    "description": "A game dashboard shows task progress using green, yellow, and red cards. There are no labels.",
    "question": "What should be added?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "More saturated colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Text or icons that communicate the same status.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "More animations.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "A darker background.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-hard-01",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "hard",
    "title": "Mira Hard Challenge 01",
    "scenario": "A healthcare dashboard communicates: -   available -   waiting -   unavailable using only three colors.",
    "description": "A healthcare dashboard communicates: -   available -   waiting -   unavailable using only three colors.",
    "question": "What is the strongest redesign?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Use brighter colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Use color + text + distinct icons.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Use animation only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Remove status information.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-hard-02",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "hard",
    "title": "Mira Hard Challenge 02",
    "scenario": "A chart must remain understandable when printed in grayscale.",
    "description": "A chart must remain understandable when printed in grayscale.",
    "question": "Which approach is safest?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Use only color.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Combine color with labels, patterns, or shapes.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Increase the number of colors.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "Make all values transparent.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "mira-color-hard-03",
    "characterId": "grandma",
    "category": "visual",
    "difficulty": "hard",
    "title": "Mira Hard Challenge 03",
    "scenario": "You are designing a critical alert system. The alert currently uses red text. You want the alert to remain obvious without relying on color.",
    "description": "You are designing a critical alert system. The alert currently uses red text. You want the alert to remain obvious without relying on color.",
    "question": "Which combination is strongest?",
    "explanation": "",
    "accessibilityPrinciple": "WCAG Accessibility Rule",
    "options": [
      {
        "id": "a",
        "label": "Red text only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "b",
        "label": "Icon + text + appropriate visual emphasis.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! "
      },
      {
        "id": "c",
        "label": "Background animation only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      },
      {
        "id": "d",
        "label": "A brighter red.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Not quite. Think about what the user is experiencing. Let's try again!"
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "color-indicators"
    }
  },
  {
    "id": "kofi-motor-easy-01",
    "characterId": "kofi",
    "category": "motor",
    "difficulty": "easy",
    "title": "Kofi Focus Indicator",
    "scenario": "Kofi is navigating a form using the Tab key. There is no visual outline indicating which button currently has keyboard focus, making navigation blind.",
    "description": "Kofi is navigating a form using the Tab key. There is no visual outline indicating which button currently has keyboard focus, making navigation blind.",
    "question": "Which CSS rule is essential for restoring keyboard focus visibility?",
    "explanation": "WCAG 2.4.7 requires that any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
    "accessibilityPrinciple": "WCAG 2.4.7 Focus Visible",
    "options": [
      {
        "id": "a",
        "label": "Use :focus { outline: 2px solid #fbbf24; outline-offset: 2px; } to show a clear indicator.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! A high-contrast focus ring allows keyboard-only users to track their active location."
      },
      {
        "id": "b",
        "label": "Set outline: none in the styling to make it look clean.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Removing outline makes it impossible for keyboard users to know where they are."
      },
      {
        "id": "c",
        "label": "Rely on color changing transitions only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Subtle color transitions are often missed and can fail color contrast guidelines."
      },
      {
        "id": "d",
        "label": "Disable tab navigation entirely.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Disabling keyboard navigation completely excludes non-mouse users."
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "keyboardAlternative"
    }
  },
  {
    "id": "kofi-motor-medium-01",
    "characterId": "kofi",
    "category": "motor",
    "difficulty": "medium",
    "title": "Kofi Logical Tab Sequence",
    "scenario": "Kofi starts filling a multi-step design lab setup form. When pressing Tab, the focus moves randomly from the header directly to the footer, skipping the form fields.",
    "description": "Kofi starts filling a multi-step design lab setup form. When pressing Tab, the focus moves randomly from the header directly to the footer, skipping the form fields.",
    "question": "How do you correct the tab navigation sequence?",
    "explanation": "WCAG 2.4.3 Focus Order ensures focusable components receive focus in an order that preserves meaning and operability.",
    "accessibilityPrinciple": "WCAG 2.4.3 Focus Order",
    "options": [
      {
        "id": "a",
        "label": "Structure the HTML DOM in a logical reading order so focus flows naturally from top to bottom.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 50,
        "feedback": "Correct! Natural DOM order ensures intuitive keyboard progression without messy positive tabindex values."
      },
      {
        "id": "b",
        "label": "Set tabindex=0 on every single span and div element.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Setting tabindex on non-interactive elements clutters the tab loop."
      },
      {
        "id": "c",
        "label": "Hardcode positive tabindex attributes (tabindex=1, tabindex=2) everywhere.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Positive tabindex is considered an anti-pattern as it easily breaks maintenance."
      },
      {
        "id": "d",
        "label": "Remove keyboard tab support.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Keyboard accessibility is mandatory."
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "keyboardAlternative"
    }
  },
  {
    "id": "kofi-motor-hard-01",
    "characterId": "kofi",
    "category": "motor",
    "difficulty": "hard",
    "title": "Kofi Modal Focus Trap",
    "scenario": "Kofi reaches a complex slide-out settings drawer. When pressing Tab, the focus goes behind the drawer to elements on the main page, trapping him.",
    "description": "Kofi reaches a complex slide-out settings drawer. When pressing Tab, the focus goes behind the drawer to elements on the main page, trapping him.",
    "question": "What is the best way to handle focus for a modal or drawer?",
    "explanation": "Accessible dialogs should trap focus within their interactive boundaries while open and restore focus upon closing.",
    "accessibilityPrinciple": "WCAG 2.1.2 No Keyboard Trap & Dialog Patterns",
    "options": [
      {
        "id": "a",
        "label": "Implement focus trapping: restrict focus cycling within the active drawer until it is closed, and return focus on close.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! Focus trapping ensures keyboard users never get lost behind active overlays."
      },
      {
        "id": "b",
        "label": "Leave the focus free to navigate behind the modal.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Leaving focus free allows users to interact with hidden background controls."
      },
      {
        "id": "c",
        "label": "Remove the cancel/close buttons.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Close buttons are essential for all users."
      },
      {
        "id": "d",
        "label": "Make the modal close automatically on any click.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "This causes accidental dismissals and disorients users."
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "keyboardAlternative"
    }
  },
  {
    "id": "elena-cognitive-easy-01",
    "characterId": "elena",
    "category": "cognitive",
    "difficulty": "easy",
    "title": "Elena Error Recovery",
    "scenario": "Elena is filling out a form and makes a mistake. The page reloads, clears all the values she typed, and shows a generic 'Invalid input' error at the top.",
    "description": "Elena is filling out a form and makes a mistake. The page reloads, clears all the values she typed, and shows a generic 'Invalid input' error at the top.",
    "question": "How can we improve the error handling?",
    "explanation": "WCAG 3.3.1 Error Identification and 3.3.3 Error Suggestion ensure errors are clearly pointed out and easy to fix without losing work.",
    "accessibilityPrinciple": "WCAG 3.3.1 Error Identification",
    "options": [
      {
        "id": "a",
        "label": "Preserve user inputs, highlight the specific fields with errors, and describe how to fix them plainly.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! Preserving data and providing specific inline guidance prevents cognitive fatigue and frustration."
      },
      {
        "id": "b",
        "label": "Clear all inputs for security and show a longer error message.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Clearing inputs causes extreme frustration and data loss."
      },
      {
        "id": "c",
        "label": "Do not validate forms at all.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Forms need validation to ensure submitted information is accurate."
      },
      {
        "id": "d",
        "label": "Add a loud buzzer sound on submission failure.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Harsh audio alerts increase anxiety and cause sensory overload."
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "simplifiedLayout"
    }
  },
  {
    "id": "elena-cognitive-medium-01",
    "characterId": "elena",
    "category": "cognitive",
    "difficulty": "medium",
    "title": "Elena Visual Hierarchy & Distractions",
    "scenario": "Elena is reading a dense 4-step wizard interface. The screen is packed with flash banners, auto-playing videos, complex grid widgets, and floating popups.",
    "description": "Elena is reading a dense 4-step wizard interface. The screen is packed with flash banners, auto-playing videos, complex grid widgets, and floating popups.",
    "question": "How can we reduce cognitive load for this wizard interface?",
    "explanation": "WCAG 2.2.2 Pause, Stop, Hide and clean visual hierarchies reduce sensory distractions for cognitive accessibility.",
    "accessibilityPrinciple": "WCAG 2.2.2 & Cognitive Load Minimization",
    "options": [
      {
        "id": "a",
        "label": "Mute animations, simplify the visual hierarchy, and focus on one clear step per screen.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 50,
        "feedback": "Correct! Breaking tasks into clean, predictable steps reduces overwhelm."
      },
      {
        "id": "b",
        "label": "Add more vibrant colors to highlight all sections simultaneously.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Excessive colors increase visual clutter and competition for attention."
      },
      {
        "id": "c",
        "label": "Provide a complex PDF manual to download.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "External manuals force users out of the flow and add burden."
      },
      {
        "id": "d",
        "label": "Keep everything as-is but increase font size.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Increasing font size alone without decluttering makes crowded layouts worse."
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "simplifiedLayout"
    }
  },
  {
    "id": "elena-cognitive-hard-01",
    "characterId": "elena",
    "category": "cognitive",
    "difficulty": "hard",
    "title": "Elena Timing Adjustable",
    "scenario": "Elena is applying for a permit. The session has a strict 60-second timeout. At 50 seconds, she receives no warning, and the page abruptly logs her out, deleting her progress.",
    "description": "Elena is applying for a permit. The session has a strict 60-second timeout. At 50 seconds, she receives no warning, and the page abruptly logs her out, deleting her progress.",
    "question": "What WCAG compliant action should be taken?",
    "explanation": "WCAG 2.2.1 Timing Adjustable requires that users have options to turn off, adjust, or extend time limits before expiring.",
    "accessibilityPrinciple": "WCAG 2.2.1 Timing Adjustable",
    "options": [
      {
        "id": "a",
        "label": "Provide a clear warning prompt at least 20 seconds before timeout, allowing the user to easily extend the session with a single action.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! Giving users advance notice and the option to extend time limits ensures they can complete tasks at their own pace."
      },
      {
        "id": "b",
        "label": "Remove timeouts completely on public insecure kiosks.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Security sensitive contexts require adjustable limits rather than total elimination."
      },
      {
        "id": "c",
        "label": "Increase the static timer slightly to 75 seconds without any warning.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Static increases do not solve unpredictable cognitive processing needs."
      },
      {
        "id": "d",
        "label": "Redirect to the beginning automatically.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Silent redirection discards user work and causes extreme confusion."
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "simplifiedLayout"
    }
  },
  {
    "id": "yuki-language-easy-01",
    "characterId": "yuki",
    "category": "language",
    "difficulty": "easy",
    "title": "Yuki Plain Language",
    "scenario": "Yuki opens a legal terms agreement. The text is written in dense jargon (e.g., 'heretofore', 'indemnify'). She cannot find a plain-language summary.",
    "description": "Yuki opens a legal terms agreement. The text is written in dense jargon (e.g., 'heretofore', 'indemnify'). She cannot find a plain-language summary.",
    "question": "What is the best way to write inclusive, accessible content?",
    "explanation": "WCAG 3.1.5 Reading Level recommends providing supplementary plain language summaries for content that requires advanced reading ability.",
    "accessibilityPrinciple": "WCAG 3.1.5 Reading Level & Plain Language",
    "options": [
      {
        "id": "a",
        "label": "Provide clear headings, plain-language summaries, and define complex terms in a glossary.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 40,
        "feedback": "Correct! Plain language benefits second-language speakers, cognitive accessibility, and general user comprehension."
      },
      {
        "id": "b",
        "label": "Write only in dense legal terms to prevent any ambiguity.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Unexplained jargon creates high cognitive and linguistic barriers."
      },
      {
        "id": "c",
        "label": "Translate everything to Japanese automatically using unreviewed machine translation only.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Unreviewed machine translation can distort legal meaning."
      },
      {
        "id": "d",
        "label": "Decrease text size to make the document look shorter.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Smaller text worsens visual readability."
      }
    ],
    "points": 100,
    "rewardCredits": 20,
    "transformation": {
      "type": "readableTypography"
    }
  },
  {
    "id": "yuki-language-medium-01",
    "characterId": "yuki",
    "category": "language",
    "difficulty": "medium",
    "title": "Yuki Language of Parts",
    "scenario": "Yuki navigates a multilingual portal. The screen-reader reads aloud in a default English accent, but a section of the text is in Spanish, causing gibberish pronunciation.",
    "description": "Yuki navigates a multilingual portal. The screen-reader reads aloud in a default English accent, but a section of the text is in Spanish, causing gibberish pronunciation.",
    "question": "How do you ensure screen readers use the correct pronunciation for foreign phrases?",
    "explanation": "WCAG 3.1.2 Language of Parts requires identifying the human language of each passage in the content.",
    "accessibilityPrinciple": "WCAG 3.1.2 Language of Parts",
    "options": [
      {
        "id": "a",
        "label": "Declare the correct language attribute on the HTML container element (e.g., <span lang='es'>).",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 50,
        "feedback": "Correct! The lang attribute tells assistive tools and TTS synthesizers to switch pronunciation rules automatically."
      },
      {
        "id": "b",
        "label": "Spell foreign words phonetically in English.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Phonetic respelling degrades textual readability and searchability."
      },
      {
        "id": "c",
        "label": "Use translate='no' on all elements.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "This disables browser translations rather than fixing pronunciation."
      },
      {
        "id": "d",
        "label": "Provide an image of the text instead.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Images of text are inaccessible to screen readers and user resizing."
      }
    ],
    "points": 200,
    "rewardCredits": 30,
    "transformation": {
      "type": "readableTypography"
    }
  },
  {
    "id": "yuki-language-hard-01",
    "characterId": "yuki",
    "category": "language",
    "difficulty": "hard",
    "title": "Yuki Idioms and Ambiguity",
    "scenario": "Yuki is filling a registration form. The inputs use highly confusing localized idioms and figures of speech (e.g., 'What is your john-hancock?').",
    "description": "Yuki is filling a registration form. The inputs use highly confusing localized idioms and figures of speech (e.g., 'What is your john-hancock?').",
    "question": "How should labels and instructions be phrased?",
    "explanation": "WCAG 3.1.3 Unusual Words and clear communication guidelines recommend using literal, direct words over cultural idioms.",
    "accessibilityPrinciple": "WCAG 3.1.3 & Plain Localization",
    "options": [
      {
        "id": "a",
        "label": "Use direct, literal phrasing (e.g., 'Digital Signature') without slang, cultural metaphors, or idioms.",
        "description": "",
        "isCorrect": true,
        "scoreBonus": 60,
        "feedback": "Correct! Direct literal phrasing ensures clear understanding across diverse cultures and languages."
      },
      {
        "id": "b",
        "label": "Add tooltips explaining the history of the slang.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Explanations add unnecessary reading friction instead of solving the ambiguity."
      },
      {
        "id": "c",
        "label": "Translate the idiom word-for-word into other languages.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Literal translations of idioms produce nonsensical phrases."
      },
      {
        "id": "d",
        "label": "Replace all text labels with ambiguous icons.",
        "description": "",
        "isCorrect": false,
        "scoreBonus": 0,
        "feedback": "Icons without text labels create even higher ambiguity."
      }
    ],
    "points": 300,
    "rewardCredits": 40,
    "transformation": {
      "type": "readableTypography"
    }
  }
];

