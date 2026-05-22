"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const HCM = [10.7769, 106.7009];

export default function MapComponent() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((mod) => {
      const L = mod.default;

      // Guard against double-invocation in Strict Mode
      if (containerRef.current._leaflet_id) return;

      const map = L.map(containerRef.current, {
        center: HCM,
        zoom: 5,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.circle(HCM, {
        color: "#04b4e0",
        fillColor: "#04b4e0",
        fillOpacity: 0.25,
        radius: 250000,
        weight: 1.5,
      }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "200px", borderRadius: "8px" }}
    />
  );
}
