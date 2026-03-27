"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import Script from "next/script";
import { useRef, useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";
const MAP_CONFIG = {
    locations: [
        {
            title: "North Washington Street",
            address1: "N Washington St",
            address2: "Denver, CO, USA",
            coords: { lat: 39.7990428164447, lng: -104.97794645938568 },
            placeId:
                "EiBOIFdhc2hpbmd0b24gU3QsIERlbnZlciwgQ08sIFVTQSIuKiwKFAoSCaG7FJXTfmyHEbmpWdSM-SgSEhQKEgmbps-zgXlshxG1Vi-KvhXIHw",
        },
    ],
    mapOptions: {
        center: { lat: 38.0, lng: -100.0 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 17,
        zoomControl: true,
        maxZoom: 30,
        mapId: "",
    },
};

export default function Footer() {
    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // When navigating client-side, Script may already be loaded so onLoad won't fire again
    useEffect(() => {
        if (typeof window !== "undefined" && window.google && apiKey) {
            setIsLoaded(true);
        }
    }, [apiKey]);

    useEffect(() => {
        if (!isLoaded || !apiKey || typeof window === "undefined" || !window.google) return;

        const initMap = () => {
            if (!mapRef.current) return;
            const { mapOptions, locations } = MAP_CONFIG;
            const center = locations.length
                ? locations[0].coords
                : mapOptions.center;

            const map = new window.google.maps.Map(mapRef.current, {
                center,
                zoom: mapOptions.zoom,
                fullscreenControl: mapOptions.fullscreenControl,
                mapTypeControl: mapOptions.mapTypeControl,
                streetViewControl: mapOptions.streetViewControl,
                zoomControl: mapOptions.zoomControl,
                maxZoom: mapOptions.maxZoom,
                ...(mapOptions.mapId && { mapId: mapOptions.mapId }),
            });

            locations.forEach((loc) => {
                new window.google.maps.Marker({
                    position: loc.coords,
                    map,
                    title: loc.title,
                });
            });
        };

        // Ref may not be attached yet on client-side nav; defer once
        if (mapRef.current) {
            initMap();
        } else {
            const id = requestAnimationFrame(() => {
                initMap();
            });
            return () => cancelAnimationFrame(id);
        }
    }, [isLoaded, apiKey]);
    if (!apiKey) {
        return (
            <div className={styles.locationsCont}>
                <h2 className={styles.locationsContTitle}>Locations</h2>
                <p className={styles.locationsContMessage}>
                    An Error Occurred
                </p>
            </div>
        );
    }
    return (
        <footer className={styles.footer}>
            <div className={styles.footerStrip}>
                <div className={styles.footerStripInner}>
                    <div className={styles.footerStripInnerContentLeft}>
                        <Image src="/PESLogo.png" alt="Power Electrical Services" width={300} height={100} className={styles.footerStripInnerContentLeftImage} />
                        <Image src="/PESLogo.png" alt="Power Electrical Services" width={500} height={500} className={styles.footerStripInnerContentLeftImageMobile} />
                        <div className={styles.footerStripInnerContentLeftButtonContainer}>
                            <BookBtn />
                            <CallBtn />
                        </div>
                    </div>
                    <div className={styles.footerStripInnerContentCenter}>
                        <div className={styles.locationsCont}>

                            <Script
                                src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                                strategy="afterInteractive"
                                onLoad={() => setIsLoaded(true)}
                            />
                            <div ref={mapRef} className={styles.locationsContMap} />
                            <Link className={styles.locationsContMessage} href="https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9" target="_blank"> <FaMapMarkerAlt /> 5650 N Washington St. Unit C-6
                                Denver, CO 80216</Link>
                        </div>
                    </div>
                    <div className={styles.footerStripInnerContentRight}>
                        <div className={styles.footerStripInnerContentRightImagesContainer}>
                            <Image src="/apartmentassociationLogo.png" alt="apartment association logo" width={150} height={150} className={styles.footerStripInnerContentRightImage} />
                            <Image src="/googleGarrunteedLogo.png" alt="apartment association logo" width={150} height={150} className={styles.footerStripInnerContentRightImage} />
                            <Image src="/clipaLogo.png" alt="apartment association logo" width={150} height={150} className={styles.footerStripInnerContentRightImage} />
                            <Image src="/EATONLogo.png" alt="apartment association logo" width={150} height={150} className={styles.footerStripInnerContentRightImage} />
                        </div>
                        <p className={styles.footerStripInnerContentRightMessage}>© Power Electrical Services {new Date().getFullYear()}</p>
                    </div>
                </div>
                <div className={styles.footerStripContent}></div>
                <div className={styles.footerStripImage} aria-hidden />
            </div>
        </footer>
    )
}