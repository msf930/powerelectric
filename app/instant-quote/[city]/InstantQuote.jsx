"use client";
import styles from "./styles.module.css";
import quoteItems from "./quoteItems.json";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { useParams } from "next/navigation";

/** Set in `.env.local` when your API is ready: `NEXT_PUBLIC_PANEL_CALC_SUBMIT_URL=https://...` */
const PANEL_CALC_SUBMIT_URL =
  typeof process.env.NEXT_PUBLIC_PANEL_CALC_SUBMIT_URL === "string"
    ? process.env.NEXT_PUBLIC_PANEL_CALC_SUBMIT_URL.trim()
    : "";

const APPLIANCE_WATTS = {
  range: { label: "Electric range", watts: 8000 },
  dryer: { label: "Electric dryer", watts: 5000 },
  hvac: { label: "HVAC / AC", watts: 4000 },
  waterHeater: { label: "Electric water heater", watts: 4500 },
  ev: { label: "EV charger", watts: 7500 },
  hotTub: { label: "Hot tub / spa", watts: 6000 },
};

const VOLTAGE = 240;
const SAFETY_MARGIN = 1.25;

function recommendServiceSize(finalAmps) {
  if (finalAmps < 125) return { panelAmps: 125, label: "125 Amp" };
  if (finalAmps < 150) return { panelAmps: 150, label: "150 Amp" };
  return { panelAmps: 200, label: "200 Amp" };
}

function buildPanelCalcPayload({
  email,
  sqft,
  utilityUnderground,
  appliances,
  heatingType,
  result,
}) {
  const sq = parseFloat(String(sqft).replace(/,/g, ""));
  return {
    email: email.trim(),
    squareFootage: Number.isFinite(sq) ? sq : null,
    utilityService: utilityUnderground ? "underground" : "overhead",
    appliances: { ...appliances },
    heatingType,
    calculator: result
      ? {
          baseLoadWatts: result.baseLoad,
          applianceLoadWatts: result.applianceLoad,
          totalWatts: result.totalWatts,
          ampsBeforeMargin: result.amps,
          finalAmps: result.finalAmps,
          recommendedService: result.recommendation.label,
          recommendedPanelAmps: result.recommendation.panelAmps,
        }
      : null,
    submittedAt: new Date().toISOString(),
  };
}

