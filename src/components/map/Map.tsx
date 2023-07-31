import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locations from "../../data/locations.json";
import locationsHalo from "../../data/locationsHalo.json";
import {
  selectCases,
  selectLocation,
  selectMentions,
} from "../layout/LayoutSlice";
import { restoreDefaultMapPosition } from "./MapSlice";
import { Button } from "react-bootstrap";

const MapComponent: React.FC = ({}) => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const minZoom = useAppSelector((state) => state.map.minZoom);
  const maxZoom = useAppSelector((state) => state.map.maxZoom);
  const center = useAppSelector((state) => state.map.center);
  const mentions = useAppSelector((state) => state.layout.mentions);
  const selectedLocations = useAppSelector(
    (state) => state.layout.selectedLocations
  );
  const selectedOutcomes = useAppSelector(
    (state) => state.layout.selectedOutcomes
  );
  const selectedPractices = useAppSelector(
    (state) => state.layout.selectedPractices
  );
  const dispatch = useAppDispatch();
  const allowedLocations = [
    "L0008",
    "L0010",
    "L0103",
    "L0104",
    "L0080",
    "L0023",
    "L0013",
    "L0005",
    "L0034",
    "L0037",
    "L0014",
    "L0065",
    "L0028",
    "L0044",
    "L0045",
    "L0117",
    "L0046",
    "L0048",
    "L0049",
    "L0052",
    "L0053",
    "L0056",
    "L0109",
    "L0060",
    "L0105",
    "L0067",
    "L0071",
    "L0075",
    "L0078",
    "L0079",
    "L0113",
    "L0106",
    "L0091",
    "L0090",
    "L0089",
    "L0107",
    "L0077",
    "L0108",
    "L0096",
    "L0042",
    "L0036",
    "L0119",
    "L0110",
    "L0023H",
    "L0065H",
    "L0080H",
    "L0044H",
  ];

  const impreciseLocations = [
    "L0005",
    "L0023H",
    "L0028",
    "L0044H",
    "L0048",
    "L0065H",
    "L0080H",
    "L0103",
    "L0104",
  ];

  function getMentions(location_id: string) {
    let matchingMentions: any = [];
    let matchingCases: any = new Set();
    Object.values(mentions).map((val: any) => {
      if (
        val.location_primary_id &&
        val.location_primary_id.includes(location_id) &&
        !val.location_primary_id.includes(`${location_id}H`)
      ) {
        matchingMentions.push(val.id);
        matchingCases.add(val.case_id);
      }
    });
    return [matchingMentions, matchingCases];
  }

  function setCircles(feature: any, latlng: any) {
    if (allowedLocations.includes(feature.properties.id)) {
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
      let [locationMentions, locationCases] = getMentions(
        feature.properties.id
      );
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
  }

  function getColor(feature: any) {
    if (selectedLocations.length < 1) {
      if (selectedOutcomes.length !== 0 || selectedPractices.length !== 0) {
        return "gray";
      } else {
        return "#0000dc";
      }
    } else {
      if (selectedLocations.includes(String(feature.properties.id))) {
        return "#0000dc";
      } else {
        return "gray";
      }
    }
  }

  function styleCircles(feature: any) {
    let color = getColor(feature);
    if (impreciseLocations.includes(feature.properties.id)) {
      return {
        fillColor: color,
        radius: 12,
        weight: 0.5,
        opacity: 1,
        color: color,
        fillOpacity: 0.4,
      };
    } else {
      return {
        fillColor: color,
        radius: 6,
        weight: 0,
        opacity: 1,
        color: color,
        fillOpacity: 0.8,
      };
    }
  }

  function ZoomToLayer() {
    const map = useMap();
    return (
      <Button
        size="sm"
        style={{
          position: "fixed",
          top: "80px",
          left: "11px",
          zIndex: 1000,
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: "2px",
        }}
        variant="light"
        title="Reset map position"
        onClick={() => {
          map.setView(center, zoom);
        }}
      >
        [ ]
      </Button>
    );
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
        id="map"
        doubleClickZoom={false}
        touchZoom={false}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        keyboard={false}
        preferCanvas={true}
      >
        <ZoomToLayer />
        <ScaleControl imperial={false} position={"bottomleft"} />
        <GeoJSON
          data={locationsHalo as GeoJSON.FeatureCollection}
          pointToLayer={setCircles as any}
          style={styleCircles}
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
