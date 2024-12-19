import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SportActions from './sport.action';
import { SportService } from '../services/sport.service';
import { Sport } from '../models/sport.model';

@Injectable()
export class SportEffects {

  constructor(private actions$: Actions, private sportService: SportService) {
  }

  loadMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SportActions.loadSports),
      mergeMap(() =>
        this.sportService.getSportsData().pipe(
          map((sportsData) => {
            let sports: Sport[] = this.sportService.parseSports(sportsData);
            return SportActions.loadSportsSuccess({ sports });
          }),
          catchError((error) =>
            of(SportActions.loadSportsFailure({ error: error.message }))
          )
        )
      )
    )
  );

}