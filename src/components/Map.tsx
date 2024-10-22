"use client";

import { useRouter } from "next/navigation";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React from "react";
import Link from "next/link";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

const defaults = {
  zoom: 16,
}

const MapWithEvents = () => {
  useMapEvents({
    dblclick: (e) => {
      const {lat, lng} = e.latlng;
      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);
      console.log(`--------------------------------`);
    }
  });

  return null;
}

export default function Map(Map: MapProps) {
  const { zoom = defaults.zoom, posix } = Map;

  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const memIdentifier = e.currentTarget.getAttribute("data-index");
    if (memIdentifier) router.push(`/mem/${memIdentifier}`);
  }

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      style={
        {
          height: "100%",
          width: "100%",
          zIndex: 2,
        }
      }
    >
      <TileLayer
        attribution='Mapa de memórias IFRS &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        detectRetina={true}
      />

      <Marker position={posix} draggable={false}>
        <Popup>
          <button
            key={'67178f7b-6c80-8008-9460-671d2e2b887b'}
            data-index={'67178f7b-6c80-8008-9460-671d2e2b887b'}
            className="p-1 px-3 rounded bg-[#554FFF] text-white font-bold"
            onClick={handleButtonClick}
          >
            Acessar
          </button>
        </Popup>
      </Marker>

      <MapWithEvents />
    </MapContainer>
  );
}
