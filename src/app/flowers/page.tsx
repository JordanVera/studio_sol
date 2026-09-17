import {Catalog} from '@/components/florist/catalog';

export const metadata = {title: 'Our flowers'};

export default function Flowers() {
  return (
    <section className="section page-section">
      <p className="eyebrow">A LITTLE BEAUTY GOES A LONG WAY</p>
      <h1>
        Flowers with <em>feeling.</em>
      </h1>
      <p>
        Our favorite seasonal stems, gathered by hand. Tell us what you’re
        dreaming of and we’ll arrange it for you.
      </p>
      <div className="studio-notice">
        This week’s seasonal edit · Garden-inspired flowers, while beautiful
        stems last.
      </div>
      <Catalog />
    </section>
  );
}
