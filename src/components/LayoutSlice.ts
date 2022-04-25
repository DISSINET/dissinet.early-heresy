import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import cases from "./../enums/cases";

export interface LayoutState {
  cases: Object;
  selectedCaseIds: Array<string>;
  panel: boolean;
  center: Array<number>;
  zoom: number;
}

const initialState: LayoutState = {
  cases: cases,
  selectedCaseIds: [],
  panel: true,
  center: [52, -1],
  zoom: 7,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {},
});

export default layoutSlice.reducer;
