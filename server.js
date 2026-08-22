import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Supabase Client if env keys exist
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('[Supabase] Client initialized successfully.');
  } catch (err) {
    console.error('[Supabase] Failed to initialize client:', err);
  }
} else {
  console.log('[Supabase] Warning: SUPABASE_URL and SUPABASE_KEY not found in env. Running in local fallback mode.');
}

// Helper to authenticate user via Supabase Auth JWT
const getAuthUser = async (req) => {
  if (!supabase) return null;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;
    return user;
  } catch (err) {
    return null;
  }
};

// Ensure storage directory exists for local fallback
const DATA_DIR = path.join(__dirname, 'data_db');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

// Initialize local leaderboard if it doesn't exist
if (!fs.existsSync(LEADERBOARD_FILE)) {
  const initialLeaderboard = [
    { name: 'Ava', score: 1250, badgeCount: 4, date: new Date().toISOString() },
    { name: 'Developer', score: 1050, badgeCount: 3, date: new Date().toISOString() },
    { name: 'Architect', score: 950, badgeCount: 2, date: new Date().toISOString() }
  ];
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(initialLeaderboard, null, 2));
}

// ─── APIs ──────────────────────────────────────────────────────────────────

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    time: new Date().toISOString(),
    supabaseMode: supabase !== null
  });
});

// Get Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (!error && data) {
        // Map Supabase field names to match client expected names
        const leaderboard = data.map(item => ({
          name: item.name,
          score: item.score,
          badgeCount: item.badge_count,
          date: item.created_at
        }));
        return res.json(leaderboard);
      }
      console.warn('[Supabase] Leaderboard fetch error, falling back to local:', error);
    } catch (err) {
      console.warn('[Supabase] Leaderboard error, falling back to local:', err);
    }
  }

  // Local Fallback
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    const leaderboard = JSON.parse(data);
    leaderboard.sort((a, b) => b.score - a.score);
    res.json(leaderboard.slice(0, 10));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read leaderboard' });
  }
});

// Post Leaderboard Score
app.post('/api/leaderboard', async (req, res) => {
  const { name, score, badgeCount } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid name or score' });
  }

  const authenticatedUser = await getAuthUser(req);

  if (supabase) {
    try {
      const { error } = await supabase.from('leaderboard').insert({
        user_id: authenticatedUser ? authenticatedUser.id : null,
        name: name.slice(0, 20),
        score,
        badge_count: badgeCount || 0,
        created_at: new Date().toISOString()
      });

      if (!error) {
        // Fetch fresh top 10
        const { data } = await supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);
        if (data) {
          const leaderboard = data.map(item => ({
            name: item.name,
            score: item.score,
            badgeCount: item.badge_count,
            date: item.created_at
          }));
          return res.json({ success: true, leaderboard });
        }
      }
      console.warn('[Supabase] Leaderboard insert failed, falling back to local:', error);
    } catch (err) {
      console.warn('[Supabase] Leaderboard insert error, falling back to local:', err);
    }
  }

  // Local Fallback
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    const leaderboard = JSON.parse(data);

    leaderboard.push({
      name: name.slice(0, 20),
      score,
      badgeCount: badgeCount || 0,
      date: new Date().toISOString()
    });

    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard, null, 2));
    leaderboard.sort((a, b) => b.score - a.score);
    res.json({ success: true, leaderboard: leaderboard.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get Saved Game State
app.get('/api/state/:username', async (req, res) => {
  const authenticatedUser = await getAuthUser(req);

  if (supabase && authenticatedUser) {
    try {
      const { data, error } = await supabase
        .from('game_states')
        .select('state')
        .eq('user_id', authenticatedUser.id)
        .single();

      if (!error && data) {
        return res.json(data.state);
      }
      // If error is just row not found, return 404
      if (error && error.code === 'PGRST116') {
        return res.status(404).json({ error: 'State not found in database' });
      }
      console.warn('[Supabase] State fetch error, falling back to local:', error);
    } catch (err) {
      console.warn('[Supabase] State error, falling back to local:', err);
    }
  }

  // Local Fallback
  try {
    const username = encodeURIComponent(req.params.username);
    const stateFile = path.join(DATA_DIR, `state-${username}.json`);

    if (fs.existsSync(stateFile)) {
      const data = fs.readFileSync(stateFile, 'utf8');
      res.json(JSON.parse(data));
    } else {
      res.status(404).json({ error: 'State not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to read state' });
  }
});

// Save Game State
app.post('/api/state/:username', async (req, res) => {
  const authenticatedUser = await getAuthUser(req);
  const username = encodeURIComponent(req.params.username);

  if (supabase && authenticatedUser) {
    try {
      const { error } = await supabase.from('game_states').upsert({
        user_id: authenticatedUser.id,
        username: req.params.username,
        state: req.body,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

      if (!error) {
        return res.json({ success: true });
      }
      console.warn('[Supabase] State save failed, falling back to local:', error);
    } catch (err) {
      console.warn('[Supabase] State save error, falling back to local:', err);
    }
  }

  // Local Fallback
  try {
    const stateFile = path.join(DATA_DIR, `state-${username}.json`);
    fs.writeFileSync(stateFile, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save state' });
  }
});

// ─── Static Files (dist) ───────────────────────────────────────────────────

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Backend Server] Running on http://localhost:${PORT}`);
});
