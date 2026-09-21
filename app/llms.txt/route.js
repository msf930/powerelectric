const SITE_URL = "https://www.powerelectricalservices.net";

const LLMS_TXT = `# Power Electrical, Heating & Cooling Services

> Licensed electrical and HVAC contractor serving the Denver metro. Electrical repair, panel upgrades, EV charger installation, air conditioning, furnace, and indoor air quality under one roof.

Family-owned since 2007. Shop: 5650 Washington St. Unit C-6, Denver, CO 80216. Phone: (720) 272-2562. Serving Thornton, Brighton, Denver, Northglenn, Westminster, Broomfield, Commerce City, Arvada, Erie, and surrounding communities.

## Pages

- [Home](${SITE_URL}/): Main site with services, offers, and contact options
- [Contact](${SITE_URL}/contact): Request service or ask a question
- [About](${SITE_URL}/about): Company background and approach
- [Service areas](${SITE_URL}/service-areas): Cities and communities served
- [FAQ](${SITE_URL}/faq): Common questions about electrical and HVAC work
- [Blog](${SITE_URL}/blog): Guides and local service articles

## Services

- [Electrical](${SITE_URL}/service/electrical): Electrical repair, panels, wiring, and EV chargers
- [Heating](${SITE_URL}/service/heating): Furnace, heat pump, and heating repair
- [Cooling](${SITE_URL}/service/cooling): Air conditioning, mini splits, and AC maintenance
- [Membership plans](${SITE_URL}/membership): Maintenance plans starting at $14/month
- [Financing](${SITE_URL}/financing): Payment options for larger projects

## Optional

- [Contractor services](${SITE_URL}/contractor): Electrical and HVAC support for contractors
- [Real estate inspection repairs](${SITE_URL}/real-estate-inspection-repairs-denver): Inspection findings resolved for Denver transactions
- [Instant quote](${SITE_URL}/instant-quote): Request a quote online
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