function PanelSizeCalculatorForm({ city }) {
  const [sqft, setSqft] = useState("");
  const [utilityUnderground, setUtilityUnderground] = useState(false);
  const [appliances, setAppliances] = useState({
    range: false,
    dryer: false,
    hvac: false,
    waterHeater: false,
    ev: false,
    hotTub: false,
  });
  const [heatingType, setHeatingType] = useState("gas");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const toggleAppliance = (key) => {
    setAppliances((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closePricingModal = useCallback(() => {
    setPricingModalOpen(false);
  }, []);

  const result = useMemo(() => {
    const sq = parseFloat(String(sqft).replace(/,/g, ""));
    if (!Number.isFinite(sq) || sq <= 0) return null;

    const baseLoad = sq * 3;
    let applianceLoad = 0;
    for (const key of Object.keys(APPLIANCE_WATTS)) {
      if (appliances[key]) applianceLoad += APPLIANCE_WATTS[key].watts;
    }
    const totalWatts = baseLoad + applianceLoad;
    const amps = totalWatts / VOLTAGE;
    const finalAmps = amps * SAFETY_MARGIN;
    const recommendation = recommendServiceSize(finalAmps);

    return {
      baseLoad,
      applianceLoad,
      totalWatts,
      amps,
      finalAmps,
      recommendation,
    };
  }, [sqft, appliances]);

  useEffect(() => {
    if (!pricingModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closePricingModal();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [pricingModalOpen, closePricingModal]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    if (!result) {
      setSubmitError("Enter square footage to complete the estimate first.");
      return;
    }
    const trimmed = email.trim();
    if (!trimmed) {
      setSubmitError("Please enter your email address.");
      return;
    }
    const basicEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!basicEmailOk) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    const payload = buildPanelCalcPayload({
      email: trimmed,
      sqft,
      utilityUnderground,
      appliances,
      heatingType,
      result,
    });

    setSubmitting(true);
    try {
      if (PANEL_CALC_SUBMIT_URL) {
        const res = await fetch(PANEL_CALC_SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
      }
      setPricingModalOpen(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.panelCalc}>
      <form
        className={styles.panelCalcForm}
        onSubmit={handleFormSubmit}
        aria-label="Electrical service size calculator"
      >
        <fieldset className={styles.panelCalcFieldset}>
          <legend className={styles.panelCalcLegend}>Home size</legend>
          <label htmlFor="panel-calc-sqft" className={styles.panelCalcLabelBlock}>
            Square footage
            <input
              id="panel-calc-sqft"
              name="sqft"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              placeholder="e.g. 2000"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              className={styles.panelCalcInput}
            />
          </label>
        </fieldset>

        <fieldset className={styles.panelCalcFieldset}>
          <legend className={styles.panelCalcLegend}>Utility service</legend>
          <label className={styles.panelCalcCheckboxRow}>
            <input
              type="checkbox"
              checked={utilityUnderground}
              onChange={(e) => setUtilityUnderground(e.target.checked)}
            />
            <span>Underground utility service (unchecked = overhead)</span>
          </label>
        </fieldset>

        <fieldset className={styles.panelCalcFieldset}>
          <legend className={styles.panelCalcLegend}>Major appliances</legend>
          <p className={styles.panelCalcHint}>
            Check each that applies. Loads use standard estimates for sizing.
          </p>
          <div className={styles.panelCalcApplianceGrid}>
            {Object.entries(APPLIANCE_WATTS).map(([key, { label }]) => (
              <label key={key} className={styles.panelCalcCheckboxRow}>
                <input
                  type="checkbox"
                  checked={appliances[key]}
                  onChange={() => toggleAppliance(key)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.panelCalcFieldset}>
          <legend className={styles.panelCalcLegend}>Heating type</legend>
          <div className={styles.panelCalcRadioRow}>
            <label className={styles.panelCalcRadioLabel}>
              <input
                type="radio"
                name="heating"
                value="gas"
                checked={heatingType === "gas"}
                onChange={() => setHeatingType("gas")}
              />
              Gas
            </label>
            <label className={styles.panelCalcRadioLabel}>
              <input
                type="radio"
                name="heating"
                value="electric"
                checked={heatingType === "electric"}
                onChange={() => setHeatingType("electric")}
              />
              Electric
            </label>
          </div>
        </fieldset>

        {result ? (
          <div className={styles.panelCalcResults} role="region" aria-live="polite">
            <h4 className={styles.panelCalcResultsTitle}>Estimate</h4>
            <ul className={styles.panelCalcBreakdown}>
              <li>
                <span>Base load (3 W X sq ft)</span>
                <span>{result.baseLoad.toLocaleString()} W</span>
              </li>
              <li>
                <span>Appliance load</span>
                <span>{result.applianceLoad.toLocaleString()} W</span>
              </li>
              <li>
                <span>Total load</span>
                <span>{result.totalWatts.toLocaleString()} W</span>
              </li>
              <li>
                <span>Amps at {VOLTAGE}V (before margin)</span>
                <span>{result.amps.toFixed(1)} A</span>
              </li>
              <li>
                <span>With 25% safety margin</span>
                <span>{result.finalAmps.toFixed(1)} A</span>
              </li>
            </ul>
            <p className={styles.panelCalcRecommendation}>
              <strong>Recommended service:</strong>{" "}
              {result.recommendation.label}{" "}
              <span className={styles.panelCalcRecNote}>
                (0-124.9 A → 125 A · 125-149.9 A → 150 A · 150 A+ → 200 A)
              </span>
            </p>
            <p className={styles.panelCalcDisclaimer}>
              For planning only. Utility type and heating selection are not added to
              this watt total. A licensed electrician should verify before upgrades.
            </p>
          </div>
        ) : (
          <p className={styles.panelCalcPlaceholder}>
            Enter square footage to see load and recommended panel size.
          </p>
        )}

        <fieldset className={styles.panelCalcFieldset}>
          <legend className={styles.panelCalcLegend}>Get your estimate by email</legend>
          <label htmlFor="panel-calc-email" className={styles.panelCalcLabelBlock}>
            Email
            <input
              id="panel-calc-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.panelCalcInputWide}
            />
          </label>
          {/* {!PANEL_CALC_SUBMIT_URL ? (
            <p className={styles.panelCalcEndpointNote}>
              Your answers will open pricing options below. When your API is ready, set{" "}
              <code className={styles.panelCalcCode}>NEXT_PUBLIC_PANEL_CALC_SUBMIT_URL</code>{" "}
              in <code className={styles.panelCalcCode}>.env.local</code> to POST this data to
              your server.
            </p>
          ) : null} */}
          {submitError ? (
            <p className={styles.panelCalcSubmitError} role="alert">
              {submitError}
            </p>
          ) : null}
          <button
            type="submit"
            className={styles.panelCalcSubmitBtn}
            disabled={submitting || !result}
          >
            {submitting ? "Sending…" : "Submit & see service options"}
          </button>
        </fieldset>
      </form>

      {pricingModalOpen ? (
        <div
          className={styles.panelCalcModalBackdrop}
          role="presentation"
          onClick={closePricingModal}
        >
          <div
            className={styles.panelCalcModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-calc-pricing-title"
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              type="button"
              className={styles.panelCalcModalClose}
              onClick={closePricingModal}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h2 id="panel-calc-pricing-title" className={styles.panelCalcModalTitle}>
              Service &amp; pricing options
            </h2>
            <p className={styles.panelCalcModalIntro}>
              We offer panel swaps and full service changes for both overhead and underground
              utility setups. Contact us for exact pricing on your home.
            </p>
            <div className={styles.panelCalcPricingGrid}>
              <div className={styles.panelCalcPricingSection}>
                <h3 className={styles.panelCalcPricingSectionTitle}>Overhead</h3>
                <div className={styles.panelCalcPricingCards}>
                  <div className={styles.panelCalcPricingCard}>
                    <span className={styles.panelCalcPricingCardLabel}>
                      OVERHEAD PANEL SWAP
                    </span>
                    <span className={styles.panelCalcPricingCardHint}>
                      Replace the panel; overhead service entrance stays in place.
                    </span>
                  </div>
                  <div className={styles.panelCalcPricingCard}>
                    <span className={styles.panelCalcPricingCardLabel}>
                      OVERHEAD SERVICE CHANGE
                    </span>
                    <span className={styles.panelCalcPricingCardHint}>
                      Full overhead service upgrade .
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.panelCalcPricingSection}>
                <h3 className={styles.panelCalcPricingSectionTitle}>Underground</h3>
                <div className={styles.panelCalcPricingCards}>
                  <div className={styles.panelCalcPricingCard}>
                    <span className={styles.panelCalcPricingCardLabel}>
                      UNDERGROUND PANEL SWAP
                    </span>
                    <span className={styles.panelCalcPricingCardHint}>
                      Replace the panel; underground lateral / meter base scope as quoted.
                    </span>
                  </div>
                  <div className={styles.panelCalcPricingCard}>
                    <span className={styles.panelCalcPricingCardLabel}>
                      UNDERGROUND SERVICE CHANGE
                    </span>
                    <span className={styles.panelCalcPricingCardHint}>
                      Full underground service upgrade end-to-end.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.panelCalcModalFooter}>
              <Link href={`/contact${city ? `/${city}` : ""}`} className={styles.panelCalcModalCta}>
                Request a quote
              </Link>
              <button
                type="button"
                className={styles.panelCalcModalDismiss}
                onClick={closePricingModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getItemById(id) {
    return quoteItems.buttons.find((q) => q.id === id) ?? null;
}

function getPageById(id) {
    return quoteItems.pages.find((q) => q.id === id) ?? null;
}

/**
 * Loads one icon from react-icons/fa by export name (e.g. "FaLightbulb").
 * Calls optional `setLoading` with true at start and false when import finishes.
 */
function DynamicFaIcon({ name, setLoading: setLoadingProp, ...props }) {
    const [loading, setLoading] = useState(true);
    const [Icon, setIcon] = useState(null);

    useEffect(() => {
        if (!name) {
            setLoading(false);
            setIcon(null);
            setLoadingProp?.(false);
            return;
        }
        
        
        
        setLoading(true);
        setLoadingProp?.(true);

        let cancelled = false;
        import("react-icons/fa")
            .then((mod) => {
                if (cancelled) return;
                const Cmp = mod[name];
                // Must use () => Cmp, not setIcon(Cmp): if Cmp is a function component,
                // setIcon(Cmp) is treated as a state updater and React calls Cmp(prevState),
                // which returns JSX — so state becomes an element, not the component.
                if (
                    Cmp &&
                    (typeof Cmp === "function" ||
                        (typeof Cmp === "object" &&
                            Cmp !== null &&
                            typeof Cmp.render === "function"))
                ) {
                    setIcon(() => Cmp);
                } else {
                    setIcon(null);
                }
            })
            .finally(() => {
                if (cancelled) return;
                setLoading(false);
                setLoadingProp?.(false);
            });

        return () => {
            cancelled = true;
            setLoadingProp?.(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- optional parent setLoading
    }, [name]);

    if (loading) {
        return <span className={styles.iconLoading} aria-hidden />;
    }
    if (!Icon) return null;
    return (
        <Icon
            aria-hidden
            {...props}
            style={{ color: "var(--primary)", ...(props.style ?? {}) }}
        />
    );
}

export default function InstantQuoteContainer({ city }) {
    const cityParam = useParams().city;
    const [currentItems, setCurrentItems] = useState([1]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(getPageById("A"));
    // const [currentPageData, setCurrentPageData] = useState(getPageById("A"));
    return (
        <div className={styles.instantQuoteContainerInner}>
            <div
                className={styles.instantQuoteItemContainer}
                key={currentItems.join("-")}
            >
                <div className={styles.instantQuoteItemContentContainer}>
                    {history.length > 0 && (
                        <div className={styles.history}>
                            <button onClick={() => { setCurrentPage(getPageById(history.length == 1 ? "A" : getItemById(history[history.length - 2])?.pointsToPageId) ?? "A"); setCurrentItems(history.length == 1 ? [1] : getItemById(history[history.length - 2])?.pointsTo ?? []); setTotalPrice((prev) => prev - getItemById(history[history.length - 1])?.price ?? 0); setHistory((prev) => prev.slice(0, -1)); }}>Back</button>
                        </div>
                    )}
                    {/* <h3 className={styles.instantQuoteItemTotalPrice}>Total Price: {totalPrice}</h3> */}
                    <h3 className={styles.instantQuoteItemTitle}>{currentPage?.title}</h3>
                    <h3 className={styles.instantQuoteItemDescription}>{currentPage?.description}</h3>
                    {currentPage?.id === "END" ? <div className={styles.instantQuoteItemEnd}>
                        {/* <h3 className={styles.instantQuoteItemEndTitle}>{currentPage?.title}</h3>
                    <p className={styles.instantQuoteItemEndDescription}>{currentPage?.description}</p>*/}
                        <h3 className={styles.instantQuoteItemEndTotalPrice}>Estimated Total Price: {totalPrice}</h3>
                        <button onClick={() => { setCurrentPage(getPageById("A")); setCurrentItems([1]); setTotalPrice(0); setHistory([]); }}>Start Over</button>
                    </div> : null}
                </div>
                <div className={styles.instantQuoteItemContainerInner}>
                    {currentPage?.id === "PanelSizeCalculator" ? (
                        <div className={styles.instantQuoteItemPanelSizeCalculator}>
                            <PanelSizeCalculatorForm city={city} />
                        </div>
                    ) : null}
                    {currentPage?.id === "END" ? null : currentItems.map((itemId, index) => {
                        const item = getItemById(itemId);
                        if (!item) return null;

                        return (
                            <div
                                key={item.id + index}
                                onClick={() => { setCurrentPage(getPageById(item.pointsToPageId) ?? "A"); setCurrentItems(item.pointsTo ?? []); setTotalPrice((prev) => prev + item.price); setHistory((prev) => [...prev, item.id]); }}
                                className={styles.instantQuoteItem}
                                style={{
                                    animationDelay: `${index * 0.12}s`,
                                }}
                            >
                                {item.icon ? (
                                    <DynamicFaIcon name={item.icon} size={28} />
                                ) : null}
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}