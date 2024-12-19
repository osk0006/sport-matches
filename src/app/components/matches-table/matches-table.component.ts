import { Component, Input, signal, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Match } from '../../models/match.model';
import { League } from '../../models/league.model';
import { Sport } from '../../models/sport.model';
import { OddsPipe } from "../../pipes/odds.pipe";
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-matches-table',
  standalone: true,
  imports: [MatTableModule, OddsPipe, DatePipe, CommonModule],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.scss'
})
export class MatchesTableComponent {
  @Input() league: League | undefined;
  @Input() sport: Sport | undefined;
  @Input() maxOdds$: WritableSignal<number> | undefined;
  displayedColumns: string[] = ['name', 'date', 'sport', 'region', 'league', '1', 'X', '2', '1X', 'X2'];
  dataSource = new MatTableDataSource<Match>();
  private accentColor: string = "#ff4081";

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = this.league?.Matches ?? [];
  }

  getHeaderStyles() {
    return {
      'background-color': this.league?.Color,
      'color': 'white',
      'font-weight': 'bold'
    };
  }

  getNameTextColor(match: Match){
    return {
      'color': this.maxOdds$ && Object.values(match.Odds).includes(this.maxOdds$()) ? this.accentColor : 'black',
    };
  }

  geOddTextColor(oddsVale: number){
    return {
      'color': this.maxOdds$ && this.maxOdds$() === oddsVale ? this.accentColor : 'black',
    };
  }
}
