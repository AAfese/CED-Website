# Skill: Self-Hosted Booking Form

> Build a complete booking form system for any client website — no Calendly, no Typeform, no third-party form services. Pure HTML + vanilla JS frontend, Express + Nodemailer backend.

---

## Philosophy

- **No third-party dependencies** for the form itself — no Typeform, no Calendly, no HubSpot embeds
- **Self-contained email delivery** via Gmail SMTP (Nodemailer) — client controls their inbox
- **Minimal stack** — Express.js + vanilla JS + native HTML5 inputs. No React, no form libraries
- **Defense in depth** — validate on client AND server. Never trust client alone
- **UX-first** — button state feedback, success swap (replace form with confirmation), error recovery without page reload

---

## Standard Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, native HTML5 form inputs, Fetch API |
| Styling | Tailwind CSS (CDN) or custom CSS variables |
| Backend | Node.js + Express.js (v5+) |
| Email | Nodemailer + Gmail SMTP (app password) |
| Config | dotenv (`.env` file, never committed) |

---

## File Structure

```
project/
├── index.html          # or contact.html — contains the booking form
├── server.js           # Express API + email logic
├── serve.mjs           # Static file server (port 3000)
├── .env                # Gmail credentials (gitignored)
├── .env.example        # Template committed to repo
└── package.json
```

---

## Standard Field Catalog

Pick fields relevant to the service. These are the tested, reusable ones:

| Field | Type | Required | Notes |
|---|---|---|---|
| First Name | `text` | Yes | `autocomplete="given-name"` |
| Last Name | `text` | Yes | `autocomplete="family-name"` |
| Phone | `tel` | Yes | Primary contact method |
| Email | `email` | No | Enables reply-to in email |
| City / Area | `select` | Yes | Dropdown of service areas |
| Preferred Date | `date` | No | Native HTML5 date picker |
| Service Type | `select` | Situational | e.g., Basic / Full Detail / Ceramic |
| Vehicle Type | `select` | Situational | e.g., Sedan / SUV / Truck |
| Message | `textarea` | No | Special requests, notes |

**Rule:** Make phone + at least one contact/location field required. Keep email optional — not everyone wants to share it, and phone is enough to follow up.

---

## Client-Side Validation Pattern

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFormError();

  const firstName = form.firstName.value.trim();
  const lastName  = form.lastName.value.trim();
  const phone     = form.phone.value.trim();
  const city      = form.city.value;

  if (!firstName || !lastName || !phone || !city) {
    showFormError('Please fill in all required fields.');
    return;
  }

  // Disable button during request
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, phone, email, city, date, message })
    });
    const data = await res.json();

    if (data.success) {
      // Replace entire form with success message
      formContainer.innerHTML = `
        <div class="success-state">
          <div class="checkmark">✓</div>
          <h3>You're all set, ${firstName}!</h3>
          <p>We'll reach out within 24 hours to confirm your booking.</p>
        </div>
      `;
    } else {
      showFormError(data.error || 'Something went wrong. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book Now';
    }
  } catch {
    showFormError('Network error. Please check your connection and try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book Now';
  }
});

function showFormError(msg) {
  errorEl.textContent = msg;
  errorEl.style.display = 'block';
}

function clearFormError() {
  errorEl.textContent = '';
  errorEl.style.display = 'none';
}
```

---

## Server-Side API Pattern (server.js)

```javascript
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.'));

function formatDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}

