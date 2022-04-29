import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import cases from "./../../enums/cases";

export interface LayoutState {
  cases: Object;
  selectedCaseIds: Array<string>;
  selectedLocation: String;
  caseLocations: Array<string>;
}

const initialState: LayoutState = {
  cases: cases,
  selectedCaseIds: [],
  selectedLocation: "",
  caseLocations: [],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    selectCase: (state, action: PayloadAction<string>) => {
      let newSelectedCaseIds = [action.payload]
      state.selectedCaseIds = newSelectedCaseIds;
      console.log(current(state));
    },
  },
});
export const { selectCase } = layoutSlice.actions;
export default layoutSlice.reducer;
