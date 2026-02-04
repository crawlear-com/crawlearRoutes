import type { UserEventsStatisticsData } from "../EventsStatistics/UserEventsStatistics.types";
import type { UserRouteStatisticsData } from "../RouteStatistics/UserRouteStatistics.types";

const thereIsDataByScale = (byScale: UserEventsStatisticsData | UserRouteStatisticsData) => {
  return (byScale.by_scale[1] > 0 || byScale.by_scale[2] > 0 || byScale.by_scale[3] > 0 || 
    byScale.by_scale[4] > 0
  )
}
const thereIsDataByEvents = (byEvents: UserEventsStatisticsData) => {
  return byEvents.events_with_route > 0 || byEvents.events_without_route > 0;
}

const thereISDataByDifficulty = (byDifficulty: UserRouteStatisticsData) => {
  return (byDifficulty.by_difficulty[1] > 0 || byDifficulty.by_difficulty[2] > 0 ||
    byDifficulty.by_difficulty[3] > 0);
}

export { thereIsDataByEvents, thereIsDataByScale, thereISDataByDifficulty };