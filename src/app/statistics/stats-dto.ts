interface Percentage {
  name: string,
  percentage: number
}

export interface StatsDto {
  totalRequest: number;
  requestsInLastDay: number;
  devicePercentages: Percentage[];
  browserPercentages: Percentage[];
  platformPercentages: Percentage[];
}
