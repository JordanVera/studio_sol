'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Camera, ArrowUpRight, Flower2 } from 'lucide-react';
import { siteConfig as c } from '@/siteConfig';
import Image from 'next/image';
export function Header() {
  const [open, S] = useState(false);
  const path = usePathname();

  const links = [
    ['Our flowers', '/flowers'],
    ['Our story', '/about'],
    ['Weddings & events', '/contact?occasion=Weddings'],
    ['Gallery', '/gallery'],
  ];

  return (
    <>
      <div className="announcement">
        Thoughtfully made. Locally delivered.{' '}
        <span>A little beauty, right to your door.</span>
      </div>
      <header className="header">
        <Link href="/" className="brand" aria-label={c.businessName + ' home'}>
          <img src="/logo.png" alt="Studio Sol" className="h-12 w-auto" />
        </Link>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
          {links.map(([name, url]) => (
            <Link
              onClick={() => S(false)}
              className={path === url ? 'active' : ''}
              href={url}
              key={name}
            >
              {name}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="contact-link" href="/contact">
            Let’s talk flowers <ArrowUpRight size={15} />
          </Link>
          <button
            className="mobile-menu icon-button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => S(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Link href="/" className="brand">
            <img src="/logo.png" alt="Studio Sol" className="h-12 w-auto" />
          </Link>
          <p>
            Locally rooted. Lovingly arranged.
            <br />
            Flowers with a little more feeling.
          </p>
        </div>
        <div>
          <h3>COME SAY HELLO</h3>
          <p>
            {c.address}
            <br />
            {c.hours}
            <br />
            Sunday & Monday: closed
          </p>
        </div>
        <div>
          <h3>A LITTLE CONNECTION</h3>
          <a href={`tel:${c.phoneHref}`}>{c.phone}</a>
          <a href={`mailto:${c.email}`}>{c.email}</a>
          <Link href="/contact">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
        <div>
          <h3>TAKE A LOOK AROUND</h3>
          <Link href="/stories">Stories & flower care</Link>
          <Link href="/gallery">Our floral journal</Link>
          <a href={c.instagramUrl} target="_blank" rel="noreferrer">
            Instagram <Camera size={15} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {c.businessName}
        </span>
        <span>Made with care in {c.location}.</span>
      </div>
    </footer>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-cta">
      <Flower2 size={34} strokeWidth={1} />
      <p className="eyebrow">SOMETHING PERSONAL IN MIND?</p>
      <h2>Let’s make something beautiful.</h2>
      <p>
        A wedding, a milestone, or a just-because. We’d love to hear your story.
      </p>
      <Link className="button light" href="/contact">
        Let’s talk flowers <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}
