// Optionally fetch company info via POST (disabled by default to avoid GETs entirely)
async function loadCompanyInfo() {
  try {
    const res = await fetch('/api/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    document.title = `${data.name} — ${data.tagline}`;
  } catch (err) {
    console.error('Failed to load company info', err);
  }
}

// Contact form submission via POST
async function handleContactSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.ok) {
      status.textContent = 'Thanks for reaching out — we’ll get back to you soon.';
      status.style.color = 'var(--success)';
      document.getElementById('contact-form').reset();
    } else {
      status.textContent = data.error || 'Something went wrong. Please try again.';
      status.style.color = 'var(--danger)';
    }
  } catch (err) {
    status.textContent = 'Network error. Please try again later.';
    status.style.color = 'var(--danger)';
  }
}

// Set current year in footer
function setYear() {
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;
}

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  // Uncomment if you want to set the title from the backend using POST:
  // loadCompanyInfo();
  document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
});