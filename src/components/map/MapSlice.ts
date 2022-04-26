import { createSlice } from "@reduxjs/toolkit";
import { LatLngTuple } from "leaflet";

export interface MapState {
  center: LatLngTuple;
  zoom: number;
  maxZoom: number;
  minZoom: number;
}

const initialState: MapState = {
  center: [46, 8],
  zoom: 6,
  maxZoom: 15,
  minZoom: 4,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
});

export default mapSlice.reducer;
