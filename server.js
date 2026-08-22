import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure storage directory exists
const DATA_DIR = path.join(__dirname, 'data_db');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

// Initialize leaderboard if it doesn't exist
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
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

// Get Leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    const leaderboard = JSON.parse(data);
    // Sort descending by score
    leaderboard.sort((a, b) => b.score - a.score);
    res.json(leaderboard.slice(0, 10)); // return top 10
  } catch (err) {
    res.status(500).json({ error: 'Failed to read leaderboard' });
  }
});

// Post Leaderboard Score
app.post('/api/leaderboard', (req, res) => {
  try {
    const { name, score, badgeCount } = req.body;
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid name or score' });
    }

    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    const leaderboard = JSON.parse(data);

    leaderboard.push({
      name: name.slice(0, 20), // trim to 20 chars
      score,
      badgeCount: badgeCount || 0,
      date: new Date().toISOString()
    });

    // Save
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard, null, 2));
    res.json({ success: true, leaderboard: leaderboard.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

// Get Saved Game State
app.get('/api/state/:username', (req, res) => {
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
app.post('/api/state/:username', (req, res) => {
  try {
    const username = encodeURIComponent(req.params.username);
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
