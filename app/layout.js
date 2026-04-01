import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
