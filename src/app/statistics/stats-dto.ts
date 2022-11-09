interface Percentage {
  name: string,
  value: number
}

export interface StatsDto {
  totalRequest: number;
  requestsInLastDay: number;
  browserPercentages: Percentage[];
  platformPercentages: Percentage[];
}
