import React from "react";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  
} from "react-leaflet";

// This map is the one to create the location and edit it.

const LocationMarker = ({updateLocation, location}) => {
  const [selection, setSelection] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      console.log("click", e.latlng);
      setSelection(e.latlng);
      const locationObj = {
        type: "Point",
        coordinates: [e.latlng.lat, e.latlng.lng]
      }
      updateLocation(locationObj)
    },
  })

  useEffect(() => {
    map.locate();
  });

  // const leafletObj = location && {
  //   lat: location.coordinates[0],
  //   lng: location.coordinates[1]
  //  }

  //  console.log(leafletObj)
 
  return (
    <>
    {selection &&(
      <Marker position={selection}>
        <Popup>Event title</Popup>
      </Marker>
    )}
    </>
  );
};

export default function Map({updateLocation, location}) {
  //console.log(location)
  return (
    <MapContainer
      center={location ? [location.coordinates[0], location.coordinates[1]] : [51.505, -0.09]}
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
      <LocationMarker updateLocation={updateLocation} location={location}/>
 
    </MapContainer>
  );
}

