// src/app/layout.tsx
import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script"; // Importamos el componente Script
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
  title: "Serenia | Bienestar Integral",
  description: "Recupera tu vitalidad y vive sin límites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Importamos los iconos de Google */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" />
        
        {/* Meta Pixel Code */}
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
        {/* Fallback para navegadores sin JavaScript */}
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