interface Percentage {
  name: string,
  value: number
}

export interface StatsDto {
  totalRequest: number;
  requestsInLastDay: number;
  devicePercentages: Percentage[];
  browserPercentages: Percentage[];
  platformPercentages: Percentage[];
}
