"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

type PropertyMapProps = {
  latitude: number;
  longitude: number;
};

export function PropertyMap({ latitude, longitude }: PropertyMapProps) {
  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `
          <div style="
            display:grid;
            place-items:center;
            width:42px;
            height:42px;
            border-radius:9999px;
            background:rgba(0,102,85,0.92);
            border:4px solid rgba(255,255,255,0.96);
            box-shadow:0 12px 28px rgba(25,50,47,0.22);
          ">
            <span style="font-size:18px;line-height:1;color:#ffffff;">⌂</span>
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      }),
    [],
  );

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <MapLayoutSync />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={markerIcon} />
    </MapContainer>
  );
}

function MapLayoutSync() {
  const map = useMap();

  useEffect(() => {
    const syncSize = () => {
      window.requestAnimationFrame(() => {
        map.invalidateSize();
      });
    };

    syncSize();

    const container = map.getContainer().parentElement;
    if (!container) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
    });

    resizeObserver.observe(container);
    window.addEventListener("resize", syncSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncSize);
    };
  }, [map]);

  return null;
}
