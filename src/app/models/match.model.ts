export interface Match {
    EventID: number;
    EventName: string;
    EventDate: string;
    SportID: number;
    RegionID: number;
    LeagueCupID: number;
    RegionName: string;
    Odds: Record<string, number>;
}