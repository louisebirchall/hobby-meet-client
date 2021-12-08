import React from 'react'
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const events = ""; // ! sort this out
const defaultLocation = [38.643969, 0.065911];
const LocationMarker = () => {
const [position, setPosition] = useState(null);
const [selection, setSelection] = useState(null);

const map = useMapEvents({
    click: (e) => {
        console.log('click', e);
        setSelection(e.latlng);
    },
    locationfound: (e) => {
        console.log('locationfound', e);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
    },
});

// componentDidMount() {
//     if (position === null) {
//     return null;
//   },
//   useEffect(() => {
//       useMapEvents()
//       }
//     }

  function Map() {
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
        {events.map(({ title, location }) => {
          return (
            <Marker position={location}>
              <Popup>{title}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}}

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

export default Map