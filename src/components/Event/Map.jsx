import React from 'react'
import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle
} from "react-leaflet";


const events = [
  { id: "3ee3rwegwegw4", name: "Leos Party", location: [51.505, -0.09] },
  { id: "esgergerb", name: "Ale Party", location: [51.505, -0.087] },
  { id: "3ee3r4yrhthwegwegw4", name: "Nick Party", location: [51.515, -0.081] },
];
const defaultLocation = [38.643969, 0.065911];
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [selection, setSelection] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      console.log("click", e);
      // when the user clicks we set the selection to the one from the click
      // which will in turn show a marker on that specific location
      setSelection(e.latlng);
    },
    locationfound: (e) => {
      console.log("locationfound", e);
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
      // map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    // gets the location of the user and when its done triggers the locationfound method
    map.locate();
  });

  if (position === null) {
    return null;
  }
  return (
    <>
      <Marker position={position}>
        <Popup>This is where you are, give or take {accuracy} meters.</Popup>
      </Marker>
      {selection && (
        <Marker position={selection}>
          <Popup>This is your selection!</Popup>
        </Marker>
      )}
      <Circle
        center={position}
        pathOptions={{ fillColor: "blue" }}
        radius={accuracy}
      />
    </>
  );
};

    export default function Map() {

  return (
    <div>
      <MapContainer
        zoom={13}
        scrollWheelZoom={true}
        center={defaultLocation}
        style={{ height: "40vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
        {events.map(({ location, name, id }) => {
          return (
            <Marker key={id} position={location}>
              <Popup>
                This is an event <br />
                name: {name}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

// function Map() {  
//     return 
//         <div>
//         <MapContainer
//         center={defaultLocation}
//         zoom={13}
//         scrollWheelZoom={true}
//         style={{ height: "50vh" }}
//         >
//         <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
        
//         {!singleEvent.location === null (
//             <Marker position={singleEvent.location}>
//                     <Popup>
//                       {singleEvent.title}
//                     </Popup>
//                   </Marker>
//                   )}
//                   </MapContainer>
//                   </div>
                  
//                 });
