import Gallery from '@/components/florist/gallery';
import { ContactCTA } from '@/components/florist/site-shell';
export const metadata = { title: 'Floral gallery' };
export default function Page() {
  return (
    <>
      <section className="section page-section">
        <p className="eyebrow">THE FLORAL JOURNAL</p>
        <h1>
          A few things we’ve <em>made with love.</em>
        </h1>
        <p>
          Celebrations, quiet gestures, and flowers just because. Take a closer
          look.
        </p>
        <Gallery />
        <div id="instagram-feed" data-integration="instagram" />
      </section>
      <ContactCTA />
    </>
  );
}
