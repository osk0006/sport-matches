import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { SportsMenuComponent } from "./components/sports-menu/sports-menu.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import * as SportActions from './store/sport.action';
import { AppState } from './store/store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, MatSidenavModule,
    NavBarComponent, MatProgressSpinnerModule,
    SportsMenuComponent, SportsMenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Betting offer';
  isLoading$: Signal<boolean | undefined>;
  loading: boolean = false;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = toSignal(this.store.select((state) => state.sport.loading));
  }

  ngOnInit() {
    this.loadSports();
  }

  loadSports() {
    this.store.dispatch(SportActions.loadSports());
  }
}
