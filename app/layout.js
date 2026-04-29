import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-montserrat-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Trustworthy, professional, kind electricians serving residential and commercial customers, wiring new electric systems and repairing existing ones.";

const siteUrl ="https://www.powerelectricalservices.net";
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();
    
  

export const metadata = {
  title: "Power Electrical Services",
  description: siteDescription,
};

const jsonLd = 
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.powerelectricalservices.net/#business",
  "name": "Power Electrical Heating & Cooling Services",
  "url": "https://www.powerelectricalservices.net/",
  "telephone": "+1-720-272-2562",
  "priceRange": "$$",
  "description": "Power Electrical Heating & Cooling Services is a licensed electrical and HVAC contractor providing electrical repair, panel upgrades, EV charger installation, air conditioning repair, furnace installation, and heating & cooling maintenance throughout Denver and surrounding Colorado communities.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Denver",
    "addressRegion": "CO",
    "postalCode": "80216",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Colorado"
  },
  "sameAs": [
    "https://share.google/9u7bI1LkCrLW3RXhw",
    "https://www.facebook.com/Powereletricalservices/",
    "https://www.bbb.org/us/co/denver/profile/electrical-contractors/power-electrical-services-1296-1000125617",
    "https://www.instagram.com/power_electrical_hvac_services/",
    "https://www.tiktok.com/@powerelectricalhvac"
  ],
  "hasOfferCatalog": [
    {
      "@type": "OfferCatalog",
      "name": "Electrical Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical Repair" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panel Upgrades" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV Charger Installation" }}
      ]
    },
    {
      "@type": "OfferCatalog",
      "name": "HVAC Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HVAC Repair" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Conditioning Installation" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furnace Repair & Installation" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HVAC Maintenance" }}
      ]
    }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wbop021nwj");`,
            }}
          />
        
        {children}
        <Script strategy="afterInteractive" src="https://connect.podium.com/widget.js#ORG_TOKEN=ca9d015d-d28a-4e9d-a4f1-e875bf1b580b" id="podium-widget" data-organization-api-token="ca9d015d-d28a-4e9d-a4f1-e875bf1b580b"/>
      </body>
    </html>
  );
}
