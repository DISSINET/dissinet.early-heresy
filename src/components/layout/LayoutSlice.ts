import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cases from "./../../data/cases";
import mentions from "./../../data/mentions";

export interface LayoutState {
  cases: Object;
  mentions: Object;
  selectedCaseIds: Array<string>;
  selectedLocation: String;
  caseLocations: Array<string>;
}

const initialState: LayoutState = {
  cases: cases,
  mentions: mentions,
  selectedCaseIds: [],
  selectedLocation: "",
  caseLocations: [],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    selectCase: (state, action: PayloadAction<string>) => {
      let newSelectedCaseIds = [action.payload];
      state.selectedCaseIds = newSelectedCaseIds;
    },
    selectLocation: (state, action: PayloadAction<string>) => {
      let newSelectedLocation = action.payload;
      state.selectedLocation = newSelectedLocation;
    },
  },
});
export const { selectCase, selectLocation } = layoutSlice.actions;
export default layoutSlice.reducer;
