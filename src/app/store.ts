import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import layoutReducer from "../components/layout/LayoutSlice";
import mapReducer from "../components/map/MapSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    map: mapReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
