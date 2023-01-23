import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cases from "./../../data/cases";
import mentions from "./../../data/mentions";

export interface LayoutState {
  cases: Object;
  mentions: Object;
  selectedCaseIds: Array<string>;
  selectedMentionIds: Array<string>;
  selectedLocations: Array<string>;
  selectedOutcomes: Array<string>;
  outcomeLogic: string;
  selectedPractices: Array<string>;
  practiceLogic: string;
  selectedOutcomeAggregations: Array<string>;
  selectedPracticeAggregations1: Array<string>;
  selectedPracticeAggregations2: Array<string>;
  caseLocations: Array<string>;
  timeFilter: Array<number>;
  timeFilterEnabled: boolean;
}

const initialState: LayoutState = {
  cases: cases,
  mentions: mentions,
  selectedCaseIds: [],
  selectedMentionIds: [],
  selectedLocations: [],
  selectedOutcomes: [],
  outcomeLogic: "and",
  selectedPractices: [],
  practiceLogic: "and",
  selectedOutcomeAggregations: [],
  selectedPracticeAggregations1: [],
  selectedPracticeAggregations2: [],
  caseLocations: [],
  timeFilter: [1000, 1155],
  timeFilterEnabled: false,
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
      //select this set of locations -- used by case deselect
      let newSelectedLocations = action.payload;
      state.selectedLocations = newSelectedLocations;
    },
    addLocation: (state, action: PayloadAction<Array<string>>) => {
      //append to existing locaiton set -- used by case select
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
    selectOutcomes: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedOutcomes = action.payload;
      state.selectedOutcomes = newSelectedOutcomes;
    },
    selectOutcomeAggregations: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      let newSelectedOutcomeAggs = action.payload;
      state.selectedOutcomeAggregations = newSelectedOutcomeAggs;
    },
    setOutcomeLogic: (state, action: PayloadAction<string>) => {
      let newOutcomeLogic = action.payload;
      state.outcomeLogic = newOutcomeLogic;
    },
    selectPractices: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedPractices = action.payload;
      state.selectedPractices = newSelectedPractices;
    },
    selectPracticeAggregations1: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      let newSelectedPracticeAggs1 = action.payload;
      state.selectedPracticeAggregations1 = newSelectedPracticeAggs1;
    },
    selectPracticeAggregations2: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      let newSelectedPracticeAggs2 = action.payload;
      state.selectedPracticeAggregations2 = newSelectedPracticeAggs2;
    },
    setPracticeLogic: (state, action: PayloadAction<string>) => {
      let newPracticeLogic = action.payload;
      state.practiceLogic = newPracticeLogic;
    },
    clearAllSelections: (state) => {
      state.selectedMentionIds = initialState.selectedMentionIds;
      state.selectedLocations = initialState.selectedLocations;
      state.selectedCaseIds = initialState.selectedCaseIds;
      state.timeFilter = initialState.timeFilter;
      state.timeFilterEnabled = initialState.timeFilterEnabled;
      state.selectedOutcomes = initialState.selectedOutcomes;
      state.selectedOutcomeAggregations =
        initialState.selectedOutcomeAggregations;
      state.selectedPractices = initialState.selectedPractices;
      state.selectedPracticeAggregations1 = state.selectedPracticeAggregations1;
      state.selectedPracticeAggregations2 = state.selectedPracticeAggregations2;
    },
    setTimeFilter: (state, action: PayloadAction<Array<number>>) => {
      let newTimeFilter = action.payload;
      state.timeFilter = newTimeFilter;
    },
    switchTimeFilter: (state, action: PayloadAction<boolean>) => {
      let newTimeFilterSwitch = action.payload;
      state.timeFilterEnabled = newTimeFilterSwitch;
    },
  },
});

export const {
  addCase,
  addMentions,
  addLocation,
  selectOutcomes,
  selectOutcomeAggregations,
  setOutcomeLogic,
  selectPractices,
  setPracticeLogic,
  selectPracticeAggregations1,
  selectPracticeAggregations2,
  selectCases,
  selectLocation,
  selectMentions,
  clearAllSelections,
  setTimeFilter,
  switchTimeFilter,
} = layoutSlice.actions;
export default layoutSlice.reducer;
