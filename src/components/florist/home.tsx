'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Heart,
  Truck,
  Leaf,
} from 'lucide-react';
import { arrangements } from '@/lib/content';
import { ArrangementCard } from './catalog';
import { ContactCTA } from './site-shell';
import { siteConfig as c } from '@/siteConfig';
const quotes = [
  {
    quote:
      'The kind of flowers that make you stop, smile, and feel something. Every arrangement from {c.ownerName} is a little work of art.',
    name: 'Sarah M.',
    context: 'A very happy neighbor',
  },
  {
    quote:
      'Warm, thoughtful, and so easy to work with. Our wedding flowers felt completely like us.',
    name: 'Emma & James',
    context: 'A day to remember',
  },
  {
    quote:
      'My go-to for a thoughtful gift. Beautiful flowers, and such a personal touch.',
    name: 'Olivia R.',
    context: 'Flowers, just because',
  },
];
export default function Home() {
  const reduced = useReducedMotion();
  const [slide, S] = useState(0);
  const [q, Q] = useState(0);
  const [paused, P] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => S((s) => (s + 1) % 3), 6500);
    return () => clearInterval(t);
  }, [reduced, paused]);
  return (
    <>
      <section className="hero">
        <motion.div
          className="hero-copy"
          initial={false}
          animate={{
            opacity: reduced ? 1 : [0.7, 1],
            y: reduced ? 0 : [10, 0],
          }}
          transition={{ duration: reduced ? 0 : 0.65 }}
        >
          <p className="eyebrow">
            <span className="short-rule" /> YOUR NEIGHBORHOOD FLORIST ·{' '}
            {c.location.toUpperCase()}
          </p>
          <h1>
            For the big days.
            <br />
            And the <em>everydays.</em>
          </h1>
          <p className="hero-description">
            Thoughtfully gathered flowers, beautifully arranged.
            <br className="desktop" /> For life’s little moments and everything
            in between.
          </p>
          <div className="hero-links">
            <Link className="button" href="/contact">
              Request your flowers <ArrowUpRight size={17} />
            </Link>
            <Link className="text-link" href="/about">
              Meet your florist <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <Flower2 size={25} strokeWidth={1} />
            <span>Small-batch blooms. Big-hearted gestures.</span>
          </div>
        </motion.div>
        <div className="hero-photo">
          {arrangements.slice(0, 3).map((item, i) => (
            <Image
              key={item.id}
              src={item.image}
              alt={item.description}
              fill
              priority={i === 0}
              sizes="(max-width: 760px) 100vw, 50vw"
              className={slide === i ? 'hero-frame visible' : 'hero-frame'}
            />
          ))}
          <div className="photo-caption">
            <span>
              GROWN WITH THE SEASON.
              <br />
              GATHERED WITH HEART.
            </span>
            <div className="slider-controls">
              <button
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                onClick={() => P(!paused)}
              >
                {paused ? '▶' : 'Ⅱ'}
              </button>
              <button
                aria-label="Previous flower image"
                onClick={() => S((slide + 2) % 3)}
              >
                <ChevronLeft size={18} />
              </button>
              <span>0{slide + 1} / 03</span>
              <button
                aria-label="Next flower image"
                onClick={() => S((slide + 1) % 3)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Leaf /> Seasonal & thoughtfully sourced
        </span>
        <span>
          <Heart /> Lovingly arranged by hand
        </span>
        <span>
          <Truck /> Local delivery, personal touch
        </span>
        <span>
          <Flower2 /> Independently owned, always
        </span>
      </div>
      <section className="section featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FRESH FROM THE STUDIO</p>
            <h2>A few current favorites.</h2>
          </div>
          <Link className="text-link" href="/flowers">
            Explore all flowers <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="product-grid home-products">
          {arrangements.slice(0, 3).map((p) => (
            <ArrangementCard key={p.id} arrangement={p} />
          ))}
        </div>
        <p className="season-note">
          Always seasonal, never exactly the same. That’s the beauty of flowers.
        </p>
      </section>
      <section className="story-split">
        <div className="story-photo">
          <Image
            src="/sol.PNG"
            alt="Seasonal flowers in an independent floral studio"
            fill
            className="object-contain h-full w-full"
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">A LOCAL STUDIO. A LOT OF HEART.</p>
          <h2>
            Rooted in flowers.
            <br />
            <em>Made for connection.</em>
          </h2>
          <p>
            Hi, I’m {c.ownerName}. I believe the most meaningful things are
            often the simplest—a kind note, a familiar face, a bunch of flowers
            on your kitchen table.
          </p>
          <p>
            From our little Portland studio, we create natural, garden-inspired
            arrangements that feel as personal as the moments they’re made for.
          </p>
          <Link className="text-link" href="/about">
            A little more about us <ArrowUpRight size={17} />
          </Link>
          <span className="signature">With love, {c.ownerName}</span>
        </div>
      </section>
      <section className="testimonials">
        <p className="eyebrow">KIND WORDS FROM OUR COMMUNITY</p>
        <span className="stars" aria-label="5 out of 5 stars">
          ★★★★★
        </span>
        <blockquote>“{quotes[q].quote}”</blockquote>
        <p>
          {quotes[q].name} <span>— {quotes[q].context}</span>
        </p>
        <div className="quote-dots">
          {quotes.map((_, i) => (
            <button
              key={i}
              aria-label={`Read testimonial ${i + 1}`}
              aria-pressed={q === i}
              className={q === i ? 'selected' : ''}
              onClick={() => Q(i)}
            />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
