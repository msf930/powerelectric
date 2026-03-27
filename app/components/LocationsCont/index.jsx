"use client";

import { useRef, useEffect, useState } from "react";
import Script from "next/script";
import styles from "./styles.module.css";
import { client } from "../../../sanity/lib/client";
import { GoTriangleDown } from "react-icons/go";
import BookBtn from "../BookBtn";
import { FaMapMarkerAlt } from "react-icons/fa";
import CallBtn from "../CallBtn";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const LOCATIONS_QUERY = `*[_type == "locations"]{
    _id,
    County,
    cities
}`;
export default function LocationsCont({ city = "" }) {
    const pathname = usePathname();
    const mapRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationVisible, setLocationVisible] = useState(false);
    const selectLocation = (location) => {
        setSelectedLocation(location);
        setLocationVisible(true);
    };
    useEffect(() => {
        const fetchLocations = async () => {
            const data = await client.fetch(LOCATIONS_QUERY);
            setLocations(data);
        };
        fetchLocations();
    }, []);

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
        <div className={styles.locationsContOuter}>
            <div className={styles.locationsCont}>
                <h2 className={styles.locationsContTitleMobile}>Locations</h2>

                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
                    strategy="afterInteractive"
                    onLoad={() => setIsLoaded(true)}
                />
                <div ref={mapRef} className={styles.locationsContMap} />
                <Link className={styles.locationsContAddressLink} href="https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9" target="_blank"> <FaMapMarkerAlt /> 5650 N Washington St. Unit C-6
                Denver, CO 80216</Link>
            </div>
            <div className={styles.locationsContInfo}>
                <h2 className={styles.locationsContTitle}>Areas we Serve</h2>
                <div className={styles.locationsContList}>
                    {locations.map((location) => (
                        <div key={location._id}>
                            <button className={styles.locationsContItemButton} onClick={() => selectLocation(location)}>
                            <FaMapMarkerAlt />
                                {location.County}
                                <GoTriangleDown className={styles.locationsContItemButtonIcon} aria-hidden />
                            </button>

                        </div>
                    ))}
                </div>
                <div className={styles.locationsContBookButtonCont}>
                    <BookBtn />
                    <CallBtn />
                </div>
                <div className={`${locationVisible ? styles.locationsContItemContent : styles.locationsContItemContentHidden}`}>

                    {locationVisible && selectedLocation && (
                        <div className={styles.locationsContItemContentInner }>
                            <button className={styles.locationsContItemContentButton} onClick={() => setLocationVisible(false)}>Close</button>
                            <h3 className={styles.locationsContItemContentTitle}>{selectedLocation?.County}</h3>
                            <p>Select Location to see available services</p>
                            <ul className={styles.locationsContItemContentList}>
                                {selectedLocation.cities.map((city) => (
                                    <Link href={`/location/${city.replace(/\s+/g, "-") || ""}`} className={styles.locationsContItemContentItem} key={city}>
                                        <FaMapMarkerAlt />
                                        {city}
                                    </Link>
                                ))}
                            </ul>
                            <Link href={`/service-areas/${city && `${city}`}`} className={styles.locationsContItemContentLink}>See All Locations</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
