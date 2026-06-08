import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Masajes Reductivos en Turrialba | Serenia CR",
  description: "Masajes reductivos en Turrialba con garantía de resultados. Reducí medidas en 4 semanas o seguimos gratis. Cupos limitados — reservá hoy.",
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Serenia Masajes Reductivos",
  "description": "Centro especializado en masajes reductivos en Turrialba, Costa Rica. Garantía de resultados por escrito.",
  "url": "https://www.sereniacr.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Turrialba",
    "addressRegion": "Cartago",
    "addressCountry": "CR"
  },
  "priceRange": "₡₡",
  "serviceType": "Masaje Reductivo"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1707516430495117');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={`${manrope.variable} ${playfair.variable} font-display antialiased bg-background-light text-luxury-green`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1707516430495117&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
