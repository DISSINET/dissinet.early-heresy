import React from "react";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  GeoJSON,
  FeatureGroup,
} from "react-leaflet";
import mapConfig from "../enums/mapConfig.js";


const MapComponent: React.FC = ({}) => {

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
          center={[46, 8]}
          zoom={mapConfig.mapZoom}
          attributionControl={false}
          maxZoom={mapConfig.maxZoom}
          minZoom={mapConfig.minZoom}
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
  }

export default MapComponent;
