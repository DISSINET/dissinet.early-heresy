import React from "react";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  FeatureGroup,
  GeoJSON,
} from "react-leaflet";
import { useAppSelector } from "./../../app/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../../data/locations.json";
import trails from "../../data/trails.json";

const MapComponent: React.FC = ({}) => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const minZoom = useAppSelector((state) => state.map.minZoom);
  const maxZoom = useAppSelector((state) => state.map.maxZoom);
  const center = useAppSelector((state) => state.map.center);

  function setCircles(feature: any, latlng: any) {
    if (latlng) {
      var marker = L.circleMarker(latlng);
      return marker;
    }
  }

  function getColor(feature: any) {
    return "#0000dc";
  }

  function styleCircles(feature: any) {
    let color = getColor(feature);
    let halo = feature.properties.halo == "1" ? [10, 0.3] : [0, 1];
    return {
      fillColor: color,
      radius: 4,
      weight: halo[0],
      opacity: halo[1],
      color: color,
      fillOpacity: 1,
    };
  }

  function styleLines(feature: any) {
    let color = getColor(feature);
    return {
      color: color,
      weight: 10,
      opacity: 1,
    };
  }

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
        <GeoJSON
          data={trails as GeoJSON.FeatureCollection}
          style={styleLines}
        />
        <GeoJSON
          data={locations as GeoJSON.FeatureCollection}
          pointToLayer={setCircles as any}
          style={styleCircles}
        />
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
