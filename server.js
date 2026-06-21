/* ===== Christ Embassy Duncanville — form backend =====
   Serves the static site AND receives form submissions, emailing each one
   straight to the church inbox via Gmail (Nodemailer). No third-party form
   service — data flows only through this server to Gmail.

   Run:  node server.js   (needs a .env with the Gmail App Password — see .env.example)
   Forms post to POST /api/submit  { formType, name, email, honeypot, fields:[{label,value}] }. */

import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.')); // serve index.html, contact.html, assets, etc.

const PORT = process.env.PORT || 3000;
const RECIPIENT = process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER;

/* ---- Per-form config: required labels + subject line ----
   `required` are matched against the labels in the posted `fields` array. */
const FORMS = {
  'first-timers': {
    required: ['Full Name', 'Phone'],
    subject: (name) => `New First-Timer — ${name}`,
    heading: 'New First-Timer',
  },
  'cell-ministry': {
    required: ['Full Name', 'Phone'],
    subject: (name) => `Cell Ministry Sign-up — ${name}`,
    heading: 'Cell Ministry Sign-up',
  },
  'foundation-school': {
    required: ['Full Name', 'Phone'],
    subject: (name) => `Foundation School Enrollment — ${name}`,
    heading: 'Foundation School Enrollment',
  },
  'join-department': {
    required: ['Full Name', 'Contact'],
    subject: (name, map) => `Department Volunteer — ${name}${map.Department ? ` (${map.Department})` : ''}`,
    heading: 'Department Volunteer',
  },
  'contact': {
    required: ['Full Name', 'Email', 'Message'],
    subject: (name) => `Contact Message — ${name}`,
    heading: 'New Contact Message',
  },
};

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildEmail(heading, fields) {
  const rows = fields
    .map((f, i) => `
      <tr style="background:${i % 2 ? '#f7f6fb' : '#ffffff'};">
        <td style="padding:10px 14px;font-weight:700;width:38%;color:#1A3A8F;vertical-align:top;">${escapeHtml(f.label)}</td>
        <td style="padding:10px 14px;color:#0D0D0D;vertical-align:top;">${escapeHtml(f.value) || '—'}</td>
      </tr>`)
    .join('');

  const html = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden;">
      <div style="background:#4B0082;padding:22px 24px;">
        <h1 style="color:#fff;margin:0;font-size:19px;">${escapeHtml(heading)}</h1>
        <p style="color:#F5C518;margin:4px 0 0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">Christ Embassy Duncanville</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      <div style="padding:14px 24px;background:#0D0D0D;color:#ffffff80;font-size:12px;">Submitted via the church website.</div>
    </div>`;

  const text = `${heading}\n\n` + fields.map((f) => `${f.label}: ${f.value || '—'}`).join('\n');
  return { html, text };
}

app.post('/api/submit', async (req, res) => {
  try {
    const { formType, name = '', email = '', honeypot = '', fields } = req.body || {};

    // Spam trap: a filled honeypot means a bot — pretend success, send nothing.
    if (honeypot) return res.json({ success: true });

    const cfg = FORMS[formType];
    if (!cfg || !Array.isArray(fields)) {
      return res.status(400).json({ success: false, error: 'Invalid form submission.' });
    }

    // Map labels → values for required-field checks + subject building.
    const map = {};
    for (const f of fields) if (f && f.label) map[f.label] = (f.value || '').toString().trim();

    const missing = cfg.required.filter((label) => !map[label]);
    if (missing.length) {
      return res.status(400).json({ success: false, error: `Missing required field(s): ${missing.join(', ')}.` });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });

    const { html, text } = buildEmail(cfg.heading, fields);
    await transporter.sendMail({
      from: `"CED Website" <${process.env.GMAIL_USER}>`,
      to: RECIPIENT,
      replyTo: email || undefined,
      subject: cfg.subject(name || map['Full Name'] || 'Someone', map),
      text,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ success: false, error: 'Could not send your message. Please try again.' });
  }
});

app.listen(PORT, () => console.log(`CED site + form API running at http://localhost:${PORT}`));
