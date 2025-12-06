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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Example API routes
app.get('/api/company', (req, res) => {
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
  // In a real app, save to DB or send email here.
  console.log('Contact submission:', { name, email, message });
  res.json({ ok: true, received: { name, email, message } });
});

// Fallback to index.html for client-side routing (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Quantum Developers website running at http://localhost:${PORT}`);
});