app.post('/api/booking', async (req, res) => {
  const { firstName, lastName, phone, email, city, date, message } = req.body;

  // Server-side validation (defense in depth)
  if (!firstName || !lastName || !phone || !city) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  const formattedDate = formatDate(date);
  const subject = `New Booking — ${firstName} ${lastName} | ${city}${formattedDate ? ` | ${formattedDate}` : ''}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
  });

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#FF6B35;padding:20px;text-align:center;">
        <h1 style="color:#fff;margin:0;">New Booking Request</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <tr><td style="padding:10px;font-weight:bold;width:35%;">Name</td><td style="padding:10px;">${firstName} ${lastName}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:10px;font-weight:bold;">Phone</td><td style="padding:10px;">${phone}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;">Email</td><td style="padding:10px;">${email || '—'}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:10px;font-weight:bold;">City / Area</td><td style="padding:10px;">${city}</td></tr>
        <tr><td style="padding:10px;font-weight:bold;">Preferred Date</td><td style="padding:10px;">${formattedDate || 'Not specified'}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:10px;font-weight:bold;">Message</td><td style="padding:10px;">${message || '—'}</td></tr>
      </table>
      ${email ? `<div style="margin-top:20px;padding:15px;background:#fff3cd;border-radius:4px;">Reply to: <a href="mailto:${email}">${email}</a></div>` : ''}
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject,
      text: `New booking from ${firstName} ${lastName} | ${phone} | ${city}`,
      html: htmlBody
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

app.listen(process.env.PORT || 3000);
```

---

## Email Subject Line Formula

```
New Booking — {FirstName} {LastName} | {City} | {Date}
```
- Date is omitted if not provided
- Adjust the prefix to match the business (e.g., "New Estimate Request —", "Appointment Request —")

---

## .env Setup Checklist

```env
GMAIL_USER=your-send-from-account@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx   # 16-char app password, NOT gmail password
RECIPIENT_EMAIL=bookings@clientdomain.com
PORT=3000
```

**Gmail App Password steps:**
1. Google Account → Security → 2-Step Verification (must be ON)
2. Search "App passwords" → Create one named "Website Booking"
3. Copy the 16-character code — it shows only once

---

## package.json Template

```json
{
  "name": "client-website",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^5.2.1",
    "nodemailer": "^8.0.10"
  }
}
```

---

## Customization Hooks for Future Sites

### Add service type selection
Add a `<select name="service">` with the client's service tiers. Pass it through JSON, include it in the email table row. Update the subject line formula to include service if relevant.

### Add time slot preference
Add a `<select name="timeSlot">` with morning/afternoon/evening options. Native `<input type="time">` works too if exact times matter.

### Add vehicle type (for auto services)
```html
<select name="vehicleType">
  <option value="">Select vehicle type</option>
  <option value="Sedan">Sedan / Coupe</option>
  <option value="SUV">SUV / Crossover</option>
  <option value="Truck">Truck</option>
  <option value="Van/Minivan">Van / Minivan</option>
</select>
```

### Multi-step form
Break fields into `<section class="step" data-step="1">` groups. Show/hide with JS. Add a progress indicator. Keep a single `<form>` wrapping all steps — only POST on final step.

### SMS notification (future upgrade)
Swap Nodemailer for Twilio SMS API if the client prefers text alerts over email. Same server.js structure, just change the transport layer.

### Single endpoint, multiple forms
When a site needs several distinct forms (e.g., a church with First Timers / Cell / Foundation School / Department signups), don't build one endpoint per form. Use **one** `POST /api/submit` that takes `{ formType, name, email, honeypot, fields:[{label,value}] }`:
- Keep a server-side `FORMS` map keyed by `formType` → `{ required:[labels], subject(name, fieldsMap), heading }`.
- The client sends each field as `{ label, value }` (read via `data-label` attributes), so the server can render a generic label/value email table for *any* form without hard-coding fields.
- Validate by checking the form's `required` labels are present in the posted `fields`. Build a `label → value` map for required checks and subject interpolation.
- Frontend: one tabbed page, one shared submit handler over `form[data-formtype]`; collect `[data-label]` elements (handle radio groups once by `name`), validate, `fetch`, then swap the form for a confirmation card. Tabs can be hash-deep-linked (`#cell-ministry`) so CTAs elsewhere jump straight to a form.
- Honeypot: a hidden `name="company"` input; if filled, return `{success:true}` and send nothing.

---

## UX Checklist (non-negotiable)

- [ ] Submit button shows "Sending…" and is disabled during request
- [ ] Success state replaces the form entirely (no page reload)
- [ ] Error state re-enables button so user can retry
- [ ] Required fields marked with `*`
- [ ] Labels properly associated with inputs (`<label for="...">`)
- [ ] Form uses `novalidate` so custom JS controls validation UI
- [ ] Inputs have `autocomplete` attributes for mobile autofill
- [ ] Date input has `min` set to today's date (optional but good UX)

---

## Version History

### v1 — ShinyUp Car Detailing (2026-06)
- 7-field booking form (name, phone, email, city, date, message)
- Express 5 + Nodemailer (Gmail SMTP)
- Vanilla JS client — Fetch POST, success swap pattern
- Dark navy theme (#0D0F14), Google Font: Sora
- Mobile-first, responsive 1→2 column at 480px
- Sticky bottom bar (mobile) with call + book shortcuts

### v2 — Christ Embassy Duncanville (2026-06)
- **Four forms on one tabbed "Connect" page** (`forms.html`): First Timers, Cell Ministry (Join a Cell), Foundation School, Join a Department — plus the existing Contact Us form wired to the same backend.
- **Single endpoint** `POST /api/submit` with `formType` ∈ `first-timers | cell-ministry | foundation-school | join-department | contact`; generic `fields:[{label,value}]` payload → server-side `FORMS` map drives per-form required checks + subject lines (see "Single endpoint, multiple forms" above).
- Express 5 + Nodemailer (Gmail SMTP) → all submissions email `forms.ced@gmail.com`; `replyTo` set to the submitter's email; purple/gold branded HTML email matching the site.
- Backend lives in `server.js` (serves the static site too via `express.static('.')`); `serve.mjs` retained for static-only dev. `.env` holds the Gmail App Password (gitignored).
- Frontend reuses the church design system (Fraunces + Plus Jakarta Sans, royal/gold/purple/ink tokens); hash-deep-linked tabs so the New Here page's *Enroll Now / Join a Cell / Join a Department* CTAs jump straight to the right form.
- Honeypot spam trap (`name="company"`); success swaps form for a confirmation card; client + server validation (name + phone/contact required).
- **Deploy note:** the backend must run on an always-on Node host (~$5/mo VPS or Render/Railway) for live submissions — static-only hosting can't run it. A domain alone doesn't satisfy this; it just points at the Node host.
