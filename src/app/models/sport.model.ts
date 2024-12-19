import { League } from "./league.model";

export interface Sport {
    ID: number;
    Name: string;
    Leagues: League [];
}