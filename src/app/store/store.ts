import { Action, ActionReducer } from "@ngrx/store";
import { sportReducer, SportState } from "./sport.reducer";
import { SportEffects } from "./sport.effects";


export interface AppState {
  sport: SportState
}

export interface AppStore {
  sport: ActionReducer<SportState, Action>;
}

export const appStore: AppStore = {
  sport: sportReducer
}

export const appEffects = [SportEffects];