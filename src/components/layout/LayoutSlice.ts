import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cases from "./../../data/cases";
import mentions from "./../../data/mentions";

export interface LayoutState {
  cases: Object;
  mentions: Object;
  selectedCaseIds: Array<string>;
  selectedMentionIds: Array<string>;
  selectedLocations: Array<string>;
  caseLocations: Array<string>;
}

const initialState: LayoutState = {
  cases: cases,
  mentions: mentions,
  selectedCaseIds: [],
  selectedMentionIds: [],
  selectedLocations: [],
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
      let newSelectedLocations = [action.payload];
      state.selectedLocations = newSelectedLocations;
    },
    selectMentions: (state, action: PayloadAction<string>) => {
      let newSelectedMentionIds = [action.payload];
      state.selectedMentionIds = newSelectedMentionIds;
    },
    clearAllSelections: (state) => {
      state.selectedMentionIds = initialState.selectedMentionIds;
      state.selectedLocations = initialState.selectedLocations;
      state.selectedCaseIds = initialState.selectedCaseIds;
    },
  },
});
export const {
  selectCase,
  selectLocation,
  selectMentions,
  clearAllSelections,
} = layoutSlice.actions;
export default layoutSlice.reducer;
