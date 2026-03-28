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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Electrician"],
      "@id": `${siteUrl}/#organization`,
      name: "Power Electrical Services",
      description: siteDescription,
      url: siteUrl,
      logo: `${siteUrl}/PESLogo.png`,
      email: "powerelectricalservicesco@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5650 N Washington St. Unit C-6",
        addressLocality: "Denver",
        addressRegion: "CO",
        postalCode: "80216",
        addressCountry: "US",
      },
      sameAs: ["https://www.facebook.com/Powereletricalservices"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Power Electrical Services",
      description: siteDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

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
