"use client";

import { useRef, useEffect, useState } from "react";
import Script from "next/script";
import styles from "./styles.module.css";

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

export default function ContactMapClient() {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && apiKey) {
      setIsLoaded(true);
    }
  }, [apiKey]);

  useEffect(() => {
    if (!isLoaded || !apiKey || typeof window === "undefined" || !window.google)
      return;

    const initMap = () => {
      if (!mapRef.current) return;
      const { mapOptions, locations } = MAP_CONFIG;
      const center = locations.length ? locations[0].coords : mapOptions.center;

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
        // eslint-disable-next-line no-new
        new window.google.maps.Marker({
          position: loc.coords,
          map,
          title: loc.title,
        });
      });
    };

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
        <h2 className={styles.locationsContTitle}>Location</h2>
        <p className={styles.locationsContMessage}>An Error Occurred</p>
      </div>
    );
  }

  return (
    <div className={styles.locationsCont}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />
      <div ref={mapRef} className={styles.locationsContMap} />
    </div>
  );
}

