import { CommonModule } from '@angular/common';
import { Component, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { sportSelector } from '../../store/sport.selectors';
import { Sport } from '../../models/sport.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { LeaguesComponent } from "../leagues/leagues.component";

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule, LeaguesComponent],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.scss'
})
export class SportsComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public sportID: number | undefined;
  sports$: Signal<Sport[] | undefined>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.sports$ = toSignal(this.store.select(sportSelector));
  }

  ngOnInit() {
    this.sportID = Number(this.route.snapshot.paramMap.get('id'));
  }

}
