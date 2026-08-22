-- ===================================================
-- ACCESS CITY (INCLUSIVE INTERFACE) - DATABASE SCHEMA
-- PostgreSQL / Supabase Schema Definition
-- ===================================================

-- 1. PLAYERS TABLE
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name VARCHAR(100) NOT NULL DEFAULT 'Access Architect',
  avatar_config JSONB DEFAULT '{"shirt": "#00f0ff", "skin": "#ffb703"}'::jsonb,
  level INT NOT NULL DEFAULT 1,
  total_xp INT NOT NULL DEFAULT 0,
  design_rating INT NOT NULL DEFAULT 100,
  design_credits INT NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. DISTRICTS TABLE
CREATE TABLE IF NOT EXISTS districts (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  map_position JSONB NOT NULL,
  unlock_requirement TEXT,
  display_order INT NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. CHARACTERS TABLE
CREATE TABLE IF NOT EXISTS characters (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  bio TEXT NOT NULL,
  story_role TEXT NOT NULL,
  avatar_color VARCHAR(10) NOT NULL DEFAULT '#00f0ff',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 1
);

-- 4. MISSIONS TABLE
CREATE TABLE IF NOT EXISTS missions (
  id VARCHAR(50) PRIMARY KEY,
  district_id VARCHAR(50) REFERENCES districts(id),
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  story_intro TEXT NOT NULL,
  reward_xp INT NOT NULL DEFAULT 200,
  reward_credits INT NOT NULL DEFAULT 50,
  display_order INT NOT NULL DEFAULT 1
);

-- 5. CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS challenges (
  id VARCHAR(50) PRIMARY KEY,
  character_id VARCHAR(50) REFERENCES characters(id),
  district_id VARCHAR(50) REFERENCES districts(id),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
  category VARCHAR(50) NOT NULL,
  title VARCHAR(150) NOT NULL,
  scenario TEXT NOT NULL,
  question TEXT NOT NULL,
  explanation TEXT NOT NULL,
  accessibility_principle TEXT NOT NULL,
  reward_xp INT NOT NULL DEFAULT 100,
  reward_credits INT NOT NULL DEFAULT 20,
  prerequisite_ids TEXT[] DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 6. CHALLENGE OPTIONS TABLE
CREATE TABLE IF NOT EXISTS challenge_options (
  id VARCHAR(50) PRIMARY KEY,
  challenge_id VARCHAR(50) REFERENCES challenges(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  transformation_id VARCHAR(50),
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  score_bonus INT NOT NULL DEFAULT 0,
  feedback TEXT NOT NULL
);

-- 7. DESIGN TOOLS TABLE
CREATE TABLE IF NOT EXISTS design_tools (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  cost INT NOT NULL DEFAULT 10,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  effect JSONB NOT NULL
);

-- 8. PLAYER SKILLS TABLE
CREATE TABLE IF NOT EXISTS player_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  score INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(player_id, category)
);

-- 9. PLAYER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS player_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  current_district_id VARCHAR(50) REFERENCES districts(id),
  current_mission_id VARCHAR(50) REFERENCES missions(id),
  current_difficulty VARCHAR(20) DEFAULT 'easy',
  completed_challenge_ids TEXT[] DEFAULT '{}',
  unlocked_district_ids TEXT[] DEFAULT '{medicity}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(player_id)
);

-- 10. CHALLENGE ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS challenge_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  challenge_id VARCHAR(50) REFERENCES challenges(id),
  attempt_number INT NOT NULL DEFAULT 1,
  selected_option_id VARCHAR(50) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_earned INT NOT NULL DEFAULT 0,
  duration_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. USER TEST RESULTS TABLE
CREATE TABLE IF NOT EXISTS user_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  challenge_id VARCHAR(50) REFERENCES challenges(id),
  user_profile VARCHAR(50) NOT NULL,
  success BOOLEAN NOT NULL,
  hesitation_time NUMERIC(5,2) NOT NULL DEFAULT 0.0,
  failed_action VARCHAR(100),
  issue_detected VARCHAR(100),
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. INVESTIGATION RESULTS TABLE
CREATE TABLE IF NOT EXISTS investigation_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  challenge_id VARCHAR(50) REFERENCES challenges(id),
  detected_issue VARCHAR(100) NOT NULL,
  selected_cause VARCHAR(100) NOT NULL,
  correct_cause VARCHAR(100) NOT NULL,
  fix_applied VARCHAR(100) NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. BADGES TABLE
CREATE TABLE IF NOT EXISTS badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  condition_type VARCHAR(50) NOT NULL,
  condition_value VARCHAR(50) NOT NULL
);

-- 14. PLAYER BADGES TABLE
CREATE TABLE IF NOT EXISTS player_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  badge_id VARCHAR(50) REFERENCES badges(id),
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(player_id, badge_id)
);

-- 15. GAME SESSIONS TABLE
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  current_scene VARCHAR(50) NOT NULL DEFAULT 'OpeningScene',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE investigation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
