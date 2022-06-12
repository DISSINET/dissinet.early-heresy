import React from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, ScaleControl, GeoJSON } from "react-leaflet";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../../data/locations.json";
import {
  selectCases,
  selectLocation,
  selectMentions,
} from "../layout/LayoutSlice";

const MapComponent: React.FC = ({}) => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const minZoom = useAppSelector((state) => state.map.minZoom);
  const maxZoom = useAppSelector((state) => state.map.maxZoom);
  const center = useAppSelector((state) => state.map.center);
  const mentions = useAppSelector((state) => state.layout.mentions);
  const selectedLocations = useAppSelector(
    (state) => state.layout.selectedLocations
  );
  const dispatch = useAppDispatch();

  function getMentions(location_id: string) {
    let matchingMentions: any = [];
    let matchingCases: any = new Set();
    Object.values(mentions).map((val: any) => {
      if (val.location_primary_id === location_id) {
        matchingMentions.push(val.id);
        matchingCases.add(val.case_id);
      }
    });
    return [matchingMentions, matchingCases];
  }

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
    let [locationMentions, locationCases] = getMentions(feature.properties.id);
    const popupContent = ReactDOMServer.renderToString(<Popup />);
    var marker = L.circleMarker(latlng);
    marker.bindPopup(popupContent, popupOptions);
    marker.on({
      click: () => {
        dispatch(selectLocation([feature.properties.id]));
        dispatch(selectMentions(locationMentions));
        dispatch(selectCases(Array.from(locationCases)));
      },
      mouseover: () => {
        marker.openPopup();
      },
      mouseout: () => {
        marker.closePopup();
      },
    });
    return marker;
  }

  function getColor(feature: any) {
    if (
      selectedLocations.length < 1 ||
      selectedLocations.includes(feature.properties.id)
    ) {
      return "#0000dc";
    } else {
      return "gray";
    }
  }

  function getHalo(feature: any) {
    let halo = [0, 1];
    if (
      selectedLocations.includes(feature.properties.id)
    ) {
      halo = feature.properties.halo == "1" ? [12, 0.3] : [0, 1];
    }
    return halo;
  }

  function styleCircles(feature: any) {
    let color = getColor(feature);
    let halo = getHalo(feature);
    return {
      fillColor: color,
      radius: 6,
      weight: halo[0],
      opacity: halo[1],
      color: color,
      fillOpacity: 1,
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
        <ScaleControl imperial={false} position={"bottomleft"} />
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
