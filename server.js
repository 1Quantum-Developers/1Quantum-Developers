// server.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
// This ensures styles.css, script.js, images, etc. are served with correct MIME types
app.use(express.static(path.join(__dirname, 'public')));

// POST-only API routes
app.post('/api/company', (req, res) => {
  res.json({
    name: 'Quantum Developers',
    tagline: 'Building the future with precision and imagination.',
    services: [
      'Custom Software Engineering',
      'Cloud & DevOps',
      'AI & Data Solutions',
      'Product Design & UX'
    ],
    contactEmail: 'hello@quantumdevelopers.com'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' });
  }
  console.log('Contact submission:', { name, email, message });
  res.json({ ok: true, received: { name, email, message } });
});

// New: Accept reports submitted from reporting page
// Expected JSON payload:
// {
//   name?: string,
//   email?: string,
//   category: 'abuse' | 'vulnerability' | 'policy' | 'other',
//   summary: string,
//   details?: string,
//   timestamp?: string,
//   affected?: string,
//   severity?: 'low'|'medium'|'high'|'critical'
// }
app.post('/api/report', (req, res) => {
  const payload = req.body || {};
  const { email, category, summary } = payload;

  if (!category || !summary) {
    return res.status(400).json({ ok: false, error: 'Missing required fields: category and summary are required.' });
  }

  // Basic sanity checks (more validation/sanitization should be added for production)
  const id = `rpt_${Date.now().toString(36)}`;

  // Log the report to server logs. In production, replace with secure storage (database, ticketing system).
  console.log('New report received:', { id, ...payload });

  // Example response: acknowledge receipt and return an id for follow-up
  res.json({
    ok: true,
    id,
    message: 'Report received. We will triage it and get back to you as soon as possible.'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quantum Developers running at http://localhost:${PORT}`);
});