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
    selectCases: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedCaseIds = action.payload;
      state.selectedCaseIds = newSelectedCaseIds;
    },
    addCase: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedCaseIds = action.payload;
      state.selectedCaseIds.push(...newSelectedCaseIds);
    },
    selectLocation: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedLocations = action.payload;
      state.selectedLocations = newSelectedLocations;
    },
    addLocation: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedLocations = action.payload;
      state.selectedLocations.push(...newSelectedLocations);
    },
    selectMentions: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedMentionIds = action.payload;
      state.selectedMentionIds = newSelectedMentionIds;
    },
    addMentions: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedMentionIds = action.payload;
      state.selectedMentionIds.push(...newSelectedMentionIds);
    },
    clearAllSelections: (state) => {
      state.selectedMentionIds = initialState.selectedMentionIds;
      state.selectedLocations = initialState.selectedLocations;
      state.selectedCaseIds = initialState.selectedCaseIds;
    },
  },
});

export const {
  addCase,
  addMentions,
  addLocation,
  selectCases,
  selectLocation,
  selectMentions,
  clearAllSelections,
} = layoutSlice.actions;
export default layoutSlice.reducer;
