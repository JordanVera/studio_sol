'use client';

import {useEffect, useState} from 'react';
import {arrangements} from '@/lib/content';

export default function ContactForm() {
  const [occasion, O] = useState('Just because');
  const [arrangement, A] = useState('');
  const [status, S] = useState('');
  const [busy, B] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('occasion') === 'Weddings') O('Weddings');
    const requested = arrangements.find((x) => x.id === p.get('arrangement'));
    if (requested) {
      O('Custom arrangement / quote');
      A(requested.name);
    }
  }, []);

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        B(true);
        S('');
        const form = e.currentTarget;
        try {
          const r = await fetch('/api/contact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
          });
          const d = (await r.json()) as {message: string};
          S(d.message);
          if (r.ok) form.reset();
        } catch {
          S('We couldn’t send your message. Please try again or call us.');
        } finally {
          B(false);
        }
      }}
    >
      <div className="form-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          What’s the occasion?
          <select
            name="occasion"
            value={occasion}
            onChange={(e) => O(e.target.value)}
          >
            <option>Just because</option>
            <option>Weddings</option>
            <option>Corporate</option>
            <option>Sympathy</option>
            <option>Celebrations</option>
            <option>Custom arrangement / quote</option>
          </select>
        </label>
        <label>
          Your date (optional)
          <input type="date" name="date" />
        </label>
      </div>
      {arrangement && <input type="hidden" name="arrangement" value={arrangement} />}
      <label>
        Tell us a little about your flowers
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          placeholder="Colors you love, your budget, where the flowers are going…"
        />
      </label>
      <div hidden aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="small-note">
        We’ll only use your details to respond to your inquiry.
      </p>
      <button className="button" disabled={busy}>
        {busy ? 'Sending…' : 'Send your note ↗'}
      </button>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
