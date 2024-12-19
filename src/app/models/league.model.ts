import { Match } from "./match.model";


export interface League {
    ID: number;
    Name: string;
    Color: string;
    Matches: Match [];
}