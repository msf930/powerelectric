"use client";
import styles from "./styles.module.css";
import quoteItems from "./quoteItems.json";
import { useEffect, useState } from "react";

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
    return <Icon aria-hidden {...props} />;
}

export default function InstantQuoteContainer() {
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
                        <h3 className={styles.instantQuoteItemEndTotalPrice}>Estimated Service Price: ${totalPrice * 0.8}.00 - ${totalPrice * 0.96}.00</h3>
                        <button onClick={() => { setCurrentPage(getPageById("A")); setCurrentItems([1]); setTotalPrice(0); setHistory([]); }}>Start Over</button>
                    </div> : null}
                </div>
                <div className={styles.instantQuoteItemContainerInner}>
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