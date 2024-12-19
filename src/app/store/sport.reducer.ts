import { createReducer, on } from '@ngrx/store';
import * as SportActions from './sport.action';
import { Sport } from '../models/sport.model';

export const mactFeatureKey = 'match';

export interface SportState {
    sports: Sport[];
    loading: boolean;
    error: string;
}

export const initialState: SportState = {
    sports: [],
    loading: false,
    error: ''
};

export const sportReducer = createReducer(
    initialState,

    on(SportActions.loadSports, state => ({ ...state, loading: true })),

    on(SportActions.loadSportsSuccess, (state, { sports }) => ({ ...state, sports, loading: false })),

    on(SportActions.loadSportsFailure, (state, { error }) => ({ ...state, error, loading: false })));