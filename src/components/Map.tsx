"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

const defaults = {
  zoom: 9,
}

const MapWithEvents = () => {
  useMapEvents({
    click: (e) => {
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

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={
        {
          height: "100%",
          width: "100%"
        }
      }
    >
      <TileLayer
        attribution='Mapa de memórias IFRS &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={posix} draggable={false}>
        <Popup>Onde tudo começou...</Popup>
      </Marker>

      <MapWithEvents />
    </MapContainer>
  );
}
