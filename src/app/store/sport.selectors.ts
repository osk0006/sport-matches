import {  createSelector } from "@ngrx/store"
import { AppState } from "./store";
import { SportState } from "./sport.reducer";
 

const feature = (state: AppState) => state.sport;

export const sportSelector = createSelector(
  feature,
  (state: SportState) => state.sports
);