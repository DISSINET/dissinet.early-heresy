import React from "react";
import { MapContainer, TileLayer, ScaleControl, GeoJSON } from "react-leaflet";
import { useAppSelector } from "./../../app/hooks";
//import locations from "../../data/locations.json";
//import trails from "../../data/trails.json";
import L from "leaflet";

const MapComponent: React.FC = ({}) => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const minZoom = useAppSelector((state) => state.map.minZoom);
  const maxZoom = useAppSelector((state) => state.map.maxZoom);
  const center = useAppSelector((state) => state.map.center);

  /*
  function pointToLayer(feature: any, latlng: any) {
    var marker = L.circleMarker(latlng);
    return marker;
  }
  */

  //const locationsLayer: GeoJSON.FeatureCollection<any> = locations;

  return (
    <div
      className="map-wrapper"
      style={{
        height: "inherit",
        width: "inherit",
        position: "absolute",
      }}
    >
      <MapContainer
        style={{
          width: "100%",
          height: "100%",
          background: "none",
        }}
        center={center}
        zoom={zoom}
        attributionControl={false}
        maxZoom={maxZoom}
        minZoom={minZoom}
        zoomSnap={0}
        className="map"
        id="map"
        doubleClickZoom={true}
        touchZoom={false}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        keyboard={false}
        preferCanvas={true}
      >
        <ScaleControl imperial={false} position={"bottomright"} />
        <TileLayer
          maxNativeZoom={15}
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
