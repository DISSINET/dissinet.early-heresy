import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import cases from "./../../enums/cases";

export interface LayoutState {
  cases: Object;
  selectedCaseIds: Array<string>;
}

const initialState: LayoutState = {
  cases: cases,
  selectedCaseIds: [],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {},
});

export default layoutSlice.reducer;
