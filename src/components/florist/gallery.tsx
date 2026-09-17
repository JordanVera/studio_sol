'use client';

import Image from 'next/image';
import {useState} from 'react';
import {arrangements} from '@/lib/content';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function Gallery() {
  const [filter, F] = useState('All');
  const [selected, S] = useState<(typeof arrangements)[number] | null>(null);
  return (
    <>
      <div className="filter-row">
        {['All', 'Weddings', 'Corporate', 'Sympathy', 'Celebrations'].map(
          (x) => (
            <button
              key={x}
              aria-pressed={x === filter}
              className={x === filter ? 'selected' : ''}
              onClick={() => F(x)}
            >
              {x}
            </button>
          ),
        )}
      </div>
      <div className="gallery-grid">
        {arrangements
          .filter((p) => filter === 'All' || p.category === filter)
          .map((p) => (
            <button
              className="gallery-item"
              key={p.id}
              onClick={() => S(p)}
            >
              <Image
                src={p.image}
                alt={p.description}
                width={800}
                height={1000}
                sizes="(max-width:600px) 90vw, 45vw"
              />
              <span>
                {p.category} <b>{p.name}</b>
              </span>
            </button>
          ))}
      </div>
      <Dialog open={!!selected} onOpenChange={(o) => !o && S(null)}>
        <DialogContent className="lightbox">
          {selected && (
            <>
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>
                {selected.category} · A moment from our floral journal
              </DialogDescription>
              <Image
                src={selected.image}
                alt={selected.description}
                width={1000}
                height={1200}
                className="lightbox-image"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
