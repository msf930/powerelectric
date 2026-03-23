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

export const metadata = {
  title: "Power Electrical Services",
  description: "Trustworthy, professional, kind electricians serving residential and commercial customers, wiring new electric systems and repairing existing ones.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
