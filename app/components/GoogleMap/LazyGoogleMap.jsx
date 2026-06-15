"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_CONFIG } from "../../../lib/mapConfig";

let mapsLoadPromise = null;

function loadGoogleMaps(apiKey) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }
  if (window.google?.maps) {
    return Promise.resolve();
  }
  if (!mapsLoadPromise) {
    mapsLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        mapsLoadPromise = null;
        reject(new Error("Failed to load Google Maps"));
      };
      document.head.appendChild(script);
    });
  }
  return mapsLoadPromise;
}

function initMap(container) {
  const { mapOptions, locations } = MAP_CONFIG;
  const center = locations.length ? locations[0].coords : mapOptions.center;

  const map = new window.google.maps.Map(container, {
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
}

export default function LazyGoogleMap({ className }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !apiKey) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [apiKey]);

  useEffect(() => {
    if (!shouldLoad || !apiKey || !containerRef.current) return;

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (!cancelled && containerRef.current) {
          initMap(containerRef.current);
        }
      })
      .catch(() => {
        /* map stays as empty placeholder */
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, apiKey]);

  if (!apiKey) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="Map showing business location"
    />
  );
}
