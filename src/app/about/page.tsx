import Image from 'next/image';
import { ContactCTA } from '@/components/florist/site-shell';
import { siteConfig as c } from '@/siteConfig';
export const metadata = { title: 'Our story' };
export default function About() {
  return (
    <>
      <section className="story-split about-story">
        <div className="story-photo">
          <Image
            src="/images/studio.jpg"
            alt="Flowers gathered at our local studio"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">MEET YOUR NEIGHBORHOOD FLORIST</p>
          <h1>
            A small studio.
            <br />
            <em>A whole lot of heart.</em>
          </h1>
          <p>
            I’m {c.ownerName}, the hands and heart behind {c.businessName}. What
            began as flowers gathered for friends grew into a little studio
            built around one belief: beauty brings people together.
          </p>
          <p>
            Our arrangements follow the season, with loose shapes, soft
            movement, and unexpected little details. We source locally when
            available and choose every stem with care.
          </p>
          <p>
            Whether you’re celebrating a wedding or sending a quiet “thinking of
            you,” we want your flowers to feel personal. You’ll work directly
            with the people who make them.
          </p>
          <span className="signature">With love, {c.ownerName}</span>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
