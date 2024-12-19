import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Sport } from '../../models/sport.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { sportSelector } from '../../store/sport.selectors';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sports-menu',
  standalone: true,
  imports: [MatIconModule, MatListModule, MatTooltipModule,
    RouterModule, CommonModule, MatButtonModule],
  templateUrl: './sports-menu.component.html',
  styleUrl: './sports-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsMenuComponent {
  @Input() isExpanded: boolean = true;
  sports$: Signal<Sport[] | undefined>;

  constructor(private store: Store<AppState>) {
    this.sports$ = toSignal(this.store.select(sportSelector));

  }

}
