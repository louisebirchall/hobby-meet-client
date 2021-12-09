import React from "react";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";

// This Map only renders the LocationMark in the eventDetails

const LocationMarker = ({location}) => {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    console.log(location)
    const leafletLocationObj = {
      lat: location.coordinates[0],
      lng: location.coordinates[1]
    }
    setSelection(leafletLocationObj)
  }, []);

 
  return (
    <>
    {selection &&(
      <Marker position={selection}>
      </Marker>
    )}
    </>
  );
};

export default function MapForDetails({location}) {
  return (
    <MapContainer
      center={[location.coordinates[0], location.coordinates[1]]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "50vh", width: "50vw" }}
    >
      <TileLayer
        id="mapbox/streets-v11"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken="pk.eyJ1IjoiY2Fyb2wtaW50aGV3aW5kIiwiYSI6ImNrd3lzYmF2eDBwcDMyb3Vyb285enpzY2sifQ.NTD5eDm9k3lQhfBaOWS03w"
      />
      <LocationMarker location={location}/>
    </MapContainer>
  );
}

