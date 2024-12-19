import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Sport } from '../models/sport.model';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private apiUrl = 'https://static.doxxbet.sk/offer/list.json';
  private colors: string[] =
    ['#CD5C5C', '#FA8072', '#6495ED', '#454545', '#800080',
      '#87CEEB', '#FF7F50', '#BA55D3', '#FF6347', '#32CD32',
      '#0000FF', '#000080', '#00FFFF', '#FF00FF'];

  constructor(private http: HttpClient) {

  }

  getSportsData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  parseSports(data: any): Sport[] {
    const sportsLabels = Object.values(data.Labels).filter((label: any) => label.Typ === 'SP');
    const leagueLabels = Object.values(data.Labels).filter((label: any) => label.Typ === 'LC');
    const regionLabels = Object.values(data.Labels).filter((label: any) => label.Typ === 'RE');

    const sportsMap: Record<number, string> = {};
    const leaguesMap: Record<number, string> = {};

    sportsLabels.forEach((sport: any) => {
      sportsMap[sport.ID] = sport.Name;
    });

    leagueLabels.forEach((league: any) => {
      leaguesMap[league.ID] = league.Name;
    });

    const sportsDict: Record<number, Sport> = {};
    const allOdds = Object.values(data.Odds);

    data.EventChanceTypes.forEach((eventChangeType: any) => {
      const sportID = eventChangeType.SportID;
      const leagueID = eventChangeType.LeagueCupID;
      const regionID = eventChangeType.RegionID;

      const sportName = sportsMap[sportID] || `Unknown Sport (${sportID})`;
      const leagueName = leaguesMap[leagueID] || `Unknown League (${leagueID})`;

      if (!sportsDict[sportID]) {
        sportsDict[sportID] = {
          ID: sportID,
          Name: sportName,
          Leagues: []
        };
      }

      let league = sportsDict[sportID].Leagues.find(l => l.ID === leagueID);

      if (!league) {
        league = {
          ID: leagueID,
          Name: leagueName,
          Color: this.getRandomColor(),
          Matches: []
        };
        sportsDict[sportID].Leagues.push(league);
      }

      const oddsDict: Record<string, number> = {};
      const oddsItems = allOdds.filter((item: any) => item.EventChanceTypeID === eventChangeType.EventChanceTypeID);

      oddsItems.forEach((odds: any) => {
        oddsDict[odds.TipType] = odds.OddsRate;
      });

      const region: any = regionLabels.find((item: any) => item.ID == regionID);
      const regionName: string = region?.Name || "Unknown region";


      league.Matches.push({
        EventID: eventChangeType.EventID,
        EventName: eventChangeType.EventName,
        EventDate: eventChangeType.EventDate,
        SportID: eventChangeType.SportID,
        RegionID: eventChangeType.RegionID,
        LeagueCupID: eventChangeType.LeagueCupID,
        RegionName: regionName,
        Odds: oddsDict,
      });
    });

    this.sortLeagues(sportsDict);

    return Object.values(sportsDict);
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  getMaxOdds(currentOdds: number, sport: Sport | undefined): number {
    debugger;
    let maxOdds: number = -1;
    let maxValue: number = -1;
    let lowerValue: number = -1;

    sport?.Leagues.forEach((league: League) => {
      league.Matches.forEach((match: Match) => {
        debugger;
        const values = Object.values(match.Odds);
        const localMax = Math.max(...values);
        const filteredValues = Object.values(match.Odds).filter(value => value < currentOdds);
        const localMin = filteredValues.length > 0 ? Math.max(...filteredValues) : null;

        if (localMax > maxValue) {
          maxValue = localMax;
        }

        if (localMin != null && currentOdds > localMin && localMin > lowerValue) {
          lowerValue = localMin;
        }

      });
    });

    if (lowerValue == currentOdds || lowerValue < 0) {
      maxOdds = maxValue;
    }
    else {
      maxOdds = lowerValue;
    }

    return maxOdds;
  }

  sortLeagues(sportsDict: Record<number, Sport>) {
    Object.values(sportsDict).forEach((sport) => {
      sport.Leagues = sport.Leagues.sort((a, b) => a.Name.localeCompare(b.Name));
    });
  }
}
