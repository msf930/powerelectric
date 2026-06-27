import { client } from "../../sanity/lib/client";

/**
 * Fallback paths use the same shape as Sanity `service.slug.current` without the leading slash.
 * Update these if your CMS uses different category/service segments so links stay valid.
 */
const FALLBACK_PATHS = {
  panelUpgrades: "electrical/panel-upgrades",
  wiringRewiring: "electrical/wiring-and-rewiring",
  electricalRepair: "electrical/electrical-repair",
  hvacInstallation: "hvac/hvac-installation",
  codeCorrections: "electrical/code-corrections",
  troubleshooting: "electrical/troubleshooting-and-diagnostics",
};

function normalizePath(path) {
  return (path || "").replace(/^\//, "").replace(/\/$/, "");
}

function serviceHref(pathSegment) {
  const p = normalizePath(pathSegment);
  return `/service/${p}`;
}

/**
 * Resolves internal links for the contractor page. Prefer live Sanity matches by title/slug;
 * fall back to FALLBACK_PATHS when no document matches (e.g. services not yet published).
 */
export async function getContractorLinks() {
  const services = await client.fetch(
    `*[_type == "service"]{ title, "path": slug.current }`
  );

  const pick = (test) => {
    const found = services.find((s) => test(s));
    return found?.path ? normalizePath(found.path) : null;
  };

  const path = {
    panelUpgrades:
      pick(
        (s) =>
          /panel/i.test(s.title || "") || /panel/i.test(s.path || "")
      ) || FALLBACK_PATHS.panelUpgrades,
    wiringRewiring:
      pick(
        (s) =>
          /wir|rewir/i.test(s.title || "") || /wir|rewir/i.test(s.path || "")
      ) || FALLBACK_PATHS.wiringRewiring,
    electricalRepair:
      pick(
        (s) =>
          /repair/i.test(s.title || "") ||
          /repair/i.test(s.path || "")
      ) || FALLBACK_PATHS.electricalRepair,
    hvacInstallation:
      pick(
        (s) =>
          (/hvac|heating|cooling|furnace|ac/i.test(s.title || "") &&
            /install|replacement/i.test(s.title || "")) ||
          /hvac/i.test(s.path || "")
      ) || FALLBACK_PATHS.hvacInstallation,
    codeCorrections:
      pick(
        (s) =>
          /code|correction|compliance/i.test(s.title || "") ||
          /code|correction/i.test(s.path || "")
      ) || FALLBACK_PATHS.codeCorrections,
    troubleshooting:
      pick(
        (s) =>
          /troubleshoot|diagnostic/i.test(s.title || "") ||
          /troubleshoot|diagnostic/i.test(s.path || "")
      ) || FALLBACK_PATHS.troubleshooting,
  };

  return {
    panelUpgrades: serviceHref(path.panelUpgrades),
    wiringRewiring: serviceHref(path.wiringRewiring),
    electricalRepair: serviceHref(path.electricalRepair),
    hvacInstallation: serviceHref(path.hvacInstallation),
    codeCorrections: serviceHref(path.codeCorrections),
    troubleshooting: serviceHref(path.troubleshooting),
    about: "/about",
    contact: "/contact",
    inspectionRepairs: "/real-estate-inspection-repairs-denver",
  };
}
