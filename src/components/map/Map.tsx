import React from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, ScaleControl, GeoJSON } from "react-leaflet";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../../data/locations.json";
import trails from "../../data/trails.json";
import { selectLocation } from "../layout/LayoutSlice";

const MapComponent: React.FC = ({}) => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const minZoom = useAppSelector((state) => state.map.minZoom);
  const maxZoom = useAppSelector((state) => state.map.maxZoom);
  const center = useAppSelector((state) => state.map.center);
  const selectedLocation = useAppSelector(
    (state) => state.layout.selectedLocation
  );

  const dispatch = useAppDispatch();
  console.log(selectedLocation);

  function setCircles(feature: any, latlng: any) {
    const Popup = () => {
      return (
        <div style={{ fontFamily: "Roboto" }}>
          <p>
            <b>{feature.properties.label}</b>{" "}
            <i>{feature.properties.name_modern}</i>
          </p>
        </div>
      );
    };
    const popupOptions = {
      minWidth: 150,
      maxWidth: 200,
      className: "popup-classname",
    };
    const popupContent = ReactDOMServer.renderToString(<Popup />);
    var marker = L.circleMarker(latlng);
    marker.bindPopup(popupContent, popupOptions);
    marker.on({
      click: () => dispatch(selectLocation(feature.properties.id)),
    });
    return marker;
  }

  function getColor(feature: any) {
    if (!selectedLocation || selectedLocation === feature.properties.id) {
      return "#0000dc";
    } else {
      return "gray";
    }
  }

  function styleCircles(feature: any) {
    let color = getColor(feature);
    let halo = feature.properties.halo == "1" ? [12, 0.3] : [0, 1];
    return {
      fillColor: color,
      radius: 6,
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
        doubleClickZoom={false}
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
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: US National Park Service"
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
