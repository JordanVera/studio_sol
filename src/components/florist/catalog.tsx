'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { arrangements } from '@/lib/content';

export function ArrangementCard({
  arrangement: p,
}: {
  arrangement: (typeof arrangements)[number];
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Image
          src={p.image}
          alt={p.description}
          fill
          className="object-contain"
          sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw"
        />
        <span className="product-tag">{p.tag}</span>
        <Link
          className="add-button"
          aria-label={`Request ${p.name}`}
          href={`/contact?arrangement=${p.id}`}
        >
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="product-title">
        <h3>{p.name}</h3>
      </div>
      <p>{p.category} · Hand-tied with care</p>
    </article>
  );
}

export function Catalog() {
  const [filter, S] = useState('All flowers');
  return (
    <>
      <div className="filter-row" aria-label="Filter arrangements">
        {[
          'All flowers',
          'Celebrations',
          'Weddings',
          'Corporate',
          'Sympathy',
        ].map((x) => (
          <button
            aria-pressed={filter === x}
            className={filter === x ? 'selected' : ''}
            onClick={() => S(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {arrangements
          .filter((p) => filter === 'All flowers' || p.category === filter)
          .map((p) => (
            <ArrangementCard arrangement={p} key={p.id} />
          ))}
      </div>
    </>
  );
}
