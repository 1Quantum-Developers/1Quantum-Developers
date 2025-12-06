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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quantum Developers running at http://localhost:${PORT}`);
});