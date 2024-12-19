import { CommonModule } from '@angular/common';
import { Component, Input, signal, ViewChild } from '@angular/core';
import { Sport } from '../../models/sport.model';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatchesTableComponent } from "../matches-table/matches-table.component";
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule, MatchesTableComponent],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss'
})
export class LeaguesComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @Input() sport: Sport | undefined;
  maxOdds$ = signal<number>(-1);

  constructor(private sportService: SportService) {}

  highestOdd(){
    let maxOdds = this.sportService.getMaxOdds(this.maxOdds$(),this.sport);
     this.maxOdds$.set(maxOdds);
  }

}
