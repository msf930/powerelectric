/** FAQPage JSON-LD for home and location landing pages (Google rich results). */
export const FAQ_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why does my breaker keep tripping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A breaker trips due to overloads, short circuits, or faulty wiring. If it happens repeatedly, it should be inspected to prevent damage or fire risk.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an electrical panel upgrade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your panel is outdated or overloaded, or you're adding new appliances, an upgrade may be necessary for safety and performance.",
      },
    },
    {
      "@type": "Question",
      name: "Are electrical issues dangerous?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Electrical problems can lead to fire hazards or system failure if ignored.",
      },
    },
    {
      "@type": "Question",
      name: "How much do electrical repairs cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Costs vary depending on the issue, but proper diagnosis ensures you only pay for what's needed.",
      },
    },
  ],
};

export default function SeoFaqPageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(FAQ_PAGE_JSON_LD),
      }}
    />
  );
}
