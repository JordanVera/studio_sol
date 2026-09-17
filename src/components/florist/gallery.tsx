'use client';

import Image from 'next/image';
import { useState } from 'react';
import { arrangements } from '@/lib/content';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function Gallery() {
  const [selected, S] = useState<(typeof arrangements)[number] | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {arrangements.map((p) => (
          <button
            className="relative aspect-square overflow-hidden border-0 bg-transparent p-0"
            key={p.id}
            onClick={() => S(p)}
          >
            <Image
              src={p.image}
              alt={p.description}
              fill
              className="object-cover"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>
      <Dialog open={!!selected} onOpenChange={(o) => !o && S(null)}>
        <DialogContent className="lightbox">
          {selected && (
            <>
              <DialogTitle className="sr-only">{selected.name}</DialogTitle>
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
