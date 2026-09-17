import type {Metadata} from 'next';
import './globals.css';
import {Header, Footer} from '@/components/florist/site-shell';
import {siteConfig as c} from '@/siteConfig';

export const metadata: Metadata = {
  title: {
    default: `${c.businessName} | Thoughtfully arranged flowers`,
    template: `%s | ${c.businessName}`,
  },
  description: `Independent floral design in ${c.location}. Seasonal bouquets, wedding flowers, and thoughtful local delivery.`,
  robots: c.demo
    ? {index: false, follow: false}
    : {index: true, follow: true},
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {!c.demo && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Florist',
                name: c.businessName,
                address: c.address,
                telephone: c.phone,
                url: c.siteUrl,
              }).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </body>
    </html>
  );
}
