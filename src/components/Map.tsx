"use client";

import { useRouter } from "next/navigation";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ThemeProvider } from "@mui/material";
import { theme } from "./PageBottomNavigation";
import { getMapSpots, MapSpot } from "@/utils/requests/MapSpot";
import { LatLngBounds } from "leaflet";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
}

const defaults = {
  zoom: 15,
}

const MapWithEvents = () => {
  const router = useRouter();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [openCreateMemoryDialog, setOpenCreateMemoryDialog] = useState(false);
  const handleCloseCreateMemoryDialog = () => {
    setOpenCreateMemoryDialog(false);
  }

  useMapEvents({
    dblclick: (e) => {
      const {lat, lng} = e.latlng;
      setLat(lat);
      setLng(lng);
      setOpenCreateMemoryDialog(true);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={openCreateMemoryDialog}
        onClose={handleCloseCreateMemoryDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja criar uma memória no ponto clicado?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Latitude: ${lat.toFixed(4)}, longitude: ${lng.toFixed(4)}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {router.push(`/mem/create/${lat},${lng}`)}}>Criar</Button>
          <Button onClick={() => {setOpenCreateMemoryDialog(false)}} autoFocus>
            Não quero
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default function Map(Map: MapProps) {
  const { zoom = defaults.zoom, posix } = Map;

  const router = useRouter();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const memIdentifier = e.currentTarget.getAttribute("data-index");
    if (memIdentifier) router.push(`/mem/${memIdentifier}`);
  }

  const [markers, setMarkers] = useState<MapSpot[] | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await getMapSpots();
        setMarkers(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (markers === null) fetchMarkers();
  });

  const bounds = new LatLngBounds(
    [85, -180],
    [-85, 180]
  );

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      maxZoom={18}
      minZoom={4}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
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

      {markers ? markers.map((marker) => (
        <Marker key={marker.guid} position={[marker.latitude, marker.longitude]} draggable={false}>
          <Popup>
            <div className="w-[200px]">
              <p className="truncate">{marker.description}</p>
            </div>
            <button
              data-index={marker.guid}
              className="p-1 px-3 rounded bg-[#554FFF] text-white font-bold"
              onClick={handleButtonClick}
            >
              Acessar
            </button>
          </Popup>
        </Marker>
      )) : ""}

      <Marker position={posix} draggable={false}>
        <Popup>
          Onde tudo começou...
        </Popup>
      </Marker>

      <MapWithEvents />
    </MapContainer>
  );
}
