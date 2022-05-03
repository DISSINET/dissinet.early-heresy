import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cases from "./../../data/cases";
import mentions from "./../../data/mentions";

export interface LayoutState {
  cases: Object;
  mentions: Object;
  selectedCaseIds: Array<string>;
  selectedMentionIds: Array<string>;
  selectedLocation: String;
  caseLocations: Array<string>;
}

const initialState: LayoutState = {
  cases: cases,
  mentions: mentions,
  selectedCaseIds: [],
  selectedMentionIds: [],
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
    selectMentions: (state, action: PayloadAction<string>) => {
      let newSelectedMentionIds = [action.payload];
      state.selectedMentionIds = newSelectedMentionIds;
    },
  },
});
export const { selectCase, selectLocation, selectMentions } =
  layoutSlice.actions;
export default layoutSlice.reducer;
