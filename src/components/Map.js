import React, { useEffect, useState } from "react";
import "../styles/Map.css";
import "../styles/Map.css";
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
// import MapContainer as MapLeaflet
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { showDataOnMap } from "../utils/utils";
import { useStateValue } from "./context/StateProvider";

const Map = ({ countries, casesType, center }) => {
  const [{ countriesData, mapCenter, mapZoom }, dispatch] = useStateValue();
  const [_mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [_mapZoom, setMapZoom] = useState(4);

  useEffect(() => {
    console.log("state mapCenter; ", mapCenter);
    console.log("map zoom:", mapZoom);
    setMapZoom(mapZoom);
    setMapCenter(mapCenter);
  }, [_mapCenter.length, mapCenter, mapZoom]);

  useEffect(() => {
    setMapCenter(mapCenter);
  }, []);

  const _center = { lat: _mapCenter[0], lng: _mapCenter[1] };

  console.log("_center:", _mapCenter);
  return (
    <div className="map">
      <LeafletMap center={{ lat: 51.505, lng: -0.09 }} zoom={_mapZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={_mapCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* {showDataOnMap(countries)} */}
      </LeafletMap>
    </div>
  );
};

export default Map;
