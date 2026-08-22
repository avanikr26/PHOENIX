import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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

// APIs
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    supabaseMode: supabase !== null,
    environment: 'vercel'
  });
});

app.get('/api/leaderboard', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) return res.status(500).json({ error: error.message });

    const leaderboard = data.map(item => ({
      name: item.name,
      score: item.score,
      badgeCount: item.badge_count,
      date: item.created_at
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leaderboard', async (req, res) => {
  const { name, score, badgeCount } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid name or score' });
  }
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  const user = await getAuthUser(req);
  try {
    const { error } = await supabase.from('leaderboard').insert({
      user_id: user ? user.id : null,
      name: name.slice(0, 20),
      score,
      badge_count: badgeCount || 0,
      created_at: new Date().toISOString()
    });

    if (error) return res.status(500).json({ error: error.message });

    // Fetch and return fresh top 10
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
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/state/:username', async (req, res) => {
  const user = await getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { data, error } = await supabase
      .from('game_states')
      .select('state')
      .eq('user_id', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      return res.status(404).json({ error: 'State not found' });
    }
    if (error) return res.status(500).json({ error: error.message });

    res.json(data.state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/state/:username', async (req, res) => {
  const user = await getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { error } = await supabase.from('game_states').upsert({
      user_id: user.id,
      username: req.params.username,
      state: req.body,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
