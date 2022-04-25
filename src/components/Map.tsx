import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
  ScaleControl,
} from "react-leaflet";

type Props = {
  center: Array<Number>;
  zoom: Number;
  handleMapMoved: Function;
};

export default class MapComponent extends React.Component<Props> {
  mapRef;
  mapEl;
  props: any;

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
    this.mapEl = false;
  }

  /*
  componentDidMount() {
    if (this.mapRef && this.mapRef.current) {
      this.mapEl = this.mapRef.current.leafletElement;
      setTimeout(() => {
        this.mapEl.invalidateSize();
      }, 0);
    }
  }
 */

  componentDidUpdate() {}

  /*
  handleMapMove(e: any) {
    if (this.mapEl) {
      this.props.handleMapMoved(e.center, e.zoom, this.mapEl.getBounds());
    }
  }
*/

  render() {
    return (
      <div className="map" data-testid="map-wrapper">
        <MapContainer
          center={this.props.center}
          zoom={this.props.zoom}
          maxZoom={16}
          minZoom={7}
          //ref={this.mapRef}
          //onViewportChanged={this.handleMapMove.bind(this)}
        >
          <ScaleControl />
          {this.props.zoom < 11 ? (
            <LayerGroup>
              <TileLayer
                maxNativeZoom={15}
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
              />
              <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
              />
            </LayerGroup>
          ) : (
            <LayerGroup>
              <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
            </LayerGroup>
          )}
        </MapContainer>
      </div>
    );
  }
}
