import { createAction, props } from '@ngrx/store';

export const loadSports = createAction('[Sport] Load Sports');
export const loadSportsSuccess = createAction(
    '[Sport] Load Sports Success',
    props<{ sports: any[] }>()
);

export const loadSportsFailure = createAction(
    '[Sport] Load Sports Failure',
    props<{ error: string }>()
);