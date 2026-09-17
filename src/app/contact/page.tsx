import ContactForm from '@/components/florist/contact-form';
import { siteConfig as c } from '@/siteConfig';
export const metadata = { title: 'Let’s talk flowers' };
export default function Contact() {
  return (
    <section className="section page-section">
      <p className="eyebrow">EVERY GOOD THING STARTS WITH HELLO</p>
      <h1>
        Let’s talk <em>flowers.</em>
      </h1>
      <p>
        A custom bouquet, a celebration, or a question. Tell us what you’re
        dreaming of.
      </p>
      <div className="contact-grid">
        <ContactForm />
        <aside className="contact-details">
          <h2>Your neighborhood flower studio.</h2>
          <p>
            <a href={`tel:${c.phoneHref}`}>{c.phone}</a>
            <br />
            <a href={`mailto:${c.email}`}>{c.email}</a>
          </p>
          <p>
            {c.address}
            <br />
            {c.hours}
          </p>
          <p>
            Delivering a little joy to Portland neighborhoods.
            <br />
            Service ZIP codes: {c.deliveryZips.join(', ')}.
          </p>
          <iframe
            className="map"
            title="Portland service area map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${c.city}%2C%20${c.state}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
          />
        </aside>
      </div>
    </section>
  );
}
