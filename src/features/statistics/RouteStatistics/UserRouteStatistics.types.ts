type UserRouteStatisticsData = {
  by_difficulty: {
    1: number,
    2: number,
    3: number
  },
  by_scale: {
    1: number,
    2: number,
    3: number,
    4: number
  } ,
  total_distance: number, 
  total_duration_time: number,
  total_routes: number
}

export type { UserRouteStatisticsData };